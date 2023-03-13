import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import Context from './Context';

const propTypes = {
  /**
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  sizeLabel: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
  /**
   * Uses requiredId from `<Form.Group>` if not explicitly specified.
   * @default false
   * */
  required: PropTypes.bool,
  /** Uses controlId from `<Form.Group>` if not explicitly specified. */
  htmlFor: PropTypes.string,
};

const defaultProps = {
};

const labelSizes = {
  small: 'u-text200',
  medium: '',
  large: '',
};
const Label = React.forwardRef(({ className, sizeLabel, required, htmlFor, as: Component = 'label', ...props }, ref) => {
  const { controlId, sizeControl, requiredControl } = useContext(Context);

  warning(
    controlId == null || !htmlFor,
    '`controlId` is ignored on `<Form.Label>` when `htmlFor` is specified.',
  );
  const htmlForSet = htmlFor || controlId;
  const requiredSet = required || requiredControl;
  const sizeLabelSet = sizeLabel || sizeControl;
  return (
    <Component
      ref={ref}
      required={requiredSet}
      className={classNames(
        'FormLabel',
        'u-block u-marginBottomTiny',
        className && className,
        sizeLabelSet && labelSizes[sizeLabelSet],
      )}
      htmlFor={htmlForSet}
      {...props}
    />
  );
});
Label.displayName = 'FormLabel';
Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
