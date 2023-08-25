import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Group from 'components/Form/Group';
import Input from 'components/Form/Input';
import Label from 'components/Form/Label';
import Feedback from 'components/Form/Feedback';

export default {
  title: 'Form.Feedback',
  component: Feedback,
  argTypes: {
    as: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Feedback>;

const ValidFeedback: ComponentStory<typeof Feedback> = (args) => (
  <Group {...args}>
    <Label>Label</Label>
    <Input value="" isValid />
    <Feedback {...args}>Valid</Feedback>
  </Group>
);

const InvalidFeedback: ComponentStory<typeof Feedback> = (args) => (
  <Group {...args}>
    <Label>Label</Label>
    <Input value="" isInvalid />
    <Feedback type="invalid" {...args}>Invalid</Feedback>
  </Group>
);

const Template: ComponentStory<typeof Feedback> = (args) => (
  <Feedback {...args}>Visible test</Feedback>
);

export const Valid = ValidFeedback.bind({});
export const Invalid = InvalidFeedback.bind({});
export const Default = Template.bind({});
