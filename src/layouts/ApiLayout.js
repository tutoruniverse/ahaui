import PropTypes from 'prop-types';
import React from 'react';
import SEO from '../components/SEO';
import Main from '../components/Main';
import Default from './index';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function ComponentsLayout({ location, pageContext, children, ...props }) {
  return (
    <Default {...props}>
      <SEO pageContext={pageContext} location={location} />
      <Main pageContext={pageContext} location={location}>{children}</Main>
    </Default>
  );
}

ComponentsLayout.propTypes = propTypes;

export default ComponentsLayout;
