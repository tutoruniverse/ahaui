import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { DirectionEnum } from 'types/common';
import { setupWithUserEvent } from 'utils/test';
import Item, { multiStepsVariantStyle, MultiStepsVariantEnum } from '../Item';

describe('components/MultiStepsItem', () => {
  const itemRef = createRef<HTMLDivElement>();
  const onClick = jest.fn();

  const setup = (props = {}) => {
    const setupResult = setupWithUserEvent(render(
      <Item
        title="Step 1"
        {...props}
        ref={itemRef}
      />,
    ));

    // Check if we can pass ref
    expect(itemRef.current).toBeTruthy();
    expect(itemRef.current).toHaveClass('MultiSteps-item');
    return setupResult;
  };

  beforeEach(() => {
    onClick.mockClear();
  });

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      // Check if component has default props set
      expect(itemRef.current).toHaveClass('u-cursorPointer');
      expect(itemRef.current).toHaveClass(multiStepsVariantStyle.primary.textDefault);
    });
  });

  describe('Render with passing props', () => {
    it('should render with className value', () => {
      const className = 'u-textDark';
      setup({ className });

      expect(itemRef.current).toHaveClass(className);
    });

    describe('Render with direction is vertical and variant is primary', () => {
      const direction = DirectionEnum.vertical;
      const variant = MultiStepsVariantEnum.primary;
      it('should render with item is completed', () => {
        const isLast = false;
        const isActive = false;
        const title = 'Step 1';
        const isCompleted = true;

        setup({ variant, direction, isLast, isActive, title, isCompleted });

        // MultiSteps-item
        expect(itemRef.current).toHaveClass(multiStepsVariantStyle[variant].textActive);

        // check MultiSteps-dot
        expect(screen.queryByTestId('multi-steps-dot')).toHaveClass(multiStepsVariantStyle[variant].dotActive);

        // check has icon
        expect(screen.queryByTestId('check-mark-icon')).toBeTruthy();

        expect(screen.queryByTestId('vertical-label')?.innerHTML).toEqual(title);
      });

      it('should render with item is not completed', () => {
        const isLast = false;
        const isActive = false;
        const title = 'Step 1';
        const isCompleted = false;
        const variant = MultiStepsVariantEnum.primary;

        setup({ variant, direction, isLast, isActive, title, isCompleted });

        // MultiSteps-item
        expect(itemRef.current).toHaveClass(multiStepsVariantStyle[variant].textDefault);

        // check MultiSteps-dot
        expect(screen.queryByTestId('multi-steps-dot')).toHaveClass(multiStepsVariantStyle[variant].dotDefault);

        // check has icon
        expect(screen.queryByTestId('check-mark-icon')).toBeFalsy();
      });

      it('should render with item is active', () => {
        const isLast = false;
        const isActive = true;
        const title = 'Step 4';
        const isCompleted = false;

        setup({ variant, direction, isLast, isActive, title, isCompleted });

        // MultiSteps-item
        expect(itemRef.current).toHaveClass(multiStepsVariantStyle[variant].textActive);

        // check MultiSteps-dot
        expect(screen.queryByTestId('multi-steps-dot')).toHaveClass(multiStepsVariantStyle[variant].dotActive);

        // check has icon
        expect(screen.queryByTestId('check-mark-icon')).toBeFalsy();
      });
    });

    describe('Render with direction is horizontal and variant is primary', () => {
      const direction = DirectionEnum.horizontal;
      const variant = MultiStepsVariantEnum.primary;
      it('should render with item is completed', () => {
        const isLast = false;
        const isActive = false;
        const title = 'Step 1';
        const isCompleted = true;

        setup({ variant, direction, isLast, isActive, title, isCompleted });

        // check multi steps line
        expect(screen.queryByTestId('multi-steps-line')).toBeTruthy();

        // check multi steps label
        expect(screen.queryByTestId('multi-steps-label')).toBeTruthy();
        expect(screen.queryByTestId('multi-steps-label')?.innerHTML).toEqual(!isActive && title);
      });
    });


    it(`should render with onClick and variant is ${DirectionEnum.horizontal}`, async () => {
      const { user } = setup({ onClick });

      await user.click(screen.getByTestId('multi-steps-label'));
      expect(onClick).toHaveBeenCalled();
    });

    it(`should render with onClick and variant is ${DirectionEnum.vertical}`, async () => {
      const { user } = setup({ onClick, direction: DirectionEnum.vertical });

      await user.click(screen.getByTestId('vertical-label'));
      expect(onClick).toHaveBeenCalled();
    });

    it(`should render with disabled is true and variant is ${DirectionEnum.horizontal}`, async () => {
      const { user } = setup({ disabled: true, onClick });

      await user.click(screen.getByTestId('multi-steps-label'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it(`should render with disabled is true and variant is ${DirectionEnum.vertical}`, async () => {
      const { user } = setup({
        disabled: true,
        onClick,
        direction: DirectionEnum.vertical,
      });

      await user.click(screen.getByTestId('vertical-label'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
