import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Card from '../components/Card';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Card>;

const Template : ComponentStory<typeof Card> = (args) => (
  <Card {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children:
  <>
    <Card.Title>
      Card title
    </Card.Title>

    <Card.Header>
      Card header
    </Card.Header>

    <Card.Body>
      Card body
    </Card.Body>
  </>,
};
