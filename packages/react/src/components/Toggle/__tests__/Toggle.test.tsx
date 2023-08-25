import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Toggle from '..';

describe('components/Toggle', () => {
  const toggleRef = createRef<HTMLButtonElement>();

  const verifyButton = () => {
    const btn = screen.queryByRole('button');

    // Check if we can pass ref
    expect(toggleRef.current).toBeTruthy();

    expect(btn).toBeTruthy();
    expect(btn).toHaveClass('Toggle');

    // Check if it renders correctly
    expect(toggleRef.current).toHaveClass(
      'u-flexInline u-alignItemsCenter',
    );
  };

  const setup = (props = {}) => {
    const { container } = render(<Toggle ref={toggleRef} {...props} />);
    return container;
  };

  describe('Render without passing props', () => {
    it('should render with default value', () => {
      setup();

      verifyButton();

      const btn = screen.queryByRole('button');
      const label = screen.queryByText('Off');

      expect(btn).not.toHaveClass(
        'checked u-backgroundPrimary is-disabled u-cursorNotAllow',
      );
      expect(label).toBeTruthy();
    });
  });

  describe('Render with passing props', () => {
    it('should render with checked status', () => {
      setup({ checked: true });

      verifyButton();

      const btn = screen.queryByRole('button');
      const label = screen.queryByText('On');

      expect(btn).toHaveClass('checked u-backgroundPrimary');

      expect(label).toBeTruthy();
    });

    it('should render with disabled status', () => {
      setup({ disabled: true });

      const btn = screen.queryByRole('button');

      verifyButton();
      expect(btn).toHaveClass(
        'is-disabled u-cursorNotAllow u-pointerEventsNone',
      );
    });

    it('should render without label', () => {
      setup({ nonLabel: true });

      verifyButton();
      const label = screen.queryByText('Off');
      expect(label).not.toBeTruthy();
    });

    it('should render with aria-label', () => {
      const ariaLabel = 'aria-label';
      const className = 'className';
      const container = setup({ ariaLabel, className });

      verifyButton();
      expect(container.querySelector('.Toggle')).toHaveAttribute('aria-label', ariaLabel);
      expect(toggleRef.current?.className).toContain(className);
    });

    it('should render with as', () => {
      const container = setup({ as: 'div' });

      expect(container.querySelector('.Toggle')).not.toHaveAttribute('disabled');
    });
  });
});
