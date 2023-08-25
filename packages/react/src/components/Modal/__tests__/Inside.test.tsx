import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Inside from '../Inside';

describe('components/Modal/Inside', () => {
  const insideRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    render(<Inside ref={insideRef} {...props} />);

    expect(insideRef.current).toBeTruthy();
    expect(insideRef.current).toHaveClass('Modal-backDrop');
  };

  it('should render the provided children', () => {
    const children = (
      <h1>Hello World</h1>
    );
    setup({ children });

    const container = screen.queryByTestId('modal-inside');

    expect(container?.lastChild).toHaveTextContent('Hello World');
  });
});
