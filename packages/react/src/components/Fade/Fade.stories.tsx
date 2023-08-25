import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Fade from 'components/Fade';

export default {
  title: 'Fade',
  component: Fade,
} as ComponentMeta<typeof Fade>;

const Template : ComponentStory<typeof Fade> = (args) => (
  <Fade {...args}>
    <div>Hello World</div>
  </Fade>
);

export const Default = Template.bind({});
Default.args = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
};
