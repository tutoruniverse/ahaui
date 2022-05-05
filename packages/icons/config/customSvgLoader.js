const parser = require('svg-parser');

module.exports = function(content) {
	this.cacheable && this.cacheable();

  const parsedSvg = parser.parse(content);

  const findPathNode = (node) => {
    if (node.tagName === 'path') {
      return node;
    }
    if (node.children) {
      const fromChildren = node.children.reduce((finalResult, currentChild) => {
        if (finalResult) return finalResult;
        return findPathNode(currentChild);
      }, null);
      if (fromChildren) return fromChildren;
    }
    return null;
  }

  const pathNode = findPathNode(parsedSvg);
  if (pathNode && pathNode.properties && pathNode.properties.d) {
    content = pathNode.properties.d;
  }

  this.value = content;

	return `module.exports = ${JSON.stringify(content)}`;
}
module.exports.seperable = true;