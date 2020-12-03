import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const SEO = ({ pageContext, location }) => (
  <StaticQuery
    query={graphql`
     {
        site {
          siteMetadata {
            title,
            description
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      let title = seo.title;
      const description = seo.description;
      if (pageContext) {
        const { frontmatter } = pageContext;
        title = `${frontmatter.title} - ${seo.title}`;
      }
      return (
        <Helmet>
          {/* General tags */}
          <title>{title}</title>
          <meta name="og:title" content={title} />
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
          <link rel="alternate icon" type="image/png" href={'/site/favicon.png'}/>
          <link rel="icon" type="image/svg+xml" href={'/site/favicon.svg'}/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
        </Helmet>

      );
    }}
  />
);

SEO.propTypes = {
  pageContext: PropTypes.any,
};

SEO.defaultProps = {
};

export default SEO;
