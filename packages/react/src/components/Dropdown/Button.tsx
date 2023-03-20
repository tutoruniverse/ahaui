import React, { useContext } from 'react';
import classNames from 'classnames';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import PropTypes from 'prop-types';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import { Icons } from 'constants/icons';
import { PopperDirection } from 'hooks/usePopper';
import { Button, ButtonProps } from 'components/Button';
import { Icon, IconSize } from 'components/Icon';
import { DropdownContext } from './Context';
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

export interface DropButtonProps extends ButtonProps, PrefixProps, React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  caret?: IconSize;
}

export const DropButton: RefForwardingComponent<typeof Button, DropButtonProps> = React.forwardRef(
  ({ className, children, caret, as: Component, ...props }: DropButtonProps, ref) => {
    const [toggleProps, { toggle }] = useToggle();
    const { drop } = useContext(DropdownContext);
    toggleProps.ref = useMergedRefs(toggleProps.ref, ref);

    return (
      <Component
        {...props}
        {...toggleProps}
        onClick={toggle}
        nonUppercase
        className={classNames('Dropdown-button', className && className)}
      >
        {children}
        {caret && (
          <span className={classNames('u-marginLeftTiny u-inlineBlock u-lineHeightNone')}>
            <Icon
              name={Icons.ARROW_DOWN}
              className={classNames(drop === PopperDirection.UP && 'u-rotate180')}
              size={caret || IconSize.EXTRA_SMALL}
            />
          </span>
        )}
      </Component>
    );
  }
);

DropButton.displayName = 'DropdownButton';
DropButton.propTypes = propTypes;
DropButton.defaultProps = defaultProps;
