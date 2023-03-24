import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from './index';

const BreadcrumbFn: any = Breadcrumb;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Navigator/Breadcrumb',
  component: BreadcrumbFn,
  argTypes: {
    schema: {
      options: [true, false],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof BreadcrumbFn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BreadcrumbFn> = (args) => (
  <BreadcrumbFn {...args}>
    <BreadcrumbFn.Item href="#">Home</BreadcrumbFn.Item>
    <BreadcrumbFn.Item href="#">Parent Page</BreadcrumbFn.Item>
    <BreadcrumbFn.Item href="#">SubParent Page</BreadcrumbFn.Item>
    <BreadcrumbFn.Item href="#">Current Page</BreadcrumbFn.Item>
  </BreadcrumbFn>
);

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  schema: false,
};
