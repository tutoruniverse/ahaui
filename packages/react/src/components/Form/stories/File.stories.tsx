import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import File from 'components/Form/File';

export default {
  title: 'Form.File',
  component: File,
} as ComponentMeta<typeof File>;

const Template : ComponentStory<typeof File> = (args) => (
  <File {...args} />
);

export const Default = Template.bind({});
