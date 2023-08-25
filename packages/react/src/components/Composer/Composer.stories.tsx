import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Composer from './index';

export default {
  title: 'Composer',
  component: Composer,
} as ComponentMeta<typeof Composer>;

const Template: ComponentStory<typeof Composer> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Composer
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  inputProps: {},
  attachButtonProps: {},
  disabledAttachButton: false,
  tooltipAttachButton: 'attach button tooltip',
  sendButtonProps: {},
  sendButtonActive: true,
  sendButtonIcon: 'send',
  disabledSendButton: false,
  tooltipSendButton: 'send button tooltip',
};
