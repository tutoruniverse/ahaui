import React, { createRef } from 'react';
import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import { DimensionsEnum } from 'types/common';
import { Transition } from 'react-transition-group';
import Collapse, { CollapseProps } from '..';

const content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio sit molestias eius? Optio sunt tempore vel cum quis, dolorum quisquam aut perferendis reiciendis nobis quas non! Aspernatur fugit excepturi eaque?';

const MOCK_HEIGHT = 100;
const MOCK_WIDTH = 200;

const ContentComponent = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div
    {...props}
    data-testid="collapse-content"
  >
    {content}
  </div>
);

describe('components/Collapse', () => {
  const collapseRef = createRef<Transition<HTMLElement | undefined>>();

  let wrapper: RenderResult;
  let props: Partial<CollapseProps>;
  let collapseElement: HTMLElement;

  const setup = () => {
    wrapper = render(
      <Collapse
        {...props}
        ref={collapseRef}
      >
        <ContentComponent />
      </Collapse>,
    );

    expect(collapseRef.current).toBeTruthy(); // Transition
    collapseElement = screen.getByTestId('collapse-content');
    expect(collapseElement).toHaveClass('Collapse');
    expect(collapseElement).not.toHaveClass('Show');
    expect(collapseElement).toHaveTextContent(content);
  };

  const update = () => {
    if (wrapper) {
      wrapper.rerender(
        <Collapse
          {...props}
          ref={collapseRef}
        >
          <ContentComponent />
        </Collapse>,
      );
    }
  };

  // Not supported props in jest
  beforeAll(() => {
    [
      { prop: 'offsetHeight', value: MOCK_HEIGHT },
      { prop: 'offsetWidth', value: MOCK_WIDTH },
      { prop: 'scrollHeight', value: MOCK_HEIGHT },
      { prop: 'scrollWidth', value: MOCK_WIDTH },
    ].forEach(({ prop, value }) => {
      Object.defineProperty(HTMLElement.prototype, prop, {
        configurable: true,
        value,
      });
    });
  });

  afterAll(() => {
    [
      'offsetHeight',
      'offsetWidth',
      'scrollHeight',
      'scrollWidth',
    ].forEach((prop) => {
      Object.defineProperty(HTMLElement.prototype, prop, (Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop) as PropertyDescriptor
      ));
    });
  });

  beforeEach(() => {
    props = {
      in: false,
      timeout: 300,
      dimension: DimensionsEnum.height,
      getDimensionValue: undefined,
    };
  });

  describe('Render without passing props', () => {
    it('should render successfully', async () => {
      setup();
      expect(collapseRef.current?.props).toMatchObject({
        in: false,
        timeout: 300,
      });
      expect(collapseElement).toHaveClass('Collapse');
      expect(collapseElement).not.toHaveClass('Show');
      expect(collapseElement).not.toHaveClass('is-dimensionWidth');

      // Open the collapse
      props.in = true;
      update();
      expect(collapseElement).toHaveClass('Collapsing');
      expect(collapseElement).not.toHaveClass('Show');
      expect(collapseElement).not.toHaveClass('is-dimensionWidth');
      expect(collapseElement).toHaveStyle({
        height: `${MOCK_HEIGHT}px`,
      });

      // Opened
      await waitFor(() => {
        expect(collapseElement).toHaveClass('Collapse');
        expect(collapseElement).toHaveClass('Show');
      });
      expect(collapseRef.current?.props).toHaveProperty('in', true);
      expect(collapseElement).toHaveStyle({
        height: undefined,
      });

      // Close the collapse
      props.in = false;
      update();
      expect(collapseElement).toHaveClass('Collapsing');
      expect(collapseElement).not.toHaveClass('Show');
      expect(collapseElement).not.toHaveClass('is-dimensionWidth');
      expect(collapseElement).toHaveStyle({
        height: undefined,
      });

      // Closed
      await waitFor(() => {
        expect(collapseElement).toHaveClass('Collapse');
        expect(collapseElement).not.toHaveClass('Show');
      });
      expect(collapseRef.current?.props).toHaveProperty('in', false);
      expect(collapseElement).toHaveStyle({
        height: undefined,
      });
    });
  });

  describe('Render with passing props', () => {
    it('should render with timeout="10000ms"', () => {
      props.timeout = 10000;
      setup();
      expect(collapseRef.current?.props).toHaveProperty('timeout', 10000);
    });

    it.each([
      [DimensionsEnum.height, MOCK_HEIGHT],
      [DimensionsEnum.width, MOCK_WIDTH],
    ])('should render with dimension="%s"', async (dimension, value) => {
      props.dimension = dimension;
      setup();
      expect(collapseElement).toHaveStyle({
        [dimension]: undefined,
      });

      // Open the collapse
      props.in = true;
      update();
      expect(collapseElement).toHaveClass('Collapsing');
      expect(collapseElement).not.toHaveClass('Show');
      if (dimension === DimensionsEnum.width) {
        expect(collapseElement).toHaveClass('is-dimensionWidth');
      } else {
        expect(collapseElement).not.toHaveClass('is-dimensionWidth');
      }
      expect(collapseElement).toHaveStyle({
        [dimension]: `${value}px`,
      });

      // Opened
      await waitFor(() => {
        expect(collapseElement).toHaveClass('Collapse');
        expect(collapseElement).toHaveClass('Show');
      });
      expect(collapseRef.current?.props).toHaveProperty('in', true);
      expect(collapseElement).toHaveStyle({
        [dimension]: undefined,
      });

      // Close collapse
      props.in = false;
      update();
      expect(collapseElement).toHaveClass('Collapsing');
      expect(collapseElement).not.toHaveClass('Show');
      if (dimension === DimensionsEnum.width) {
        expect(collapseElement).toHaveClass('is-dimensionWidth');
      } else {
        expect(collapseElement).not.toHaveClass('is-dimensionWidth');
      }
      expect(collapseElement).toHaveStyle({
        [dimension]: undefined,
      });

      // Closed
      await waitFor(() => {
        expect(collapseElement).toHaveClass('Collapse');
        expect(collapseElement).not.toHaveClass('Show');
      });
      expect(collapseRef.current?.props).toHaveProperty('in', false);
      expect(collapseElement).toHaveStyle({
        [dimension]: undefined,
      });
    });

    it.each([
      [DimensionsEnum.height, () => DimensionsEnum.height],
      [DimensionsEnum.width, () => DimensionsEnum.width],
    ])('should render with dimension which is a function that return "%s"', (_, dimension) => {
      props.dimension = dimension;
      setup();
      // Open the collapse
      props.in = true;
      update();
      expect(collapseElement).toHaveClass('Collapsing');
      if (dimension() === DimensionsEnum.width) {
        expect(collapseElement).toHaveClass('is-dimensionWidth');
      } else {
        expect(collapseElement).not.toHaveClass('is-dimensionWidth');
      }
      expect(collapseElement).not.toHaveClass('Show');
    });

    it('should use getDimensionValue function for exiting transition', async () => {
      const getDimensionValueFn = jest.fn(() => 100);
      props.getDimensionValue = getDimensionValueFn;

      setup();
      props.in = true;
      // Collapsing
      update();
      await waitFor(() => {
        expect(collapseElement).toHaveClass('Collapse');
        expect(collapseElement).toHaveClass('Show');
      });
      expect(collapseRef.current?.props).toHaveProperty('in', true);
      // Close collapse
      props.in = false;
      update();
      expect(getDimensionValueFn).toHaveBeenCalledTimes(1);
      expect(getDimensionValueFn).toHaveBeenNthCalledWith(1, DimensionsEnum.height, collapseElement);
    });
  });
});
