import React, { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import SafeAnchor from '..';

describe('components/SafeAnchor', () => {
  const ref = createRef<HTMLAnchorElement>();

  const setup = (props = {}) => {
    render(<SafeAnchor ref={ref} {...props} />);

    expect(ref.current).toBeTruthy();
  };

  describe('Render SafeAnchor without passing props ', () => {
    it('should render SafeAnchor', () => {
      setup();

      expect(ref.current).not.toBeDisabled();
    });
  });

  describe('Render SafeAnchor with passing props', () => {
    it('should render with href', () => {
      const href = 'http://example.com';
      setup({ href });

      expect(ref.current).toHaveAttribute('href', href);
    });

    it('should render with onClick', () => {
      const onClick = jest.fn();

      setup({ onClick });
      fireEvent.click(ref.current as HTMLAnchorElement);

      expect(onClick).toBeCalled();
    });

    it('should render with onKeyDown', () => {
      const onKeyDown = jest.fn();

      setup({ onKeyDown });

      fireEvent.keyDown(ref.current as HTMLAnchorElement);

      expect(onKeyDown).toBeCalled();
    });

    it('should render with disabled and tabIndex', () => {
      // Render with tabIndex only
      const tabIndex = 0;
      setup({ tabIndex });

      expect(ref.current).toHaveAttribute('tabIndex', tabIndex.toString());

      // Render with both disabled and tabIndex
      setup({ tabIndex, disabled: true });

      expect(ref.current).toHaveAttribute('tabIndex', '-1');
      expect(ref.current).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render with role', () => {
      const role = 'button';

      setup({ role });

      expect(ref.current).toHaveAttribute('role', role);
    });

    it('should render with as', () => {
      const as = 'span';
      setup({ as });

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render with innerRef', () => {
      const innerRef = createRef();

      setup({ innerRef });

      expect(innerRef.current).toBeTruthy();
      expect(ref.current).toBeTruthy();
    });
  });
});
