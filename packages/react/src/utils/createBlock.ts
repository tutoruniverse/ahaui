import React, { ElementType } from 'react';
import classNames from 'classnames';
import camelize from 'dom-helpers/camelize';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';

const pascalCase = (str: string) =>
  str[0].toUpperCase() + camelize(str).slice(1);

export interface BlockProps
  extends PrefixProps,
    React.HTMLAttributes<HTMLElement> {}

export interface CreateBlockOptions {
  displayName?: string;
  Component?: React.ElementType;
  defaultProps?: BlockProps;
}

export function createBlock<T extends React.ElementType = 'div'>(
  prefix: string,
  {
    displayName = pascalCase(prefix),
    Component = 'div',
    defaultProps,
  }: CreateBlockOptions = {},
) {
  const Block: RefForwardingComponent<ElementType, BlockProps> = (
    { className, as: Tag = Component, ...props },
    ref,
  ) => {
    const classes = classNames(className, prefix);
    return React.createElement(Tag, { ...props, ref, className: classes });
  };

  Block.defaultProps = defaultProps;
  Block.displayName = displayName;

  return Block as React.ComponentType<BlockProps & { as?: T }>;
}
