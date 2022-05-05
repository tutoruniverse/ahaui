import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TimePickerBase from 'react-time-picker/dist/entry.nostyle';
import Icon from 'components/Icon';
import Context from 'components/Form/Context';

const TimePicker = React.forwardRef(({ className, noClearIcon, size, ...props }, ref) => {
  const { sizeControl } = useContext(Context);
  const sizeOri = size || sizeControl; return (
    <TimePickerBase
      ref={ref}
      {...props}
      className={classNames(
        'TimePicker',
        sizeOri && `TimePicker--${sizeOri}`,
        sizeOri === 'small' && 'u-text200',
        className && className
      )}
      clearIcon={noClearIcon ? null : <Icon name="close" size={(sizeOri === 'small') ? 'extraSmall' : 'small'} />}
      clockIcon={<Icon name="timer" size={(sizeOri === 'small') ? 'extraSmall' : 'small'} />}
      calendarClassName={classNames(
        'Calendar u-marginTopExtraSmall'
      )}
    />
  );
});

TimePicker.displayName = 'TimePicker';
TimePicker.defaultProps = {
  noClearIcon: false,
};
TimePicker.propTypes = {
  /**
   * Remove clear Icon
   */
  noClearIcon: PropTypes.bool,
  /**
   * TimePicker size variants
   *
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default TimePicker;
