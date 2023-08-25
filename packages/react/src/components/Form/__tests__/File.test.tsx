import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentSizeEnum } from 'types/common';
import Form from '..';


describe('components/Form/File', () => {
  const fileRef = createRef<HTMLInputElement>();
  let labelElement: HTMLLabelElement;

  let groupProps = {};

  const setup = (props = {}) => {
    render((
      <Form.Group {...groupProps}>
        <Form.File {...props} ref={fileRef} />
      </Form.Group>
    ));

    expect(fileRef.current).toBeTruthy();
    labelElement = fileRef.current?.parentNode?.children[1] as HTMLLabelElement;
  };

  beforeEach(() => {
    groupProps = { // Assume no Form.Group
      sizeControl: null,
      disabledControl: null,
    };
  });

  describe('Render File without passing props', () => {
    it('should render File without passing props', () => {
      setup();


      expect(fileRef.current?.parentNode).toHaveClass(
        'FormInput--medium',
      );

      expect(fileRef.current?.parentNode).not.toHaveClass(
        'is-valid',
        'is-invalid',
        'u-cursorNotAllow u-textLight u-pointerEventsNone',
        'is-selected',
        'is-borderNone',
        'is-backgroundReset',
      );
    });

    it('should receive correct props from Form.Group', () => {
      groupProps = {
        controlId: 'file-1',
        disabledControl: true,
        sizeControl: ComponentSizeEnum.small,
      };

      setup();
      expect(fileRef.current?.id).toBe('file-1');
      expect(fileRef.current?.parentNode).toHaveClass('u-cursorNotAllow');
      expect(fileRef.current?.parentNode).toHaveClass('FormInput--small u-text200');
    });
  });

  describe('Render File with passing props', () => {
    it('should render File with isInvalid = "true"', () => {
      setup({ isInvalid: true });

      expect(fileRef.current?.parentNode).toHaveClass('is-invalid');
    });

    it('should render File with isValid = "true"', () => {
      setup({ isValid: true });

      expect(fileRef.current?.parentNode).toHaveClass('is-valid');
    });

    it('should render File with disabled = "true"', () => {
      setup({ disabled: true });

      expect(fileRef.current?.parentNode).toHaveClass('u-cursorNotAllow u-textLight u-pointerEventsNone');
      expect(labelElement).toHaveClass('u-cursorNotAllow');
    });


    it('should render File with isBackgroundReset = "true"', () => {
      setup({ isBackgroundReset: true });

      expect(fileRef.current?.parentNode).toHaveClass('is-backgroundReset');
    });

    it('should render File with isBorderNone = "true"', () => {
      setup({ isBorderNone: true });

      expect(fileRef.current?.parentNode).toHaveClass('is-borderNone');
    });

    it('should render File with id', () => {
      const id = 'id';
      setup({ id });

      expect(fileRef.current).toHaveAttribute('id', id);
      expect(labelElement).toHaveProperty('htmlFor', id);
    });

    it('should render File with fileName', () => {
      const fileName = 'test';
      setup({ fileName, id: 'id' });

      expect(fileRef.current?.parentNode).toHaveClass('is-selected');

      expect(screen.getByLabelText(fileName)).toBeTruthy();
    });

    it('should render File with browseText', () => {
      const browseText = 'test';
      setup({ browseText });

      expect(labelElement).toHaveAttribute('data-browse', browseText);
    });

    it('should render File with className', () => {
      const className = 'test';
      setup({ className });
      expect(fileRef.current?.parentNode).toHaveClass(className);
    });

    it('should render File with placeholder without fileName', () => {
      const placeholder = 'file-placeholder';
      setup({ placeholder });

      expect(screen.getByText(placeholder)).toBeTruthy();
      expect(screen.getByText(placeholder)).toHaveClass('u-textLight');
    });

    it('should render File with placeholder and fileName', () => {
      const placeholder = 'file-placeholder';
      const fileName = 'file-name';
      setup({ placeholder, fileName });

      expect(screen.queryByText(placeholder)).not.toBeTruthy();
      expect(screen.getByText(fileName)).toBeTruthy();
    });

    it('should render File with as', () => {
      const as = 'span';
      setup({ as });
      expect(fileRef.current?.parentElement?.tagName).toBe(as.toUpperCase());
    });
  });
});
