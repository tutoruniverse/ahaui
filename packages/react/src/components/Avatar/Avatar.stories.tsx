import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Avatar, { AvatarSizeEnum } from 'components/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    className: {
      control: 'text',
    },
    as: {
      options: ['div', 'span', 'p', 'h1'],
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template : ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  size: AvatarSizeEnum.medium,
  alt: 'Avatar',
  src: 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/uifaces/m-20.jpg',
};
