import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { VariantColorsEnum } from 'types/common';
import Tab from '..';

describe('components/Tab', () => {
  const tabRef = createRef<HTMLDivElement>();
  const tabItemRef1 = createRef<HTMLDivElement>();
  const tabItemRef2 = createRef<HTMLDivElement>();

  let tabItemContainer1:ParentNode;
  let tabItemContainer2: ParentNode;

  const setup = (tabProps = {}, itemProps1 = {}, itemProps2 = {}) => {
    render(
      <Tab {...tabProps} ref={tabRef}>
        <Tab.Item {...itemProps1} ref={tabItemRef1}>
          Item 1
        </Tab.Item>
        <Tab.Item {...itemProps2} ref={tabItemRef2}>
          Item 2
        </Tab.Item>
      </Tab>,
    );
    // Check if we can pass ref
    expect(tabRef.current).toBeTruthy();
    expect(tabItemRef1).toBeTruthy();
    expect(tabItemRef2).toBeTruthy();

    tabItemContainer1 = tabItemRef1.current?.parentNode as ParentNode;
    tabItemContainer2 = tabItemRef2.current?.parentNode as ParentNode;

    // Check if it renders correctly
    expect(tabRef.current).toHaveClass('Tab');
    expect(tabItemContainer1).toHaveClass('Tab-item');
    expect(tabItemContainer2).toHaveClass('Tab-item');
  };

  describe('Render tab without passing props', () => {
    it('should render tab', () => {
      setup();

      // Check if Tab container has default props set
      // Direction `horizontal`
      expect(tabRef.current).toHaveClass('Tab--horizontal');

      // Visual `default`
      // Visual will be passed to tabItem
      // First item container will not have margin left
      expect(tabItemContainer1).not.toHaveClass('u-marginLeftSmall');
      expect(tabItemContainer2).toHaveClass('u-marginLeftSmall');
    });
  });

  describe('Render tab with passing props', () => {
    it('should render tab with current prop', () => {
      let current = 'tab_1';
      const onSelect = jest.fn((path) => {
        current = path;
      });

      setup(
        {
          current,
          onSelect,
        },
        {
          eventKey: 'tab_1',
        },
        {
          eventKey: 'tab_2',
        },
      );

      // Active tab is the first tab
      expect(tabItemContainer1.children.length).toBeGreaterThan(1);
      expect(tabItemContainer1.children[0]).toHaveClass(
        'Tab-itemAfter',
      );
      expect(tabItemContainer2.children.length).toBe(1);

      // Click to second tab
      tabItemRef2.current?.click();
      expect(onSelect).toBeCalledTimes(1);
      expect(current).toBe('tab_2');

      // Rerender with new current
      setup(
        {
          current,
          onSelect,
        },
        {
          eventKey: 'tab_1',
        },
        {
          eventKey: 'tab_2',
        },
      );

      // Active tab is now the second tab
      expect(tabItemContainer2.children.length).toBeGreaterThan(1);
      expect(tabItemContainer2.children[0]).toHaveClass(
        'Tab-itemAfter',
      );
      expect(tabItemContainer1.children.length).toBe(1);
    });

    it('should render tab with variant prop', () => {
      setup(
        {
          current: 'tab_1',
          variant: VariantColorsEnum.dark,
        },
        {
          eventKey: 'tab_1',
        },
        {
          eventKey: 'tab_2',
        },
      );

      // Not use default variant props
      expect(tabItemRef1.current).not.toHaveClass('u-textPrimary');
      expect(tabItemContainer1.children[0]).not.toHaveClass('u-backgroundPrimary');
      expect(tabItemContainer2.children.length).toBe(1);
    });

    it('should render tab with fullWidth prop', () => {
      setup({
        fullWidth: true,
      });

      expect(tabRef.current).toHaveClass('u-justifyContentBetween');

      expect(tabItemRef1.current).toHaveClass('u-textCenter');
      expect(tabItemRef2.current).toHaveClass('u-textCenter');
    });

    it('should render tab with direction = "vertical" and visual = "filled"', () => {
      const tabProps = {
        direction: 'vertical',
        visual: 'filled',
        current: 'tab_1',
      };
      setup(
        tabProps,
        {
          eventKey: 'tab_1',
        },
        {
          eventKey: 'tab_2',
        },
      );

      expect(tabRef.current).toHaveClass(
        `Tab--${tabProps.direction}`,
        'u-flexColumn',
      );

      // With vertical direction, it will have the left line
      // The last children is the line
      const childrenLength = tabRef.current?.children.length as number;
      expect(tabRef.current?.children[childrenLength - 1]).toHaveClass(
        'Tab--leftLine',
      );

      // The item with index > 0 will have border top
      expect(tabItemContainer2).toHaveClass('u-borderTop');

      // With visual `filled`, the active line will be a the top of item
      expect(tabItemContainer1.children[0]).toHaveClass(
        'u-positionTop',
      );
    });

    it('should render tab with direction = "horizontal" and visual = "filled"', () => {
      const tabProps = {
        direction: 'horizontal',
        visual: 'filled',
      };
      setup(tabProps);

      // The item with index > 0 will have border left
      expect(tabItemContainer2).toHaveClass('u-borderLeft');
    });

    it("should render tab with tab item's disabled prop", () => {
      const onSelect = jest.fn();
      setup({ onSelect }, {}, { disabled: true });

      tabItemRef2.current?.click();
      expect(onSelect).toHaveBeenCalledTimes(0);

      expect(tabItemContainer2).toHaveClass(
        'is-disabled u-cursorNotAllow',
      );
      expect(tabItemRef2.current).toHaveClass('u-textLight');
    });

    it('should render tab with className', () => {
      const className = 'tabClassName';
      setup({ className });
      expect(tabRef.current).toHaveClass(className);
    });

    it('should render tab without children', () => {
      // eslint-disable-next-line react/no-children-prop
      render(<Tab ref={tabRef} children={[null]} />);
      expect(tabRef.current?.children.length).toBe(0);
    });

    it('should render tab with invalid children', () => {
      // eslint-disable-next-line react/no-children-prop
      render(<Tab ref={tabRef} children={['string']} />);
      expect(tabRef.current?.children.length).toBe(0);
    });
  });
});
