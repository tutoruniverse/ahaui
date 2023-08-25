import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import FileAttachment from '.';

export default {
  title: 'FileAttachment',
  component: FileAttachment,
  argTypes: {
    fileTypeLabel: {
      control: 'text',
    },
    actionLeft: {
      control: 'text',
    },
    actionRight: {
      control: 'text',
    },
    transition: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof FileAttachment>;

const Template : ComponentStory<typeof FileAttachment> = (args) => (
  <FileAttachment
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  show: true,
  fileType: 'image',
};
