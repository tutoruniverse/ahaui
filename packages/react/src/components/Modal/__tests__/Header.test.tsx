import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';

describe('components/Modal/Header', () => {
  const headerRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    render(<Header ref={headerRef} {...props} />);

    expect(headerRef.current).toBeTruthy();
    expect(headerRef.current).toHaveClass('Modal-header');
  };

  it('should render the provided children', () => {
    const children = (
      <h1>Hello World</h1>
    );
    setup({ children });

    expect(headerRef.current?.firstChild).toHaveTextContent('Hello World');
  });

  it('should call the onHide function when the close button is clicked', () => {
    const onHide = jest.fn();

    setup({ closeButton: true, onHide });

    fireEvent.click(screen.queryByTestId('modal-close-button') as HTMLButtonElement);
    expect(onHide).toHaveBeenCalled();
  });

  it('should set the close button opacity to full when hovering over it', () => {
    setup({ closeButton: true });

    const closeButton = screen.queryByTestId('modal-close-button') as HTMLButtonElement;
    fireEvent.mouseEnter(closeButton);
    expect(screen.queryByTestId('close-button-icon')).toHaveClass('u-opacityReset');
  });

  it('should set the close button opacity to half when not hovering over it', () => {
    setup({ closeButton: true });

    const closeButton = screen.queryByTestId('modal-close-button') as HTMLButtonElement;

    fireEvent.mouseEnter(closeButton);
    fireEvent.mouseLeave(closeButton);

    expect(screen.queryByTestId('close-button-icon')).toHaveClass('u-opacityHalf');
  });

  it('should render with className prop', () => {
    const className = 'custom-className';

    setup({ className });

    expect(headerRef.current).toHaveClass(className);
  });
});
