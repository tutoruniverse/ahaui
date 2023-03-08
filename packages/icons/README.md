<p align="center">
  <a href="https://aha.got-it.ai">
    <img src="https://raw.githubusercontent.com/gotitinc/ahaui/main/libs/assets/origin/ahaui-logo-trasparent.svg" alt="Aha logo" width="150" height="150">
  </a>
</p>

<h3 align="center">Aha Design System - Icons</h3>
<p align="center">
  Collection of SVG icons for building web applications.
  <br>
  <a href="https://ahaui.github.io"><strong>Explore Aha docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/gotitinc/ahaui/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/gotitinc/ahaui/issues/new?template=feature_request.md">Request feature</a>
</p>

## Status
![npm](https://img.shields.io/npm/dt/@ahaui/icons)
![npm bundle size](https://img.shields.io/bundlephobia/min/@ahaui/icons?label=Size)
[![npm version](https://img.shields.io/npm/v/@ahaui/icons)](https://www.npmjs.com/package/@ahaui/icons)

## Quick start

### Installation

```sh
# With npm
npm install @ahaui/icons

# Or with yarn
yarn add @ahaui/icons
```

### Usage

With `@ahaui/react`

```jsx
import React from 'react';
import { Plugins, Icon } from '@ahaui/react';
import { createIconAssetsPlugin } from '@ahaui/icons';

const IconAssetsPlugin = createIconAssetsPlugin();

Plugins.loadPlugin(IconAssetsPlugin);

function ExampleIcon() {
  return (
    <Icon name="contact">
  );
}
```

With pure React component

```jsx
import React from 'react';
import { Icons } from '@ahaui/icons';

function ExampleIcon() {
  return (
    <svg
      width="24px"
      width="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d={Icons[0].path} fill="#000000" />
    </svg>
  );
}
```

## Copyright and License

AhaUI-Icons is licensed under the [Apache-2.0 License](https://github.com/gotitinc/ahaui/blob/main/LICENSE), sponsored and supported by [Got It, Inc.](https://www.got-it.co).
