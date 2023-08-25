import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { Pagination } from 'index';
import { ButtonVariantEnum, variantsClassName } from 'components/Button';

describe('components/Pagination', () => {
  const itemRef = createRef<HTMLAnchorElement>();
  let itemButton: Element;

  const setup = (props = {}) => {
    render(
      <Pagination.Item ref={itemRef} {...props} />,
    );

    expect(itemRef.current).toBeTruthy();
    itemButton = itemRef.current?.firstChild as Element;
  };

  describe('Render Pagination.Item without passing props', () => {
    it('should render Pagination.Item without passing props', () => {
      setup();
      expect(itemRef.current).toBeInstanceOf(HTMLAnchorElement);
      expect(itemButton).not.toBeDisabled();
      expect(itemButton).toHaveClass('Button--medium', variantsClassName[ButtonVariantEnum.secondary]);
      expect(itemButton).not.toHaveClass('Button--minWidth u-widthFull u-textUppercase is-onlyIcon hover:u-textDecorationNone u-text200');
    });
  });

  describe('Render Pagination with passing props', () => {
    it('should render Pagination.Item with active = "true"', () => {
      setup({ active: true });

      expect(itemRef.current).toBeInstanceOf(HTMLSpanElement);

      expect(itemButton).toHaveClass(variantsClassName[ButtonVariantEnum.primary_outline]);

      expect(itemButton).toHaveStyle('background: rgba(231, 236, 252, 1)');

      expect(itemRef.current?.parentNode).toHaveClass('is-active');
    });

    it('should render Pagination.Item with disabled = "true"', () => {
      setup({ disabled: true });

      expect(itemButton).toHaveStyle('background: white');
      expect(itemButton).toHaveStyle('color: rgba(193, 199, 208, 1)');
      expect(itemButton).toHaveClass('is-disabled u-cursorNotAllow u-pointerEventsNone');
    });

    it('should render Pagination.Item with safeItem = "true"', () => {
      setup({ safeItem: true });

      expect(itemButton).not.toHaveClass('u-cursorPointer');
      expect(itemButton).toHaveClass('is-onlyIcon ');
    });

    it('should render Pagination.Item with className', () => {
      const className = 'paginationItemClassName';
      setup({ className });

      expect(document.querySelector('.Pagination-item')).toHaveClass(className);
    });

    it('should render Pagination.Item with displayName', () => {
      setup({ displayName: 'test' });

      expect(itemButton).toHaveClass('u-cursorPointer');
      expect(itemButton).toHaveClass('is-onlyIcon ');
    });
  });
});
