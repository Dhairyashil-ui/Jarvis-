import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 5176,
    host: true,
    fs: {
      strict: false,
      allow: ['.']
    }
  },
  preview: {
    port: 5176,
    host: true
  }
});
