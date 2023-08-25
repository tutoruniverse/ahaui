import { render } from '@testing-library/react';
import { Form } from 'index';
import React from 'react';
import { ComponentCommonSize, ComponentSizeEnum } from 'types/common';
import { labelSizes } from '../Label';

describe('components/Form/Label', () => {
  const labelRef = React.createRef<HTMLLabelElement>();
  let groupProps = {};

  const setup = (props = {}) => {
    render((
      <Form.Group {...groupProps}>
        <Form.Label {...props} ref={labelRef} />
      </Form.Group>
    ));
    expect(labelRef.current).toBeTruthy();
  };

  beforeEach(() => {
    groupProps = { // Assume no Form.Group
      sizeControl: null,
      requiredControl: null,
    };
  });

  describe('Render without passing props', () => {
    it('should render correctly', () => {
      setup();
      expect(labelRef.current).toHaveClass('FormLabel');
      expect(labelRef.current).not.toHaveClass('u-text200');
      expect(labelRef.current).not.toHaveAttribute('required');
      expect(labelRef.current?.tagName).toBe('LABEL');
    });

    it('should receive correct props from Form.Group', () => {
      groupProps = {
        controlId: 'input-1',
        sizeControl: ComponentSizeEnum.small,
        requiredControl: true,
      };

      setup();
      expect(labelRef.current?.htmlFor).toBe('input-1');
      expect(labelRef.current).toHaveClass('u-text200');
      expect(labelRef.current).toHaveAttribute('required');
    });
  });

  describe('Render with passing props', () => {
    it.each([
      [ComponentSizeEnum.small],
      [ComponentSizeEnum.medium],
      [ComponentSizeEnum.large],
    ])('should render with sizeLabel', (size) => {
      setup({ sizeLabel: size });
      const labelSize = labelSizes[size as ComponentCommonSize];
      if (labelSize) {
        expect(labelRef.current).toHaveClass(labelSize);
      }
    });

    it('should render with htmlFor', () => {
      setup({ htmlFor: 'input-1' });
      expect(labelRef.current?.htmlFor).toBe('input-1');
    });

    it('should render with required="true"', () => {
      setup({ required: true });
      expect(labelRef.current).toHaveAttribute('required');
    });

    it('should render with className', () => {
      const className = 'labelClassName';
      setup({ className });
      expect(labelRef.current).toHaveClass(className);
    });

    it('should render with as', () => {
      setup({ as: 'div' });
      expect(labelRef.current?.tagName).toBe('DIV');
    });
  });
});
