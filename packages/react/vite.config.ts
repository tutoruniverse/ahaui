import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import localPackageJson from './package.json';
import rootPackageJson from '../../package.json';

const external = [
  ...Object.keys(localPackageJson.dependencies),
  ...Object.keys(localPackageJson.devDependencies),
  ...Object.keys(rootPackageJson.devDependencies),
  'rc-tooltip',
];
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      constants: resolve(__dirname, 'src/constants'),
      components: resolve(__dirname, 'src/components'),
      hooks: resolve(__dirname, 'src/hooks'),
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
