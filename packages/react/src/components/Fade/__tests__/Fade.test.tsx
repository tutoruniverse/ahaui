import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Transition } from 'react-transition-group';
import Fade from '..';

describe('components/Fade', () => {
  const fadeRef = createRef<Transition<HTMLElement | undefined>>();
  const setup = (props = {}) => {
    const { rerender, getByText } = render(
      <Fade {...props} ref={fadeRef}>
        <div data-testid="inner-fade" />
      </Fade>,
    );

    expect(fadeRef.current).toBeTruthy();
    expect(screen.queryByTestId('inner-fade')).toHaveClass('Fade');

    return { rerender, getByText };
  };

  describe('Render with passing props', () => {
    it('should render with classnames value', () => {
      const className = 'u-textPrimary';

      setup({ className });

      expect(screen.queryByTestId('inner-fade')).toHaveClass(className);
    });

    it('should add `js-entering` class when entering', () => {
      const { rerender, getByText } = setup();

      rerender(<Fade in><div>Hello world</div></Fade>);

      const element = getByText('Hello world');
      expect(element).toHaveClass('js-entering');
    });

    it('should add `js-entered` class when entered', () => {
      setup({ in: true, mountOnEnter: true });
      expect(screen.queryByTestId('inner-fade')).toHaveClass('js-entered');
    });

    it('should call onEnter callback when entering', () => {
      const handleEnter = jest.fn();

      const { rerender } = setup({ onEnter: handleEnter });

      rerender(<Fade in onEnter={handleEnter}><div /></Fade>);

      expect(handleEnter).toHaveBeenCalled();
    });

    it('should render has child props', () => {
      const { getByText, rerender } = render(<Fade in><div>Hello World</div></Fade>);

      expect(getByText('Hello World')).not.toHaveAttribute('data-testid');

      rerender(<Fade in><div data-testid="inner-fade" aria-disabled style={{ width: 50 }} /></Fade>);

      expect(screen.queryByTestId('inner-fade')?.style.width).toEqual('50px');
      expect(screen.queryByTestId('inner-fade')).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
