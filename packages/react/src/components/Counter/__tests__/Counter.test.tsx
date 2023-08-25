import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Icon from 'components/Icon';
import Counter, { CounterVariantEnum, variantsClassName } from '..';

describe('components/Counter', () => {
  const counterRef = createRef<HTMLElement>();

  const setup = (props = {}) => {
    render(<Counter {...(props || {})} ref={counterRef} />);
    // Check if we can pass ref
    expect(counterRef.current).toBeTruthy();
    expect(counterRef.current).toHaveClass('Counter');
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();
      const iconLeft = screen.queryByTestId('counter-icon-left');
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

    describe('Icon left value', () => {
      it('should render with iconLeft value is a function', () => {
        const iconLeftFn = () => (
          <Icon size="medium" name="bot" data-testid="test-icon" />
        );

        setup({ iconLeft: iconLeftFn });

        expect(screen.queryByTestId('test-icon')).toBeTruthy();
      });

      it('should render with iconLeft value is not a function and without variant', () => {
        const iconLeft = 'bot';

        setup({ iconLeft });

        expect(screen.queryByTestId('counter-icon-left')).toBeTruthy();
        expect(screen.queryByTestId('counter-icon-left')?.classList).toContain('u-textGray');
      });

      // it('should render with iconLeft value is not a function and with variant', () => {
      //   const iconLeft = 'bot';
      //   const variant = CounterVariantEnum.primary;

      //   setup({ iconLeft, variant });

      //   expect(screen.queryByTestId('counter-icon-left')).toBeTruthy();
      //   expect(screen.queryByTestId('counter-icon-left')?.classList).toContain('u-textPrimary');
      // });
    });

    describe('Label value', () => {
      it('should render with label value is a function', () => {
        const LabelComponent = () => (
          <span
            data-testid="test-label"
          >
            Hello from label function
          </span>
        );

        setup({ label: LabelComponent });

        expect(screen.queryByTestId('test-label')).toBeTruthy();
      });

      it('should render with label value is not a function and without variant', () => {
        const label = 'Hello from label';

        setup({ label });

        expect(screen.queryByTestId('counter-label')).toBeTruthy();
        expect(screen.queryByTestId('counter-label')?.innerHTML).toEqual(label);
        expect(screen.queryByTestId('counter-label')?.classList).toContain('u-textDark');
      });

      // it('should render with label value is not a function and with variant', () => {
      //   const label = 'Hello from label';
      //   const variant = CounterVariantEnum.primary;

      //   setup({ label, variant });

      //   expect(screen.queryByTestId('counter-label')).toBeTruthy();
      //   expect(screen.queryByTestId('counter-label')?.innerHTML).toEqual(label);
      //   expect(screen.queryByTestId('counter-label')?.classList).toContain('u-textPrimary');
      // });
    });

    describe('Number value', () => {
      it('should render with number value is a function', () => {
        const NumberComponent = () => (
          <span
            data-testid="test-counter-number"
          >
            I am a number function
          </span>
        );

        setup({ number: NumberComponent });

        expect(screen.queryByTestId('test-counter-number')).toBeTruthy();
      });

      it('should render with number value is not a function and without variant', () => {
        const number = ' I am a number';

        setup({ number });

        expect(screen.queryByTestId('counter-number')).toBeTruthy();
        expect(screen.queryByTestId('counter-number')?.classList).toContain('u-textDark');
      });

      // it('should render with number value is not a function and without variant', () => {
      //   const number = ' I am a number';
      //   const variant = CounterVariantEnum.primary;

      //   setup({ number, variant });

      //   expect(screen.queryByTestId('counter-number')).toBeTruthy();
      //   expect(screen.queryByTestId('counter-number')?.classList).toContain('u-textPrimary');
      // });
    });

    it('should render with children value', () => {
      const children = <h1 data-testid="children">Hello from children</h1>;
      setup({ children });

      expect(screen.queryByTestId('children')).toBeTruthy();
    });

    it('should render with as value', () => {
      setup({ as: 'button' });

      expect(counterRef.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
