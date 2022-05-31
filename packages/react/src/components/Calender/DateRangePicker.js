import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DateRangePickerBase from '@wojtekmaj/react-daterange-picker/src/DateRangePicker';
import Icon from 'components/Icon';
import Context from 'components/Form/Context';

const DateRangePicker = React.forwardRef(({ className, noClearIcon, size, ...props }, ref) => {
  const { sizeControl } = useContext(Context);
  const sizeOri = size || sizeControl;
  return (
    <DateRangePickerBase
      ref={ref}
      {...props}
      className={classNames(
        'DateRangePicker',
        sizeOri && `DateRangePicker--${sizeOri}`,
        sizeOri === 'small' && 'u-text200',
        className && className
      )}
      clearIcon={noClearIcon ? null : <Icon name="close" size={(sizeOri === 'small') ? 'extraSmall' : 'small'} />}
      calendarIcon={<Icon name="calendar" size={(sizeOri === 'small') ? 'extraSmall' : 'small'} />}
      calendarClassName={classNames(
        'Calendar u-marginTopExtraSmall'
      )}
    />
  );
});

DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.defaultProps = {
  noClearIcon: false,
};
DateRangePicker.propTypes = {
  /**
   * Remove clear Icon
   */
  noClearIcon: PropTypes.bool,
  /**
   * DateRangePicker size variants
   *
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default DateRangePicker;
