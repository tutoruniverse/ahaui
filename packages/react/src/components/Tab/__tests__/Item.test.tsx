import { render } from '@testing-library/react';
import { Tab } from 'index';
import React from 'react';

describe('components/Tab/Item', () => {
  const tabProps = {};
  const ref = React.createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    render(
      <Tab {...tabProps}>
        <Tab.Item ref={ref} {...props}>
          Item 1
        </Tab.Item>
      </Tab>,
    );

    expect(ref.current).toBeTruthy();
  };

  describe('Render without passing props', () => {
    it('should render tab item', () => {
      setup();
      expect(ref.current?.parentElement).toHaveClass('Tab-item');
    });
  });

  describe('Render with passing props', () => {
    it('should render with className', () => {
      const className = 'tabItemClassName';
      setup({ className });
      expect(ref.current?.parentElement).toHaveClass(className);
    });

    it('should render with as', () => {
      const as = 'span';
      setup({ as });
      expect(ref.current?.tagName).toBe(as.toUpperCase());
    });
  });
});
