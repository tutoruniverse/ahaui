import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Check, { CheckTypeEnum } from 'components/Form/Check';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Form.Check',
  component: Check,
} as ComponentMeta<typeof Check>;

const Template : ComponentStory<typeof Check> = (args) => (
  <Check {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Check',
  type: CheckTypeEnum.checkbox,
  isInvalid: false,
  isValid: false,
  inline: false,
  sizeInput: ComponentSizeEnum.medium,
  disabled: false,
};
