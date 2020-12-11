const ejs = require('ejs');
const fs = require('fs');
const ahaReactConfig = require('./config');

const templateFile = fs.readFileSync('redirect.ejs', 'utf-8');
const html = ejs.render(templateFile, { version: ahaReactConfig.version });
fs.writeFileSync('index.html', html);