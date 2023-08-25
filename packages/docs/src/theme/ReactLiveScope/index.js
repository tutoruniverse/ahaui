import React from 'react';
import * as Aha from '@ahaui/react';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';
import Faker from 'faker';
// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...Aha,
  SplitPane,
  Faker,
  classNames,
};
export default ReactLiveScope;
