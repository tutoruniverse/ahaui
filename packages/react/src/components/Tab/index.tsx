import React, { ComponentPropsWithRef, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Directions, VariantColors, EnumToUnion, DirectionEnum } from 'types/common';
import Item from './Item';

export type VariantForTag = Extract<VariantColors, 'dark'>

enum VisualEnum {
  default = 'default',
  filled = 'filled'
}

type Visual = EnumToUnion<VisualEnum>

type PropTypes = {
  /**
   * Set current tab item
   * @controllable onSelect
   * */
  current?: string;
  /** Callback fired when the tab item is clicked. */
  onSelect?: (path?: string) => void;
  /** Set Tabs to full width */
  fullWidth?: boolean;
  /**
   * Define direction of the Tabs
   * @default 'horizontal'
   */
  direction?: Directions;
  /**
   * Define visual of the Tabs
   * @default 'default'
   */
  visual?: Visual;
  /** Set color for text and the line under active item */
  variant?: VariantForTag;
} & ComponentPropsWithRef<'div'>;

export const TabContext = React.createContext<
  Pick<PropTypes, 'variant' | 'onSelect' | 'current'>
>({});

const Tab = React.forwardRef<HTMLDivElement, PropTypes>(
  (
    {
      className,
      variant,
      children,
      current,
      fullWidth,
      onSelect,
      direction = DirectionEnum.horizontal,
      visual = VisualEnum.default,
      ...props
    },
    ref,
  ) => {
    const modifiedChildren = React.Children.map(children, (child, index) => {
      if (!child) {
        return null;
      }

      if (!React.isValidElement(child)) {
        return child;
      }

      const path = child.props.eventKey || index;
      return React.cloneElement(child as React.ReactElement, {
        index,
        fullWidth,
        direction,
        visual,
        path: path.toString(),
      });
    });

    const contextValue = useMemo(
      () => ({
        current,
        onSelect,
        variant,
      }),
      [current, onSelect, variant],
    );

    return (
      <TabContext.Provider value={contextValue}>
        <div
          ref={ref}
          {...props}
          className={classNames(
            'Tab',
            direction && `Tab--${direction}`,
            'u-flex u-positionRelative u-text200 u-fontMedium',
            fullWidth && 'u-justifyContentBetween',
            direction === 'vertical' && 'u-flexColumn',
            className && className,
          )}
        >
          {modifiedChildren}
          {direction === 'vertical' && (
            <div className="Tab--leftLine u-widthExtraTiny u-positionAbsolute u-positionLeft u-heightFull u-backgroundLighter" />
          )}
        </div>
      </TabContext.Provider>
    );
  },
);

const CompoundTab = Object.assign(Tab, { Item });
export default CompoundTab;
