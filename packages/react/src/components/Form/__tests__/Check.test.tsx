import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentSizeEnum } from 'types/common';
import Form from '..';


describe('components/Form/Check', () => {
  const checkRef = createRef<HTMLInputElement>();

  let groupProps = {};

  const setup = (props = {}) => {
    render((
      <Form.Group {...groupProps}>
        <Form.Check {...props} ref={checkRef} />
      </Form.Group>
    ));

    expect(checkRef.current).toBeTruthy();
  };

  beforeEach(() => {
    groupProps = { // Assume no Form.Group
      sizeControl: null,
      disabledControl: null,
    };
  });

  describe('Render Check without passing props', () => {
    it('should render Check without passing props', () => {
      setup();



      expect(checkRef.current?.parentNode).toHaveClass(
        'FormCheck--withoutLabel', 'u-text300', 'FormCheck--medium',
      );

      expect(checkRef.current?.parentNode).not.toHaveClass(
        'is-valid',
        'is-invalid',
      );

      expect(checkRef.current).toHaveProperty('type', 'checkbox');
    });

    it('should receive correct props from Form.Group', () => {
      groupProps = {
        controlId: 'check-1',
        sizeControl: ComponentSizeEnum.small,
        disabledControl: true,
      };

      setup();
      expect(checkRef.current?.id).toBe('check-1');
      expect(checkRef.current).toBeDisabled();
      expect(checkRef.current?.parentNode).toHaveClass('FormCheck--small');
    });
  });

  describe('Render Check with passing props', () => {
    it('should render Check with type= "checkbox_button"', () => {
      const type = 'checkbox_button';
      setup({ type });

      expect(checkRef.current).toHaveProperty('type', 'checkbox');
    });

    it('should render Check with type= "radio"', () => {
      const type = 'radio';
      setup({ type });

      expect(checkRef.current).toHaveProperty('type', type);
    });

    it('should render Check with id', () => {
      const id = 'id';

      setup({ id });

      expect(checkRef.current).toHaveAttribute('id', id);
    });

    it('should render Check with label is function', () => {
      const labelFunc = () => 'Label';

      setup({ label: labelFunc, id: 'id' });

      expect(checkRef.current?.parentNode).not.toHaveClass('FormCheck--withoutLabel');

      expect(screen.getByLabelText('Label')).toBeTruthy();
    });

    it('should render Check with label is normal value', () => {
      const label = 'labelString';
      setup({ label, id: 'id' });

      expect(checkRef.current?.parentNode).not.toHaveClass('FormCheck--withoutLabel');

      expect(screen.getByLabelText(label)).toBeTruthy();
    });

    it('should render Check with inline = "true"', () => {
      setup({ inline: true });

      expect(checkRef.current?.parentNode).toHaveClass('u-inlineBlock');
    });

    it('should render Check with isInvalid = "true"', () => {
      setup({ isInvalid: true });

      expect(checkRef.current?.parentNode).toHaveClass('is-invalid');
    });

    it('should render Check with isValid = "true"', () => {
      setup({ isValid: true });

      expect(checkRef.current?.parentNode).toHaveClass('is-valid');
    });

    it('should render Check with className', () => {
      const className = 'className';
      setup({ className });
      expect(checkRef.current?.parentNode).toHaveClass(className);
    });
  });
});
