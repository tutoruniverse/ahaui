import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BubbleChatImage from './Image';

export default {
  title: 'BubbleChatImage',
  component: BubbleChatImage,
  argTypes: {},
} as ComponentMeta<typeof BubbleChatImage>;

const Template : ComponentStory<typeof BubbleChatImage> = (args) => (
  <BubbleChatImage
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg',
  className: 'u-flex',
};
