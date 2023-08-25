import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { Pagination } from 'index';
import { ComponentSizeEnum } from 'types/common';

describe('components/Pagination', () => {
  const ref = createRef<HTMLUListElement>();
  const itemRef = createRef<HTMLAnchorElement>();

  const setup = (props = {}) => {
    render(
      <Pagination {...props} ref={ref}>
        <Pagination.Prev ref={itemRef} />
        <Pagination.Item ref={itemRef} />
        <Pagination.Next ref={itemRef} />
      </Pagination>,
    );

    expect(ref.current).toBeTruthy();
    expect(itemRef.current).toBeTruthy();
  };

  describe('Render Pagination without passing props', () => {
    it('should render Pagination without passing props', () => {
      setup();
      expect(itemRef.current?.firstChild).toHaveClass('Button--small');
    });
  });

  describe('Render Pagination with passing props', () => {
    it.each([ComponentSizeEnum.large, ComponentSizeEnum.medium, ComponentSizeEnum.small])('should render Pagination with size = "%s"', (size) => {
      setup({ sizeControl: size });

      expect(itemRef.current?.firstChild).toHaveClass(`Button--${size}`);

      if (size !== 'small') {
        expect(itemRef.current?.firstChild).toHaveClass('u-textUppercase');
      } else {
        expect(itemRef.current?.firstChild).not.toHaveClass('u-textUppercase u-text200');
        expect(itemRef.current?.firstChild).toHaveClass('u-text200');
      }
    });

    it('should render Pagination with className', () => {
      const className = 'paginationClassName';
      setup({ className });

      expect(ref.current).toHaveClass(className);
    });
  });
});
