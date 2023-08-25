import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { icons } from 'constants/icons';
import { SizeMapping } from 'constants/common';
import { ComponentSizeEnum } from 'types/common';
import Icon, { IconNameEnum } from '..';

describe('components/Icon', () => {
  const iconRef = createRef<SVGSVGElement>();
  let pathElement: undefined | Element;

  const setup = (iconProps = {}) => {
    render(<Icon {...iconProps} ref={iconRef} />);

    expect(iconRef.current).toBeTruthy();
    expect(iconRef.current).toBeInstanceOf(SVGSVGElement);

    pathElement = iconRef.current?.children[0];
    expect(pathElement).toBeTruthy();
  };

  describe('Render icon without passing props', () => {
    it('should render icon with default props', () => {
      setup();

      // Check if component has default props set
      // Size `small`
      expect(iconRef.current).toHaveAttribute('width', `${SizeMapping[ComponentSizeEnum.small]}px`);

      // Name `cloud`
      expect(pathElement).toHaveAttribute('d', icons.cloud);
    });

    describe('Render icon with passing props', () => {
      it.each(
        Object.values(ComponentSizeEnum),
      )('should render with size = "%s"', (size) => {
        setup({ size });

        expect(iconRef.current).toHaveAttribute('width', `${SizeMapping[size]}px`);
      });

      it.each(
        Object.values(IconNameEnum),
      )('should render with name = "%s" and without pathElement prop', (name) => {
        setup({ name });
        expect(pathElement).toHaveAttribute('d', icons[name]);
      });

      it.each(
        Object.values(IconNameEnum),
      )('should render with name = "%s" and with pathElement prop', (name) => {
        const path = 'testPath';
        setup({ name, path });

        // `Icon name` will have no effect if `path` is passed in
        expect(pathElement).not.toHaveAttribute('d', icons[name]);

        expect(pathElement).toHaveAttribute('d', path);
      });

      it('should render with className', () => {
        const className = 'className';

        setup({ className });

        expect(iconRef.current?.classList).toContain(className);
      });
    });
  });
});
