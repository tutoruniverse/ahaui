import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Context from 'components/Form/Context';

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

const Group = React.forwardRef(({ className, sizeControl, disabledControl, as: Component = 'div', ...props }, ref) => {
  const context = useMemo(() => ({ sizeControl, disabledControl }), [sizeControl, disabledControl]);
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
}
);
Group.displayName = 'ButtonGroup';
Group.propTypes = propTypes;
Group.defaultProps = defaultProps;
export default Group;
