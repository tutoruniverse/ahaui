import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Skeleton, { SkeletonVariantEnum } from 'components/Skeleton';

export default {
  title: 'Skeleton',
  component: Skeleton,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Skeleton>;

const Template : ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  variant: SkeletonVariantEnum.text,
  duration: 1000,
};
