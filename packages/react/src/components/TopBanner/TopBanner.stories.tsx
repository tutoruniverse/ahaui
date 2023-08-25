import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Fade from 'components/Fade';
import TopBanner from '.';

export default {
  title: 'TopBanner',
  component: TopBanner,
  argTypes: {},
} as ComponentMeta<typeof TopBanner>;

const Template : ComponentStory<typeof TopBanner> = (args) => (<TopBanner {...args} />);

const childrenExample = (
  <div className="u-flex u-alignItemsCenter u-justifyContentCenter">
    Connect anytime to free, instant by installing the Chrome extension
    <div className="u-roundedMedium u-backgroundPrimary u-textWhite u-flexInline u-paddingVerticalTiny u-paddingHorizontalExtraSmall u-textUppercase u-marginLeftMedium">
      <img src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/topBanner/chrome.svg" alt="" className="u-maxWidthFull u-marginRightExtraSmall" />
      <span>Add to Chrome</span>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: childrenExample,
  transition: Fade,
  dismissible: true,
  onClose: () => {},
  bgImage: 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/topBanner/bg-1.png'
};
