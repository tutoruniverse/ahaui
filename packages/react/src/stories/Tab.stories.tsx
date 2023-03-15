import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Item from 'components/Tab/Item';
import Tab from '../components/Tab';

export default {
  title: 'Tab',
  component: Tab,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Tab>;

const path1 = 'test';
const path2 = 'test2';

const Template: ComponentStory<typeof Tab> = (args) => {
  const [current, setCurrent] = useState(path1);

  return <Tab {...args} current={current} onSelect={(path) => path && setCurrent(path)} />;
};


export const Default = Template.bind({});
Default.args = {
  children: [
    <Item eventKey={path1}>Test</Item>,
    <Item eventKey={path2}>Test2</Item>,
  ],
};
