const path = require("path");
const config = require("./config");

const stringifiedConfig = Object.entries(config).reduce(
  (acc, [key, value]) => ({ ...acc, [key]: JSON.stringify(value) }),
  {}
);

exports.onCreateWebpackConfig = function onCreateWebpackConfig({
  actions,
  plugins,
  loaders,
  stage,
  getConfig,
}) {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
    devtool: stage.includes("develop")
      ? "inline-module-source-map"
      : "source-map",
    module: {
      rules: [
        {
          include: path.resolve(__dirname, "src/examples"),
          use: loaders.raw(),
        },
      ],
    },
    resolve: {
      symlinks: false,
      alias: {
        react: path.resolve(__dirname, "../../node_modules/react"),
        "react-dom": path.resolve(__dirname, "../../node_modules/react-dom"),
        "@ahaui/react3": path.resolve(__dirname, "../../packages/react/src/"),
        "@ahaui/css3": path.resolve(__dirname, "../../packages/css/"),
        src: path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      // See https://github.com/FormidableLabs/react-live/issues/5
      plugins.ignore(/^(xor|props)$/),
      plugins.define({
        config: stringifiedConfig,
      }),
    ],
  });

  // eslint-disable-next-line no-param-reassign
  getConfig().resolve.modules = ["node_modules"];
};
