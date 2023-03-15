import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip from '../components/Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template : ComponentStory<typeof Tooltip> = (args) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button type="button" onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>HOVER</button>
      <Tooltip {...args} show={show} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'Tooltip',
  show: true,
  children: 'Tooltip',
};
