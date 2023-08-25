// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();
const path = require("path");

const lightCodeTheme = require("prism-react-renderer/themes/vsLight");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

const componentPath = path.join(
  __dirname,
  "../react/src/components/**/*.tsx"
);
const tsconfigPath = path.join(__dirname, "../react/tsconfig.json");
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Aha Design System",
  tagline: "Aha Design System | Documentation",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  url: "http://localhost:3000",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "botitai", // Usually your GitHub org/user name.
  projectName: "querychat_ai_frontend", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "docusaurus-plugin-react-docgen-typescript",
      /** @type {import('docusaurus-plugin-react-docgen-typescript').Options} */
      {
        // pass in a single string or an array of strings
        src: componentPath,
        tsConfig: tsconfigPath,
        parserOptions: {
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes("@types/react");
            }

            return !/@types[\\/]react[\\/]/.test(prop.parent?.fileName || "");
          },
          shouldRemoveUndefinedFromOptional: true,
          savePropValueAsString: true,
          shouldExtractValuesFromUnion: true,
        },
        getFileName: (component) => {
          const files = component.filePath
            .split("react/src/components/")[1]
            .split(".")[0]
            .split("/")
            .filter((s) => s !== "index");

          if (files.length > 1) {
            return files.slice(0, -1).join("/") + component.displayName;
          }

          return null;
        },
      },
    ],
    "docusaurus-plugin-sass",
    () => ({
      name: "custom-raw-loader",
      configureWebpack() {
        return {
          module: {
            rules: [
              {
                test: /.\/examples\/.+(j|t)s$/,
                use: 'raw-loader'
              },
            ],
          },
        };
      },
    }),
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/caseykhuc/ahaui-docs",
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.scss")],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/ahaui-logo-with-text.svg",
      navbar: {
        title: "Aha Design System",
        logo: {
          alt: "Aha Design System Logo",
          src: "img/ahaui-logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/botitai/querychat_ai_frontend",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting started",
                to: "/docs/getting-started/introduction/",
              },
              {
                label: "What's new",
                to: "/docs/release-notes/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/gotitinc/ahaui",
              },
              {
                label: "Slack",
                href: "https://ahaui.slack.com/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Got It, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: process.env.SEARCH_KEY
        ? {
            apiKey: process.env.SEARCH_KEY,
            indexName: process.env.INDEX_NAME,
            contextualSearch: true,
            placeholder: "Search in my Aha docs website",
            appId: process.env.APPLICATION_ID,
          }
        : undefined,
    }),
  staticDirectories: ["public", "assets", "static"],
};

module.exports = config;
