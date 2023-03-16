import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Badge, BadgeVariant } from '@ahaui/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: BadgeVariant.PRIMARY,
  children: 'Primary',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: BadgeVariant.WARNING,
  children: 'Warning',
};
