import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import HeaderMobile from '../Mobile';

interface SetupHeaderProps {
  show?: boolean;
  showMenu?: boolean;
  hasDropContext?: boolean;
  headerClassName?: string;
  classNameToggle?: string;
  headerContextClassName?: string;
  dropContextClassName?: string;
}

describe('components/HeaderMobile', () => {
  const headerRef = createRef<HTMLDivElement>();
  const headerContextRef = createRef<HTMLDivElement>();
  const mainRef = createRef<HTMLDivElement>();
  const brandRef = createRef<HTMLDivElement>();
  const afterContext = createRef<HTMLDivElement>();
  const dropContextRef = createRef<HTMLDivElement>();

  const onToggle = jest.fn();

  const setup = (headerProps?: SetupHeaderProps) => {
    const {
      hasDropContext = true,
      headerClassName,
      classNameToggle,
      headerContextClassName,
      dropContextClassName,
      show,
      showMenu,
    } = headerProps || {};

    return setupWithUserEvent(render(
      <HeaderMobile ref={headerRef} hasDropContext={hasDropContext} className={headerClassName} onToggle={onToggle} show={show} showMenu={showMenu}>
        <HeaderMobile.Context ref={headerContextRef} className={headerContextClassName} classNameToggle={classNameToggle}>
          <HeaderMobile.Brand ref={brandRef}>
            Logo
          </HeaderMobile.Brand>
          <HeaderMobile.Main ref={mainRef}>
            Main
          </HeaderMobile.Main>
          <HeaderMobile.AfterContext ref={afterContext}>
            After Context
          </HeaderMobile.AfterContext>
          <HeaderMobile.DropContext ref={dropContextRef} className={dropContextClassName}>
            Drop Context
          </HeaderMobile.DropContext>
        </HeaderMobile.Context>
      </HeaderMobile>,
    ));
  };

  describe('Render header mobile without passing props', () => {
    it('should render with default props', () => {
      setup();

      expect(headerRef.current).toBeTruthy();
      expect(brandRef.current).toBeTruthy();
      expect(mainRef.current).toBeTruthy();
      expect(afterContext.current).toBeTruthy();
      expect(dropContextRef.current).toBeFalsy();
    });
  });

  describe('Render header mobile with passing props', () => {
    it('should not render with show is false', () => {
      setup({ show: false });

      expect(headerRef.current).toBeFalsy();
      expect(brandRef.current).toBeFalsy();
      expect(mainRef.current).toBeFalsy();
      expect(afterContext.current).toBeFalsy();
      expect(dropContextRef.current).toBeFalsy();
    });

    it('should not render with showMenu is false', () => {
      setup({ showMenu: true });

      expect(headerRef.current).toBeTruthy();
      expect(brandRef.current).toBeTruthy();
      expect(mainRef.current).toBeTruthy();
      expect(dropContextRef.current).toBeTruthy();
    });

    it('should show menu when clicking toggle', async () => {
      const { user } = setup();

      expect(dropContextRef.current).toBeFalsy();
      const toggle = await screen.findByRole('button');
      await user.click(toggle);

      expect(dropContextRef.current).toBeTruthy();
      expect(onToggle).toBeCalledTimes(1);
    });

    it('should render with custom css', () => {
      const headerClassName = 'headerClassName';
      const classNameToggle = 'classNameToggle';
      const headerContextClassName = 'headerContextClassName';
      const dropContextClassName = 'dropContextClassName';

      const { container } = setup({
        showMenu: true,
        headerClassName,
        classNameToggle,
        headerContextClassName,
        dropContextClassName,
      });

      expect(headerRef.current?.className).toContain('headerClassName');
      expect(headerContextRef.current?.className).toContain(headerContextClassName);
      expect(dropContextRef.current?.className).toContain(dropContextClassName);
      expect(container.querySelector('.classNameToggle')).toBeVisible();
    });
  });
});
