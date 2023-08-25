import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { PlacementEnum } from 'types/common';
import Tooltip, { TooltipVariants, variantsClassName } from '..';

describe('components/Tooltip', () => {
  const tooltipRef = createRef<HTMLDivElement>();
  const arrowRef = createRef<HTMLDivElement>();
  const style = { backgroundColor: 'red' };

  const setup = (props = {}) => {
    render(
      <Tooltip
        id="test"
        ref={tooltipRef}
        arrowProps={{
          ref: arrowRef,
        }}
        {...props}
      >
        Hello
      </Tooltip>,
    );

    expect(tooltipRef.current).toBeTruthy();
    expect(tooltipRef.current).toHaveClass('Tooltip');
  };

  describe('Render tooltip without passing props', () => {
    it('should render the tooltip', () => {
      setup();

      // "show" default value is falseÏ
      expect(tooltipRef.current).toHaveClass('u-visibilityHidden');

      // "variant" default value is "black"
      expect(tooltipRef.current).toHaveClass('Tooltip--black');

      // "noArrow" default value is false
      expect(arrowRef.current).toBeTruthy();
      expect(arrowRef.current).toHaveClass('Tooltip-arrow');

      // "placement" default value is "right"
      expect(tooltipRef.current).toHaveAttribute('data-test-placement', 'right');
    });
  });

  describe('Render tooltip with passing props', () => {
    it.each(Object.values(PlacementEnum))('should render with placement = "%s', (placement) => {
      setup({ placement });

      expect(tooltipRef.current).toHaveAttribute('data-test-placement', placement);
    });

    it.each(['white', 'black'])(
      'should render with variant = %s',
      (variant) => {
        setup({ variant });

        expect(tooltipRef.current).toHaveClass(
          variantsClassName[variant as TooltipVariants],
        );
      },
    );

    it('should render with passing noArrow prop', () => {
      setup({ noArrow: true });

      expect(tooltipRef.current?.children[0]).toHaveClass(
        'Tooltip-body',
      );
    });

    it('should render with passing arrowProps', () => {
      setup({
        arrowProps: {
          style,
          ref: arrowRef,
        },
      });

      expect(arrowRef.current).toBeTruthy();
      expect(arrowRef.current).toHaveClass('Tooltip-arrow');
      expect(arrowRef.current).toHaveStyle(style);
    });

    it('should render with passing tooltipStyle prop', () => {
      setup({
        styleTooltip: style,
      });

      expect(tooltipRef.current).toHaveStyle({ backgroundColor: style.backgroundColor });
    });

    it('should render with passing div html props', () => {
      setup({
        className: 'testing-class',
        style,
        title: 'testing-tooltip',
      });

      expect(tooltipRef.current).toHaveClass('testing-class');
      expect(tooltipRef.current).toHaveAttribute('title', 'testing-tooltip');
    });

    it('should render with passing bodyStyle prop', () => {
      setup({
        style,
      });

      const body = tooltipRef.current?.children[1];
      expect(body).toHaveStyle(style);
    });
  });
});
