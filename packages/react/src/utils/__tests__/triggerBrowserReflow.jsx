import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import * as triggerBrowserReflow from 'utils/triggerBrowserReflow';

describe('utils/triggerBrowserReflow.js', () => {
  it('triggerBrowserReflow should run', () => {
    const ref = createRef();

    render(
      <div ref={ref}>
        Hello
      </div>,
    );

    const spy = jest.spyOn(triggerBrowserReflow, 'default');

    if (ref.current) {
      triggerBrowserReflow.default(ref.current);
    }

    expect(spy).toBeCalled();
    expect(spy).toBeCalledWith(ref.current);
  });
});
