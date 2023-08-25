import React from 'react';
import classNames from 'classnames';
import { camelCase } from 'lodash';

export const pascalCase = (str: string) => str[0].toUpperCase() + camelCase(str).slice(1);

interface CreateBlockOptions<P extends Record<string, unknown>, E extends React.ElementType> {
  Component?: E;
  defaultProps?: Partial<P>;
}

type BlockProps<T extends React.ElementType> = React.ComponentProps<T>;

type BlockComponent<P, E extends React.ElementType> = <T extends React.ElementType = E>(
  props: BlockProps<T> & Partial<P>,
) => React.ReactElement | null;

type CreateBlock = <P extends Record<string, unknown>, E extends React.ElementType>(
  prefix: string,
  options?: CreateBlockOptions<P, E>,
) => BlockComponent<P, E>;

const createBlock: CreateBlock = (
  prefix,
  { Component = 'div', defaultProps } = {},
) => {
  const Block = React.forwardRef(
    <T extends React.ElementType>(
      { className, as, ...props }: BlockProps<T>,
      ref: React.ForwardedRef<T>,
    ) => {
      const Tag = as || Component;

      const componentProps = { ...defaultProps, ...props };

      return (
        <Tag
          ref={ref}
          className={classNames(className, prefix)}
          {...componentProps}
        />
      );
    },
  );

  return Block;
};

export default createBlock;
