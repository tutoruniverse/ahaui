import React, { useState } from 'react';
import classNames from 'classnames';

import { Collapse, Logo, SafeAnchor, Icon } from '@ahaui/react';
import { Link } from 'gatsby';
import styled from 'astroturf';
import Menu from './Menu';
import AlgoliaSearch from './AlgoliaSearch';
import CustomTheme from './CustomTheme';
import VersionSelector from './VersionSelector';
import ahaReactConfig from '../../config';
const searchIndices = [
  { name: ahaReactConfig.version , title: 'Aha Design System - Docs', hitComp: 'AllHit' },
];

const SidePanel = styled('div')`
  @import '../css/theme';

  composes: u-flex u-flexColumn u-backgroundWhite from global;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: 0;
    z-index: 1000;
    height: 100vh;
    border-right: 1px solid $divider;
  }

  & > * + * {
  }
`;

const OverflowWrapper = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-up(md) {
    overflow: hidden;
    display: block !important;
    height: 100% !important;
  }
`;

const MenuWrapper = styled('div')`
  @import '../css/theme';

  composes: u-webkitScrollbar u-marginTopExtraSmall u-marginBottomMedium from global;

  @include media-breakpoint-up(md) {
    height: 100% !important;
    overflow: auto;
  }
`;

const SideNav = React.forwardRef(({ location, ...props }, ref) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidePanel {...props} ref={ref}>
      {/* Only show theme editor on large screen */}
      <div className="u-hidden md:u-block">
        <div className="u-positionFixed u-positionTop u-positionRight u-marginMedium">
          <CustomTheme />
        </div>
      </div>
      <div className="Grid Grid--withoutGutter u-paddingTopSmall u-paddingHorizontalSmall">
        <div className="u-size6of12 md:u-sizeFull">
          <Logo as={Link} to="/" src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-with-text.svg"  height={48} />
        </div>
        <div className="u-size6of12">
          <div className="md:u-hidden u-flex u-alignItemsCenter u-justifyContentEnd">
            <Icon className={classNames('u-marginLeftExtraSmall u-cursorPointer hover:u-textLink', collapsed && 'u-textLink')} onClick={() => setCollapsed(!collapsed)} size="medium" name="menu" />
          </div>
        </div>
      </div>
      <div className="u-paddingHorizontalSmall u-paddingVerticalExtraSmall u-positionRelative">
        <VersionSelector />
      </div>
      <div className="u-paddingHorizontalSmall u-paddingVerticalExtraSmall u-positionRelative">
        <AlgoliaSearch collapse indices={searchIndices} />
      </div>
      <Collapse in={collapsed}>
        <OverflowWrapper>
          <MenuWrapper>

            <Menu location={location} />
          </MenuWrapper>
        </OverflowWrapper>
      </Collapse>
      <div className="u-text100 u-textGray u-hidden md:u-block u-paddingVerticalExtraSmall u-paddingHorizontalSmall u-marginTopSmall u-borderTop">
        <span>Powered by</span>
        &nbsp;
        <SafeAnchor href="https://www.got-it.ai/">Got It, Inc.</SafeAnchor>
      </div>
    </SidePanel>
  );
});

export default SideNav;
