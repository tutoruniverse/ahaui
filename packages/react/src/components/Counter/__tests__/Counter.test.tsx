import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Icon from 'components/Icon';
import Counter, { variantsClassName } from '..';

describe('components/Counter', () => {
  const counterRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    render(<Counter {...props} ref={counterRef} />);

    // Check if we can pass ref
    expect(counterRef.current).toBeTruthy();
    expect(counterRef.current).toHaveClass('Counter');
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();
      const iconLeft = screen.queryByTestId('icon-left');
      const counterLabel = screen.queryByTestId('counter-label');
      const counterNumber = screen.queryByTestId('counter-number');

      // Check if component has default props set
      expect(iconLeft).toBeTruthy();
      expect(iconLeft).toHaveClass(variantsClassName.secondary.icon);

      expect(counterLabel).not.toBeTruthy();
      expect(counterNumber).not.toBeTruthy();
    });
  });

  describe('Render with passing props', () => {
    it('should render with className value', () => {
      const className = 'u-textPositiveDarker';
      setup({ className });

      expect(counterRef.current).toHaveClass(className);
    });

    describe('iconLeft value', () => {
      it('iconLeft value is a function', () => {
        const iconLeftFn = () => (
          <Icon size="medium" name="bot" data-testid="test-icon" />
        );

        setup({ iconLeft: iconLeftFn });

        expect(screen.queryByTestId('test-icon')).toBeTruthy();
      });

      it('iconLeft value is not a function', () => {
        const iconLeft = 'bot';

        setup({ iconLeft });

        expect(screen.queryByTestId('icon-left')).toBeTruthy();
      });
    });

    describe('label value', () => {
      it('label value is a function', () => {
        const labelFn = () => (
          <span
            data-testid="test-label"
          >
            Hello from label function
          </span>
        );

        setup({ label: labelFn });

        expect(screen.queryByTestId('test-label')).toBeTruthy();
      });

      it('label value is not a function', () => {
        const label = 'Hello from label';

        setup({ label });

        expect(screen.queryByTestId('counter-label')).toBeTruthy();
        expect(screen.queryByTestId('counter-label')?.innerHTML).toEqual(label);
      });
    });

    describe('number value', () => {
      it('number value is a function', () => {
        const numberFn = () => (
          <span
            data-testid="test-counter-number"
          >
            I am a number function
          </span>
        );

        setup({ number: numberFn });

        expect(screen.queryByTestId('test-counter-number')).toBeTruthy();
      });

      it('number value is not a function', () => {
        const number = ' I am a number';

        setup({ number });

        expect(screen.queryByTestId('counter-number')).toBeTruthy();
      });
    });

    it('children value', () => {
      const children = <h1 data-testid="children">Hello from children</h1>;
      setup({ children });

      expect(screen.queryByTestId('children')).toBeTruthy();
    });

    it('as value', () => {
      setup({ as: 'button' });

      expect(counterRef.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
