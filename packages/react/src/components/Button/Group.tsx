import React, { useMemo } from 'react';
import classNames from 'classnames';
import Context from 'components/Form/Context';
import { AhaRefForwardingComponent, AsProp, ComponentCommonSize, ComponentSizeEnum } from 'types/common';

export interface ButtonGroupProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /**
   * Sets the size for all Buttons in the group.
   * @default 'medium'
   *  */
  sizeControl?: ComponentCommonSize;
  /** Sets the disabled state for all Buttons in the group. */
  disabledControl?: boolean;
}

export const Group: AhaRefForwardingComponent<React.ElementType, ButtonGroupProps> = React.forwardRef(
  (
    {
      className,
      sizeControl = ComponentSizeEnum.medium,
      disabledControl = false,
      as,
      ...props
    }: ButtonGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const context = useMemo(() => ({ sizeControl, disabledControl }), [sizeControl, disabledControl]);

    const Component = as || 'div';

    return (
      <Context.Provider value={context}>
        <Component
          {...props}
          ref={ref}
          className={classNames(
            'ButtonGroup u-positionRelative u-flexInline',
            className && className,
          )}
        />
      </Context.Provider>
    );
  },
);

const GroupWithDisplayName = Object.assign(Group, {
  displayName: 'ButtonGroup',
});

export default GroupWithDisplayName;
