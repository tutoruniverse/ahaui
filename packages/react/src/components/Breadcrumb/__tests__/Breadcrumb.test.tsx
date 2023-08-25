import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb, { BreadcrumbProps } from '..';
import { BreadcrumbItemProps } from '../Item';

describe('components/Breadcrumb', () => {
  const ref = createRef<HTMLUListElement>();
  const itemRef1 = createRef<HTMLLIElement>();
  const itemRef2 = createRef<HTMLLIElement>();

  const setup = (props?: BreadcrumbProps, itemProps?: BreadcrumbItemProps) => {
    render(
      <Breadcrumb ref={ref} {...props}>
        <Breadcrumb.Item ref={itemRef1} {...itemProps}>
          Item 1
        </Breadcrumb.Item>

        <Breadcrumb.Item ref={itemRef2} {...itemProps}>
          Item 1
        </Breadcrumb.Item>
      </Breadcrumb>,
    );

    expect(ref.current).toBeTruthy();
    expect(itemRef1.current).toBeTruthy();
    expect(itemRef2.current).toBeTruthy();

    expect(ref.current).toHaveClass('Breadcrumb');
    expect(itemRef1.current).toHaveClass('Breadcrumb-item');
    expect(itemRef2.current).toHaveClass('Breadcrumb-item');
  };

  describe('Render Breadcrumb without passing props', () => {
    it('should render breadcrumb', () => {
      setup();

      // Schema default value is false
      expect(ref.current).not.toHaveAttribute('itemScope');
      expect(ref.current).not.toHaveAttribute('itemType');

      expect(itemRef1.current?.firstChild).toBeInstanceOf(HTMLAnchorElement);
      expect(itemRef2.current?.firstChild).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Render Breadcrumb with passing props', () => {
    it('should render breadcrumb with schema = "true"', () => {
      const className = 'className';
      const href = 'http://example.com';
      setup({ schema: true, className }, { href, className });

      expect(ref.current).toHaveAttribute('itemScope');
      expect(ref.current).toHaveAttribute(
        'itemType',
        'http://schema.org/BreadcrumbList',
      );

      expect(itemRef1.current?.firstChild).toBeInstanceOf(HTMLAnchorElement);
      expect(itemRef2.current?.firstChild).toBeInstanceOf(HTMLAnchorElement);

      expect(itemRef1.current?.firstChild).toHaveAttribute('href', href);
      expect(itemRef2.current?.firstChild).toHaveAttribute('href', href);

      expect(itemRef1.current?.firstChild).toHaveClass('u-textGray', 'hover:u-textLink');
      expect(itemRef2.current?.firstChild).not.toHaveClass('u-textGray', 'hover:u-textLink');

      expect(ref.current?.className).toContain(className);
      expect(itemRef1.current?.className).toContain(className);
      expect(itemRef2.current?.className).toContain(className);
    });

    it('should render breadcrumb with schema = "true" and noHref = "true"', () => {
      setup({ schema: true }, { noHref: true });

      expect(ref.current).toHaveAttribute('itemScope');
      expect(ref.current).toHaveAttribute(
        'itemType',
        'http://schema.org/BreadcrumbList',
      );

      expect(itemRef1.current?.firstChild).toBeInstanceOf(HTMLAnchorElement);
      expect(itemRef2.current?.firstChild).toBeInstanceOf(HTMLAnchorElement);

      expect(itemRef1.current?.firstChild).toHaveClass('u-textGray');
      expect(itemRef2.current?.firstChild).not.toHaveClass('u-textGray');
    });

    it('should render breadcrumb with schema = "false" and noHref = "true"', () => {
      setup({ schema: false }, { noHref: true });

      expect(ref.current).not.toHaveAttribute('itemScope');
      expect(ref.current).not.toHaveAttribute(
        'itemType',
        'http://schema.org/BreadcrumbList',
      );

      expect(itemRef1.current?.firstChild).toBeInstanceOf(HTMLSpanElement);
      expect(itemRef2.current?.firstChild).toBeInstanceOf(HTMLSpanElement);

      expect(itemRef1.current?.firstChild).toHaveClass('u-textGray');
      expect(itemRef2.current?.firstChild).not.toHaveClass('u-textGray');
    });
  });

  describe('Render Breadcrumb without children', () => {
    it('should render Breadcrumb without children', () => {
      render(<Breadcrumb ref={ref} />);

      expect(ref.current?.children.length).toBe(0);
    });

    it('should not render child = "false"', () => {
      const children = [(<Breadcrumb.Item key="item">Item</Breadcrumb.Item>), null];

      render(
        <Breadcrumb ref={ref}>
          {children}
        </Breadcrumb>,
      );

      expect(ref.current?.children.length).toBe(1);
    });
  });

  describe('Render Breadcrumb with children are other types', () => {
    it('should render Breadcrumb with children are other types', () => {
      render(
        <Breadcrumb ref={ref}>
          test
        </Breadcrumb>,
      );
      expect(ref.current?.children.length).toBe(0);
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  },
  );
});
