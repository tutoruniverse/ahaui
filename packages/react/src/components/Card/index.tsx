import React, {
  useMemo,
  useContext,
  ReactNode,
  forwardRef,
  createContext,
} from 'react';
import classNames from 'classnames';
import {
  ComponentCommonSize,
  ComponentSizeEnum,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
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

interface CardBasicProps {
  children?: ReactNode;
  className?: string;
}

type CardPartsProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, CardBasicProps>;

type CardPartsComponent = <T extends React.ElementType = 'div'>(props: CardPartsProps<T>) => React.ReactElement | null;


const CardHeader: CardPartsComponent = forwardRef(
  <T extends React.ElementType = 'div'>(
    { className, as, ...props }: CardPartsProps<T>,
    ref: PolymorphicRef<T>,
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

const CardTitle: CardPartsComponent = forwardRef(
  <T extends React.ElementType>(
    { className, as, ...props }: CardPartsProps<T>,
    ref: PolymorphicRef<T>,
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

const CardBody: CardPartsComponent = forwardRef(
  <T extends React.ElementType>(
    { className, as, ...props }: CardPartsProps<T>,
    ref: PolymorphicRef<T>,
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

type CardProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  CardBasicProps & Partial<CardContextProps>
>;

type CardComponent = <T extends React.ElementType = 'div'>(
  props: CardProps<T>
) => React.ReactElement | null;

const Card: CardComponent = forwardRef(
  <T extends React.ElementType>(
    {
      className,
      body = false,
      size = ComponentSizeEnum.medium,
      children,
      as,
      ...props
    }: CardProps<T>,
    ref: PolymorphicRef<T>,
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
});



export default CompoundCard;
