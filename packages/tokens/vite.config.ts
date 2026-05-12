import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        tailwind: path.resolve(__dirname, 'src/tailwind/preset.entry.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'tailwind') {
            return 'tailwind/preset.js';
          }
          return '[name].js';
        },
      },
    },
    copyPublicDir: true,
    minify: 'esbuild',
    sourcemap: true,
  },
});
