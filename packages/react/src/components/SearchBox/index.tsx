import React from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import Icon, { IconName, IconNameEnum } from 'components/Icon';
import Form from 'components/Form';
import { FormInputProps } from 'components/Form/Input';
import { AhaRefForwardingComponent, ComponentCommonSize, ComponentSizeEnum } from 'types/common';

export interface SearchBoxProps extends FormInputProps {
  /** Callback fired when the Search Button is clicking */
  onClickButton?: React.MouseEventHandler;
  /** The icon to display. The name can get from Component Icon */
  buttonIcon?: IconName;
  /**
   * Sets sizeInput on `Input` and size on `Button`.
   * @default 'medium'
   * */
  sizeControl?: ComponentCommonSize;
  /** Custom text button */
  buttonText?: string;
}

export const SearchBox: AhaRefForwardingComponent<React.ElementType, SearchBoxProps> = React.forwardRef(
  (
    {
      className,
      sizeControl = ComponentSizeEnum.medium,
      onClickButton,
      buttonIcon = IconNameEnum.search,
      buttonText,
      ...props
    }: SearchBoxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <Form.Group
      sizeControl={sizeControl}
      className={classNames(
        'SearchBox',
        className && className,
      )}
    >
      <Form.InputGroup>
        <Form.Input
          ref={ref}
          {...props}
          type="search"
        />
        <Form.InputGroup.Append>
          <Button
            size={sizeControl}
            variant="secondary"
            onClick={onClickButton}
          >
            {buttonText && (
              <Button.Label>{buttonText}</Button.Label>
            )}
            <Button.Icon><Icon name={buttonIcon} /></Button.Icon>
          </Button>
        </Form.InputGroup.Append>
      </Form.InputGroup>
    </Form.Group>
  ));

const SearchBoxWithDisplayName = Object.assign(SearchBox, {
  displayName: 'SearchBox',
});

export default SearchBoxWithDisplayName;
