import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Accordion } from './index';
import { Icon } from 'components/Icon';
import { Button } from 'components/Button';
import { ButtonVariant } from 'components/Button/Enum';
import { Icons } from 'constants/icons';
const AccordionFn: any = Accordion;

export default {
  title: 'Buttons/Accordion',
  component: AccordionFn,
  argTypes: {
    activeKey: {
      options: ['0', '1', '2'],
      control: { type: 'select' },
    },
    as: {
      control: { type: 'string' },
    },
    children: {
      control: { type: 'string' },
    },
  },
} as ComponentMeta<typeof AccordionFn>;

const Template: ComponentStory<typeof AccordionFn> = (args) => <AccordionFn {...args} />;

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  style: { width: 300 },
  children: (
    <>
      <div className="u-roundedMedium u-backgroundWhite u-overflowHidden">
        <AccordionFn.Toggle eventKey="0">
          <Button
            as="div"
            width="full"
            className="focus:u-shadowNone u-roundedBottomNone u-borderTransparent"
          >
            <Icon
              name={Icons.CARD}
              className="u-marginRightTiny"
            />
            <span>Claim</span>
          </Button>
        </AccordionFn.Toggle>
        <AccordionFn.Collapse eventKey="0">
          <div className="u-border u-borderLighter u-paddingHorizontalSmall u-roundedBottomMedium u-paddingVerticalExtraSmall u-textGray">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
        </AccordionFn.Collapse>
      </div>
      <div className="u-border u-borderLighter u-backgroundWhite u-roundedMedium u-overflowHidden u-marginTopExtraSmall">
        <AccordionFn.Toggle eventKey="1">
          <Button
            as="div"
            width="full"
            variant={ButtonVariant.SECONDARY}
            className="focus:u-shadowNone u-roundedBottomNone u-borderTransparent"
          >
            <Icon
              name={Icons.REFRESH}
              className="u-marginRightTiny"
            />
            <span>Skip</span>
          </Button>
        </AccordionFn.Toggle>
        <AccordionFn.Collapse eventKey="1">
          <div className="u-borderTop u-borderTopLighter u-paddingHorizontalSmall u-roundedBottomMedium u-paddingVerticalExtraSmall u-textGray">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
        </AccordionFn.Collapse>
      </div>
      <div className="u-border u-borderLighter u-backgroundWhite u-roundedMedium u-overflowHidden u-marginTopExtraSmall">
        <AccordionFn.Toggle eventKey="2">
          <Button
            as="div"
            width="full"
            variant={ButtonVariant.SECONDARY}
            className="focus:u-shadowNone u-roundedBottomNone u-borderTransparent"
          >
            <Icon
              name={Icons.FLAG}
              className="u-marginRightTiny"
            />
            <span>Flag</span>
          </Button>
        </AccordionFn.Toggle>
        <AccordionFn.Collapse eventKey="2">
          <div className="u-borderTop u-borderTopLighter u-paddingHorizontalSmall u-roundedBottomMedium u-paddingVerticalExtraSmall u-textGray">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
        </AccordionFn.Collapse>
      </div>
    </>
  ),
};
