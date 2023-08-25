import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { ComponentCommonSize, ComponentSizeEnum } from 'types/common';
import Form from '..';
import { labelSizes } from '../Label';

describe('components/Form/Group', () => {
  const ref = createRef<HTMLDivElement>();
  const labelRef = createRef<HTMLLabelElement>();
  const inputRef = createRef<HTMLInputElement>();
  const fileRef = createRef<HTMLInputElement>();
  const checkRef = createRef<HTMLInputElement>();

  const setup = (props = {}) => {
    render(
      <Form>
        <Form.Group {...props} ref={ref}>
          <Form.Input value="" onChange={() => {}} ref={inputRef} />
          <Form.Label ref={labelRef} />
          <Form.File ref={fileRef} />
          <Form.Check ref={checkRef} />
        </Form.Group>
      </Form>);

    expect(ref.current).toBeTruthy();
    expect(labelRef.current).toBeTruthy();
    expect(inputRef.current).toBeTruthy();
  };

  describe('Render Group without passing props', () => {
    it('should render Group', () => {
      setup();

      // Form Group is a ContextProvider. It will provide for all children components those props
      // controlId
      // sizeControl
      // disabledControl
      // RequireControl

      expect(inputRef.current).toHaveClass('FormInput--medium');
      expect(inputRef.current).not.toBeRequired();
      expect(inputRef.current).not.toBeDisabled();

      expect(labelRef.current).not.toBeRequired();
    });
  });

  describe('Render Group with passing props', () => {
    it.each([
      ComponentSizeEnum.small,
      ComponentSizeEnum.medium,
      ComponentSizeEnum.large,
    ] as ComponentCommonSize[])('should render Group with sizeControl = "%s"', (size) => {
      setup({ sizeControl: size });

      expect(inputRef.current).toHaveClass(`FormInput--${size}`);

      if (labelSizes[size]) {
        expect(labelRef.current).toHaveClass(labelSizes[size]);
      }
      expect(fileRef.current?.parentElement).toHaveClass(`FormInput--${size}`);
      expect(checkRef.current?.parentElement).toHaveClass(`FormCheck--${size}`);
    });

    it('should render Group with requiredControl = "true"', () => {
      setup({ requiredControl: true });

      expect(inputRef.current).toBeRequired();
      expect(labelRef.current).toHaveAttribute('required');
    });

    it('should render Group with disabledControl = "true"', () => {
      setup({ disabledControl: true });

      expect(inputRef.current).toBeDisabled();
      expect(fileRef.current?.parentElement).toHaveClass('u-cursorNotAllow');
      expect(checkRef.current).toBeDisabled();
    });

    it('should render Group with controlId', () => {
      const controlId = 'id';
      setup({ controlId });

      expect(inputRef.current).toHaveAttribute('id', controlId);
      expect(labelRef.current).toHaveProperty('htmlFor', controlId);
      expect(fileRef.current).toHaveAttribute('id', controlId);
      expect(checkRef.current).toHaveAttribute('id', controlId);
    });

    it('should render Group with className', () => {
      const className = 'groupClassName';
      setup({ className });
      expect(ref.current).toHaveClass(className);
    });
  });
});
