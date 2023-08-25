import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Item from 'components/Tab/Item';
import { DirectionEnum } from 'types/common';

export default {
  title: 'TabItem',
  component: Item,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Item>;

const Template: ComponentStory<typeof Item> = (args) => (
  <Item {...args}>
    <span>Test</span>
  </Item>
);


export const Default = Template.bind({});
Default.args = {
  disabled: false,
  index: 0,
  direction: DirectionEnum.horizontal,
  visual: 'default',
  fullWidth: false,
};
