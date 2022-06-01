const ejs = require('ejs');
const fs = require('fs');
const ahaReactConfig = require('./config');

const templateFile = fs.readFileSync('redirect.ejs', 'utf-8');
const html = ejs.render(templateFile, { version: ahaReactConfig.version.split('.')[0] });
try {
  fs.mkdirSync('gh-pages-root');
} catch(e) {
  //ignore
}
fs.writeFileSync('gh-pages-root/index.html', html);
