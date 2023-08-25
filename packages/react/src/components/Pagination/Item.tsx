import React from 'react';
import classNames from 'classnames';
import Button, { ButtonVariant, ButtonVariantEnum } from 'components/Button';
import Icon from 'components/Icon';
import SafeAnchor from 'components/SafeAnchor';
import { AhaRefForwardingComponent } from 'types/common';

export interface PaginationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active?: boolean;
  /** Disables the PageItem */
  disabled?: boolean;

  safeItem?: boolean;

  displayName?: string;
}

export const PageItem: AhaRefForwardingComponent<React.ElementType, PaginationItemProps> = React.forwardRef(
  (
    {
      className,
      active = false,
      safeItem = false,
      disabled = false,
      children,
      displayName,
      ...props
    }: PaginationItemProps,
    ref: React.ForwardedRef<HTMLAnchorElement>,
  ) => {
    let variant = active ? ButtonVariantEnum.primary_outline : ButtonVariantEnum.secondary;
    if (safeItem) {
      variant = ButtonVariantEnum.default;
    }
    const Component = active || disabled || safeItem ? 'span' : SafeAnchor;
    let background;
    if (active) {
      background = 'rgba(231, 236, 252, 1)';
    } else if (disabled) {
      background = 'white';
    }

    return (
      <li
        className={classNames(
          'Pagination-item',
          active ? 'is-active' : undefined,
          'u-inlineBlock u-marginHorizontalTiny u-marginBottomExtraSmall',
          className && className,
        )}
      >
        <Component {...props} ref={ref} className="u-block hover:u-textDecorationNone">
          <Button
            as="div"
            variant={variant as ButtonVariant}
            className={classNames(
              'Pagination-item u-borderNone',
            )}
            disabled={disabled}
            onlyIcon={!!(safeItem || displayName)}
            style={{
              background,
              color: disabled ? 'rgba(193, 199, 208, 1)' : undefined,
            }}
          >
            {children}
          </Button>
        </Component>
      </li>
    );
  });


function createButton(
  name: string,
  defaultValue: React.ReactNode,
  safeItem: boolean,
  className?: string,
) {
  const Block = React.forwardRef(
    (
      props: PaginationItemProps,
      ref: React.ForwardedRef<HTMLAnchorElement>,
    ) => {
      const { children, ...rest } = props;
      delete props.active;

      return (
        <PageItem {...rest} ref={ref} safeItem={safeItem} displayName={name} className={className}>
          {children || defaultValue}
        </PageItem>
      );
    },
  );

  return Block;
}
export const Prev = createButton('Prev', <Button.Icon><Icon className="u-textDark900" name="arrowBack" size="extraSmall" /></Button.Icon>, false, 'Pagination-prev');
export const Ellipsis = createButton('Ellipsis', <Button.Icon><Icon name="more" className="u-textLight" size="extraSmall" /></Button.Icon>, true);
export const Next = createButton('Next', <Button.Icon><Icon name="arrowForward" className="u-textDark900" size="extraSmall" /></Button.Icon>, false, 'Pagination-next');
