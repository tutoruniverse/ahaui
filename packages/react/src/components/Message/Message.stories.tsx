import React, { useState } from 'react';
import Fade from 'components/Fade';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Message from 'components/Message';
import { MessageEnum, MessageVariantEnum } from './Context';

export default {
  title: 'Message',
  component: Message,
} as ComponentMeta<typeof Message>;

const Template : ComponentStory<typeof Message> = (args) => {
  const {
    show: defaultShow,
    ...rest
  } = args;

  const [show, setShow] = useState(defaultShow);

  const onClose = () => {
    setShow(!show);
  };

  return (
    <Message {...rest} onClose={onClose} show={show}>
      <Message.Container>
        <Message.Title>
          Heading
        </Message.Title>
        <Message.Content>
          This is a message-check it out!
        </Message.Content>
      </Message.Container>
    </Message>
  );
};

export const Default = Template.bind({});
Default.args = {
  show: true,
  transition: Fade,
  type: MessageEnum.form,
  variant: MessageVariantEnum.information,
  dismissible: true,
  disabled: false,
};
