export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export interface PrefixProps<As extends React.ElementType = React.ElementType> {
  as?: As;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface RefForwardingComponent<TInitial extends React.ElementType, P = unknown> {
  <TAs extends React.ElementType = TInitial>(
    props: P & { as?: TAs } & React.ComponentPropsWithRef<TAs>,
    ref: React.ForwardedRef<React.ElementRef<TAs>>
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}
