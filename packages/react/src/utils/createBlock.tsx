import React from 'react';
import classNames from 'classnames';
import { camelCase } from 'lodash';
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from 'types/common';

export const pascalCase = (str: string) => str[0].toUpperCase() + camelCase(str).slice(1);

interface CreateBlockOptions<P extends Record<string, unknown>> {
  Component?: React.ElementType;
  defaultProps?: Partial<P>;
}

type BlockProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithRef<T>;

type BlockComponent<P> = <T extends React.ElementType = 'div'>(
  props: BlockProps<T> & Partial<P>,
) => React.ReactElement | null;

type CreateBlock = <P extends Record<string, unknown>>(
  prefix: string,
  options?: CreateBlockOptions<P>,
) => BlockComponent<P>;

const createBlock: CreateBlock = (
  prefix,
  { Component = 'div', defaultProps } = {},
) => {
  const Block = React.forwardRef(
    <T extends React.ElementType>(
      { className, as, ...props }: BlockProps<T>,
      ref: PolymorphicRef<T>,
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
