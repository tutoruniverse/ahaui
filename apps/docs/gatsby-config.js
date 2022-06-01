const { cleanDoclets } = require("gatsby-transformer-react-docgen/doclets");
const path = require("path");
const remarkSlug = require("remark-slug");
const defaultDescriptions = require("./src/defaultPropDescriptions");
const algoliaSearch = require("./algoliaSearch");
const ahaReactConfig = require("./config");

const activeEnv = process.env.ENV || "dev";
console.log(`Using environment config: '${activeEnv}'`);
require("dotenv").config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  siteMetadata: {
    title: "Aha Design System - Documentation",
    description:
      "An ever-evolving system that enables us to build higher quality products more efficiently",
    author: "GotIt, Inc. contributors",
    browsers: [
      "last 4 Chrome versions",
      "last 4 Firefox versions",
      "last 2 Edge versions",
      "last 2 Safari versions",
    ],
  },
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
    FAST_DEV: true,
  },
  pathPrefix: ahaReactConfig.version.split(".")[0],
  plugins: [
    "gatsby-plugin-sorted-assets",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/layouts/ApiLayout"),
        },
        remarkPlugins: [remarkSlug],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.resolve(__dirname, "../../packages/react/src/"),
        name: "source",
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        utils: path.resolve(__dirname, "../../packages/react/src/utils/"),
        components: path.resolve(
          __dirname,
          "../../packages/react/src/components/"
        ),
        hooks: path.resolve(__dirname, "../../packages/react/src/hooks/"),
        constants: path.resolve(
          __dirname,
          "../../packages/react/src/constants/"
        ),
        "react-dom": path.resolve(__dirname, "../../node_modules/react-dom"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.resolve(__dirname, "./src/pages"),
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.resolve(__dirname, "../../packages/react/CHANGELOG.md"),
        name: "CHANGELOG",
      },
    },
    {
      resolve: "gatsby-transformer-react-docgen",
      options: {
        resolver: require("./resolveHocComponents"),
        handlers: [
          function defaultDescriptionsHandler(docs) {
            docs._props.forEach((_, name) => {
              if (defaultDescriptions[name]) {
                const prop = docs.getPropDescriptor(name);
                const dflt = defaultDescriptions[name];

                if (dflt && !cleanDoclets(prop.description)) {
                  prop.description = `${dflt}\n${prop.description}`;
                }
              }
            });
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-prismjs",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "var(--colorPrimary)",
        showSpinner: false,
      },
    },
    {
      resolve: "gatsby-plugin-algolia",
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
        indexName: ahaReactConfig.version,
        queries: algoliaSearch,
        chunkSize: 10000,
      },
    },
  ],
};
