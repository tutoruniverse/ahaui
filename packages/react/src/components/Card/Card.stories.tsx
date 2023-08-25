import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Card from 'components/Card';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Card>;

const Template : ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <Card.Header>
      <Card.Title>
        Card Title
      </Card.Title>
    </Card.Header>
    <Card.Body>
      Card Body
    </Card.Body>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  body: false,
  size: ComponentSizeEnum.medium,
};
