import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { ComponentSizeEnum } from 'types/common';
import { ButtonVariantEnum, ButtonWidthEnum } from '..';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    as: { control: 'text' },
    textClassName: { control: 'text' },
  },
} as ComponentMeta<typeof Button>;

const Template : ComponentStory<typeof Button> = (args) => (
  <Button {...args}>
    <Button.Icon>
      <Icon />
    </Button.Icon>

    <Button.Label>
      Label
    </Button.Label>
  </Button>
);

export const Default = Template.bind({});
Default.args = {
  variant: ButtonVariantEnum.primary,
  width: ButtonWidthEnum.auto,
  nonUppercase: false,
  onlyIcon: false,
  size: ComponentSizeEnum.medium,
  disabled: false,
};
