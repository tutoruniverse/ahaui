import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Badge from 'components/Badge';

export default {
  title: 'Badge',
  component: Badge,
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span', 'h1', 'header'],
    },
    ref: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Badge>;

const Template : ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Primary',
  variant: 'primary',
  textClassName: 'u-textAccent',
};
