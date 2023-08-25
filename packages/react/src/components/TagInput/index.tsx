import React, { useContext } from 'react';
import classNames from 'classnames';
import {
  VariantClassName,
  variantsClassName as tagVariantsClassName,
} from 'components/Tag';
import Context from 'components/Form/Context';
import { AhaRefForwardingComponent, ComponentCommonSize, ComponentSizeEnum, VariantColorsEnum } from 'types/common';
import TagsInput, { TagsInputProps } from './TagInputLib';

export type TagInputVariant = Extract<
  VariantClassName,
  | 'black'
  | 'white'
  | 'primary'
  | 'primary_subtle'
  | 'warning'
  | 'warning_subtle'
  | 'positive'
  | 'positive_subtle'
  | 'negative'
  | 'negative_subtle'
>;

export interface TagInputProps extends TagsInputProps {
  /** The visual style of the tag */
  variant?: TagInputVariant;
  /**
   * TagInput size variants
   *
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  size?: ComponentCommonSize;
}

const TagInput: AhaRefForwardingComponent<React.ElementType, TagInputProps> = React.forwardRef(
  (
    {
      style,
      className,
      variant = VariantColorsEnum.primary_subtle,
      value,
      size,
      onChange,
      tagProps = {},
      inputProps = {},
      renderInput,
      ...props
    }: TagInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { sizeControl } = useContext(Context);
    const sizeOri = size || sizeControl || ComponentSizeEnum.medium;

    const tagInputProps = {
      ...props,
      focusedClassName: 'is-focus',
      tagProps: {
        ...tagProps,
        className: classNames(
          'Tag u-flexInline u-alignItemsCenter u-textCenter u-textNoWrap u-roundedMedium hover:u-textDecorationNone u-marginRightTiny',
          sizeOri === 'small' ? 'Tag--small u-text100' : 'u-text200',
          tagProps?.className,
          variant && tagVariantsClassName[variant],
        ),
        classNameRemove: classNames(
          'Tag-close u-marginLeftTiny u-cursorPointer hover:u-textDecorationNone',
          tagProps?.classNameRemove,
        ),
      },
      inputProps: {
        ...inputProps,
        className: classNames(
          'u-backgroundTransparent u-borderNone',
          sizeOri === 'small' ? 'u-text100' : 'u-text200',
          inputProps?.className,
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
          className,
        )}
        value={value}
        onChange={onChange}
        style={{
          height: 'auto',
          ...style,
        }}
        renderInput={renderInput}
      />
    );
  },
);

TagInput.displayName = 'TagInput';

export default TagInput;
