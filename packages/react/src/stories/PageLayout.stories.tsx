import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PageLayoutHeader from 'components/PageLayout/Header';
import PageLayoutBody from 'components/PageLayout/Body';
import PageLayoutFooter from 'components/PageLayout/Footer';
import PageLayout from '../components/PageLayout';

export default {
  title: 'PageLayout',
  component: PageLayout,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof PageLayout>;

const Template : ComponentStory<typeof PageLayout> = (args) => (
  <PageLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <PageLayoutHeader>Header</PageLayoutHeader>
      <PageLayoutBody>Body</PageLayoutBody>
      <PageLayoutFooter>Footer</PageLayoutFooter>
    </>
  ),
};
