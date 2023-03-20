import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon, IconSize } from 'components/Icon';
import { Icons } from 'constants/icons';
import { Button } from './index';
import { ButtonSize, ButtonVariant, ButtonWidth } from './Enum';
const ButtonFn: any = Button;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Buttons/Button',
  component: ButtonFn,
  argTypes: {
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: 'select' },
    },
    size: {
      options: Object.values(ButtonSize),
      control: { type: 'select' },
    },
    width: {
      options: Object.values(ButtonWidth),
      control: { type: 'select' },
    },
    textClassName: {
      options: ['u-textDark', 'u-textWhite', 'u-textWarning', 'u-textPositive', 'u-textNegative', ''],
      control: { type: 'select' },
    },
    as: {
      control: { type: 'string' },
    },
    children: {
      control: { type: 'string' },
    },
  },
} as ComponentMeta<typeof ButtonFn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonFn> = (args) => <ButtonFn {...args} />;

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  variant: ButtonVariant.PRIMARY,
  children: 'Button',
};

export const OnlyIcon = Template.bind({});

OnlyIcon.args = {
  variant: ButtonVariant.PRIMARY,
  onlyIcon: true,
  children: (
    <>
      <Icon name={Icons.REFRESH} />
    </>
  ),
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  variant: ButtonVariant.PRIMARY,
  children: (
    <>
      <ButtonFn.Icon>
        <Icon name={Icons.REFRESH} />
      </ButtonFn.Icon>
      <ButtonFn.Label>Refresh</ButtonFn.Label>
    </>
  ),
};
