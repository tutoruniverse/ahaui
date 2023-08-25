import { render } from '@testing-library/react';
import { Form } from 'index';
import React from 'react';
import { ComponentSizeEnum } from 'types/common';

describe('component/Form/InputGroup', () => {
  const inputGroupRef = React.createRef<HTMLInputElement>();

  const setup = (props = {}) => {
    render((
      <Form.InputGroup ref={inputGroupRef} {...props}>
        <Form.Label>Input</Form.Label>
        <Form.Input value="" onChange={() => {}} />
      </Form.InputGroup>
    ));

    expect(inputGroupRef.current).toBeTruthy();
  };

  describe('Render without passing props', () => {
    it('should render without passing props', () => {
      setup();
      expect(inputGroupRef.current).toHaveClass(`FormInputGroup--${ComponentSizeEnum.medium}`);
      expect(inputGroupRef.current?.tagName).toBe('DIV');
    });
  });

  describe('Render with passing props', () => {
    it('should render with className', () => {
      const className = 'inputGroupClassName';
      setup({ className });
      expect(inputGroupRef.current).toHaveClass(className);
    });

    it('should render with as', () => {
      const as = 'span';
      setup({ as });
      expect(inputGroupRef.current?.tagName).toBe(as.toUpperCase());
    });
  });
});
