import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SafeAnchor } from '@ahaui/react';
import SideNav from './SideNav';
import Toc, { TocProvider } from './Toc';


const propTypes = {
  location: PropTypes.object.isRequired,
};

function Main({ children, ...props }) {
  const { location } = props;
  let hasToc = true;
  if (location.pathname === '/' || location.pathname === '/release-notes') {
    hasToc = false;
  }
  return (
    <main className="Container Container--fluid">
      <div className="Grid">
        <TocProvider>
          <SideNav className="u-sizeFull md:u-size4of12 lg:u-size3of12 xl:u-size2of12" location={location} />
          {hasToc && (
            <Toc className="u-hidden xl:u-block xl:u-size2of12" />
          )}
          <div className={classNames(
            'u-sizeFull md:u-size8of12 lg:u-size9of12',
            hasToc ? 'xl:u-size8of12' : ' xl:u-size10of12',
          )}
          >
            <div className="Container u-paddingVerticalSmall lg:u-paddingVerticalMedium">
              {children}
            </div>
          </div>
        </TocProvider>
      </div>
      <div className="u-text100 u-textGray u-block md:u-hidden u-paddingVerticalExtraSmall u-marginTopSmall u-borderTop">
            Powered by&nbsp;
        <SafeAnchor href="https://www.got-it.ai/">Got It, Inc.</SafeAnchor>
      </div>
    </main>
  );
}

Main.propTypes = propTypes;

export default Main;
