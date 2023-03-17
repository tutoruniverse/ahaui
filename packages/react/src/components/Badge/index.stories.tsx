import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Badge, BadgeVariant } from './index';

const BadgeFn: any = Badge;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Data Display/Badge',
  component: BadgeFn,
  argTypes: {
    variant: {
      options: Object.values(BadgeVariant),
      control: { type: 'select' },
    },
    as: {
      control: { type: 'string' },
    },
    children: {
      control: { type: 'string' },
    },
    textClassName: {
      options: [
        'u-textDark',
        'u-textWhite',
        'u-textWarning',
        'u-textPositive',
        'u-textNegative',
        '',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof BadgeFn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BadgeFn> = (args) => (
  <BadgeFn {...args} />
);

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  variant: BadgeVariant.PRIMARY,
  children: 'Badge',
};
