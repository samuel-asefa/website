/**
 * Static pages from typed content.
 *
 * Each route renders to a complete HTML document at build time. In dev the
 * same render runs on request, so content edits show up on reload. Vite
 * still processes each page's <link>/<script> tags, so CSS and TypeScript
 * are bundled and hashed as usual.
 */
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';
import type { Route } from '../src/render/routes';

interface Options {
  /** Loads the route table; called on every dev request so edits are picked up. */
  routes: (server?: ViteDevServer) => Promise<Route[]>;
  origin: string;
}

export const pagesPlugin = (opts: Options): Plugin => {
  let root = process.cwd();
  let table: Route[] = [];
  const byAbs = new Map<string, Route>();

  const index = (routes: Route[]) => {
    table = routes;
    byAbs.clear();
    for (const r of routes) byAbs.set(path.resolve(root, r.file), r);
  };

  const findForUrl = (routes: Route[], rawUrl: string): Route | undefined => {
    const url = decodeURIComponent(rawUrl.split(/[?#]/)[0]);
    const candidates = [url];
    if (url.endsWith('/')) candidates.push(`${url}index.html`);
    else if (!path.extname(url)) candidates.push(`${url}/`, `${url}/index.html`);
    return routes.find((r) => candidates.includes(r.url) || candidates.includes(`/${r.file}`));
  };

  return {
    name: 'site-pages',
    enforce: 'pre',

    async config(config, env) {
      root = path.resolve(config.root ?? process.cwd());
      if (env.command !== 'build') return;
      index(await opts.routes());
      return {
        build: {
          rollupOptions: {
            input: Object.fromEntries(table.map((r) => [r.file.replace(/\.html$/, ''), path.resolve(root, r.file)])),
          },
        },
      };
    },

    resolveId(id) {
      const abs = path.isAbsolute(id) ? id : path.resolve(root, id);
      return byAbs.has(abs) ? abs : null;
    },

    load(id) {
      const route = byAbs.get(id);
      return route ? route.render() : null;
    },

    generateBundle() {
      const urls = table.filter((r) => r.sitemap !== false).map((r) => `${opts.origin}${r.url}`);
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${opts.origin}/sitemap.xml\n`,
      });
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) return next();
        try {
          const routes = await opts.routes(server);
          const route = findForUrl(routes, req.url);
          if (!route) return next();
          const clean = req.url.split('?')[0];
          // Mirror static hosting: /dir → /dir/
          if (route.url.endsWith('/') && !clean.endsWith('/') && !clean.endsWith('.html')) {
            res.statusCode = 301;
            res.setHeader('Location', `${clean}/`);
            return res.end();
          }
          const html = await server.transformIndexHtml(req.url, route.render(), req.originalUrl);
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (err) {
          server.ssrFixStacktrace(err as Error);
          next(err);
        }
      });
    },
  };
};
