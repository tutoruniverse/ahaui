import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Item from 'components/Tab/Item';
import Tab from 'components/Tab';

export default {
  title: 'Tab',
  component: Tab,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Tab>;

const path1 = 'path1';
const path2 = 'path2';

const Template: ComponentStory<typeof Tab> = (args) => {
  const [current, setCurrent] = useState(path1);

  return <Tab {...args} current={current} onSelect={(path) => path && setCurrent(path)} />;
};


export const Default = Template.bind({});
Default.args = {
  children: [
    <Item eventKey={path1}>Path 1</Item>,
    <Item eventKey={path2}>Path 2</Item>,
  ],
};
