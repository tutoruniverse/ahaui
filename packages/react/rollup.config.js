// Rollup plugins
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import includePaths from 'rollup-plugin-includepaths';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-node-externals';
import pkg from './package.json';

// const external = [
//   ...Object.keys(pkg.dependencies || {}),
//   ...Object.keys(pkg.peerDependencies || {}),
//   'lodash.once',
//   'add-dom-event-listener',
//   'babel-runtime/helpers/extends',
//   'babel-runtime/helpers/inherits',
//   'babel-runtime/helpers/classCallCheck',
//   'babel-runtime/helpers/createClass',
//   'babel-runtime/helpers/possibleConstructorReturn',
//   'babel-runtime/helpers/typeof',
//   'component-classes',
//   'babel-runtime/helpers/defineProperty',
//   'babel-runtime/helpers/objectWithoutProperties',
// ];

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
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
    resolve(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-class-properties',
        '@babel/plugin-syntax-optional-chaining',
      ],
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    includePaths({
      paths: ['src'],
      extensions: ['.js', '.jsx'],
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ],
};
