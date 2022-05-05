import React from 'react';
import classNames from 'classnames';
import CalendarBase from 'react-calendar/dist/entry.nostyle';

const Calendar = React.forwardRef(({ className, ...props }, ref) => (
  <CalendarBase
    ref={ref}
    {...props}
    className={classNames(
      'Calendar',
      className && className
    )}
  />
));

Calendar.displayName = 'Calendar';
Calendar.defaultProps = {};
Calendar.propTypes = {};

export default Calendar;
