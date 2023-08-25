import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DimensionsEnum } from 'types/common';
import Collapse from 'components/Collapse';
import classNames from 'classnames';

const collapseContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

export default {
  title: 'Collapse',
  component: Collapse,
  argTypes: {
    in: {
      control: 'boolean',
      defaultValue: false,
    },
    timeout: {
      control: 'number',
      defaultValue: 300,
    },
    dimension: {
      options: [DimensionsEnum.height, DimensionsEnum.width],
      control: { type: 'radio' },
      defaultValue: DimensionsEnum.height,
    },
    children: {
      control: 'text',
      defaultValue: collapseContent,
    },
  },
} as ComponentMeta<typeof Collapse>;

const Template : ComponentStory<typeof Collapse> = (args) => {
  const { children, in: show } = args;
  return (
    <div className="u-backgroundNeutral50">
      <Collapse in={show} {...args}>
        <div
          className={classNames(
            'u-border u-roundedMedium',
            'u-marginSmall',
            'u-paddingHorizontalSmall u-paddingVerticalExtraSmall',
            'u-backgroundWhite u-textGray',
            'u-overflowScroll',
          )}
          style={{ height: 100, width: 200 }}
        >
          {children}
        </div>
      </Collapse>
    </div>
  );
};


export const Default = Template.bind({});

Default.args = {
  in: false,
  timeout: 300,
  dimension: DimensionsEnum.height,
};

Default.parameters = {
  controls: { include: ['in', 'timeout', 'dimension', 'children', 'getDimensionValue'] },
};
