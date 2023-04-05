import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip from '../components/Tooltip';
import Overlay from '../components/Overlay';

export default {
  title: 'Overlay',
  component: Overlay.Trigger,
} as ComponentMeta<typeof Overlay.Trigger>;

const Template: ComponentStory<typeof Overlay.Trigger> = (args) => (
  <Overlay.Trigger {...args}>
    <button type="button">Button</button>
  </Overlay.Trigger>
);

const overlayTooltip = (props: any) => (
  <Tooltip id="overlay-tooltip" {...props}>
    Tooltip Text
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  delay: 250,
  placement: 'top',
  trigger: ['hover', 'click', 'focus'],
  hoverOverlay: true,
  defaultShow: true,
  overlay: overlayTooltip,
};
