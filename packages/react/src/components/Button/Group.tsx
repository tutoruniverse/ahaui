import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import Context from 'components/Form/Context';
import { ButtonSize } from './Enum';

const propTypes = {
  /**
   * Sets the size for all Buttons in the group.
   * @default 'medium'
   * @type {('small'|'medium'|'large')}
   *  */
  sizeControl: PropTypes.string,
  /** Sets the disabled state for all Buttons in the group. */
  disabledControl: PropTypes.bool,
};

const defaultProps = {
  disabledControl: false,
};

export interface ButtonGroupProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  sizeControl?: ButtonSize;
  disabledControl?: boolean;
}

export const Group: RefForwardingComponent<'div', ButtonGroupProps> = React.forwardRef(
  ({ className, sizeControl, disabledControl, as: Component = 'div', ...props }: ButtonGroupProps, ref) => {
    const context = useMemo(() => ({ sizeControl, disabledControl }), [sizeControl, disabledControl]);
    return (
      <Context.Provider value={context}>
        <Component
          {...props}
          ref={ref}
          className={classNames('ButtonGroup u-positionRelative u-flexInline', className && className)}
        />
      </Context.Provider>
    );
  }
);
Group.displayName = 'ButtonGroup';
Group.propTypes = propTypes;
Group.defaultProps = defaultProps;
