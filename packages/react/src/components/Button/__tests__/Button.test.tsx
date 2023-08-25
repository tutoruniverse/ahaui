import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { ComponentSizeEnum } from 'types/common';
import Context, { FormContext } from 'components/Form/Context';
import Button, { ButtonVariantEnum, ButtonWidthEnum, variantsClassName, variantsTextClassName, isVariantTextClassName } from '..';

describe('components/Button', () => {
  const buttonRef = createRef<HTMLButtonElement>();
  const buttonLabelRef = createRef<HTMLSpanElement>();
  const buttonIconRef = createRef<HTMLSpanElement>();

  let contextValue: FormContext;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );

  const setup = (props = {}) => {
    render(
      <Button ref={buttonRef} {...props}>
        <Button.Icon ref={buttonIconRef}>
          Button icon
        </Button.Icon>
        <Button.Label ref={buttonLabelRef}>
          Button label
        </Button.Label>
      </Button>,
      { wrapper: Wrapper },
    );
    expect(buttonRef.current).toBeTruthy();
    expect(buttonLabelRef.current).toBeTruthy();
    expect(buttonIconRef.current).toBeTruthy();
  };

  beforeEach(() => {
    contextValue = {};
  });

  describe('Render Button without passing props', () => {
    it('should render Button without passing props', () => {
      setup();

      expect(buttonRef.current).not.toBeDisabled();
      expect(buttonRef.current).not.toHaveClass('Button--minWidth u-widthFull u-textUppercase is-onlyIcon hover:u-textDecorationNone u-text200');
      expect(buttonRef.current).toHaveClass(`Button--${ComponentSizeEnum.medium}`);
      expect(buttonRef.current).toHaveClass('u-backgroundPrimary hover:u-backgroundPrimaryDark u-border u-borderPrimary u-cursorPointer');
    });
  });

  describe('Render Button with passing props', () => {
    it.each(Object.values(ButtonVariantEnum))('should render Button with variant = "%s"', (variant) => {
      setup({ variant });


      if (variant !== 'default') {
        expect(buttonRef.current).toHaveClass(variantsClassName[variant]);

        if (isVariantTextClassName(variant)) {
          expect(buttonRef.current).toHaveClass(variantsTextClassName[variant]);
        }
      }
    });

    it.each([ComponentSizeEnum.large, ComponentSizeEnum.small])('should render Button with size = "%s"', (size) => {
      setup({ size });

      expect(buttonRef.current).toHaveClass(`Button--${size}`);

      if (size !== 'small') {
        expect(buttonRef.current).toHaveClass('u-textUppercase');
      } else {
        expect(buttonRef.current).not.toHaveClass('u-textUppercase u-text200');
        expect(buttonRef.current).toHaveClass('u-text200');
      }
    });

    it('should render Button with size and disabled props from Context', () => {
      contextValue.sizeControl = ComponentSizeEnum.large;
      contextValue.disabledControl = true;
      setup();

      expect(buttonRef.current).toHaveClass(`Button--${ComponentSizeEnum.large}`);
      expect(buttonRef.current).toBeDisabled();
    });

    it('should render Button with disabled = "true"', () => {
      setup({ disabled: true });

      expect(buttonRef.current).toBeDisabled();
    });

    it.each(Object.values(ButtonWidthEnum))('should render Button with width = "%s"', (width) => {
      setup({ width });

      if (width === 'min') {
        expect(buttonRef.current).toHaveClass('Button--minWidth');
      } else if (width === 'full') {
        expect(buttonRef.current).toHaveClass('u-widthFull');
      }
    });

    it('should render Button with nonUpperCase = "true"', () => {
      setup({ nonUppercase: true });

      expect(buttonRef.current).not.toHaveClass('u-textUpperCase');
    });

    it('should render Button with onlyIcon = "true"', () => {
      setup({ onlyIcon: true });
      expect(buttonRef.current).toHaveClass('is-onlyIcon');
    });

    it('should render Button with as = "span"', () => {
      setup({ as: 'span' });
      expect(buttonRef.current?.tagName).toBe('SPAN');
    });

    it('should not disable Button when as different than "button"', () => {
      setup({ as: 'span', disabled: true });
      expect(buttonRef.current).not.toBeDisabled();
    });

    it('should render Button with className', () => {
      const className = 'buttonClassName';
      setup({ className });
      expect(buttonRef.current).toHaveClass(className);
    });
  });
});
