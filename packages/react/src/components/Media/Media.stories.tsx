import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Media, { AspectRatioEnum } from 'components/Media';

export default {
  title: 'Media',
  component: Media,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Media>;

const Template : ComponentStory<typeof Media> = (args) => (
  <Media {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  aspectRatio: AspectRatioEnum.wide,
};
