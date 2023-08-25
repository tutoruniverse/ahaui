/* eslint-disable no-underscore-dangle */
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { KeyCharacter } from 'constants/common';

const uniq = (arr: any[]) => {
  const out = [];

  for (let i = 0; i < arr.length; i++) {
    if (out.indexOf(arr[i]) === -1) {
      out.push(arr[i]);
    }
  }

  return out;
};

const getClipboardData = (e: React.ClipboardEvent<HTMLInputElement>) => {
  if (e.clipboardData) {
    return e.clipboardData.getData('text/plain');
  }

  return '';
};

export type Tag = Record<string, string> | string | number;

export interface DefaultRenderTagProps
  extends React.ComponentPropsWithoutRef<'span'> {
  key: number;
  tag: Tag;
  onRemove: (key: number) => void;
  classNameRemove?: string;
  getTagDisplayValue: (tag: Tag) => string;
  disabled: boolean;
}

const defaultRenderTag = (props: DefaultRenderTagProps) => {
  const {
    tag,
    key,
    disabled,
    onRemove,
    classNameRemove,
    getTagDisplayValue,
    ...other
  } = props;

  return (
    <span key={key} data-testid="tag" {...other}>
      {getTagDisplayValue(tag)}
      {!disabled && (
        <div
          className={classNameRemove}
          onClick={() => onRemove(key)}
        />
      )}
    </span>
  );
};

export interface DefaultRenderInputProps
  extends React.ComponentPropsWithRef<'input'> {
  addTag: (tag: string) => boolean;
}

const defaultRenderInput = ({ addTag, ...props }: DefaultRenderInputProps) => {
  const { onChange, value, ...other } = props;
  return <input type="text" onChange={onChange} value={value} {...other} />;
};

function defaultRenderLayout(
  tagComponents: React.ReactNode,
  inputComponent: React.ReactNode,
) {
  return (
    <span>
      {tagComponents}
      {inputComponent}
    </span>
  );
}

function defaultPasteSplit(data: string) {
  return data.split(' ').map((d) => d.trim());
}

const defaultInputProps = {
  className: 'react-tagsinput-input',
  placeholder: 'Add a tag',
};

export interface TagsInputProps<T = any> {
  style?: CSSProperties;
  className?: string;
  focusedClassName?: string;
  addKeys?: string[];
  addOnBlur?: boolean;
  addOnPaste?: boolean;
  currentValue?: string;
  inputValue?: string;
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
  onChange: (value: T[], changed?: T[], index?: number[]) => void;
  onChangeInput?: (tag: string) => void;
  onValidationReject?: (tag: T[]) => void;
  removeKeys?: string[];
  renderInput?: typeof defaultRenderInput;
  renderTag?: typeof defaultRenderTag;
  renderLayout?: typeof defaultRenderLayout;
  pasteSplit?: typeof defaultPasteSplit;
  tagProps?: Partial<DefaultRenderTagProps>;
  onlyUnique?: boolean;
  value?: T[];
  maxTags?: number;
  validate?: (tag: string) => boolean;
  validationRegex?: RegExp;
  disabled?: boolean;
  tagDisplayProp?: string;
  preventSubmit?: boolean;
}

