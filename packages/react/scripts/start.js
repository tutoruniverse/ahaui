'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

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
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const paths = require('../config/paths');
const esConfig = require('../config/webpack.config.es');
const libConfig = require('../config/webpack.config.lib');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1);
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuildES)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuildES);
    // Start the webpack build
    return build(previousFileSizes, esConfig, 'es');
  });

measureFileSizesBeforeBuild(paths.appBuildLib)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuildLib);
    // Start the webpack build
    return build(previousFileSizes, libConfig, 'lib');
  });

// Create the production build and print the deployment instructions.
function build(previousFileSizes, config, moduleName) {
  let compiler = webpack(config);

  compiler.watch({
    aggregateTimeout: 300, // wait so long for more changes
    poll: false // use polling instead of native watchers
  }, (err, stats) => {
    if (err) {
      console.error(err);
    }

    console.log(`============================== ${chalk.green(moduleName)} ==============================`);

    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }));

    console.log('');
    console.log('');
  });
}
