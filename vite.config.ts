import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        experience: resolve(__dirname, 'experience.html'),
        awards: resolve(__dirname, 'awards.html'),
        education: resolve(__dirname, 'education.html'),
        projects: resolve(__dirname, 'projects.html'),
        contact: resolve(__dirname, 'contact.html'),
      }
    }
  }
});
