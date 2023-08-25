import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SafeAnchor from 'components/SafeAnchor';

export default {
  title: 'SafeAnchor',
  component: SafeAnchor,
} as ComponentMeta<typeof SafeAnchor>;

const Template: ComponentStory<typeof SafeAnchor> = (args) => (
  <SafeAnchor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'To aha',
  href: 'https://aha.got-it.ai/2/',
};

// eslint-disable-next-line no-alert
export const AsButton = Template.bind({});
AsButton.args = {
  children: 'Click',
  as: 'button',
  onClick: () => {
    // eslint-disable-next-line no-alert
    alert('Click');
  },
};
