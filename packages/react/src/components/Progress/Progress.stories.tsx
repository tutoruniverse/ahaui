import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Progress, { ProgressVariantEnum } from 'components/Progress';

export default {
  title: 'Progress',
  component: Progress,
  argTypes: {
    label: {
      control: 'text',
    },
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
} as ComponentMeta<typeof Progress>;

const Template : ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const Default = Template.bind({});
Default.args = {
  labelClassName: 'u-text100 u-fontMedium',
  border: false,
  striped: false,
  animated: false,
  now: 100,
  height: 8,
  label: null,
  variant: ProgressVariantEnum.primary,
};
