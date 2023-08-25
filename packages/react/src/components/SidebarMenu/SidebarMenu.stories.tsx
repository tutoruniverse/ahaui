import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SidebarMenu from 'components/SidebarMenu';

export default {
  title: 'SidebarMenu',
  component: SidebarMenu,
  argTypes: {
    current: {
      table: {
        disable: true,
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof SidebarMenu>;

const Template : ComponentStory<typeof SidebarMenu> = (args) => {
  const {
    current: defaultCurrent,
    onSelect,
    ...rest
  } = args;

  const [current, setCurrent] = useState(defaultCurrent || 'home');

  return (
    <SidebarMenu current={current} onSelect={setCurrent} {...rest}>
      <SidebarMenu.Item icon="store" eventKey="home">Home</SidebarMenu.Item>
      <SidebarMenu.SubMenu icon="setting" eventKey="setting" title="Settings">
        <SidebarMenu.Item icon="volumeHigh" eventKey="audio">Audio</SidebarMenu.Item>
        <SidebarMenu.Item icon="notification" eventKey="notification">Notification</SidebarMenu.Item>
      </SidebarMenu.SubMenu>
    </SidebarMenu>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  autoCollapse: false,
};
