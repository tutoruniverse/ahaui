import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Label from 'components/Form/Label';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Form.Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template : ComponentStory<typeof Label> = (args) => (
  <Label {...args}>
    Label
  </Label>
);

export const Default = Template.bind({});
Default.args = {
  sizeLabel: ComponentSizeEnum.medium,
  required: false,
};
