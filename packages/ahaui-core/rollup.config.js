import { globSync } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const pluginConfig = [
  nodeResolve(),
  commonjs(),
  typescript({
    declaration: true,
    declarationDir: "dist",
  }),
];

const treeShakeConfig = {
  external: ["react"],
  plugins: pluginConfig,
};

const inputConfig = {
  input: Object.fromEntries(
    globSync("src/**.tsx").map((file) => [
      path.relative(
        "src",
        file.slice(0, file.length - path.extname(file).length)
      ),
      fileURLToPath(new URL(file, import.meta.url)),
    ])
  ),
};

const indexConfig = {
  input: "src/index.tsx",
};

const outputConfig = {
  output: {
    dir: "dist",
    format: "cjs",
  },
};

export default [
  { ...treeShakeConfig, ...inputConfig, ...outputConfig },
  // { ...treeShakeConfig, ...indexConfig, ...outputConfig },
];
