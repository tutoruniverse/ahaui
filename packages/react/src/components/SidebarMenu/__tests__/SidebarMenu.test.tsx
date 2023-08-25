import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import SidebarMenu, { SidebarMenuProps } from '..';

describe('components/SidebarMenu', () => {
  const sidebarMenuRef = createRef<HTMLDivElement>();

  const setup = ({ current, onSelect, ...otherProps }: SidebarMenuProps) => setupWithUserEvent(render(
    <SidebarMenu {...otherProps} current={current} onSelect={onSelect} ref={sidebarMenuRef}>
      <SidebarMenu.Item eventKey="home" data-testid="submenuItem-1">Home</SidebarMenu.Item>
      <SidebarMenu.Item eventKey="payment" data-testid="submenuItem-2">Payment</SidebarMenu.Item>
      <SidebarMenu.SubMenu data-testid="submenu" icon="setting" eventKey="setting" title="Settings">
        <SidebarMenu.Item separated icon="volumeHigh" eventKey="audio">Audio</SidebarMenu.Item>
        <SidebarMenu.Item icon="notification" eventKey="notification">Notification</SidebarMenu.Item>
      </SidebarMenu.SubMenu>
      <SidebarMenu.Item data-testid="submenuItem-3">Shopping</SidebarMenu.Item>
    </SidebarMenu>,
  ));

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup({ current: 'home', onSelect: () => {} });

      // Check if component has default props set
      expect(sidebarMenuRef.current).toBeTruthy();
    });
  });

  describe('Render with passing props', () => {
    it('should render with className prop', () => {
      const className = 'custom-className';

      const { container } = setup({ className, current: 'home', onSelect: () => {} });

      expect(container.firstChild).toHaveClass(className);
    });

    it('should render the children correctly', async () => {
      const onSelect = jest.fn();

      const { user } = setup({ current: 'home', onSelect, autoCollapse: true });

      const subItem1 = screen.queryByTestId('submenuItem-1');
      const subItem2 = screen.queryByTestId('submenuItem-2');
      const submenu = screen.queryByTestId('submenu');

      expect(sidebarMenuRef.current?.children.length).toBe(4);

      expect(subItem1).toBeVisible();
      expect(subItem2).toBeVisible();
      expect(submenu).toBeVisible();

      await user.click(subItem1 as Element);

      expect(onSelect).toBeCalled();
      expect(onSelect).toBeCalledWith('home');
    });

    it('should render without the children', () => {
      render(
        <SidebarMenu ref={sidebarMenuRef} current="home" onSelect={() => {}}>
          {false}
        </SidebarMenu>,
      );

      expect(sidebarMenuRef.current?.children.length).toBe(0);
    });

    it('should render the children with string value', () => {
      render(
        <SidebarMenu ref={sidebarMenuRef} current="home" onSelect={() => {}}>
          Test
        </SidebarMenu>,
      );

      expect(sidebarMenuRef.current?.firstChild).toHaveTextContent('Test');
    });
  });
});
