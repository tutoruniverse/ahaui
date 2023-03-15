import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tag from '../components/Tag';

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Tag>;

const Template : ComponentStory<typeof Tag> = (args) => (
  <Tag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: ['Test'],
};
