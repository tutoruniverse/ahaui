import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import MultiSteps from '..';
import { multiStepsVariantStyle, MultiStepsVariantEnum } from '../Item';

describe('components/MultiSteps', () => {
  const multiStepsRef = createRef<HTMLDivElement>();
  const firstChildRef = createRef<HTMLDivElement>();

  const setupWithChildren = (props = {}) => {
    const defaultProps = {
      current: 1,
      currentLabel: 'Current Step',
      onChange: () => null,
    };

    const setupResult = setupWithUserEvent(render(
      <MultiSteps {...defaultProps} {...props} ref={multiStepsRef}>
        <MultiSteps.Item ref={firstChildRef} title="Step 1" />
        <MultiSteps.Item title="Step 2" />
        <MultiSteps.Item title="Step 3" />
        <MultiSteps.Item title="Step 4" />
      </MultiSteps>,
    ));

    // Check if we can pass ref
    expect(multiStepsRef.current).toBeTruthy();
    expect(multiStepsRef.current).toHaveClass('MultiSteps');

    return setupResult;
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setupWithChildren();

      // Check if component has default props set
      expect(multiStepsRef.current).not.toHaveClass('MultiSteps--vertical');

      expect(multiStepsRef.current?.children).toBeTruthy();
    });
  });

  describe('Render with passing prop', () => {
    it('should render with className value', () => {
      const className = 'u-textPrimary';
      setupWithChildren({ className });

      expect(multiStepsRef.current).toHaveClass(className);
    });

    it('should render with direction="vertical"', () => {
      setupWithChildren({ direction: 'vertical' });

      expect(multiStepsRef.current).toHaveClass('u-flexColumn MultiSteps--vertical');
    });

    it('should handle with onChange', async () => {
      const onChange = jest.fn();
      const { user } = setupWithChildren({ onChange });

      if (firstChildRef.current) {
        await user.click(firstChildRef.current.children[0]);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(0);
      }
    });

    describe('Render children', () => {
      it.each([0, 1, 2])('should render active text for current step is %s', (current) => {
        const props = {
          current,
          currentLabel: 'Current Step',
          variant: MultiStepsVariantEnum.positive,
        };

        setupWithChildren(props);

        const currentChild = multiStepsRef.current?.children[current];

        expect(currentChild).toHaveClass(multiStepsVariantStyle[props.variant as keyof typeof multiStepsVariantStyle].textActive);
      });

      it('render last child when current is 2', () => {
        const props = {
          current: 2,
          currentLabel: 'Current Step',
          variant: 'positive',
        };

        setupWithChildren(props);

        const child = multiStepsRef.current?.children[3];

        expect(child).toHaveClass(multiStepsVariantStyle[props.variant as keyof typeof multiStepsVariantStyle].textDefault);
      });

      it('should render last child with default text', () => {
        const ref = createRef<HTMLDivElement>();
        const defaultProps = {
          current: 1,
          currentLabel: 'Current Step',
          onChange: () => null,
        };
        render(
          <MultiSteps {...defaultProps} ref={ref} />,
        );

        expect(ref.current?.children[0]).toBeFalsy();
      });
    });
  });
});
