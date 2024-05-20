import { colors, palette } from './colors.mjs'
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import fs from 'fs';
import sizing from './sizing.json' assert { type: "json" };
import borders from './borders.json' assert { type: "json" };
import typography from './typography.json' assert { type: "json" };


const tokens = {
  ...sizing,
  ...borders,
  ...typography,
}

console.log(tokens);

function generateVars(source, prefix, reference) {
  return Object.keys(source).reduce((acc, key) => {
    // If the reference object not provided, just use the key as the value
    if (!reference) {
      acc[`${prefix}${key}`] = source[key];
      return acc;
    }
    const refKey = Object.keys(reference).find(refKey => reference[refKey] === source[key]);
    acc[`${prefix}${key}`] = refKey ? `var(--${prefix}${refKey})` : source[key];
    return acc;
  }, {});
}

const cssVars = {
  ...generateVars(palette, '_aha-colors-palette-'),
  ...generateVars(colors, '_aha-colors-', palette),
};

const jsonVars = {
  ...generateVars(palette, '', palette),
  ...generateVars(colors, '', palette),
};

export const cssVarsString = `:root {
  ${Object.keys(cssVars).map(key => `${key}: ${cssVars[key]};`).join('\n  ')}
}`;

async function writeCssVarsFile() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const distPath = path.resolve(__dirname, '../dist');
  const cssTokensPath = path.resolve(distPath, 'tokens.css');
  const jsTokensPath = path.resolve(distPath, 'tokens.js');

  // Ensure the dist directory exists
  try {
    fs.mkdirSync(distPath, { recursive: true });
  } catch (error) {
    console.error(`Failed to create dist directory:`, error);
  }

  // Write the CSS tokens to a file
  try {
    fs.writeFileSync(cssTokensPath, cssVarsString);
    console.log(`Wrote CSS tokens to ${cssTokensPath}`);
  } catch (error) {
    console.error(`Failed to write to ${cssTokensPath}:`, error);
  }
  // Write the JS tokens to a file
  try {
    fs.writeFileSync(jsTokensPath, `export default ${JSON.stringify(jsonVars, null, 2)}`);
    console.log(`Wrote JS tokens to ${jsTokensPath}`);
  } catch (error) {
    console.error(`Failed to write to ${jsTokensPath}:`, error);
  }
}

await writeCssVarsFile();
