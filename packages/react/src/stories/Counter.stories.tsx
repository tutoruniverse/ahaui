import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Counter from 'components/Counter';
import { IconNameEnum } from 'components/Icon';
import { CounterVariantEnum as VariantEnum } from 'types/common';

export default {
  title: 'Counter',
  component: Counter,
  argTypes: {
    variant: {
      options: Object.values(VariantEnum),
      control: { type: 'select' },
      defaultValue: VariantEnum.secondary,
    },
    iconLeft: {
      options: Object.values(IconNameEnum),
      control: { type: 'select' },
      defaultValue: IconNameEnum.time,
    },
    label: {
      control: 'text',
    },
    number: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Counter>;

const Template : ComponentStory<typeof Counter> = (args) => (
  <Counter {...args} />
);

export const MyCounter = Template.bind({});
MyCounter.args = {
};
