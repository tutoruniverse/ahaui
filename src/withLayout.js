import React from 'react';
import ApiLayout from './layouts/ApiLayout';
// import DefaultLayout from './layouts';

export default function withLayout(Component) {
  return (props) => {
    const { location } = props;
    // const { pathname } = location;
    const Layout = ApiLayout;
    // if (
    //   pathname.startsWith('/getting-started')
    //   || pathname.startsWith('/layout')
    //   || pathname.startsWith('/components')
    //   || pathname.startsWith('/css-utilities')
    // ) {
    //   Layout = ApiLayout;
    // }

    return (
      <Layout location={location}>
        <Component {...props} />
      </Layout>
    );
  };
}
