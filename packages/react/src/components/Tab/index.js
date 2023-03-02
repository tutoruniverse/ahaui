import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TabContext from './Context';
import Item from './Item';

const propTypes = {
  /**
   * Set current tab item
   * @controllable onSelect
   * */
  current: PropTypes.string,
  /** Callback fired when the tab item is clicked. */
  onSelect: PropTypes.func,
  /** Set Tabs to full width */
  fullWidth: PropTypes.bool,
  /** Define direction of the Tabs */
  direction: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]),
  /** Define visual of the Tabs */
  visual: PropTypes.oneOf([
    'default',
    'filled',
  ]),
};

const defaultProps = {
  direction: 'horizontal',
  visual: 'default',
};
const Tab = React.forwardRef(({ className, variant = 'primary', children, current, fullWidth, onSelect, direction, visual, ...props }, ref) => {
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }
    const path = child.props.eventKey || index;
    return React.cloneElement(
      child, ({
        index,
        fullWidth,
        direction,
        visual,
        path: path.toString(),
      })
    );
  });
  return (
    <TabContext.Provider
      value={{
        current,
        onSelect,
        variant,
      }}
    >
      <div
        ref={ref}
        {...props}
        className={classNames(
          'Tab',
          direction && `Tab--${direction}`,
          'u-flex u-positionRelative u-text200 u-fontMedium',
          fullWidth && 'u-justifyContentBetween',
          direction === 'vertical' && 'u-flexColumn',
          className && className
        )}
      >
        {modifiedChildren}
        {direction === 'vertical' && (
          <div className="Tab--leftLine u-widthExtraTiny u-positionAbsolute u-positionLeft u-heightFull u-backgroundLighter" />
        )}
      </div>
    </TabContext.Provider>
  );
});

Tab.Item = Item;
Tab.defaultProps = defaultProps;
Tab.displayName = 'Tab';
Tab.propTypes = propTypes;
export default Tab;
