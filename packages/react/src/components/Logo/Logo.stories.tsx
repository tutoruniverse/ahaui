import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Logo from 'components/Logo';

export default {
  title: 'Logo',
  component: Logo,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Logo>;

const Template : ComponentStory<typeof Logo> = (args) => (
  <Logo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-with-text.svg',
};
