import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import AccordionContext, { SelectableContext } from '../Context';
import Accordion, { AccordionProps } from '..';

describe('components/Accordion', () => {
  let props: AccordionProps<typeof as>;
  const accordionRef = React.createRef<HTMLElement>();

  let as: React.ElementType;
  const onSelect = jest.fn();

  const getActiveKey = () => screen.getByTestId('active-key').textContent;
  const getOnSelectElement = () => screen.getByTestId('on-select');


  const AccordionChildren = () => {
    const activeKey = useContext(AccordionContext);
    const onSelect = useContext(SelectableContext);
    return (
      <div>
        <div data-testid="active-key">{activeKey}</div>
        <div data-testid="on-select" onClick={(e) => onSelect?.('0', e)} />
      </div>
    );
  };

  const setup = () => {
    render(
      <Accordion {...props} ref={accordionRef}>
        <AccordionChildren />
      </Accordion>,
    );

    expect(accordionRef.current).toBeTruthy();
    expect(accordionRef.current).toHaveClass('Accordion');
  };

  describe('Render without passing props', () => {
    beforeEach(() => {
      props = {
        as,
        activeKey: null,
        defaultActiveKey: null,
        onSelect,
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render correctly', () => {
      setup();
      expect(accordionRef.current?.tagName).toBe('DIV');
      expect(getActiveKey()).toBe(''); // default eventKey is null
      const onSelectElement = getOnSelectElement();
      onSelectElement.click();
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0]).toBe('0');
      expect(onSelect.mock.calls[0][1].target).toBe(onSelectElement);
    });
  });

  describe('Render with passing props', () => {
    it('should render with className', () => {
      props.className = 'u-hidden';
      setup();
      expect(accordionRef.current).toHaveClass('u-hidden');
    });

    it('should render with as="span"', () => {
      props.as = 'span';
      setup();
      expect(accordionRef.current?.tagName).toBe('SPAN');
    });
  });
});
