import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import PageLayout from '..';

describe('components/PageLayout', () => {
  const pageLayoutRef = createRef<HTMLDivElement>();
  const pageLayoutHeaderRef = createRef<HTMLDivElement>();
  const pageLayoutBodyRef = createRef<HTMLDivElement>();
  const pageLayoutFooterRef = createRef<HTMLDivElement>();

  const setup = ({
    pageLayoutProps = {},
    pageLayoutHeaderProps = {},
    pageLayoutBodyProps = {},
    pageLayoutFooterProps = {},
  } = {}) => {
    render(
      <PageLayout ref={pageLayoutRef} {...pageLayoutProps}>
        <PageLayout.Header
          ref={pageLayoutHeaderRef}
          {...pageLayoutHeaderProps}
        />
        <PageLayout.Body
          ref={pageLayoutBodyRef}
          {...pageLayoutBodyProps}
        />
        <PageLayout.Footer
          ref={pageLayoutFooterRef}
          {...pageLayoutFooterProps}
        />
      </PageLayout>,
    );

    expect(pageLayoutRef.current).toBeTruthy();
    expect(pageLayoutHeaderRef.current).toBeTruthy();
    expect(pageLayoutBodyRef.current).toBeTruthy();
    expect(pageLayoutFooterRef.current).toBeTruthy();

    expect(pageLayoutRef.current).toHaveClass('PageLayout');
    expect(pageLayoutHeaderRef.current).toHaveClass('PageLayout-header');
    expect(pageLayoutBodyRef.current).toHaveClass('PageLayout-body');
    expect(pageLayoutFooterRef.current).toHaveClass('PageLayout-footer');
  };

  describe('Render PageLayout without passing props', () => {
    it('should render card', () => {
      setup();

      expect(pageLayoutBodyRef.current).toHaveClass('u-flex u-flexGrow1');
    });
  });

  describe('Render PageLayout with passing props', () => {
    const componentProps = {
      className: 'u-block',
      style: {
        color: 'white',
      },
    };

    it.each([
      ['header', pageLayoutHeaderRef],
      ['body', pageLayoutBodyRef],
      ['footer', pageLayoutFooterRef],
    ])('should render with passing %s prop to its component', (name, ref) => {
      setup({
        [`pageLayout${name[0].toUpperCase() + name.slice(1)}Props`]:
          componentProps,
      });

      expect(ref.current).toHaveClass('u-block');
      expect(ref.current).toHaveStyle({ color: 'white' });
    });

    it.each([
      ['header', pageLayoutHeaderRef],
      ['body', pageLayoutBodyRef],
      ['footer', pageLayoutFooterRef],
    ])(
      'should render with passing %s prop to parent PageLayout component',
      (name, ref) => {
        setup({
          pageLayoutProps: {
            [`${name}Props`]: componentProps,
          },
        });

        expect(ref.current).toHaveClass('u-block');
        expect(ref.current).toHaveStyle({ color: 'white' });
      },
    );

    it('should render with className', () => {
      const className = 'u-block';
      setup({ pageLayoutProps: { className } });
      expect(pageLayoutRef.current).toHaveClass(className);
    });
  });
});
