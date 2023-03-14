import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createBlock from 'utils/createBlock';
import Context from './Context';

const propTypes = {
  /**
   * You can use a custom element type for this component.
   * @default div
   * */
  as: PropTypes.elementType,
};

const defaultProps = {
};

const InputGroup = React.forwardRef(({ className, as: Component = 'div', ...props }, ref) => {
  const { sizeControl } = useContext(Context);
  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        'FormInputGroup',
        'u-flex u-positionRelative u-flexWrap u-alignItemsStretch',
        sizeControl && `FormInputGroup--${sizeControl}`,
        className && className
      )}
    />
  );
});

const Append = createBlock('FormInputGroup-append u-flex');
const Prepend = createBlock('FormInputGroup-prepend u-flex ');
const Text = createBlock('FormInputGroup-text u-flex u-alignItemsCenter u-textGray u-textCenter u-backgroundLightest u-textNoWrap');

InputGroup.Text = Text;
InputGroup.Append = Append;
InputGroup.Prepend = Prepend;
InputGroup.displayName = 'FormInputGroup';
InputGroup.defaultProps = defaultProps;
InputGroup.propTypes = propTypes;
export default InputGroup;
