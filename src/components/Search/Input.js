import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Form } from '@ahaui/react';


export default connectSearchBox(({ refine, indexContextValue, currentRefinement, isSearchStalled, createURL, ...rest }) => (
  <Form className="u-flex u-widthFull">
    <Form.Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
  </Form>
));
