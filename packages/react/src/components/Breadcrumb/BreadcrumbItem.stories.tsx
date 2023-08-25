import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Breadcrumb from 'components/Breadcrumb';

export default {
  title: 'Breadcrumb.Item',
  component: Breadcrumb.Item,
} as ComponentMeta<typeof Breadcrumb.Item>;

const Template: ComponentStory<typeof Breadcrumb.Item> = (args) => (
  <Breadcrumb.Item {...args}>
    Item
  </Breadcrumb.Item>
);

const WithSchemaTemplate: ComponentStory<typeof Breadcrumb.Item> = (args) => (
  <Breadcrumb schema>
    <Breadcrumb.Item {...args}>
      Item
    </Breadcrumb.Item>
  </Breadcrumb>
);

export const Default = Template.bind({});

export const WithSchema = WithSchemaTemplate.bind({});
