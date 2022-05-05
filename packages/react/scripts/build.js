'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');


const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');
const paths = require('../config/paths');
const esConfig = require('../config/webpack.config.es');
const libConfig = require('../config/webpack.config.lib');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1);
}

// Create the production build and print the deployment instructions.
function build(previousFileSizes, config) {
  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
        config
      });
    });
  });
}

const measureAndBuild = (outputPath, configs) => {
  // First, read the current file sizes in build directory.
// This lets us display how much they changed later.
  return measureFileSizesBeforeBuild(outputPath)
    .then(previousFileSizes => {
      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(outputPath);
      // Start the webpack build

      const promises = [];

      configs.forEach(config => {
        promises.push(build(previousFileSizes, config));
      });

      // return Promise.all([configs.map(config => build(previousFileSizes, config))]);
      return Promise.all(promises);
    })
    .then(
      (result) => {
        result.forEach(({ stats, previousFileSizes, warnings, config }) => {
          if (warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.\n'));
            console.log(warnings.join('\n\n'));
            console.log(
              '\nSearch for the ' +
              chalk.underline(chalk.yellow('keywords')) +
              ' to learn more about each warning.'
            );
            console.log(
              'To ignore, add ' +
              chalk.cyan('// eslint-disable-next-line') +
              ' to the line before.\n'
            );
          } else {
            printFileSizesAfterBuild(
              stats,
              previousFileSizes,
              config.output.path,
              WARN_AFTER_BUNDLE_GZIP_SIZE,
              WARN_AFTER_CHUNK_GZIP_SIZE
            );
            console.log();
          }
          fs.copySync(paths.appSrc + '/index.d.ts', config.output.path + '/index.d.ts');
        })
      },
      err => {
        console.log(chalk.red('Failed to compile.\n'));
        printBuildError(err);
        process.exit(1);
      }
    )
}

console.log(chalk.gray('----------------------------------------------------------------------------------'));
console.log('Creating an optimized production build for', chalk.cyan(require(paths.appPackageJson).name, '\n'));
console.log('File sizes after gzip:\n');
Promise.all([
  measureAndBuild(esConfig.output.path, [esConfig]),
  measureAndBuild(libConfig.output.path, [libConfig]),
])
  .then(() => {
    console.log(chalk.green('\nCompiled successfully.'));
    console.log(chalk.gray('----------------------------------------------------------------------------------'));
  })
