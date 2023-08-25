import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from 'tests/renderWithProvider';
import { Transition } from 'react-transition-group';
import Collapse, { CollapseProps } from '../Collapse';
import AccordionContext, { AccordionActiveKey } from '../Context';

describe('components/Collapse', () => {
  let props: CollapseProps;
  let contextValue: AccordionActiveKey;
  const collapseRef = React.createRef<Transition<HTMLElement | undefined>>();

  const text = 'Collapse content';

  const setup = () => {
    renderWithProvider({
      Component: Collapse,
      props,
      Provider: AccordionContext.Provider,
      contextValue,
      ref: collapseRef,
    });

    expect(collapseRef.current).toBeTruthy(); // Transition
    const collapse = screen.getByTestId('accordion-collapse__content');
    expect(collapse).toHaveClass('Accordion-collapse');
    expect(collapse.childElementCount).toBe(1); // Only 1 children
    expect(screen.getByText(text)).toBeInTheDocument();
  };

  beforeEach(() => {
    props = {
      eventKey: '0',
      children: (<div>{text}</div>),
    };
    contextValue = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Render without passing props', () => {
    it('should render correctly', () => {
      setup();
      expect(collapseRef.current?.props.in).toBe(false);
    });
  });

  describe('Render with passing props', () => {
    it.each([
      ['the same', '0', '0', true],
      ['different', '0', '1', false],
    ])('should render with %s activeKey of Accordion', (_, eventKey, activeKey, isOpen) => {
      props.eventKey = eventKey;
      contextValue = activeKey;
      setup();
      expect(collapseRef.current?.props.in).toBe(isOpen);
    });

    it.each([
      [false],
      [true],
    ])('should render with in=%s', (isOpen) => {
      props.eventKey = '0';
      contextValue = '1';
      props.in = isOpen;
      setup();
      expect(collapseRef.current?.props.in).toBe(isOpen);
    });
  });
});
