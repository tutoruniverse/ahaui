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
  <a href="https://github.com/gotitinc/ahaui/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/gotitinc/ahaui/issues/new?template=feature_request.md">Request feature</a>
</p>

## Status
![npm](https://img.shields.io/npm/dt/@ahaui/react3)
![npm bundle size](https://img.shields.io/bundlephobia/min/@ahaui/react3?label=Size)
[![npm version](https://img.shields.io/npm/v/@ahaui/react3)](https://www.npmjs.com/package/@ahaui/react3)



## Quick start

### Installation

You have to install both `@ahaui/react3` and `@ahaui/css3`

```sh
# With npm
npm install @ahaui/react3 @ahaui/css3

# Or with yarn
yarn add @ahaui/react3 @ahaui/css3
```

### Usage

```jsx
import '@ahaui/css3/dist/index.min.css';
import React from 'react';
import { Button } from '@ahaui/react3';

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
import { AssetPlugin, Plugins, Logo } from '@ahaui/react3';

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

Further instruction could be found in [here](https://github.com/gotitinc/ahaui/tree/main/packages/css#custom).

## Copyright and License

AhaUI-React is licensed under the [Apache-2.0 License](https://github.com/gotitinc/ahaui/blob/main/LICENSE), sponsored and supported by [Got It, Inc.](https://www.got-it.co).
