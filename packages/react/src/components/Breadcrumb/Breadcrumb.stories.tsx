import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Breadcrumb from 'components/Breadcrumb';

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const href1 = 'https://github.com/';
const href2 = 'https://google.com';

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);

export const Default = Template.bind({});
Default.args = {
  schema: true,
  children: [
    <Breadcrumb.Item href={href1}>Item 1</Breadcrumb.Item>,
    <Breadcrumb.Item href={href2}>Item 2</Breadcrumb.Item>,
  ],
};
