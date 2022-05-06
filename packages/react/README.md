<p align="center">
  <a href="https://aha.got-it.ai">
    <img src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-trasparent.svg" alt="Aha logo" width="150" height="150">
  </a>
</p>

<h3 align="center">Aha Design System - React</h3>
<p align="center">
  Collection of React Components for building web applications.
  <br>
  <a href="https://aha.got-it.ai"><strong>Explore Aha docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/gotitinc/aha-react/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/gotitinc/aha-react/issues/new?template=feature_request.md">Request feature</a>
</p>

## Status

[![CI](https://github.com/gotitinc/aha-react/workflows/Lint/badge.svg)](https://github.com/gotitinc/aha-react/actions)
![npm bundle size](https://img.shields.io/bundlephobia/min/@ahaui/react)
[![npm version](https://img.shields.io/npm/v/@ahaui/react)](https://www.npmjs.com/package/@ahaui/react)
[![dependencies Status](https://img.shields.io/david/gotitinc/aha-react)](https://david-dm.org/gotitinc/aha-react?type=peer)
[![peerDependencies Status](https://img.shields.io/david/peer/gotitinc/aha-react)](https://david-dm.org/gotitinc/aha-react?type=peer)
[![devDependency Status](https://img.shields.io/david/dev/gotitinc/aha-react)](https://david-dm.org/gotitinc/aha-react?type=dev)

## Quick start

### Installation

You have to install both `@ahaui/react` and `@ahaui/css`

```sh
# With npm
npm install @ahaui/react @ahaui/css

# Or with yarn
yarn add @ahaui/react @ahaui/css
```

### Usage

```jsx
import '@ahaui/css/dist/index.min.css';
import React from 'react';
import { Button } from '@ahaui/react';

function Example() {
    const onButtonClick = () => {
        alert('Aha!');
    };

    return <Button onClick={onButtonClick}>Click me!</Button>;
}
```

**Aha!** Just simple as that!

## Customization

### Plugins

You can customize specific Aha React Components via plugins!

For now, to provide your custom assets to [Logo](./src/components/Logo/index.js), [Avatar](./src/components/Avatar/index.js), [EmptyState](./src/components/Logo/index.js), you can use [AssetPlugin](./src/plugins/AssetPlugin.js).

```jsx
import { AssetPlugin, Plugins, Logo } from '@ahaui/react';

const LogoAssetsPlugin = new AssetPlugin({
    prefix: 'logo',
    assets: {
        mylogo: require('./assets/images/logo/my-logo.svg').default,
        foobar: 'https://foo.bar/image.jpg',
    },
});

Plugins.loadPlugin(LogoAssetsPlugin);

function Example() {
    return <Logo name="mylogo" />;
}
```

Various types of plugin will be developed in the future, stay tune!

Plugins could also be published standalone as a npm package (follow the template [here](https://github.com/gotitinc/aha-plugin-example)).

### Custom CSS

Further instruction could be found in [here](https://github.com/gotitinc/aha-css#custom).

## Copyright and License

Code and documentation copyright 2020 the [Got It, Inc.](https://www.got-it.ai) Code released under the [Apache-2.0 License](https://github.com/gotitinc/aha-react/blob/master/LICENSE).
