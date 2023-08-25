import React from 'react';
import { EnumToUnion } from 'types/common';

export enum MessageEnum {
  form = 'form',
  system = 'system',
}

export type MessageType = EnumToUnion<MessageEnum>;

export enum MessageVariantEnum {
  information = 'information',
  positive = 'positive',
  warning = 'warning',
  negative = 'negative',
}

export type MessageVariantType = EnumToUnion<MessageVariantEnum>;

interface MessageContext {
  variant?: MessageVariantType;
  type?: MessageType;
}

const Context = React.createContext<MessageContext>({ variant: undefined, type: undefined });
export default Context;
