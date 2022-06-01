import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon, SafeAnchor } from "@ahaui/react";
import SideNav from "./SideNav";
import Toc, { TocProvider } from "./Toc";
import ahaReactConfig from "../../config";

const propTypes = {
  location: PropTypes.object.isRequired,
};

function Main({ children, ...props }) {
  const { location } = props;
  let hasToc = true;
  if (
    location.pathname.split("/")[3] === "" ||
    location.pathname.includes("/release-notes")
  ) {
    hasToc = false;
  }
  return (
    <main className="Container Container--fluid">
      <div className="Grid">
        <TocProvider>
          <SideNav
            className="u-sizeFull md:u-size3of12 xl:u-size2of12"
            style={{ padding: 0 }}
            location={location}
          />
          {hasToc && <Toc className="u-hidden xl:u-block xl:u-size2of12" />}
          <div
            className={classNames(
              "u-sizeFull md:u-size9of12",
              hasToc ? "xl:u-size8of12" : " xl:u-size10of12"
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
        <SafeAnchor target="_blank" href={ahaReactConfig.repository.url}>
          <Icon path="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </SafeAnchor>
      </div>
    </main>
  );
}

Main.propTypes = propTypes;

export default Main;
