import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tag from 'components/Tag';
import { VariantColorsEnum } from 'types/common';

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {
    as: { control: 'text' },
    textClassName: { control: 'text' },
  },
} as ComponentMeta<typeof Tag>;

const Template : ComponentStory<typeof Tag> = (args) => (
  <Tag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: ['Test'],
  variant: VariantColorsEnum.primary,
  textClassName: 'u-fontBold',
};
