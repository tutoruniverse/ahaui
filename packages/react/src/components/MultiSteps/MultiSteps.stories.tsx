import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MultiSteps from 'components/MultiSteps';
import { DirectionEnum, VariantColorsEnum } from 'types/common';

export default {
  title: 'MultiSteps',
  component: MultiSteps,
  argTypes: {
    as: {
      control: 'text',
    },
    current: {
      control: { type: 'number', min: 0 },
    },
    ref: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', height: 400 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof MultiSteps>;

export const Default: ComponentStory<typeof MultiSteps> = (args) => (
  <div className="u-widthFull">
    <MultiSteps {...args} className="u-heightFull">
      <MultiSteps.Item title="Step 1" />
      <MultiSteps.Item title="Step 2" />
      <MultiSteps.Item title="Step 3" />
      <MultiSteps.Item title="Step 4" />
    </MultiSteps>
  </div>
);
Default.args = {
  direction: DirectionEnum.horizontal,
  current: 2,
  currentLabel: 'Current step',
  variant: VariantColorsEnum.primary,
};
