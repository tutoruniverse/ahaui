import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { ComponentSizeEnum } from 'types/common';
import Group from '../Group';
import Button from '..';

describe('components/Button/Group', () => {
  const ref = createRef<HTMLDivElement>();
  const buttonRef = createRef<HTMLButtonElement>();

  const setup = (props = {}, buttonProps = {}) => {
    render(
      <Group ref={ref} {...props}>
        <Button ref={buttonRef} {...buttonProps}>
          Button
        </Button>
      </Group>,
    );

    expect(ref.current).toBeTruthy();
    expect(buttonRef).toBeTruthy();
  };

  describe('Render Group without passing props', () => {
    it('should render Group without passing props', () => {
      setup({});

      expect(buttonRef.current).not.toBeDisabled();
      expect(buttonRef.current).toHaveClass('Button--medium');
    });
  });

  describe('Render Group with passing props', () => {
    it('should render Group with disabledControl = "true"', () => {
      setup({ disabledControl: true });

      expect(buttonRef.current).toBeDisabled();
    });

    it.each([
      ComponentSizeEnum.large,
      ComponentSizeEnum.medium,
      ComponentSizeEnum.small,
    ])('should render Group with sizeControl = "%s"', (size) => {
      setup({ sizeControl: size });

      expect(buttonRef.current).toHaveClass(`Button--${size}`);

      if (size !== 'small') {
        expect(buttonRef.current).toHaveClass('u-textUppercase');
      } else {
        expect(buttonRef.current).not.toHaveClass('u-textUppercase u-text200');
        expect(buttonRef.current).toHaveClass('u-text200');
      }
    });

    it('should render Group with className', () => {
      const className = 'groupClassName';
      setup({ className });
      expect(ref.current).toHaveClass(className);
    });
  });
});
