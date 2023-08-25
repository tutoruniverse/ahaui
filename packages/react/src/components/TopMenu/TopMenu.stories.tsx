import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TopMenu from './index';

export default {
  title: 'TopMenu',
  component: TopMenu,
} as ComponentMeta<typeof TopMenu>;

const Template: ComponentStory<typeof TopMenu> = (args) => {
  const [current, setCurrent] = useState('item-1');

  return (
    <TopMenu
      {...args}
      current={current}
      onItemSelect={setCurrent}
      data-testid="top-menu-test-id"
    >
      <TopMenu.Item
        eventKey="item-1"
        badge="Badge"
        className="ItemTestingClass"
        data-testid="item-1-test-id"
      >
        Item 1
      </TopMenu.Item>
      <TopMenu.Item
        disabled
        eventKey="item-2"
        badge="Testing Item Badge 2"
        data-testid="item-2-test-id"
      >
        Item 2
      </TopMenu.Item>
      <TopMenu.SubMenu
        eventKey="sub-menu"
        title="Sub-menu"
        badge="Badge"
      >
        <TopMenu.Item
          eventKey="sub-menu-item-1"
          data-testid="sub-menu-item-1-test-id"
        >
          Sub-menu Item 1
        </TopMenu.Item>
        <TopMenu.Item
          disabled
          eventKey="sub-menu-item-2"
          data-testid="sub-menu-item-2-test-id"
        >
          Sub-menu Item 2
        </TopMenu.Item>
      </TopMenu.SubMenu>
    </TopMenu>
  );
};

export const Default = Template.bind({});
Default.args = {
  autoCollapse: false,
};
