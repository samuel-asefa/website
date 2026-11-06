import { defineConfig } from 'vite';
import { pagesPlugin } from './build/pages-plugin';
import { SITE } from './src/config/site';

export default defineConfig({
  appType: 'mpa',
  plugins: [
    pagesPlugin({
      origin: SITE.origin,
      // In dev, load through Vite so content and template edits apply on reload.
      routes: async (server) => {
        const mod = server
          ? ((await server.ssrLoadModule('/src/render/routes.ts')) as typeof import('./src/render/routes'))
          : await import('./src/render/routes');
        return mod.routes();
      },
    }),
  ],
  build: {
    target: 'es2020',
  },
});
