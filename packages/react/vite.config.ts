import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import localPackageJson from './package.json';
import rootPackageJson from '../../package.json';

const external = [
  ...Object.keys(localPackageJson.dependencies),
  ...Object.keys(localPackageJson.devDependencies),
  ...Object.keys(rootPackageJson.devDependencies),
  ...Object.keys(rootPackageJson.dependencies),
];
export default defineConfig({
  plugins: [react(), tsconfigPaths()].filter(Boolean),
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
