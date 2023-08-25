module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:@docusaurus/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/no-unresolved": [
      2,
      {
        ignore: ["^@theme", "^@docusaurus", "^@site"],
      },
    ],
    "no-shadow": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx", ".tsx"],
      },
    ],
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "react/function-component-definition": 0,
    "import/extensions": 0,
    "@typescript-eslint/ban-ts-comment": 1,
  },
};
