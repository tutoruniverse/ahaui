import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon, SafeAnchor } from "@ahaui/react3";
import SideNav from "./SideNav";
import Toc, { TocProvider } from "./Toc";
import ahaReactConfig from "../../config";
import GitHubIcon from "./GitHubIcon";
import SlackIcon from "./SlackIcon";

const propTypes = {
  location: PropTypes.object.isRequired,
};

function Main({ children, ...props }) {
  const { location } = props;
  let hasToc = true;
  if (
    location.pathname.split("/")[2] === "" ||
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
      <div className="u-text100 u-textGray md:u-hidden u-paddingVerticalExtraSmall u-marginTopSmall u-borderTop u-flex u-justifyContentCenter u-alignItemsCenter">
        Powered by&nbsp;
        <SafeAnchor href="https://www.got-it.co/" target="_blank">
          Got It, Inc.
        </SafeAnchor>
        <SafeAnchor
          title="GitHub"
          className="u-marginLeftExtraSmall u-inlineBlock u-lineHeightNone"
          target="_blank"
          href={ahaReactConfig.homepage}
        >
          <GitHubIcon />
        </SafeAnchor>
        <SafeAnchor
          title="Slack"
          className="u-marginLeftExtraSmall u-inlineBlock u-lineHeightNone"
          href={ahaReactConfig.slack}
          target="_blank"
        >
          <SlackIcon />
        </SafeAnchor>
      </div>
    </main>
  );
}

Main.propTypes = propTypes;

export default Main;
