import React, { createRef } from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import SafeAnchor, { isTrivialHref } from '..';


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
      const href = 'http://example.com';
      const onClick = jest.fn();

      setup({ onClick, href });

      if (ref.current) {
        fireEvent.click(ref.current);
        expect(onClick).toBeCalled();
      }
    });

    it('should render with onKeyDown', () => {
      const onKeyDown = jest.fn();

      setup({ onKeyDown });

      if (ref.current) {
        fireEvent.keyDown(ref.current);
        expect(onKeyDown).toBeCalled();
      }
    });

    it('should render with disabled and tabIndex', () => {
      // Render with tabIndex only
      const href = 'http://example.com';
      const tabIndex = 0;
      const onClick = jest.fn();
      setup({ tabIndex, onClick, href });

      expect(ref.current).toHaveAttribute('tabIndex', tabIndex.toString());

      // Render with both disabled and tabIndex
      setup({ tabIndex, disabled: true });

      expect(ref.current).toHaveAttribute('tabIndex', '-1');
      expect(ref.current).toHaveAttribute('aria-disabled', 'true');

      if (ref.current) {
        const clickEvent = createEvent.click(ref.current);
        Object.assign(clickEvent, { stopPropagation: jest.fn() });
        fireEvent(ref.current, clickEvent);

        expect(onClick).not.toBeCalled();
        // Stop propagation on click event
        expect(clickEvent.stopPropagation).toHaveBeenCalled();
      }
    });

    it('should handle trivial href correctly', () => {
      const href = '#';
      const onClick = jest.fn();
      setup({ onClick, href });

      expect(ref.current).toHaveAttribute('href', href);

      if (ref.current) {
        const clickEvent = createEvent.click(ref.current);
        fireEvent(ref.current, clickEvent);

        expect(onClick).toBeCalled();
        // Prevent default on click event
        expect(clickEvent.defaultPrevented).toBe(true);
      }
    });

    it('should render with key down is space', () => {
      const href = 'http://example.com';
      const onClick = jest.fn();
      setup({ onClick, href });

      if (ref.current) {
        const keyDownEvent = createEvent.keyDown(ref.current, { key: ' ' });
        fireEvent(ref.current, keyDownEvent);

        expect(onClick).toBeCalled();
        // Prevent default on keyboard event
        expect(keyDownEvent.defaultPrevented).toBe(true);
      }
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

  describe('Utils/isTrivialHref', () => {
    it('should return true when href is falsy', () => {
      const href = '';
      expect(isTrivialHref(href)).toBeTruthy();
    });

    it('should return true when href is #', () => {
      const href = '#';
      expect(isTrivialHref(href)).toBeTruthy();
    });

    it('should return false when href is not trivial', () => {
      const href = 'http://example.com';
      expect(isTrivialHref(href)).toBeFalsy();
    });
  });
});
