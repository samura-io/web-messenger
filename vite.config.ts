import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
  ],
  esbuild: {
    loader: 'ts',
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 3000,
  },
});
