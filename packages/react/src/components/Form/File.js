import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import Context from './Context';

const propTypes = {
  /**
   * The underlying HTML element to use when rendering the Form.File.
   * @default div
   * */
  as: PropTypes.elementType,
  /** Uses controlId from `<Form.Group>` if not explicitly specified. */
  id: PropTypes.string,
  /**
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  sizeInput: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
  /** File name */
  fileName: PropTypes.string,
  /** Custom browse button text  */
  browseText: PropTypes.string,
  /**
   * Add "invalid" validation styles to the control and accompanying label
   * @default false
   * */
  isValid: PropTypes.bool,
  /**
   * Add "valid" validation styles to the control
   * @default false
   * */
  isInvalid: PropTypes.bool,
  /** Remove border all state */
  isBorderNone: PropTypes.bool,
  /** Reset background to transparent*/
  isBackgroundReset: PropTypes.bool,
  /** The underlying HTML element to use when rendering the Form.Input. */
  placeholder: PropTypes.string,
};

const defaultProps = {
  browseText: 'Browse',
  placeholder: '',
};

const File = React.forwardRef(({ className, sizeInput, id, fileName, placeholder, browseText, isValid, isInvalid, isBorderNone, isBackgroundReset, as: Component = 'div', ...props }, ref) => {
  const { sizeControl, controlId } = useContext(Context);
  const sizeInputSet = sizeInput || sizeControl;
  const idSet = id || controlId;

  warning(
    controlId == null || !id,
    '`controlId` is ignored on `<Form.File>` when `id` is specified.',
  );
  return (
    <Component
      className={classNames(
        'FormInput FormInput--file',
        'u-positionRelative u-flex u-alignItemsCenter u-overflowHidden',
        sizeInputSet && `FormInput--${sizeInputSet}`,
        sizeInputSet === 'small' && 'u-text200',
        props.disabled ? 'u-cursorNotAllow u-textLight u-pointerEventsNone' : 'u-cursorPointer',
        fileName && 'is-selected',
        isValid && 'is-valid',
        isInvalid && 'is-invalid',
        isBorderNone && 'is-borderNone',
        isBackgroundReset && 'is-backgroundReset',
        className && className,
      )}
    >
      <input
        className="FormInput-file u-positionAbsolute u-widthFull u-opacityNone u-marginNone u-heightFull u-paddingNone u-positionLeft"
        type="file"
        ref={ref}
        {...props}
        id={id || controlId}
      />
      <label
        className={classNames(
          'FormInput-label u-marginBottomNone u-heightFull u-widthFull',
          props.disabled ? 'u-cursorNotAllow' : 'u-cursorPointer',
        )}
        data-browse={browseText}
        htmlFor={idSet}
      >
        {(placeholder && !fileName) && (
        <span className="u-textLight">{placeholder}</span>
        )}
        {fileName}
      </label>

    </Component>
  );
});

File.displayName = 'FormFile';
File.defaultProps = defaultProps;
File.propTypes = propTypes;
export default File;
