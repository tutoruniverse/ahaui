import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import SidebarMenuItem from '../Item';
import { SidebarMenuContextType, SidebarMenuSizeEnum, SidebarContext } from '../Context';

describe('components/SidebarMenu/Item', () => {
  const itemRef = createRef<HTMLAnchorElement>();

  const defaultContextValue = {
    current: '',
    onSelect: () => {},
    size: SidebarMenuSizeEnum.medium,
  } as SidebarMenuContextType;

  const setup = (props = {}, contextValue: SidebarMenuContextType = defaultContextValue) => setupWithUserEvent(render(
    <SidebarContext.Provider value={contextValue}>
      <SidebarMenuItem {...props} ref={itemRef} />
    </SidebarContext.Provider>,
  ));

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();
      // Check if component has default props set

      expect(itemRef.current).toBeTruthy();
    });
  });

  describe('Render with passing props', () => {
    it('should render the children correctly', () => {
      const children = (
        <>
          Menu Item Text
        </>
      );

      setup({ children });

      expect(itemRef.current?.firstChild).toHaveTextContent('Menu Item Text');
    });

    describe('Render the badge prop', () => {
      it('should render the badge correctly that is a function', () => {
        const badge = () => (
          <span>The badge is a function</span>
        );

        setup({ badge });

        expect(screen.queryByTestId('badge')?.firstChild).toHaveTextContent('The badge is a function');
      });

      it('should render the badge correctly that is a string', () => {
        const badge = 'The badge is a string';

        setup({ badge });

        expect(screen.queryByTestId('badge')?.firstChild).toHaveTextContent('The badge is a string');
      });
    });

    it('should render the icon correctly', () => {
      const { container } = setup({ icon: 'store' });

      //check wrapper
      expect(container.firstChild).toHaveClass('u-alignItemsTop');

      expect(screen.queryByTestId('icon')).toBeTruthy();
    });

    it('should render with disabled prop', async () => {
      const onCloseSubMenu = jest.fn();

      const { container, user } = setup({ disabled: true, icon: 'store', onCloseSubMenu, badge: 'Badge' });


      // check component
      expect(itemRef.current).toBeInstanceOf(HTMLSpanElement);
      expect(itemRef.current).toHaveClass('u-textLight');

      // check icon
      const icon = screen.queryByTestId('icon');
      expect(icon).toHaveClass('u-textLight');

      // check not call onCloseSubMenu function
      await user.click(container.firstChild as Element);
      expect(onCloseSubMenu).not.toHaveBeenCalled();
      expect(container.firstChild).toHaveClass('is-disabled');
    });

    it('should render with className prop', () => {
      const className = 'custom-className';

      const { container } = setup({ className });

      expect(container.firstChild).toHaveClass(className);
    });

    it('should render with isSubItem prop', () => {
      const { container } = setup({ isSubItem: true });

      expect(container.firstChild).toHaveClass('u-paddingLeftLarge');
    });

    it.each([1, 3])('should render with level prop is %s', (level) => {
      const { container } = setup({ level });

      if (level > 2) {
        expect(getComputedStyle(container.firstChild as Element).paddingLeft).toBe(`${level * 16}px`);
      } else {
        expect(getComputedStyle(container.firstChild as Element).paddingLeft).toBe('');
      }
    });

    it('should call onCloseSubMenu and onSelect when clicked', async () => {
      const path = 'home';
      const onSelect = jest.fn();
      const onCloseSubMenu = jest.fn();

      const { container, user } = setup({ path, onCloseSubMenu }, { ...defaultContextValue, onSelect });

      await user.click(container.firstChild as Element);
      expect(onCloseSubMenu).toHaveBeenCalled();

      expect(onSelect).toHaveBeenCalled();
      expect(onSelect).toHaveBeenCalledWith(path);
    });

    it('should render with active path', () => {
      const path = 'home';
      const onCloseSubMenu = jest.fn();

      const { container } = setup({ icon: 'store', path, onCloseSubMenu, badge: 'Badge' }, { ...defaultContextValue, current: path });

      expect(itemRef.current).toBeInstanceOf(HTMLSpanElement);
      expect(itemRef.current).toHaveClass('u-textPrimary u-fontMedium');

      // check wrapper
      expect(container.firstChild).toHaveClass('is-active');

      //check Sidebar Menu Item After
      expect(screen.queryByTestId('sidebarMenu-itemAfter')).toBeTruthy();

      // check Icon
      expect(screen.queryByTestId('icon')).toHaveClass('u-textPrimary');
    });

    it.each(Object.values(SidebarMenuSizeEnum))('should render with size prop is %s', (size) => {
      const { container } = setup({ size, icon: 'store' });

      if (size === SidebarMenuSizeEnum.medium) {
        expect(container.firstChild).toHaveClass('u-paddingVerticalSmall');
      }

      // check Icon
      if (size === SidebarMenuSizeEnum.small) {
        expect(getComputedStyle(screen.queryByTestId('icon') as Element).marginTop).toBe('2px');
      }
    });
  });
});
