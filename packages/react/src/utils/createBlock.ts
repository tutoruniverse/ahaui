import React, { ForwardRefRenderFunction, HTMLAttributes } from 'react';
import classNames from 'classnames';
import camelize from 'dom-helpers/camelize';

const pascalCase = (str: string) =>
  str[0].toUpperCase() + camelize(str).slice(1);

interface BlockProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

interface CreateBlockOptions {
  displayName?: string;
  Component?: React.ElementType;
  defaultProps?: BlockProps;
}

function createBlock<T extends React.ElementType = 'div'>(
  prefix: string,
  {
    displayName = pascalCase(prefix),
    Component = 'div',
    defaultProps,
  }: CreateBlockOptions = {},
) {
  const Block: ForwardRefRenderFunction<HTMLElement, BlockProps> = (
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

export default createBlock;
