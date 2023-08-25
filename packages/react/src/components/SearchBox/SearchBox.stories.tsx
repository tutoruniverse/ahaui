import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchBox from 'components/SearchBox';
import { ComponentSizeEnum } from 'types/common';
import { IconNameEnum } from 'components/Icon';

export default {
  title: 'SearchBox',
  component: SearchBox,
} as ComponentMeta<typeof SearchBox>;

const Template: ComponentStory<typeof SearchBox> = (args) => {
  const [value, setValue] = useState('');

  return (
    <SearchBox
      {...args}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      onClickButton={() => {
        // eslint-disable-next-line no-alert
        alert(value);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  sizeControl: ComponentSizeEnum.medium,
  buttonText: 'Search',
  buttonIcon: IconNameEnum.search,
};
