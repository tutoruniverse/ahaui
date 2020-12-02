const { cleanDoclets } = require('gatsby-transformer-react-docgen/doclets');
const path = require('path');
const remarkSlug = require('remark-slug');
const queries = require('./src/utils/algolia');
const defaultDescriptions = require('./src/defaultPropDescriptions');

const activeEnv = process.env.ENV || 'dev';
console.log(`Using environment config: '${activeEnv}'`);
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  siteMetadata: {
    title: 'GotIt, Inc. Design System Documentation',
    description: 'An ever-evolving system that enables us to build higher quality products more efficiently',
    author: 'GotIt, Inc. contributors',
    browsers: [
      'last 4 Chrome versions',
      'last 4 Firefox versions',
      'last 2 Edge versions',
      'last 2 Safari versions',
    ],
  },
  plugins: [
    'gatsby-plugin-sorted-assets',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/layouts/ApiLayout'),
        },
        remarkPlugins: [remarkSlug],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, './aha-react/src'),
        name: 'source',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, './src/pages'),
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, './aha-react/CHANGELOG.md'),
        name: 'CHANGELOG',
      },
    },
    {
      resolve: 'gatsby-transformer-react-docgen',
      options: {
        resolver: require('./resolveHocComponents'),
        handlers: [
          function defaultDescriptionsHandler(docs) {
            docs._props.forEach((_, name) => {
              if (defaultDescriptions[name]) {
                const prop = docs.getPropDescriptor(name);
                const dflt = defaultDescriptions[name];

                if (dflt && !cleanDoclets(prop.description)) { prop.description = `${dflt}\n${prop.description}`; }
              }
            });
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          }],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-astroturf',
      options: { extension: '.module.scss' },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
  ],
};
