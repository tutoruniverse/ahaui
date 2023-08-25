import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Group from 'components/Form/Group';
import Input from 'components/Form/Input';
import Label from 'components/Form/Label';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Form.Group',
  component: Group,
  argTypes: {
    as: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Group>;

const Template : ComponentStory<typeof Group> = (args) => (
  <Group {...args}>
    <Label>Label</Label>
    <Input value="" />
  </Group>
);

export const Default = Template.bind({});
Default.args = {
  sizeControl: ComponentSizeEnum.medium,
  disabledControl: false,
  requiredControl: false,
};
