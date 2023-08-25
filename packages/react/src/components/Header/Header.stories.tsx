import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Logo from 'components/Logo';
import Header from '.';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Header>;

const Template : ComponentStory<typeof Header> = (args) => (
  <div className="u-backgroundLightest u-paddingLarge">
    <Header {...args}>
      <Header.Brand>
        <Logo src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-with-text.svg" height={40} />
      </Header.Brand>
      <Header.Main>
        <Header.Left>
          Header Left
        </Header.Left>
        <Header.Right>
          Header Right
        </Header.Right>
      </Header.Main>
    </Header>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  fullWidth: true,
  show: true,
};
