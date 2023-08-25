import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'components/Button';

import Icon from 'components/Icon';
import { ComponentSizeEnum } from 'types/common';

export default {
  title: 'Button.Group',
  component: Button.Group,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof Button.Group>;

const Template : ComponentStory<typeof Button.Group> = (args) => (
  <Button.Group {...args}>
    <Button className="u-marginRightMedium">
      <Button.Icon>
        <Icon />
      </Button.Icon>

      <Button.Label>
        Label
      </Button.Label>
    </Button>

    <Button>
      <Button.Icon>
        <Icon />
      </Button.Icon>

      <Button.Label>
        Label
      </Button.Label>
    </Button>
  </Button.Group>
);

export const Default = Template.bind({});
Default.args = {
  sizeControl: ComponentSizeEnum.medium,
  disabledControl: false,
};
