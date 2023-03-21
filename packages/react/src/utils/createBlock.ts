import React from 'react';
import classNames from 'classnames';
import camelize from 'dom-helpers/camelize';

export interface CreateBlockOptions<As extends React.ElementType = 'div'> {
  displayName?: string;
  Component?: As;
  defaultProps?: Partial<React.ComponentProps<As>>;
}

const pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);

export function createBlock<As extends React.ElementType = 'div'>(
  prefix,
  { displayName = pascalCase(prefix), Component, defaultProps }: CreateBlockOptions<As> = {},
) {
  const Block = React.forwardRef(({ className, as: Tag = Component || 'div', ...props }: any, ref) => (
    React.createElement(
      Tag,
      {
        ...props,
        ref,
        className: classNames(className,prefix),
      }
    )
  ));
  Block.defaultProps = defaultProps;
  Block.displayName = displayName;
  return Block;
}
