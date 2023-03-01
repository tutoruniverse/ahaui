import React from 'react';
import classNames from 'classnames';
import camelize from 'dom-helpers/camelize';

const pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);

function createBlock(
  prefix,
  { displayName = pascalCase(prefix), Component = 'div', defaultProps } = {},
) {
  const Block = React.forwardRef(
    ({ className, as: Tag = Component, ...props }, ref) => (
      <Tag
        ref={ref}
        className={classNames(className, prefix)}
        {...props}
      />
    ),
  );
  Block.defaultProps = defaultProps;
  Block.displayName = displayName;
  return Block;
}
export default createBlock;
