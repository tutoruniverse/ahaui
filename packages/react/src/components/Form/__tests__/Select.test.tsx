import React, { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ComponentSizeEnum } from 'types/common';
import { setupWithUserEvent } from 'utils/test';
import Form from '..';


describe('components/Form/Select', () => {
  const selectRef = createRef<HTMLSelectElement>();

  const onChangeHandle = jest.fn();

  let groupProps = {};

  const setup = (props = {}) => {
    const setupResult = setupWithUserEvent(render((
      <Form.Group {...groupProps}>
        <Form.Select value="" onChange={onChangeHandle} {...props} ref={selectRef} />
      </Form.Group>
    )));

    expect(selectRef.current).toBeTruthy();
    return setupResult;
  };

  beforeEach(() => {
    groupProps = { // Assume no Form.Group
      sizeControl: null,
      requiredControl: null,
      disabledControl: null,
    };
  });

  describe('Render Select without passing props', () => {
    it('should render Select without passing props', () => {
      setup();

      expect(selectRef.current?.parentNode).toHaveClass(
        'FormInput--medium',
      );

      expect(selectRef.current?.parentNode).not.toHaveClass(
        'is-borderNone',
        'is-valid',
        'is-backgroundReset',
        'is-invalid',
        'is-multiple',
      );

      expect(selectRef.current?.parentNode?.children.length).toBe(2);
    });

    it('should receive correct props from Form.Group', () => {
      groupProps = {
        controlId: 'input-1',
        sizeControl: ComponentSizeEnum.small,
        requiredControl: true,
        disabledControl: true,
      };
      setup();

      expect(selectRef.current?.parentNode).toHaveClass(`FormInput--${ComponentSizeEnum.small}`);
      expect(selectRef.current).toBeRequired();
      expect(selectRef.current).toBeDisabled();
      expect(selectRef.current).toHaveProperty('id', 'input-1');
    });
  });

  describe('Render Select with passing props', () => {
    it.each(['small', 'large'])('should render Select with sizeInput = "%s"', (size) => {
      setup({
        sizeInput: size,
      });

      expect(selectRef.current?.parentNode).toHaveClass(`FormInput--${size}`);
    });
    it('should render Select with id', () => {
      const id = 'id';

      setup({ id });

      expect(selectRef.current).toHaveAttribute('id', id);
    });

    it('should render Select with multiple = "true"', () => {
      setup({ multiple: true, value: [] });

      expect(selectRef.current?.parentNode).toHaveClass('is-multiple');

      expect(selectRef.current?.parentNode?.children.length).toBe(1);

      expect(selectRef.current).toHaveClass('u-webkitScrollbar');
    });

    it('should render Select with isInvalid = "true"', () => {
      setup({ isInvalid: true });

      expect(selectRef.current?.parentNode).toHaveClass('is-invalid');
    });

    it('should render Select with isValid = "true"', () => {
      setup({ isValid: true });

      expect(selectRef.current?.parentNode).toHaveClass('is-valid');
    });

    it('should render Select with disabled = "true"', () => {
      setup({ disabled: true });
      expect(selectRef.current).toBeDisabled();
      expect(selectRef.current?.parentNode).toHaveClass('is-disabled');
    });

    it('should render Select with required = "true"', () => {
      setup({ required: true });
      expect(selectRef.current).toBeRequired();
    });

    it('should render Select with isBackgroundReset = "true"', () => {
      setup({ isBackgroundReset: true });
      expect(selectRef.current?.parentNode).toHaveClass('is-backgroundReset');
    });

    it('should render Select with isBorderNone = "true"', () => {
      setup({ isBorderNone: true });
      expect(selectRef.current?.parentNode).toHaveClass('is-borderNone');
    });

    it('should render Select with className', () => {
      const className = 'selectClassName';
      setup({ className });
      expect(selectRef.current?.parentNode).toHaveClass(className);
    });
  });

  it('should be able to select value', async () => {
    const { user } = setup({
      children: (
        <>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </>),
    });

    if (selectRef.current) {
      await user.selectOptions(selectRef.current, '1');
      expect(onChangeHandle).toBeCalled();
    }
  });

  it('should handle on focus and blur correctly', () => {
    setup();

    if (selectRef.current) {
      fireEvent.focus(selectRef.current);
      expect(selectRef.current.parentNode).toHaveClass('is-focus');

      fireEvent.blur(selectRef.current);
      expect(selectRef.current.parentNode).not.toHaveClass('is-focus');
    }
  });
});
