import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { IconNameEnum } from 'components/Icon';
import { icons } from 'constants/icons';
import { ComponentSizeEnum } from 'types/common';
import { setupWithUserEvent } from 'utils/test';
import SearchBox from '..';

describe('components/SearchBox', () => {
  const ref = createRef<HTMLInputElement>();
  const onChange = jest.fn();
  let button: HTMLButtonElement | null = null;
  let pathElement: SVGPathElement | null = null;

  const setup = (props = {}) => {
    const setupResult = setupWithUserEvent(render(
      <SearchBox
        buttonText="Button"
        value=""
        onChange={onChange}
        ref={ref}
        {...props}
      />,
    ));
    expect(ref.current).toBeTruthy();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);


    button = document.querySelector<HTMLButtonElement>('.Button');
    pathElement = document.querySelector<SVGPathElement>('path');

    return setupResult;
  };

  describe('Render SearchBox without passing props', () => {
    it('should render SearchBox without passing props', () => {
      setup();

      expect(button).toHaveClass('Button--medium u-textUppercase');
      expect(pathElement).toHaveAttribute('d', icons[IconNameEnum.search]);
    });
  });

  describe('Render Searchbox with passing props', () => {
    it.each([ComponentSizeEnum.large, ComponentSizeEnum.small])('should render Searchbox with size = "%s"', (size) => {
      setup({ sizeControl: size });

      expect(button).toHaveClass(`Button--${size}`);

      if (size !== 'small') {
        expect(button).toHaveClass('u-textUppercase');
      } else {
        expect(button).not.toHaveClass('u-textUppercase u-text200');
        expect(button).toHaveClass('u-text200');
      }
    });

    it.each(Object.values(IconNameEnum))('should render SearchBox with name = "%s"', (iconName) => {
      setup({ buttonIcon: iconName });
      expect(pathElement).toHaveAttribute('d', icons[iconName]);
    });

    it('should render SearchBox with buttonText', () => {
      const buttonText = 'Test';
      setup({ buttonText });

      expect(button?.firstChild).toHaveTextContent(buttonText);
    });

    it('should render SearchBox with onClickButton', async () => {
      const onClickButton = jest.fn();
      const { user } = setup({ onClickButton });

      if (button) {
        await user.click(button);
        expect(onClickButton).toBeCalled();
      }
    });

    it('should render SearchBox with className', () => {
      const className = 'searchBoxClassName';
      setup({ className });
      expect(document.querySelector('.SearchBox')).toHaveClass(className);
    });
  });
});
