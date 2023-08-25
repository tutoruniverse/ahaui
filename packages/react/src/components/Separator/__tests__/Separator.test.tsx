import React from 'react';
import { render } from '@testing-library/react';
import Separator, { SeparatorVariant, variantsClassName } from '..';

describe('components/Separator', () => {
  const separatorRef = React.createRef<HTMLDivElement>();
  const setup = (props = {}) => {
    render(<Separator ref={separatorRef} {...props} />);

    expect(separatorRef.current).toBeTruthy();
    expect(separatorRef.current).toHaveClass('Separator');
    expect(separatorRef.current?.children[0]).toHaveClass('Separator-line');
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      const children = separatorRef.current?.children as HTMLCollection;
      expect(children).toHaveLength(1); // not have label
      expect(children[0]).toHaveClass('u-borderLight'); // light variant
      expect(children[0]).not.toHaveClass('u-borderDashed'); // lineType = solid
    });
  });

  describe('Render with passing props', () => {
    it('should render with label', () => {
      setup({
        label: 'Label',
      });

      const children = separatorRef.current?.children as HTMLCollection;
      expect(children).toHaveLength(3); // Have 2 lines and 1 label

      expect(children[0]).toHaveClass('Separator-line');
      expect(children[2]).toHaveClass('Separator-line');

      expect(children[1]).toHaveTextContent('Label');
      expect(children[1]).toHaveClass(variantsClassName.light.label); // default is light variant
    });

    it.each([
      'light',
      'lighter',
      'primary',
      'positive',
      'negative',
      'gray',
    ] as SeparatorVariant[])('should render with variant="%s"', (variant) => {
      setup({
        variant,
        label: 'Label',
      });

      const children = separatorRef.current?.children as HTMLCollection;
      expect(children[0]).toHaveClass(variantsClassName[variant].line);
      expect(children[2]).toHaveClass(variantsClassName[variant].line);

      expect(children[1].className).toContain(variantsClassName[variant].label);
    });
    it('should render with lineType="dashed"', () => {
      setup({
        lineType: 'dashed',
      });

      expect(separatorRef.current?.children[0]).toHaveClass('u-borderDashed'); // lineType = dashed
    });

    it('should render with className', () => {
      const className = 'separatorClassName';
      setup({ className });
      expect(separatorRef.current).toHaveClass(className);
    });
  });
});
