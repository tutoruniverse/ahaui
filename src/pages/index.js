import React from 'react';
import { Button, SafeAnchor } from '@ahaui/react';
import pkg from '../../aha-react/package.json';

import withLayout from '../withLayout';

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <div className="u-flex u-marginTopMedium lg:u-marginTopLarge u-flexColumn">
          <div className="Grid">
            <div className="u-sizeFull lg:u-size10of12 lg:u-offset1of12">
              <div className="u-textCenter">
                <div className="u-marginBottomLarge">
                  <img src={require('src/assets/home-ilu.svg')} alt="" className="u-maxWidthFull" />
                </div>
                <div className="u-textPrimary u-text400 u-fontMedium u-textUppercase">
                  Got It Aha Design System
                </div>
                <div className="u-text1000 u-marginTopMedium">
                  An ever-evolving system that enables us to build higher quality products more&nbsp;efficiently
                </div>
                <Button
                  as={SafeAnchor}
                  size="large"
                  className="u-marginTopLarge"
                  href="/getting-started/introduction"
                >
                  Get started
                </Button>
                <div className="u-marginTopSmall">
                  Current release:&nbsp;
                  <SafeAnchor href="/release-notes/">
                    {pkg.version}
                  </SafeAnchor>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
);
