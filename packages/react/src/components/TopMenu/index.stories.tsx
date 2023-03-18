import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TopMenu } from './index';

const TopMenuFn: any = TopMenu;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Navigator/TopMenu',
  component: TopMenuFn,
  argTypes: {
    current: {
      options: ['home', 'about', 'contact'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof TopMenuFn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopMenuFn> = (args) => (
  <TopMenuFn {...args}>
    <TopMenuFn.Item eventKey="home">Home</TopMenuFn.Item>
    <TopMenuFn.Item eventKey="about">About</TopMenuFn.Item>
    <TopMenuFn.Item eventKey="contact">Contact</TopMenuFn.Item>
  </TopMenuFn>
);

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  current: 'home',
};
