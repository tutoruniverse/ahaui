import React from 'react';
import { render, screen } from '@testing-library/react';
import Toggle from '../Toggle';
import AccordionContext, { SelectableContext } from '../Context';

describe('Accordion/Toggle', () => {
  let props;
  let accordionContextValue;
  let selectableContextValue;

  const onSelect = jest.fn();
  const text = 'Toggle Button';

  const Wrapper = ({ children }) => (
    <AccordionContext.Provider value={accordionContextValue}>
      <SelectableContext.Provider value={selectableContextValue}>
        {children}
      </SelectableContext.Provider>
    </AccordionContext.Provider>
  );

  const setup = () => render(<Toggle {...props} />, { wrapper: Wrapper });

  beforeEach(() => {
    props = {
      eventKey: 'enter',
      children: (<div>{text}</div>),
    };

    accordionContextValue = 'enter';
    selectableContextValue = onSelect;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    setup();
    const toggle = screen.getByText(text);
    expect(toggle).toBeInTheDocument();
  });

  it('should interact correctly', () => {
    setup();
    const toggle = screen.getByText(text);
    toggle.click();
    expect(onSelect).toHaveBeenCalled();
  });
});
