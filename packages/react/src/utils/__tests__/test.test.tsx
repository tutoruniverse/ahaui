import React from 'react';
import { render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';

describe('utils/test', () => {
  const ExampleComponent = () => (
    <div>
      Example Component
    </div>
  );

  const setup = () => setupWithUserEvent(render(<ExampleComponent />));

  it('should render component correctly', () => {
    const renderResult = setup();

    expect(renderResult.user).not.toBeNull();
    expect(renderResult.rerender).not.toBeNull();
    expect(screen.queryByText('Example Component')).toBeInTheDocument();
  });
});
