import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// TODO: import nostyle
import DatePickerBase from 'react-date-picker';
import Context from 'components/Form/Context';
import Icon from 'components/Icon';
import DatePickerBaseV2 from 'components/Calender/v2/DatePicker/DatePicker';

const DatePicker = React.forwardRef(({ className, noClearIcon, size, version, calendarClassName, ...props }, ref) => {
  const { sizeControl } = useContext(Context);
  const sizeOri = size || sizeControl;
  const BaseClass = (version === 2) ? DatePickerBaseV2 : DatePickerBase;
  return (
    <BaseClass
      ref={ref}
      {...props}
      className={classNames(
        'DatePicker',
        sizeOri && `DatePicker--${sizeOri}`,
        sizeOri === 'small' && 'u-text200',
        className && className
      )}
      clearIcon={noClearIcon ? null : <Icon name="close" size={(sizeOri === 'small') ? 'extraSmall' : 'small'} />}
      calendarIcon={<Icon name="calendar" size={(sizeOri === 'small') ? 'extraSmall' : 'small'} />}
      calendarClassName={classNames(
        'Calendar u-marginTopExtraSmall',
        calendarClassName && calendarClassName,
      )}
    />
  );
});

DatePicker.displayName = 'DatePicker';
DatePicker.defaultProps = {
  noClearIcon: false,
  version: 1,
};
DatePicker.propTypes = {
  /**
   * Remove clear Icon
   */
  noClearIcon: PropTypes.bool,
  /**
   * DatePicker size variants
   *
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * DatePicker version:
   * - 1: default version, import from 'react-date-picker'
   * - 2: customized version
   *
   * @default 1
   * */
  version: PropTypes.oneOf([1, 2]),
  /**
   * Custom className for pop-up Calendar
   * */
  calendarClassName: PropTypes.string,
};

export default DatePicker;
