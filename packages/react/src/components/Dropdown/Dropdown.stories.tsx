import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Dropdown from './index';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args}>
    <Dropdown.Button>
      Toggle Dropdown
    </Dropdown.Button>
    <Dropdown.Container>
      <div>Container Text 1</div>
      <div>Container Text 2</div>
      <div>Container Text 3</div>
    </Dropdown.Container>
  </Dropdown>
);

export const Default = Template.bind({});
Default.args = {
  alignRight: true,
  drop: 'down',
  flip: true,
};
