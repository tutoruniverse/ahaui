import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Icon, { IconNameEnum } from 'components/Icon';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template : ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: IconNameEnum.cloud,
  size: ComponentSizeEnum.huge,
};
