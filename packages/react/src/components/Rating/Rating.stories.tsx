import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Rating, RatingSize } from 'components/Rating';

export default {
  title: 'Rating',
  component: Rating,
  argTypes: {
    size: {
      options: Object.values(RatingSize),
      control: { type: 'radio' },
    },
    value: {
      control: {
        type: 'number',
        min: 0,
      },
    },
    max: {
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
    },
  },
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = (args) => {
  const { value } = args;
  const [rate, setRate] = useState(value);

  const onChange = (_: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<HTMLInputElement>, newRate: number) => {
    setRate(newRate);
  };

  return (
    <Rating
      {...args}
      value={rate}
      onChange={onChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  readOnly: false,
  precision: 1,
  value: 0,
  size: RatingSize.medium,
  max: 5,
};
