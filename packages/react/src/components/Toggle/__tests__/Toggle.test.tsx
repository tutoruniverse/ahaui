import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Toggle from '..';

describe('components/Toggle', () => {
  const toggleRef = createRef<HTMLButtonElement>();

  const setup = (props = {}) => {
    render(<Toggle ref={toggleRef} {...props} />);

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

  describe('Render without passing props', () => {
    it('should render with default value', () => {
      setup();

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

      const btn = screen.queryByRole('button');
      const label = screen.queryByText('On');

      expect(btn).toHaveClass('checked u-backgroundPrimary');

      expect(label).toBeTruthy();
    });

    it('should render with disabled status', () => {
      setup({ disabled: true });

      const btn = screen.queryByRole('button');

      expect(btn).toHaveClass(
        'is-disabled u-cursorNotAllow u-pointerEventsNone',
      );
    });

    it('should render button without label', () => {
      setup({ nonLabel: true });

      const label = screen.queryByText('Off');

      expect(label).not.toBeTruthy();
    });
  });
});
