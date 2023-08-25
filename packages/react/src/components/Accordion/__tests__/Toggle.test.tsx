import React from 'react';
import { RenderResult, render, screen } from '@testing-library/react';
import { AccordionToggleProps, useAccordionToggle } from 'components/Accordion/Toggle';
import { renderHook } from '@testing-library/react-hooks';
import Toggle from '../Toggle';
import AccordionContext, { AccordionActiveKey, SelectableContext, AccordionOnSelectFn } from '../Context';

describe('components/Toggle', () => {
  let toggleProps: AccordionToggleProps;
  let accordionContextValue: AccordionActiveKey;
  let selectableContextValue: AccordionOnSelectFn;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSelect = jest.fn((value: AccordionActiveKey, e: React.MouseEvent) => {
    accordionContextValue = value; // auto-set the corresponding value from 'uncontrolled'
  });
  const text = 'Toggle Button';

  const toggleRef = React.createRef<HTMLElement>();

  let toggle: HTMLElement;
  let wrapper: RenderResult;

  const ContextConsumer = () => {
    const activeKey = React.useContext(AccordionContext);
    return (
      <div data-testid="active-key">{activeKey}</div>
    );
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AccordionContext.Provider value={accordionContextValue}>
      <SelectableContext.Provider value={selectableContextValue}>
        <div>
          {children}
          <ContextConsumer />
        </div>
      </SelectableContext.Provider>
    </AccordionContext.Provider>
  );

  const getActiveKey = () => screen.getByTestId('active-key').textContent;

  describe('Toggle', () => {
    const setup = () => {
      wrapper = render(<Toggle {...toggleProps} ref={toggleRef} />, { wrapper: Wrapper });
      toggle = screen.getByTestId('accordion-toggle');

      expect(toggleRef.current).toBeTruthy();
      expect(toggleRef.current).toBe(toggle); // The same children element
      expect(toggle).toHaveClass('Accordion-toggle');
      expect(screen.getByText(text)).toBeInTheDocument();
    };

    const update = () => {
      if (wrapper) {
        wrapper.rerender(<Toggle {...toggleProps} ref={toggleRef} />);
      }
    };

    beforeEach(() => {
      toggleProps = {
        eventKey: '0',
        children: (<div>{text}</div>),
      };

      accordionContextValue = null;
      selectableContextValue = onSelect;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('Render without passing props', () => {
      it('should render correctly', () => {
        setup();
        expect(toggle).toHaveClass('u-cursorPointer');
      });

      it('should interact correctly', () => {
        setup();

        expect(getActiveKey()).toBe('');

        toggle.click();
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][0]).toBe('0');
        expect(onSelect.mock.calls[0][1].target).toBe(toggle);

        update();
        expect(getActiveKey()).toBe('0');
      });
    });

    describe('Render with passing props', () => {
      it.each([
        ['the same', '0', '0', null],
        ['different', '0', '1', '0'],
      ])('should run onSelect with %s activeKey of the Accordion', (_, eventKey, activeKey, passedEventKey) => {
        accordionContextValue = activeKey;
        toggleProps.eventKey = eventKey;
        setup();

        toggle.click();
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][0]).toBe(passedEventKey);
        expect(onSelect.mock.calls[0][1].target).toBe(toggle);
      });

      it('should run callback when selected', () => {
        const onClick = jest.fn();
        toggleProps.onClick = onClick;
        setup();

        toggle.click();
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0].target).toBe(toggle);
      });

      it('should disable the toggle', () => {
        toggleProps.disabled = true;
        setup();

        toggle.click();
        expect(onSelect).toHaveBeenCalledTimes(0);
        expect(toggle).not.toHaveClass('u-cursorPointer');
        expect(toggle).toHaveClass('u-pointerEventsNone u-cursorNotAllow');
      });

      it('should render with className', () => {
        toggleProps.className = 'u-hidden';
        setup();

        expect(toggle).toHaveClass('u-cursorPointer u-hidden');
      });
    });
  });

  describe('useAccordionToggle', () => {
    const setup = (
      eventKey: string,
      onClick?: React.MouseEventHandler,
    ) => renderHook(() => (
      useAccordionToggle(eventKey, onClick)
    ), { wrapper: Wrapper });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should run onClick when selected', () => {
      const onClick = jest.fn();
      const { result } = setup('enter', onClick);
      const onAccordionClick = result.current;

      const mouseEvent = {
        target: toggleRef.current,
        currentTarget: toggleRef.current,
      } as unknown as React.MouseEvent;

      onAccordionClick(mouseEvent);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toBeCalledWith(mouseEvent);
    });

    it.each([
      ['the same', '0', '0', null],
      ['different', '0', '1', '0'],
    ])('should run onSelect with %s activeKey of the Accordion', (_, eventKey, activeKey, passedEventKey) => {
      accordionContextValue = activeKey;
      const { result } = setup(eventKey);
      result.current({} as React.MouseEvent);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0]).toBe(passedEventKey);
    });
  });
});
