// Rollup plugins
import path from 'path';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import includePaths from 'rollup-plugin-includepaths';
import pkg from './package.json';
import external from 'rollup-plugin-node-externals';

export default {
  input: 'src/index.js',
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
    }),
    includePaths({
      paths: ['src'],
      extensions: ['.js', '.jsx'],
    }),
  ],
};
