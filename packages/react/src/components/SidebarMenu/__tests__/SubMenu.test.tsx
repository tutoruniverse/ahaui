import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import SubMenu from '../SubMenu';
import { SidebarMenuContextType, SidebarMenuSizeEnum, SidebarContext } from '../Context';
import SidebarMenu from '..';

describe('components/SidebarMenu/SubMenu', () => {
  const subMenuRef = createRef<HTMLDivElement>();

  const defaultContextValue = {
    current: '',
    onSelect: () => {},
    size: SidebarMenuSizeEnum.medium,
  } as SidebarMenuContextType;

  const setup = (props = {}, contextValue: SidebarMenuContextType = defaultContextValue) => setupWithUserEvent(render(
    <SidebarContext.Provider value={contextValue}>
      <SubMenu eventKey="sub-menu" {...props} ref={subMenuRef}>
        <SidebarMenu.Item separated icon="volumeHigh" eventKey="audio" data-testid="submenuItem-1">Audio</SidebarMenu.Item>
        <SidebarMenu.Item icon="notification" eventKey="notification" data-testid="submenuItem-2">Notification</SidebarMenu.Item>
        <SidebarMenu.Item icon="notification" eventKey="#video" data-testid="submenuItem-3">Video</SidebarMenu.Item>
        <SidebarMenu.Item icon="notification" data-testid="submenuItem-3">Mode</SidebarMenu.Item>
      </SubMenu>
    </SidebarContext.Provider>,
  ));

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      // Check if component has default props set
      expect(subMenuRef.current).toBeTruthy();
    });
  });

  describe('Render with passing props', () => {
    it('should render with className prop', () => {
      const className = 'custom-className';

      setup({ className });

      expect(subMenuRef.current).toHaveClass(className);
    });

    it('should render with icon prop correctly', () => {
      setup({ icon: 'store' });

      const icon = screen.queryByTestId('icon');
      expect(icon).toBeTruthy();
    });

    it('should render with title prop correctly', () => {
      const titleContent = 'Title';
      setup({ title: titleContent });

      const titleElement = screen.queryByTestId('title');
      expect(titleElement).toHaveTextContent(titleContent);
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

    it.each(Object.values(SidebarMenuSizeEnum))('should render with size prop correctly, size is %s', (size) => {
      setup({ size, icon: 'store' });

      // check wrapper
      const wrapper = screen.queryByTestId('wrapper');
      if (size === SidebarMenuSizeEnum.medium) {
        expect(wrapper).toHaveClass('u-paddingVerticalSmall');
      } else if (size === SidebarMenuSizeEnum.small) {
        expect(wrapper).toHaveClass('u-paddingVerticalExtraSmall');
      }

      // check icon
      const icon = screen.queryByTestId('icon') as Element;
      if (size === SidebarMenuSizeEnum.small) {
        expect(getComputedStyle(icon).marginTop).toBe('2px');
      }

      // check title
      const title = screen.queryByTestId('title');
      if (size === SidebarMenuSizeEnum.small) {
        expect(title).toHaveClass('u-text200');
      }
    });

    it('should render with active path', () => {
      setup({ path: 'home', icon: 'store' }, { ...defaultContextValue, current: 'home/item' });

      expect(subMenuRef.current).toHaveClass('is-showing');

      expect(screen.queryByTestId('sidebarMenu-itemAfter')).toBeTruthy();
    });

    it('should render with hightLightWhiteList', () => {
      const hightLightWhitelist = ['sub-menu/notification'];
      setup({ path: 'sub-menu/notification', icon: 'store', hightLightWhitelist }, { ...defaultContextValue, current: 'sub-menu/notification' });

      expect(subMenuRef.current).toHaveClass('is-showing');

      expect(screen.queryByTestId('sidebarMenu-itemAfter')).toBeTruthy();
    });

    it('should render the children correctly', async () => {
      const level = 1;
      const onSelect = jest.fn();

      const { user } = setup({ level, icon: 'setting', title: 'Settings', eventKey: 'setting', path: 'setting/', autoCollapse: true }, { ...defaultContextValue, current: 'setting/audio', onSelect });

      const subItem1 = screen.queryByTestId('submenuItem-1') as Element;
      const subItem2 = screen.queryByTestId('submenuItem-2') as Element;

      expect(subItem1).toBeVisible();
      expect(subItem2).toBeVisible();

      await user.click(subItem1);

      expect(onSelect).toBeCalled();
    });

    it('should render without children', () => {
      render(
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <SidebarContext.Provider value={{ ...defaultContextValue, current: 'setting' }}>
          <SubMenu ref={subMenuRef} path="setting">
            {false}
          </SubMenu>
        </SidebarContext.Provider>,
      );

      expect(subMenuRef.current?.children.length).toBe(2);
    });

    it('should render with children is string', () => {
      render(
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <SidebarContext.Provider value={{ ...defaultContextValue, current: 'setting' }}>
          <SubMenu ref={subMenuRef} path="setting">
            Test
          </SubMenu>
        </SidebarContext.Provider>,
      );

      expect(subMenuRef.current?.lastChild).toHaveTextContent('Test');
    });

    it('should handle open close when click', async () => {
      const { user } = setup({ icon: 'setting', title: 'Settings', eventKey: 'setting', path: 'setting/' }, { ...defaultContextValue, current: 'setting/audio' });

      expect(subMenuRef.current?.children.length).toBe(6);

      await user.click(screen.queryByTestId('wrapper') as Element);

      expect(subMenuRef.current?.children.length).toBe(2);
    });

    it('should render with disabled props is true', () => {
      setup({ disabled: true, icon: 'store', badge: 'Badge' });

      expect(subMenuRef.current).toHaveClass('u-pointerEventsNone u-cursorNotAllow');

      expect(screen.queryByTestId('icon')).toHaveClass('u-textLight');
    });

    it('should render padding correctly with multiple submenu level', () => {
      render(
        <SidebarMenu current="level-1.level-2.level-3.audio" onSelect={() => {}}>
          <SubMenu eventKey="level-1" data-testid="sub-menu__level-1">
            <SubMenu eventKey="level-2" data-testid="sub-menu__level-2">
              <SubMenu eventKey="level-3" data-testid="sub-menu__level-3">
                <SidebarMenu.Item icon="volumeHigh" eventKey="audio">
                  Audio
                </SidebarMenu.Item>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </SidebarMenu>,
      );

      const subMenu1 = screen.getByTestId('sub-menu__level-1');
      const subMenu2 = screen.getByTestId('sub-menu__level-2');
      const subMenu3 = screen.getByTestId('sub-menu__level-3');

      expect(subMenu1.children[1]).not.toHaveClass('u-paddingLeftLarge');
      expect(subMenu2.children[0]).toHaveClass('u-paddingLeftLarge');
      expect(subMenu3.children[0]).not.toHaveClass('u-paddingLeftLarge');
      expect(subMenu3.children[0]).toHaveStyle({ paddingLeft: '48px' });
    });
  });
});
