import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Accordion from 'components/Accordion';
import classNames from 'classnames';
import Icon from 'components/Icon';
import { useAccordionToggle } from './Toggle';

export default {
  title: 'Accordion',
  component: Accordion,
  argTypes: {
    as: {
      control: 'text',
      defaultValue: 'div',
    },
    eventKey: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Accordion>;

const CustomToggle = ({
  eventKey,
  title,
  disabled,
}: {
  eventKey: string,
  title: string
  disabled?: boolean,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = useAccordionToggle(eventKey, () => setOpen(!open));
  return (
    <Accordion.Toggle
      eventKey={eventKey}
      className={classNames(
        'Button Button--large',
        'u-border u-borderTransparent',
        disabled && 'u-backgroundLightest',
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      <div className="u-flex u-alignItemsCenter u-justifyContentBetween">
        {title}
        <div className="u-marginLeftTiny u-inlineBlock u-lineHeightNone">
          <Icon
            name="arrowDown"
            className={classNames(open && 'u-rotate180')}
            size="extraSmall"
          />
        </div>
      </div>
    </Accordion.Toggle>
  );
};

const CustomCollapse = ({
  eventKey,
  content,
}: {
  eventKey: string,
  content: string
}) => (
  <Accordion.Collapse
    eventKey={eventKey}
  >
    <div
      className={classNames(
        'u-borderTop u-borderTopLighter',
        'u-marginHorizontalSmall u-roundedBottomMedium u-paddingVerticalExtraSmall',
        'u-textGray',
      )}
    >
      {content}
    </div>
  </Accordion.Collapse>
);


const Template : ComponentStory<typeof Accordion> = (args) => (
  <Accordion
    style={{ maxWidth: 300 }}
    {...args}
  >
    <div className="u-marginBottomSmall u-border u-backgroundWhite u-roundedMedium u-overflowHidden">
      <CustomToggle
        eventKey="1"
        title="Toggle content 1"
      />
      <CustomCollapse
        eventKey="1"
        content="Collapse content 1"
      />
      <CustomToggle
        eventKey="2"
        title="Toggle content 2"
      />
      <CustomCollapse
        eventKey="2"
        content="Collapse content 2"
      />
      <CustomToggle
        eventKey="3"
        disabled
        title="Toggle content 3"
      />
      <CustomCollapse
        eventKey="3"
        content="Collapse content 3"
      />
    </div>
  </Accordion>
);

export const Default = Template.bind({});

Default.args = {
  as: 'div',
  eventKey: '1',
};

Default.parameters = {
  controls: { include: ['as', 'eventKey'] },
};
