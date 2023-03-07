import { Button } from "@ahaui/react3";
import React from "react";
import ReactMD from "react-markdown";
import { Link } from "gatsby";
import withLayout from "../withLayout";

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <div className="u-flex u-marginTopMedium lg:u-marginTopLarge u-flexColumn">
          <div className="Grid">
            <div className="u-sizeFull lg:u-size10of12 lg:u-offset1of12">
              <div className="u-textCenter">
                <div className="u-marginBottomLarge">
                  <img
                    src={require("src/assets/home-ilu.svg")}
                    alt=""
                    className="u-maxWidthFull"
                  />
                </div>
                <div className="u-textPrimary u-text400 u-fontMedium u-textUppercase">
                  Aha Design System
                </div>
                <div className="u-text1000 u-marginTopMedium">
                  An ever-evolving system that enables us to build higher
                  quality products more&nbsp;efficiently
                </div>
                <Button
                  as={Link}
                  width="min"
                  size="large"
                  className="u-marginTopLarge"
                  to="/getting-started/introduction"
                >
                  Get started
                </Button>
                <div className="u-marginTopSmall">
                  Current release:&nbsp;
                  <Link to="/release-notes/" className="hover:u-textDecorationNone">
                    {process.env.GATSBY_APP_ENV === "dev" ? (
                      <ReactMD
                        source={`![npm (scoped with tag)](https://img.shields.io/npm/v/@ahaui/react3/insiders?color=%23ED6200&label=React&style=flat-square) ![npm (scoped with tag)](https://img.shields.io/npm/v/@ahaui/css3/insiders?color=%23ED6200&label=CSS&style=flat-square)`}
                      />
                    ) : (
                      <ReactMD
                        source={`![npm](https://img.shields.io/npm/v/@ahaui/css3?label=CSS&color=%23375DE7&style=flat-square) ![npm](https://img.shields.io/npm/v/@ahaui/react3?label=React&color=%23375DE7&style=flat-square)`}
                      />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
