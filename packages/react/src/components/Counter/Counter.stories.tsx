import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Counter, { CounterVariantEnum } from 'components/Counter';
import { IconNameEnum } from 'components/Icon';

export default {
  title: 'Counter',
  component: Counter,
  argTypes: {
    iconLeft: {
      options: Object.values(IconNameEnum),
      control: { type: 'select' },
      defaultValue: IconNameEnum.time,
    },
    label: {
      control: 'text',
    },
    number: {
      control: 'number',
      defaultValue: 1,
      min: 1,
    },
  },
} as ComponentMeta<typeof Counter>;

const Template : ComponentStory<typeof Counter> = (args) => (
  <Counter {...args} />
);

export const Default = Template.bind({});
Default.args = {
  variant: CounterVariantEnum.secondary,
  label: 'Counter',
};
