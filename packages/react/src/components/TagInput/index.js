import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tag from 'components/Tag';
import Context from 'components/Form/Context';
import TagsInput from './TagInputLib';

const propTypes = {
  /** The visual style of the tag */
  variant: PropTypes.oneOf([
    'black',
    'white',
    'primary',
    'primary_subtle',
    'warning',
    'warning_subtle',
    'positive',
    'positive_subtle',
    'negative',
    'negative_subtle',
  ]),
  /**
   * TagInput size variants
   *
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

const defaultProps = {
  variant: 'primary_subtle',
};

const TagInput = React.forwardRef(({ className, variant, value, size, onChange, tagProps = {}, inputProps = {}, renderInput, ...props }, ref) => {
  const { sizeControl } = useContext(Context);
  const sizeOri = size || sizeControl;

  const tagInputProps = {
    ...props,
    focusedClassName: 'is-focus',
    tagProps: {
      ...tagProps,
      className: classNames(
        'Tag u-flexInline u-alignItemsCenter u-textCenter u-textNoWrap u-roundedMedium hover:u-textDecorationNone u-marginRightTiny',
        (sizeOri === 'small') ? 'Tag--small u-text100' : 'u-text200',
        tagProps.className && tagProps.className,
        variant && Tag.variantsClassName[variant],
      ),
      classNameRemove: classNames(
        'Tag-close u-marginLeftTiny u-cursorPointer hover:u-textDecorationNone',
        tagProps.classNameRemove && tagProps.classNameRemove,
      ),
    },
    inputProps: {
      ...inputProps,
      className: classNames(
        'u-backgroundTransparent u-borderNone',
        (sizeOri === 'small') ? 'u-text100' : 'u-text200',
        inputProps.className && inputProps.className,
      ),
    },
  };
  return (
    <TagsInput
      ref={ref}
      {...tagInputProps}
      className={classNames(
        'TagInput',
        sizeOri && `TagInput--${sizeOri}`,
        'u-backgroundWhite u-flexGrow1 u-roundedMedium u-border u-paddingVerticalTiny u-paddingHorizontalExtraSmall u-sizeFill',
        className && className,
      )}
      value={value}
      onChange={onChange}
      style={{
        height: 'auto',
      }}
      renderInput={renderInput}
    />
  );
});

TagInput.displayName = 'TagInput';
TagInput.defaultProps = defaultProps;
TagInput.propTypes = propTypes;

export default TagInput;
