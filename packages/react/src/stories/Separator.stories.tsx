import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Separator from '../components/Separator';

export default {
  title: 'Separator',
  component: Separator,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Separator>;

const Template : ComponentStory<typeof Separator> = (args) => (
  <Separator {...args} />
);

export const Default = Template.bind({});
Default.args = {};
