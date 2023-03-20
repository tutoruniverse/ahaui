import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dropdown } from './index';
import { Button } from 'components/Button';
import { ButtonVariant } from 'components/Button/Enum';
import { Icon, IconSize } from 'components/Icon';
import { Icons } from 'constants/icons';
const DropdownFn: any = Dropdown;
const ButtonFn: any = Button;

export default {
  title: 'Buttons/Dropdown',
  component: DropdownFn,
  argTypes: {
    as: {
      control: { type: 'string' },
    },
    children: {
      control: { type: 'string' },
    },
  },
} as ComponentMeta<typeof DropdownFn>;

const Template: ComponentStory<typeof DropdownFn> = (args) => <DropdownFn {...args} />;

export const Control = Template.bind({});
Control.args = {
  children: (
    <>
      <Dropdown.Button
        variant={ButtonVariant.SECONDARY}
        onlyIcon
      >
        <ButtonFn.Icon>
          <Icon
            name={Icons.BOT}
            size={IconSize.SMALL}
          />
        </ButtonFn.Icon>
      </Dropdown.Button>
      <Dropdown.Container
        id="123"
        className="u-paddingVerticalExtraSmall"
        style={{ minWidth: 220 }}
      >
        <DropdownFn.Item className="u-cursorPointer">
          <Icon
            name="setting"
            size={IconSize.SMALL}
          />
          <span className="u-marginLeftExtraSmall">My Profile</span>
        </DropdownFn.Item>
        <DropdownFn.Item>
          <Icon
            name="card"
            size={IconSize.SMALL}
          />
          <span className="u-marginLeftExtraSmall">Payment</span>
        </DropdownFn.Item>
        <DropdownFn.Item>
          <Icon
            name="power"
            size={IconSize.SMALL}
          />
          <span className="u-marginLeftExtraSmall">Logout</span>
        </DropdownFn.Item>
      </Dropdown.Container>
    </>
  ),
};
