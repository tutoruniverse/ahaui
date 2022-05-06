import React from 'react';
import withLayout from '../withLayout';

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <div className="u-flex u-marginTopMedium lg:u-marginTopLarge u-flexColumn">
          <div className="Grid">
            <div className="u-sizeFull lg:u-size10of12 lg:u-offset1of12">
              <div className="u-textCenter">
                <div className="u-textPrimary u-text800 u-fontMedium u-textUppercase">
                  Page not found 
                </div>
                <div className="u-text400 u-marginTopMedium">
                  Oops! The page you are looking for has been removed or relocated
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
);
