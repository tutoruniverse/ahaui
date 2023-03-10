import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Toggle from '../components/Toggle';

export default {
  title: 'Toggle',
  component: Toggle,
  argTypes: {},
} as ComponentMeta<typeof Toggle>;

const Template : ComponentStory<typeof Toggle> = (args) => (
  <Toggle {...args}>Hello</Toggle>
);

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  nonLabel: false,
  textLabelOn: 'On',
  textLabelOff: 'Off',
  ariaLabel: 'Toggle',
};
