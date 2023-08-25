import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Pagination from 'components/Pagination';

export default {
  title: 'Pagination.Item',
  component: Pagination.Item,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination.Item> = (args) => (
  <Pagination.Item {...args}>
    1
  </Pagination.Item>
);

export const Default = Template.bind({});
Default.args = {
  active: false,
  disabled: false,
  safeItem: false,
};
