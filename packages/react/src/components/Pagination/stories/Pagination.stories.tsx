import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Pagination from 'components/Pagination';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Pagination',
  component: Pagination,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args}>
    <Pagination.Prev disabled />
    <Pagination.Item active>
      1
    </Pagination.Item>
    <Pagination.Next />
  </Pagination>
);

export const Default = Template.bind({});
Default.args = {
  sizeControl: ComponentSizeEnum.small,
};
