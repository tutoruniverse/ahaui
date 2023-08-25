import path from 'path';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import includePaths from 'rollup-plugin-includepaths';
import external from 'rollup-plugin-node-externals';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      sourcemap: true,
      dir: pkg.module,
      preserveModules: true,
    },
  ],
  plugins: [
    alias({
      entries: [
        {
          find: 'constants',
          replacement: path.resolve(path.resolve(__dirname), 'src/constants'),
        },
      ],
    }),
    external(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-class-properties',
        '@babel/plugin-syntax-optional-chaining',
      ],
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
    }),
    includePaths({
      paths: ['src'],
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [
        'src/components/**/*.stories.tsx',
        'src/components/**/*.test.tsx',
        '**/__tests__/**',
        '**/tests/**',
        'src/utils/test.ts',
      ],
    }),
  ],
};
