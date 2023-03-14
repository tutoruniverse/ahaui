import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import rootPackageJson from '../../package.json';

const external = [...Object.keys(rootPackageJson.devDependencies)];
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets'),
      utils: resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external,
      output: {
        globals: {},
      },
    },
    sourcemap: true,
  },
});
