import React, {
  useMemo,
  useContext,
  ReactNode,
  forwardRef,
  createContext,
} from 'react';
import classNames from 'classnames';
import {
  AhaRefForwardingComponent,
  AsProp,
  ComponentCommonSize,
  ComponentSizeEnum,
} from 'types/common';

interface CardContextProps {
  /**
   * When this prop is set, it creates a Card with a Card.Body inside
   * passing the children directly to it
   * @default false
   */
  body: boolean;

  /**
   * Card size variants
   * @default "medium"
   * */
  size: ComponentCommonSize;
}

const Context = createContext<CardContextProps>({
  body: false,
  size: ComponentSizeEnum.medium,
});

export const sizesClassName = {
  [ComponentSizeEnum.small]: {
    content: 'u-paddingExtraSmall',
    title: 'u-text300',
  },
  [ComponentSizeEnum.medium]: {
    content: 'u-paddingSmall',
    title: 'u-text400',
  },
  [ComponentSizeEnum.large]: {
    content: 'u-paddingMedium',
    title: 'u-text600',
  },
};

export interface CardPartProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

const CardHeader: AhaRefForwardingComponent<React.ElementType, CardPartProps> = forwardRef(
  (
    { className, as, ...props }: CardPartProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { size } = useContext(Context);
    const Component = as || 'div';

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
  },
);

const CardTitle: AhaRefForwardingComponent<React.ElementType, CardPartProps> = forwardRef(
  (
    { className, as, ...props }: CardPartProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { size } = useContext(Context);
    const Component = as || 'div';

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
  },
);

const CardBody: AhaRefForwardingComponent<React.ElementType, CardPartProps> = forwardRef(
  (
    { className, as, ...props }: CardPartProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { size } = useContext(Context);
    const Component = as || 'div';

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
  },
);

export type CardProps = CardPartProps & Partial<CardContextProps>;

const Card: AhaRefForwardingComponent<React.ElementType, CardProps> = forwardRef(
  (
    {
      className,
      body = false,
      size = ComponentSizeEnum.medium,
      children,
      as,
      ...props
    }: CardProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const context = useMemo(() => ({ size, body }), [size, body]);
    const Component = as || 'div';

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
  },
);

const CompoundCard = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  displayName: 'Card',
});

export default CompoundCard;
