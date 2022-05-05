const path = require('path');
const fs = require('fs');

module.exports = function(content) {
  this.cacheable && this.cacheable();

  const dir = path.dirname(this.resourcePath);
  const name = this.resourcePath.replace(/^.*[\\\/]/, '');

  const files = fs.readdirSync(dir).filter((fileName) => fileName !== name);

  this.value = content;

	return `module.exports = ${JSON.stringify(files)}`;
}
module.exports.seperable = true;