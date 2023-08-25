import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TagInput from 'components/TagInput';
import { ComponentSizeEnum, VariantColorsEnum } from 'types/common';
import { KeyCharacter } from 'constants/common';

export default {
  title: 'TagInput',
  component: TagInput,
} as ComponentMeta<typeof TagInput>;

const Template: ComponentStory<typeof TagInput> = (args) => {
  const [tags, setTag] = useState(['tag 1', 'tag 2']);

  const [inputValue, setInputValue] = useState('');
  return (
    <div style={{ maxWidth: 300 }}>
      <TagInput
        variant="warning_subtle"
        {...args}
        value={tags}
        onChange={(tags) => setTag(tags)}
        inputValue={inputValue}
        onChangeInput={(tag) => setInputValue(tag)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: VariantColorsEnum.primary_subtle,
  size: ComponentSizeEnum.medium,
  onlyUnique: false,
  addOnBlur: false,
  addOnPaste: false,
  disabled: false,
  addKeys: [KeyCharacter.TAB, KeyCharacter.ENTER],
  removeKeys: [KeyCharacter.BACKSPACE],
  tagProps: {
    className: 'react-tagsinput-tag',
    classNameRemove: 'react-tagsinput-remove',
  },
  preventSubmit: true,
  className: 'react-tagsinput',
  focusedClassName: 'react-tagsinput--focused',
};
