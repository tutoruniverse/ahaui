'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appBuildES:  resolveApp('es'),
  appBuildLib:  resolveApp('lib'),
  appIndexJs: resolveApp('src/index.js'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  customSvgLoaderJs: resolveApp('config/customSvgLoader.js'),
  fileListLoaderJs: resolveApp('config/fileListLoader.js'),
};
