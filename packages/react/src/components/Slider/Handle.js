import React from 'react';
import { Handle as HandleBase } from 'rc-slider';

const Handle = React.forwardRef((props, ref) => (
  <HandleBase
    ref={ref}
    {...props}
  />
));
Handle.displayName = 'Slider.Handle';
Handle.propTypes = {};
Handle.defaultProps = {};
export default Handle;
