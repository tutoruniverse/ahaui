import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmptyState from 'components/EmptyState';

export default {
  title: 'EmptyState',
  component: EmptyState,
  argTypes: {
    as: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof EmptyState>;

const Template : ComponentStory<typeof EmptyState> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <EmptyState {...args}>
      <EmptyState.Heading>
        General empty
      </EmptyState.Heading>
      <EmptyState.Description>
        Nothing to show.
      </EmptyState.Description>
    </EmptyState>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg',
};
