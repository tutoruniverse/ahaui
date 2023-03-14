import React, { useContext } from 'react';
import classNames from 'classnames';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Icon from 'components/Icon';
import DropdownContext from './Context';
import { useToggle } from './Toggle';

const propTypes = {
  /** You can use a custom element type for this component. */
  as: PropTypes.elementType,
  /**
   * Define size of caret icon
   * @default 'extraSmall'
   * */
  caret: PropTypes.string,
};
const defaultProps = {
  as: Button,
};
const DropButton = React.forwardRef(({ className, children, caret, as: Component, ...props }, ref) => {
  const [toggleProps, { toggle }] = useToggle();
  const { drop } = useContext(DropdownContext);
  toggleProps.ref = useMergedRefs(toggleProps.ref, ref);

  return (
    <Component
      {...toggleProps}
      {...props}
      onClick={toggle}
      nonUppercase
      className={classNames(
        'Dropdown-button',
        className && className
      )}
    >
      {children}
      {caret && (
      <span className={classNames(
        'u-marginLeftTiny u-inlineBlock u-lineHeightNone',
      )}
      >
        <Icon
          name="arrowDown"
          className={classNames(
            drop === 'up' && 'u-rotate180'
          )}
          size={caret || 'extraSmall'}
        />
      </span>
      )}
    </Component>
  );
});

DropButton.displayName = 'DropdownButton';
DropButton.propTypes = propTypes;
DropButton.defaultProps = defaultProps;
export default DropButton;
