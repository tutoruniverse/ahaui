import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from 'tests/renderWithProvider';
import Collapse from '../Collapse';
import AccordionContext from '../Context';

describe('Collapse', () => {
  let props;
  let contextValue;
  const text = 'Collapse content';

  const setup = () => renderWithProvider({
    Component: Collapse,
    props,
    Provider: AccordionContext.Provider,
    contextValue,
  });

  beforeEach(() => {
    props = {
      eventKey: 'enter',
      children: (<div>{text}</div>),
    };

    contextValue = 'enter';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Collapse correctly', () => {
    setup();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
