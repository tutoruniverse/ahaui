import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Logo from 'components/Logo';
import HeaderMobile from './Mobile';

export default {
  title: 'HeaderMobile',
  component: HeaderMobile,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof HeaderMobile>;

const Template : ComponentStory<typeof HeaderMobile> = (args) => (
  <div className="u-paddingHorizontalSmall u-paddingVerticalExtraLarge" style={{ width: '100%', maxWidth: '407px', margin: '0 auto', borderRadius: '20px', backgroundColor: 'black' }}>
    <div className="u-backgroundWhite" style={{ height: '667px' }}>
      <HeaderMobile {...args}>
        <HeaderMobile.Context>
          <HeaderMobile.Brand>
            <Logo src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo.svg" height={32} />
          </HeaderMobile.Brand>
          <HeaderMobile.Main>
            <div className="u-paddingHorizontalLarge u-backgroundPositiveLight">[RIGHT]</div>
          </HeaderMobile.Main>
        </HeaderMobile.Context>
        <HeaderMobile.AfterContext>
          <div className="u-paddingHorizontalLarge u-backgroundPositiveLighter">[After Context]</div>
        </HeaderMobile.AfterContext>
        <HeaderMobile.DropContext>
          <div className="u-paddingHorizontalLarge u-backgroundPositiveLighter">[Menu]</div>
        </HeaderMobile.DropContext>
      </HeaderMobile>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  hasDropContext: true,
  show: true,
  showMenu: false,
};
