import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import Header, { HeaderProps } from '..';

describe('components/Header', () => {
  const headerRef = createRef<HTMLDivElement>();
  const leftRef = createRef<HTMLDivElement>();
  const rightRef = createRef<HTMLDivElement>();
  const brandRef = createRef<HTMLDivElement>();
  const mainRef = createRef<HTMLDivElement>();

  const allChildren = (
    <>
      <Header.Brand ref={brandRef}>
        Logo
      </Header.Brand>
      <Header.Main ref={mainRef}>
        <Header.Left ref={leftRef}>
          Header Left
        </Header.Left>
        <Header.Right ref={rightRef}>
          Header Right
        </Header.Right>
      </Header.Main>
    </>
  );

  const setup = (headerProps?: Partial<HeaderProps>) => {
    const {
      children,
      ...others
    } = headerProps || {};
    return render(<Header ref={headerRef} {...others}>{children}</Header>);
  };

  describe('Render header without passing props', () => {
    it('should render with default props', () => {
      const { container } = setup();
      expect(headerRef.current).toBeTruthy();
      expect(headerRef.current?.className).toContain('Header');
      expect(container.getElementsByClassName('Container--fluid')).toHaveLength(0);
    });
  });

  describe('Render header with passing props', () => {
    const className = 'className';
    const innerClassName = ' innerClassName';

    it('should not render header', () => {
      setup({ show: false });

      expect(headerRef.current).toBeFalsy();
    });

    it('should render with full width', () => {
      const { container } = setup({ fullWidth: true });

      expect(headerRef.current).toBeTruthy();
      expect(container.getElementsByClassName('Container--fluid')).toBeTruthy();
    });

    it('should render with custom style', () => {
      const { container } = setup({ className, innerClassName });

      expect(headerRef).toBeTruthy();
      expect(headerRef.current?.className).toContain('className');
      expect(container.getElementsByClassName('innerClassName')).toHaveLength(1);
    });
  });

  describe('Render header with all of elements', () => {
    it('should render all of elements', () => {
      setup({ children: allChildren });

      expect(headerRef).toBeTruthy();
      expect(brandRef).toBeTruthy();
      expect(mainRef).toBeTruthy();
      expect(leftRef).toBeTruthy();
      expect(rightRef).toBeTruthy();
    });
  });
});
