import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip from 'components/Tooltip';
import { VariantColorsEnum, PlacementEnum } from 'types/common';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template : ComponentStory<typeof Tooltip> = (args) => (<Tooltip {...args} />);

export const Default = Template.bind({});
Default.args = {
  id: 'Tooltip',
  show: true,
  children: 'Tooltip',
  variant: VariantColorsEnum.black,
  noArrow: false,
  outOfBoundaries: false,
  placement: PlacementEnum.right,
};