const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      className = 'react-tagsinput',
      focusedClassName = 'react-tagsinput--focused',
      addKeys = [KeyCharacter.TAB, KeyCharacter.ENTER],
      addOnBlur = false,
      addOnPaste = false,
      currentValue,
      inputValue,
      inputProps,
      onChange,
      onChangeInput,
      onValidationReject,
      removeKeys = [KeyCharacter.BACKSPACE],
      renderInput = defaultRenderInput,
      renderTag = defaultRenderTag,
      renderLayout = defaultRenderLayout,
      pasteSplit = defaultPasteSplit,
      tagProps = {
        className: 'react-tagsinput-tag',
        classNameRemove: 'react-tagsinput-remove',
      },
      onlyUnique = false,
      value = [],
      maxTags = -1,
      validate = () => true,
      validationRegex = /.*/,
      disabled = false,
      tagDisplayProp,
      preventSubmit = true,
      ...props
    }: TagsInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const [tag, setTag] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const _getTagDisplayValue = (tag: any) => {
      // Accept tag as string | Record<string, string>
      if (typeof tag !== 'object') {
        return tag;
      }

      if (tagDisplayProp) {
        // eslint-disable-next-line react/destructuring-assignment
        return tag[tagDisplayProp];
      }

      return null;
    };

    const _makeTag = (tag: string) => {
      if (tagDisplayProp) {
        return {
          [tagDisplayProp]: tag,
        };
      }
      return tag;
    };

    const _removeTag = (index: number) => {
      const newValue = value.concat([]);
      if (index > -1 && index < newValue.length) {
        const changed = newValue.splice(index, 1);
        onChange(newValue, changed, [index]);
      }
    };

    const _clearInput = () => {
      if (typeof inputValue === 'string' && onChangeInput) {
        onChangeInput('');
      } else {
        setTag('');
      }
    };

    const _tag = () => {
      if (typeof inputValue === 'string' && onChangeInput) {
        return inputValue;
      }

      return tag;
    };

    const _validate = (tag: string) => validate(tag) && validationRegex.test(tag);

    const _addTags = (tags: Tag[]) => {
      if (onlyUnique) {
        tags = uniq(tags);
        tags = tags.filter((tag) => value.every(
          (currentTag) => _getTagDisplayValue(currentTag)
              !== _getTagDisplayValue(tag),
        ),
        );
      }

      const rejectedTags = tags.filter(
        (tag) => !_validate(_getTagDisplayValue(tag)),
      );

      tags = tags.filter((tag) => _validate(_getTagDisplayValue(tag)));

      tags = tags.filter((tag) => {
        const tagDisplayValue = _getTagDisplayValue(tag);
        return tagDisplayValue.trim().length > 0;
      });

      if (maxTags >= 0) {
        const remainingLimit = Math.max(maxTags - value.length, 0);
        tags = tags.slice(0, remainingLimit);
      }

      if (onValidationReject && rejectedTags.length > 0) {
        onValidationReject(rejectedTags);
      }

      if (tags.length > 0) {
        const newValue = value.concat(tags);
        const indexes = [];
        for (let i = 0; i < tags.length; i++) {
          indexes.push(value.length + i);
        }
        onChange(newValue, tags, indexes);
        _clearInput();
        return true;
      }

      if (rejectedTags.length > 0) {
        return false;
      }

      _clearInput();
      return false;
    };

    const _shouldPreventDefaultEventOnAdd = (
      added: boolean,
      keyCode: string,
    ) => {
      if (added) {
        if (keyCode === KeyCharacter.ENTER) {
          return preventSubmit;
        }
        return true;
      }

      return false;
    };

    const handleOnFocus = (e?: React.FocusEvent<HTMLInputElement>) => {
      const onFocus = inputProps?.onFocus;

      if (onFocus && e) {
        onFocus(e);
      }

      setIsFocus(true);
    };

    const focus = () => {
      inputRef.current?.focus();
      handleOnFocus();
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const onBlur = inputProps?.onBlur;

      setIsFocus(false);

      if (onBlur) {
        onBlur(e);
      }

      if (addOnBlur) {
        const tag = _makeTag(e.target.value);
        _addTags([tag]);
      }
    };

    const accept = () => {
      let tag: Tag = _tag();

      if (tag !== '') {
        tag = _makeTag(tag);
        return _addTags([tag]);
      }

      return false;
    };

    const addTag = (tag: Tag) => _addTags([tag]);

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!addOnPaste) {
        return;
      }

      e.preventDefault();

      const data = getClipboardData(e);

      const tags = pasteSplit(data).map((tag) => _makeTag(tag));

      _addTags(tags);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.defaultPrevented) {
        return;
      }
      const tag = _tag();
      const empty = tag === '';
      const keyCode = e.code;
      const key = e.key;
      const add = addKeys.indexOf(keyCode) !== -1 || addKeys.indexOf(key) !== -1;
      const remove = removeKeys.indexOf(keyCode) !== -1
        || removeKeys.indexOf(key) !== -1;

      if (add) {
        const added = accept();
        if (_shouldPreventDefaultEventOnAdd(added, keyCode)) {
          e.preventDefault();
        }
      }

      if (remove && value.length > 0 && empty) {
        e.preventDefault();
        _removeTag(value.length - 1);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        focus();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tag = e.target.value;
      const onChange = inputProps?.onChange;

      if (onChange) {
        onChange(e);
      }

      if (typeof inputValue === 'string' && onChangeInput) {
        onChangeInput(tag);
      } else {
        setTag(tag);
      }
    };

    const handleRemove = (index: number) => {
      _removeTag(index);
    };

    const generateInputProps = () => {
      if (!inputProps) {
        return {
          ...defaultInputProps,
          disabled,
        };
      }

      // eslint-disable-next-line
      const { onChange, onFocus, onBlur, ...otherInputProps } =
        inputProps;

      const props = {
        ...defaultInputProps,
        ...otherInputProps,
        disabled: disabled || otherInputProps.disabled || false,
      };
      return props;
    };

    const generateInputValue = useCallback(
      () => currentValue || inputValue || '',
      [currentValue, inputValue],
    );

    useEffect(() => {
      if (typeof inputValue === 'string' && onChangeInput) {
        return;
      }

      if (!generateInputValue()) {
        return;
      }

      setTag(generateInputValue());
    }, [generateInputValue, inputValue, onChangeInput]);

    const tagComponents = value.map((tag, index) => renderTag({
      key: index,
      tag,
      onRemove: handleRemove,
      disabled,
      getTagDisplayValue: _getTagDisplayValue,
      ...tagProps,
    }),
    );

    const inputComponent = renderInput({
      ref: inputRef,
      value: _tag(),
      onPaste: handlePaste,
      onKeyDown: handleKeyDown,
      onChange: handleChange,
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
      addTag,
      ...generateInputProps(),
    });

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={classNames(className, isFocus && focusedClassName)}
        {...props}
      >
        {renderLayout(tagComponents, inputComponent)}
      </div>
    );
  },
);

export default TagsInput;
