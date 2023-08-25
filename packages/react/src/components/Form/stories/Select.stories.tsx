import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Select from 'components/Form/Select';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Form.Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template : ComponentStory<typeof Select> = (args) => (
  <Select {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sizeInput: ComponentSizeEnum.medium,
  required: false,
  multiple: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  isBorderNone: false,
  isBackgroundReset: false,
};
