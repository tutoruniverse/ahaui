<p align="center">
  <a href="https://aha.got-it.ai">
    <img src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-trasparent.svg" alt="Aha logo" width="150" height="150">
  </a>
</p>

<h3 align="center">Aha Design System - CSS</h3>
<p align="center">
  Style tools for component-based UI development.
  <br>
  <a href="https://aha.got-it.ai"><strong>Explore Aha docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/gotitinc/aha-css/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/gotitinc/aha-css/issues/new?template=feature_request.md">Request feature</a>
</p>

## Status

[![CI](https://github.com/gotitinc/aha-css/workflows/Lint/badge.svg)](https://github.com/gotitinc/aha-css/actions) 
![npm bundle size](https://img.shields.io/bundlephobia/min/@ahaui/css?label=CSS) 
[![npm version](https://img.shields.io/npm/v/@ahaui/css)](https://www.npmjs.com/package/@ahaui/css) 
[![peerDependencies Status](https://img.shields.io/david/peer/gotitinc/aha-css)](https://david-dm.org/gotitinc/aha-css?type=peer) 
[![devDependency Status](https://img.shields.io/david/dev/gotitinc/aha-css)](https://david-dm.org/gotitinc/aha-css?type=dev) 

## Quick start

### Option 1: Via HTML tag
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ahaui/css/dist/index.min.css" />
```

### Option 2: Via node module
```sh
# With npm
npm install @ahaui/css

# Or with yarn
yarn add @ahaui/css
```

```js
/* In JS file */
import '@ahaui/css/index.min.css';
```

```css
/* Or in CSS file */
@import "@ahaui/css/index.min.css";
```

## Customization

After importing the Aha CSS file, you can override following CSS variables to make your custom theme:

```css
@import "@ahaui/css/index.min.css";

:root {
  --colorPrimary: #ff43ab;
}
```

Full customizable variables:

```css

:root {
  --colorPrimaryLighter: #e7ecfc;
  --colorPrimaryLight: #d7defa;
  --colorPrimary: #375de7;
  --colorFocusPrimary: #375de733;
  --colorPrimaryDark: #2c4ab8;
  --colorPrimaryDarker: #21388b;
  --colorAccentLighter: #fff1e8;
  --colorAccentLight: #fbdfcc;
  --colorAccent: #ed6200;
  --colorFocusAccent: #ed620033;
  --colorAccentDark: #d55800;
  --colorAccentDarker: #a64500;
  --colorNegativeLighter: #ffd2d8;
  --colorNegativeLight: #f6bcc3;
  --colorNegative: #d0021b;
  --colorFocusNegative: #d0021b33;
  --colorNegativeDark: #b50016;
  --colorNegativeDarker: #960012;
  --colorWarningLighter: #fdf4d0;
  --colorWarningLight: #fff0b3;
  --colorWarning100: #ffe380;
  --colorWarning: #ffc400;
  --colorFocusWarning: #ffc40033;
  --colorWarning300: #ffab00;
  --colorWarningDark: #ff991f;
  --colorPositiveLighter: #d7f9e7;
  --colorPositiveLight: #aceccb;
  --colorPositive: #22a861;
  --colorFocusPositive: #22a86133;
  --colorPositiveDark: #019044;
  --colorPositiveDarker: #017a3a;
  --colorInformationLighter: #e7ecfc;
  --colorInformationLight: #d7defa;
  --colorInformation: #375de7;
  --colorFocusInformation: #375de733;
  --colorInformationDark: #2c4ab8;
  --colorInformationDarker: #21388b;
  --fontFamily: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
  --fontRegular: 400;
  --fontMedium: 500;
  --fontBold: 700;
  --radiusSmall: 2px;
  --radiusMedium: 4px;
  --radiusLarge: 8px;
  --radiusExtraLarge: 16px;
}
```

**NOTE:** Overriding utility CSS classes is possible, but not recommended.

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```text
@ahaui/css/
└── dist/
    ├── index.css
    ├── index.css.map
    ├── index.min.css
    ├── utilities.css
    ├── utilities.css.map
    └── utilities.min.css
```

## Browser support

* Google Chrome (latest)
* Microsoft Edge (latest)
* Opera (latest)
* Firefox 4+
* Safari 7+

## Copyright and license

Code and documentation copyright 2020 the [Got It, Inc.](https://www.got-it.ai) Code released under the [Apache-2.0 License](https://github.com/gotitinc/aha-css/blob/master/LICENSE).
