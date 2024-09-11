import { defineConfig } from 'vite';
import handlebars from './plugins/vite-plugin-handlebars-precompile';

export default defineConfig({
  plugins: [
    handlebars()
  ],
  esbuild: {
    loader: 'ts',
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 3000,
  }
});
