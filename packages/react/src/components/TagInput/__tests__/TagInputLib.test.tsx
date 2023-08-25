import React, { createRef } from 'react';
import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import Button from 'components/Button';
import { act } from 'react-dom/test-utils';
import { SetupWithUserEvent, setupWithUserEvent } from 'utils/test';
import { KeyCharacter } from 'constants/common';
import TagsInput, {
  DefaultRenderInputProps,
  DefaultRenderTagProps,
} from '../TagInputLib';

describe('components/TagsInputLib', () => {
  const ref = createRef<HTMLDivElement>();
  let value: undefined | string[] = ['tag1'];
  const onChange = jest.fn().mockImplementation((newValue: string[]) => {
    value = newValue;
  });
  const submit = jest.fn();
  let input: HTMLInputElement | null = null;
  let tags: HTMLSpanElement[];
  let wrapper: SetupWithUserEvent<RenderResult>;

  const typeValue = 'tag';
  const keyboardTest = [
    KeyCharacter.CAPS_LOCK,
    KeyCharacter.ALT,
  ];

  const typeThenEnter = async (text: string) => {
    await wrapper.user.keyboard(`${text}{Enter}`);
  };

  const pasteText = async (text: string) => {
    await wrapper.user.paste(text);
  };

  const setup = (props = {}) => {
    wrapper = setupWithUserEvent(render(
      <form onSubmit={submit}>
        <TagsInput
          ref={ref}
          onChange={onChange}
          value={value}
          {...props}
        />
      </form>,
    ));
    expect(ref.current).toBeTruthy();
    tags = screen.queryAllByTestId('tag');
    input = document.querySelector<HTMLInputElement>('input');
  };

  const rerender = (props = {}) => {
    wrapper.rerender(
      <form onSubmit={submit}>
        <TagsInput
          ref={ref}
          onChange={onChange}
          value={value}
          {...props}
        />
      </form>,
    );
    expect(ref.current).toBeTruthy();
    tags = screen.queryAllByTestId('tag');
    input = document.querySelector<HTMLInputElement>('input');
  };

  beforeEach(() => {
    value = ['tag1'];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render TagsInput without passing props', () => {
    it('should render TagsInput without passing props', async () => {
      value = undefined;
      setup();
      expect(ref.current).toHaveClass('react-tagsinput');
      expect(ref.current).not.toHaveClass('react-tagsinput--focused');
      if (input) {
        expect(tags.length).toBe(0);

        // addOnBlur = false
        await wrapper.user.type(input, typeValue);
        input.blur();
        expect(tags.length).toBe(0);

        // addOnPaste = false
        await wrapper.user.paste(typeValue);
        expect(tags.length).toBe(0);

        // removeKeys = 8
        await wrapper.user.click(input);
        await wrapper.user.clear(input);
        expect(value).toBeUndefined();

        // remove with default render tag icon
        await typeThenEnter(typeValue);
        rerender();
        expect(onChange).toBeCalledTimes(1);
        const removeIcon = tags[0].children[0];
        if (removeIcon) {
          await wrapper.user.click(removeIcon);
        }
        rerender();
        expect(onChange).toBeCalledTimes(2);
        expect(value).toStrictEqual([]);

        // onlyUnique = false
        await wrapper.user.click(input);
        await typeThenEnter('tag1');
        rerender();

        expect(value).toStrictEqual(['tag1']);
        await typeThenEnter('tag1');
        rerender();
        expect(value).toStrictEqual(['tag1', 'tag1']);
        expect(onChange).toBeCalledTimes(4);

        // disabled = false
        expect(input).not.toBeDisabled();
        expect(tags[0].children.length).toBe(1);

        // preventSubmit = true
        await wrapper.user.clear(input);
        await typeThenEnter(typeValue);
        rerender();
        expect(submit).not.toBeCalled();
      }
    });
  });

  describe('render TagsInput with passing props', () => {
    it('should render TagsInput with inital value', () => {
      setup();

      if (input) {
        expect(tags).toHaveLength(1);
        expect(tags[0]).toHaveClass('react-tagsinput-tag');
        expect(value).toStrictEqual(['tag1']);
      }
    });

    it('should render TagsInput with focusedClassName', () => {
      const className = 'test-class';
      setup({ className });

      if (input) {
        expect(ref.current).toHaveClass(className);
      }
    });

    it('should render TagsInput with style', () => {
      const style = {
        backgroundColor: 'red',
      };
      setup({ style });

      if (input) {
        expect(ref.current).toHaveStyle(style);
      }
    });

    it('should render TagsInput with focusedClassName', async () => {
      const focusedClassName = 'focus-class';
      setup({ focusedClassName });

      if (input) {
        await wrapper.user.click(input);
        expect(ref.current).toHaveClass(focusedClassName);
      }
    });

    it.each(keyboardTest)(
      'should render TagsInput with addKey = %s',
      async (addKey) => {
        setup({ addKeys: [addKey] });
        if (input) {
          const tag = `${typeValue}${addKey}`;
          await wrapper.user.click(input);
          await wrapper.user.clear(input);
          await wrapper.user.keyboard(`${tag}{${addKey}}`);
          expect(onChange).toBeCalled();
          expect(value).toContain(tag);
        }
      },
    );

    it('should render TagsInput with addOnBlur', async () => {
      setup({ addOnBlur: true });

      if (input) {
        await wrapper.user.type(input, typeValue);
        input.blur();
        expect(onChange).toBeCalled();
        expect(value).toContain(typeValue);
      }
    });

    it('should render TagsInput with addOnPaste', async () => {
      setup({ addOnPaste: true });

      if (input) {
        await wrapper.user.click(input);
        await pasteText(typeValue);
        expect(onChange).toBeCalled();
        expect(value).toContain(typeValue);
      }
    });

    it('should render TagsInput with currentValue', () => {
      const currentValue = 'test';
      setup({ currentValue });

      if (input) {
        expect(input.value).toBe(currentValue);
      }
    });

    it('should render TagsInput with inputValue and onChangeInput', async () => {
      let inputValue = 'test';
      const onChangeInput = jest.fn().mockImplementation((newValue) => {
        inputValue = newValue;
        rerender({ inputValue, onChangeInput });
      });
      setup({ inputValue, onChangeInput });

      if (input) {
        expect(input.value).toBe(inputValue);
        await wrapper.user.clear(input);
        await wrapper.user.type(input, typeValue);
        expect(onChangeInput).toBeCalled();
        expect(input.value).toBe(typeValue);
        await typeThenEnter('');
        expect(onChangeInput).toBeCalledWith('');
      }
    });

    it('should render TagsInput with inputProps', async () => {
      const props = {
        className: 'input-classname',
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        onChange: jest.fn(),
      };

      setup({ inputProps: props });

      if (input) {
        expect(input).toHaveClass(props.className);
        if (ref.current) {
          await wrapper.user.click(ref.current);
          expect(props.onFocus).toBeCalled();
          input.blur();
          expect(props.onBlur).toBeCalled();
          await wrapper.user.type(input, typeValue);
          expect(props.onChange).toBeCalled();
        }
      }
    });

    it('should render TagsInput with onChange', async () => {
      const onChangeProp = jest.fn();
      setup({ onChange: onChangeProp });

      if (input) {
        await wrapper.user.click(input);
        await typeThenEnter(typeValue);
        expect(onChangeProp).toBeCalled();
      }
    });

    it.each(keyboardTest)(
      'should render TagsInput with removeKey = %s',
      async (removeKey) => {
        setup({ removeKeys: [removeKey] });
        if (input) {
          await wrapper.user.click(input);
          await wrapper.user.clear(input);
          await wrapper.user.keyboard(`{${removeKey}}`);
          expect(onChange).toBeCalled();
          expect(value).toStrictEqual([]);
        }
      },
    );

    it('should render TagsInput with renderInput', () => {
      const renderInput = (props: DefaultRenderInputProps) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { disabled, addTag, ...other } = props;
        return (
          <input
            {...other}
            style={{
              width: 300,
            }}
            data-testid="tag-input"
          />
        );
      };

      setup({ renderInput });

      if (input) {
        expect(input).toHaveStyle('width: 300px');
      }
    });

    it('should render TagsInput with renderTag', () => {
      const style = {
        background: '#E7ECFC',
        color: '#375DE7',
      };
      const renderTag = (props: DefaultRenderTagProps) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {
          tag,
          key,
          getTagDisplayValue,
          ...other
        } = props;

        return (
          <span key={key} {...other} style={style} data-testid="tag">
            <Button className="button">
              {getTagDisplayValue(tag)}
            </Button>
          </span>
        );
      };

      setup({ renderTag });

      if (tags) {
        expect(tags[0]).toHaveClass('react-tagsinput-tag');

        expect(tags[0]).toHaveStyle(style);
      }
    });

    it('should render TagsInput with renderLayout', () => {
      const renderLayout = (
        tagComponents: React.ReactNode,
        inputComponent: React.ReactNode,
      ) => (
        <div className="Tags-input-container">
          {tagComponents}
          {inputComponent}
        </div>
      );

      setup({ renderLayout });

      expect(
        document.querySelector('.Tags-input-container'),
      ).toBeTruthy();
    });

    it('should render TagsInput with pasteSplit', async () => {
      const pasteSplit = (data: string) => data.split('-');

      setup({ pasteSplit, addOnPaste: true });

      const textToPaste = 'a-b-c';
      const tags = pasteSplit(textToPaste);

      if (input) {
        await wrapper.user.click(input);
        await pasteText(textToPaste);
        expect(onChange).toBeCalled();
        tags.forEach((tag) => expect(value).toContain(tag));
      }
    });

    it('should render TagsInput with tagProps', () => {
      const tagProps = {
        className: 'Tag-prop-test',
        style: {
          backgroundColor: 'red',
        },
      };

      setup({ tagProps });
      if (tags) {
        expect(tags[0]).toHaveClass(tagProps.className);
        expect(tags[0]).toHaveStyle(tagProps.style);
      }
    });

    it('should render TagsInput with onlyUnique', async () => {
      setup({ onlyUnique: true });

      if (input) {
        // Type new value
        await wrapper.user.click(input);
        await typeThenEnter(typeValue);
        expect(onChange).toBeCalledTimes(1);
        expect(value).toStrictEqual(['tag1', 'tag']);
        rerender({ value, onlyUnique: true });

        // Type prev value again
        await wrapper.user.click(input);
        await typeThenEnter(typeValue);
        expect(onChange).toBeCalledTimes(1);
        expect(value).toStrictEqual(['tag1', 'tag']);
      }
    });

    it('should render TagsInput with onlyUnique and pasteSplit', async () => {
      setup({ onlyUnique: true, addOnPaste: true });

      if (input) {
        // Paste multiple values
        await wrapper.user.click(input);
        await pasteText('tag 123 tag');
        expect(onChange).toBeCalledTimes(1);
        expect(value).toStrictEqual(['tag1', 'tag', '123']);
        rerender({ value, onlyUnique: true, addOnPaste: true });

        // Paste prev value again
        await wrapper.user.click(input);
        await pasteText('tag 123 tag');
        expect(onChange).toBeCalledTimes(1);
        expect(value).toStrictEqual(['tag1', 'tag', '123']);
      }
    });


    it('should render TagsInput with value', () => {
      const testValue = ['value1', 'value2'];

      setup({ value: testValue });

      if (tags) {
        expect(tags.length).toBe(2);
      }
    });

    it('should ren der TagsInput with validationRegex', async () => {
      const regex = /^[a-zA-Z]+$/;

      regex.test = jest.fn();

      setup({ validationRegex: regex });

      if (input) {
        await wrapper.user.click(input);
        await typeThenEnter('123');
        expect(regex.test).toBeCalled();
        expect(value).not.toContain(typeValue);
      }
    });

    it('should render TagsInput with disabled', () => {
      setup({ disabled: true });

      if (input && tags) {
        expect(input).toBeDisabled();
        expect(tags[0].children.length).toBe(0);
      }
    });

    it('should render TagsInput with tagDisplayProp', async () => {
      let testValue = [
        {
          text: 'tag1',
        },
        {
          text: 'tag2',
        },
      ];

      const onChangeProp = jest.fn().mockImplementation((newValue) => {
        testValue = newValue;
      });
      setup({
        tagDisplayProp: 'text',
        value: testValue,
        onChange: onChangeProp,
      });

      if (input && tags) {
        await wrapper.user.click(input);
        await typeThenEnter(typeValue);
        rerender({ tagDisplayProp: 'text', value: testValue });
        expect(tags.length).toBe(3);
        expect(testValue).toContainEqual({
          text: typeValue,
        });
      }
    });

    it('should render TagsInput with maxTags', async () => {
      setup({ maxTags: 1 });

      if (input && tags) {
        await wrapper.user.click(input);
        await typeThenEnter(typeValue);
        expect(onChange).not.toBeCalled();
        expect(tags.length).toBe(1);
      }
    });

    it('should render TagsInput with onValidationReject and validate', async () => {
      const onValidationReject = jest.fn();
      const validate = jest.fn().mockImplementation((value) => value.length > 6);

      setup({
        validate,
        onValidationReject,
      });

      if (input && tags) {
        await wrapper.user.click(input);
        await typeThenEnter(typeValue);
        expect(validate).toBeCalled();
        expect(onValidationReject).toBeCalled();
      }
    });

    it('should render empty tags if value is falsy or boolean', () => {
      const testValue = [null, undefined, false, true];

      setup({ value: testValue });

      if (tags) {
        expect(tags.length).toBe(4);
        tags.forEach(tag => expect(tag).toHaveTextContent(''));
      }
    });

    it('should not add tag if you press enter with empty value', async () => {
      setup();

      if (input && tags) {
        await wrapper.user.click(input);
        await typeThenEnter('');
        expect(onChange).not.toBeCalled();
      }
    });

    it('should remove tag if you press backspace', async () => {
      setup();

      if (input && tags) {
        expect(tags).toHaveLength(1);
        await wrapper.user.click(input);
        await wrapper.user.keyboard('{Backspace}');
        rerender();
        expect(onChange).toBeCalledTimes(1);
        expect(tags).toHaveLength(0);
      }
    });

    it('should render empty tag if value is object but without passing tagDisplayProp', () => {
      const testValue = [{
        text: 'tag1',
      }];

      setup({ value: testValue });

      if (tags) {
        expect(tags.length).toBe(1);
        tags.forEach(tag => expect(tag).toHaveTextContent(''));
      }
    });

    it('should handle paste on empty clipboard data', async () => {
      setup({ addOnPaste: true });

      if (input) {
        await wrapper.user.click(input);
        await wrapper.user.paste('');
        expect(onChange).not.toBeCalled();
      }
    });

    it('should render TagsInput with preventSubmit = false with tags', async () => {
      setup({ preventSubmit: false });

      if (input) {
        await wrapper.user.click(input);
        await typeThenEnter(typeValue);
        rerender();
        expect(submit).toBeCalled();
      }
    });

    it('should render TagsInput with preventSubmit = false without tags', async () => {
      value = undefined;
      setup({ preventSubmit: false });

      if (input) {
        await wrapper.user.click(input);
        await typeThenEnter('');
        rerender();
        expect(submit).toBeCalled();
      }
    });

    it('should render with default prevented on keydown', () => {
      // Just for coverage: input never has children to prevent default the key down event
      setup();

      if (input) {
        const keyboardEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
        });
        Object.defineProperty(keyboardEvent, 'defaultPrevented', {
          get: () => true,
        });

        act(() => {
          fireEvent(input as HTMLElement, keyboardEvent);
        });

        expect(onChange).not.toBeCalled();
        expect(submit).not.toBeCalled();
      }
    });
  });
});
