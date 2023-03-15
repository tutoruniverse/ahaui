import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Item from 'components/Tab/Item';

export default {
  title: 'TabItem',
  component: Item,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Item>;

const ItemTemplate: ComponentStory<typeof Item> = (args) => (
  <Item {...args} />
);


export const TabItem = ItemTemplate.bind({});
TabItem.args = {
  children: (
    <div>Test</div>
  ),
};
