import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import createBlock, { pascalCase } from 'utils/createBlock';

describe('utils/createBlock', () => {
  describe('Functions should run properly', () => {
    it('pascalCase should run', () => {
      const testString = 'test_string';
      const pascalString = pascalCase(testString);
      expect(pascalString).toBe('TestString');
    });

    it('createBlock should run without passing props', () => {
      const ref = createRef();

      const TestBlock = createBlock('test_block');

      render(<TestBlock ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('test_block');
    });

    it('createBlock should run with passing props', () => {
      const ref = createRef();

      const TestBlock = createBlock('test_block', {
        Component: 'span',
        defaultProps: {
          style: {
            backgroundColor: 'red',
          },
          age: '12',
        },
      });

      render(
        <TestBlock ref={ref} />,
      );

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toHaveStyle({ backgroundColor: 'red' });
      expect(ref.current).toHaveAttribute('age', '12');
    });
  });
});
