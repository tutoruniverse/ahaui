import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Toggle } from './index';

const ToggleFn: any = Toggle;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Toggle',
  component: ToggleFn,
  argTypes: {
    checked: {
      options: [true, false],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'select' },
    },
    nonLabel: {
      options: [true, false],
      control: { type: 'select' },
    },
    textLabelOn: {
      control: { type: 'string' },
    },
    textLabelOff: {
      control: { type: 'string' },
    },
    ariaLabel: {
      control: { type: 'string' },
    },
  },
} as ComponentMeta<typeof ToggleFn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToggleFn> = (args) => <Toggle {...args} />;

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  checked: false,
  disabled: false,
  nonLabel: true,
};
