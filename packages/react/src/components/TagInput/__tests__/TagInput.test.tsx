import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentSizeEnum } from 'types/common';
import { variantsClassName as tagVariantsClassName } from 'components/Tag';
import Context from 'components/Form/Context';
import { setupWithUserEvent } from 'utils/test';
import TagInput, { TagInputVariant } from '..';

describe('components/TagInput', () => {
  const ref = createRef<HTMLDivElement>();
  const onChange = jest.fn();
  let input: HTMLInputElement | null = null;
  let tags: HTMLSpanElement[] | null = null;
  let formContextValue = {};

  const setup = (props = {}) => {
    const setupResult = setupWithUserEvent(render(
      <Context.Provider value={formContextValue}>
        <TagInput
          onChange={onChange}
          value={['tag']}
          {...props}
          ref={ref}
        />
      </Context.Provider>,
    ));

    expect(ref.current).toBeTruthy();
    tags = screen.queryAllByTestId('tag');
    input = document.querySelector<HTMLInputElement>('input');
    return setupResult;
  };

  beforeEach(() => {
    formContextValue = {
      sizeControl: undefined,
      controlId: undefined,
    };
  });

  describe('Render TagInput without passing props', () => {
    it('should render TagInput without passing props', () => {
      setup();

      if (tags && input) {
        expect(tags[0]).toHaveClass(
          'Tag u-flexInline u-alignItemsCenter u-textCenter u-textNoWrap u-roundedMedium hover:u-textDecorationNone u-marginRightTiny',
        );

        expect(tags[0]).not.toHaveClass('Tag--small u-text100');

        expect(tags[0].children[0]).toHaveClass(
          'Tag-close u-marginLeftTiny u-cursorPointer hover:u-textDecorationNone',
        );

        expect(input).not.toHaveClass('u-text100');
        expect(ref.current).toHaveClass('TagInput--medium');
        expect(ref.current).toHaveStyle('height:auto');
      }
    });
  });

  describe('Render TagInput with passing props', () => {
    it.each([ComponentSizeEnum.small, ComponentSizeEnum.large])(
      'should render TagInput with size = %s',
      (size) => {
        setup({ size });

        expect(ref.current).toHaveClass(`TagInput--${size}`);

        if (tags && input) {
          if (size === ComponentSizeEnum.small) {
            expect(tags[0]).toHaveClass('Tag--small u-text100');

            expect(input).toHaveClass('u-text100');
          } else {
            expect(tags[0]).not.toHaveClass('Tag--small u-text100');
            expect(tags[0]).toHaveClass('u-text200');

            expect(input).not.toHaveClass('u-text100');
            expect(tags[0]).toHaveClass('u-text200');
          }
        }
      },
    );

    it.each(Object.keys(tagVariantsClassName) as TagInputVariant[])(
      'should render TagInput with variant = %s',
      (variant) => {
        setup({ variant });

        if (tags) {
          expect(tags[0]).toHaveClass(tagVariantsClassName[variant]);
        }
      },
    );

    it('should have focusedClassName if being focused', async () => {
      const { user } = setup({});

      if (input) {
        await user.click(input);
        expect(ref.current).toHaveClass('is-focus');
      }
    });
  });
});
