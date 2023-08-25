import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BubbleChat, { BubbleChatTypeEnum, BubbleChatVariantEnum } from 'components/BubbleChat';
import Avatar from 'components/Avatar';

export default {
  title: 'BubbleChat',
  component: BubbleChat,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.keys(BubbleChatTypeEnum),
      },
    },
    variant: {
      control: {
        type: 'select',
        options: Object.keys(BubbleChatVariantEnum),
      },
    },
    textClassName: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof BubbleChat>;

const InboundTemplate : ComponentStory<typeof BubbleChat> = (args) => (
  <BubbleChat
    {...args}
  />
);

export const InboundMessage = InboundTemplate.bind({});
InboundMessage.args = {
  type: BubbleChatTypeEnum.inbound,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt, neque eu fringilla mollis, enim turpis volutpat purus, sit amet consequat. Nunc sagittis, libero nec vehicula mattis.',
  time: '16:24',
  variant: BubbleChatVariantEnum.primary,
  isTyping: false,
};

const OutboundTemplate : ComponentStory<typeof BubbleChat> = (args) => (
  <BubbleChat
    avatar={(() => <Avatar size="medium" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
    {...args}
  />
);

export const OutboundMessage = OutboundTemplate.bind({});
OutboundMessage.args = {
  type: BubbleChatTypeEnum.outbound,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt, neque eu fringilla mollis, enim turpis volutpat purus, sit amet consequat. Nunc sagittis, libero nec vehicula mattis.',
  time: '16:24',
  variant: BubbleChatVariantEnum.light,
  isTyping: false,
};
