import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input, { InputTypeEnum } from 'components/Form/Input';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Form.Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template : ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sizeInput: ComponentSizeEnum.medium,
  required: false,
  type: InputTypeEnum.text,
  disabled: false,
  isValid: false,
  isInvalid: false,
  isWarning: false,
  isBorderNone: false,
  isBackgroundReset: false,
};
