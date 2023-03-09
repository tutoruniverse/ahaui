import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Context = React.createContext();
const propTypes = {
  /**
   * When this prop is set, it creates a Card with a Card.Body inside
   * passing the children directly to it
   */
  body: PropTypes.bool,
  /**
   * Card size variants
   * */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

const defaultProps = {
  body: false,
  size: 'medium',
};

const sizesClassName = {
  small: {
    content: 'u-paddingExtraSmall',
    title: 'u-text300',
  },
  medium: {
    content: 'u-paddingSmall',
    title: 'u-text400',
  },
  large: {
    content: 'u-paddingMedium',
    title: 'u-text600',
  },
};

const Card = React.forwardRef(({ className, body, size, children, as: Component = 'div', ...props }, ref) => {
  const context = useMemo(() => ({ size }), [size]);
  return (
    <Context.Provider value={context}>
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'Card',
          'u-backgroundWhite u-border u-roundedMedium u-marginBottomSmall',
          className && className,
        )}
      >
        {body ? <CardBody>{children}</CardBody> : children}
      </Component>
    </Context.Provider>
  );
});

const CardBody = React.forwardRef(({ className, as: Component = 'div', ...props }, ref) => {
  const { size } = useContext(Context);
  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        'Card-body',
        size && sizesClassName[size].content,
        className && className,
      )}
    />
  );
});
const CardHeader = React.forwardRef(({ className, as: Component = 'div', ...props }, ref) => {
  const { size } = useContext(Context);
  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        'Card-header u-borderBottom u-flex u-justifyContentBetween',
        size && sizesClassName[size].content,
        className && className,
      )}
    />
  );
});
const CardTitle = React.forwardRef(({ className, as: Component = 'div', ...props }, ref) => {
  const { size } = useContext(Context);
  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        'Card-title u-fontMedium',
        size && sizesClassName[size].title,
        className && className,
      )}
    />
  );
});

Card.displayName = 'Card';
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
export default Card;
