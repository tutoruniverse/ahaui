import React from 'react';
import ApiLayout from './layouts/ApiLayout';

export default function withLayout(Component) {
  return (props) => {
    const { location } = props;
    const Layout = ApiLayout;

    return (
      <Layout location={location}>
        <Component {...props} />
      </Layout>
    );
  };
}
