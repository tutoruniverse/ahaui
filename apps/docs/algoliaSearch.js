const _ = require('lodash');
const ahaReactConfig = require('./config');

const allQuery = `{
  allQuery: allMdx(filter: {fileAbsolutePath: {regex: "pages/"}}) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
        }
        tocDepth2: headings(depth: h2) {
          value
        }
        tocDepth3: headings(depth: h3) {
          value
        }
        description:excerpt
        parent {
          ... on File {
            relativePath
            ext
          }
        }
      }
    }
  }
}`;

const flatten = arr => arr.map(({ node: { frontmatter, description, parent, tocDepth2, tocDepth3, ...rest } }) => {
  const titleRelative = frontmatter.title;
  const relativePath = parent.relativePath.replace(parent.ext, '');
  const tocDepth2Relative = _.map(tocDepth2, _.iteratee('value'));
  const tocDepth3Relative = _.map(tocDepth3, _.iteratee('value'));
  return ({
    title: titleRelative,
    tocDepth2: tocDepth2Relative,
    tocDepth3: tocDepth3Relative,
    description,
    path: relativePath,
    ...rest,
  });
});
const settings = { attributesToSnippet: ['excerpt:20'] };
const algoliaSearch = [
  {
    query: allQuery,
    transformer: ({ data }) => flatten(data.allQuery.edges),
    indexName: ahaReactConfig.version,
    settings,
  },
];


module.exports = algoliaSearch;
