import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentSizeEnum } from 'types/common';
import Form from '..';
import { InputTypeEnum } from '../Input';


describe('components/Form/Input', () => {
  const inputRef = createRef<HTMLInputElement>();

  let groupProps = {};

  const setup = (props = {}) => {
    render((
      <Form.Group {...groupProps}>
        <Form.InputGroup>
          <Form.Label>Input</Form.Label>
          <Form.Input value="" onChange={() => {}} {...props} ref={inputRef} />
        </Form.InputGroup>
      </Form.Group>
    ));

    expect(inputRef.current).toBeTruthy();
  };

  beforeEach(() => {
    groupProps = { // Assume no Form.Group
      sizeControl: null,
      requiredControl: null,
      disabledControl: null,
    };
  });

  describe('Render Input without passing props', () => {
    it('should render Input without passing props', () => {
      setup();

      expect(inputRef.current).toHaveClass('FormInput--medium');

      expect(inputRef.current).not.toHaveClass(
        'is-valid',
        'is-borderNone',
        'is-backgroundReset',
        'is-invalid',
        'is-warning',
      );

      expect(inputRef.current).not.toBeDisabled();
      expect(inputRef.current).not.toBeRequired();
      expect(inputRef.current?.tagName).toBe('INPUT');
    });

    it('should receive correct props from Form.Group', () => {
      groupProps = {
        controlId: 'input-1',
        sizeControl: ComponentSizeEnum.small,
        requiredControl: true,
        disabledControl: true,
      };

      setup();
      expect(inputRef.current).toHaveClass('FormInput--small');
      expect(inputRef.current).toBeDisabled();
      expect(inputRef.current).toBeRequired();
      expect(inputRef.current?.id).toBe('input-1');
    });
  });

  describe('Render Input with passing props', () => {
    it.each(['small', 'large'])('should render Input with sizeInput = "%s"', (size) => {
      setup({
        sizeInput: size,
      });

      expect(inputRef.current).toHaveClass(`FormInput--${size}`);
    });

    it.each(Object.values(InputTypeEnum))('should render Input with type = "%s"', (type) => {
      setup({ type });

      expect(inputRef.current).toHaveAttribute('type', type);
    });

    it('should render Input with value', () => {
      const testValue = 'test';
      setup({ value: testValue, onChange: () => undefined });

      expect(screen.getByDisplayValue(testValue)).toBeTruthy();
    });

    it('should render Input with id', () => {
      const id = 'id';
      setup({ id });
      expect(inputRef.current).toHaveAttribute('id', id);
    });

    it('should render Input with disabled = "true"', () => {
      setup({ disabled: true });
      expect(inputRef.current).toBeDisabled();
    });

    it('should render Input with required = "true"', () => {
      setup({ required: true });
      expect(inputRef.current).toBeRequired();
    });

    it('should render Input with readOnly = "true"', () => {
      setup({ readOnly: true });
      expect(inputRef.current).toHaveAttribute('readOnly');
    });

    it('should render Input with isValid = "true"', () => {
      setup({ isValid: true });
      expect(inputRef.current).toHaveClass('is-valid');
    });

    it('should render Input with isInValid = "true"', () => {
      setup({ isInvalid: true });
      expect(inputRef.current).toHaveClass('is-invalid');
    });

    it('should render Input with isBackgroundReset = "true"', () => {
      setup({ isBackgroundReset: true });
      expect(inputRef.current).toHaveClass('is-backgroundReset');
    });

    it('should render Input with isWarning = "true"', () => {
      setup({ isWarning: true });
      expect(inputRef.current).toHaveClass('is-warning');
    });

    it('should render Input with isBorderNone = "true"', () => {
      setup({ isBorderNone: true });
      expect(inputRef.current).toHaveClass('is-borderNone');
    });

    it('should render Input with className', () => {
      const className = 'inputClassName';
      setup({ className });
      expect(inputRef.current).toHaveClass(className);
    });
  });
});
