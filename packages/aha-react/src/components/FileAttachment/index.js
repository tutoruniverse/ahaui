import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import { elementType } from 'prop-types-extra';
import useEventCallback from '@restart/hooks/useEventCallback';
import Fade from 'components/Fade';
import Icon from 'components/Icon';

const fileTypeMeta = {
  undefined: {
    icon: 'attachUndefined',
    label: 'undefined',
  },
  text: {
    icon: 'attachTxt',
    label: 'txt',
  },
  image: {
    icon: 'attachImage',
    label: 'png',
  },
  code: {
    icon: 'attachCode',
    label: 'js',
  },
  spreadsheet: {
    icon: 'attachSpreadsheet',
    label: 'xlsx',
  },
  query: {
    icon: 'attachSql',
    label: 'sql',
  },
  powerpoint: {
    icon: 'attachPpt',
    label: 'ppt',
  },
};
const propTypes = {
  /** Define a file format is a standard way that information is encoded for storage in a computer file.  */
  fileType: PropTypes.oneOf([
    'undefined',
    'text',
    'image',
    'code',
    'spreadsheet',
    'query',
    'powerpoint',
  ]),
  /** Custom type label  */
  fileTypeLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** File name  */
  fileName: PropTypes.string,
  /** Controls the visual state of the File Attachment. */
  show: PropTypes.bool,
  /**
   * A callback fired when the closeButton is clicked
   * @controllable closeButton
   * */
  onClose: PropTypes.func,
  /**
   * Specify whether the Component should contain a close button
   * */
  closeButton: PropTypes.bool,
  /** A callback for action left side */
  actionLeft: PropTypes.func,
  /** A callback for action right side */
  actionRight: PropTypes.func,
  /** A `react-transition-group` Transition component used to animate the File Attachment on dismissal. */
  transition: elementType,
};

const defaultProps = {
  fileType: 'undefined',
  closeButton: true,
  show: true,
  transition: Fade,
};

const controllables = {
  show: 'onClose',
};
const FileAttachment = React.forwardRef((uncontrolledProps, ref) => {
  const {
    className,
    fileType,
    fileTypeLabel,
    fileName,
    closeButton,
    onClose,
    show,
    actionLeft,
    actionRight,
    transition: Transition,
    ...props } = useUncontrolled(uncontrolledProps, controllables);
  const [dismissButtonHover, setDismissButtonHover] = useState(false);
  const handleClose = useEventCallback((e) => {
    onClose(false, e);
  });
  const fileAttachment = (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'FileAttachment',
        'u-flex u-flexColumn u-backgroundOpaline u-border u-borderUltraLight u-roundedMedium u-positionRelative',
        className && className,
      )}
    >
      {closeButton && (
        <button
          type="button"
          className="FileAttachment-remove u-positionAbsolute u-backgroundTransparent u-borderNone u-cursorPointer u-paddingTiny u-lineHeightReset u-positionTop u-positionRight"
          title="Remove this file"
          onMouseEnter={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onMouseLeave={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onClick={handleClose}
        >
          <Icon
            name="close"
            size="tiny"
            className={classNames(
              dismissButtonHover ? 'u-opacityReset' : 'u-opacityHalf',
            )}
          />
        </button>
      )}
      <div className="FileAttachment-context u-flex u-paddingTiny u-alignItemsCenter">
        <div className="FileAttachment-iconWrap u-flexShrink0 u-positionRelative">
          <Icon name={fileType && fileTypeMeta[fileType].icon} size="large" className="FileAttachment-icon u-textPrimary" />
        </div>
        <div className="FileAttachment-info u-flexGrow1 u-paddingLeftTiny u-paddingRightExtraSmall u-overflowHidden">
          <div className="FileAttachment-title u-text200 u-fontMedium u-textUppercase">
            {fileTypeLabel && (
              typeof (fileTypeLabel) === 'function'
                ? fileTypeLabel()
                : fileTypeLabel
            )}
            {!fileTypeLabel && (
              fileTypeMeta[fileType]?.label
            )}
          </div>
          <div className="FileAttachment-description u-text100 u-textLight u-textTruncate">{fileName || 'undefined'}</div>
        </div>
      </div>
      {(actionLeft || actionRight) && (
        <div className="FileAttachment-action Grid Grid--withoutGutter u-widthFull u-borderTop u-borderUltraLight u-text100">
          {actionLeft && (
            <div className={classNames(
              'u-sizeFill',
              actionRight && 'u-borderRight u-borderUltraLight',
            )}
            >
              <div className="u-flex u-justifyContentCenter hover:u-backgroundLightest u-cursorPointer">
                {typeof (actionLeft) === 'function'
                  ? actionLeft()
                  : actionLeft}
              </div>
            </div>
          )}
          {actionRight && (
            <div className="u-sizeFill">
              <div className="u-flex u-justifyContentCenter hover:u-backgroundLightest u-cursorPointer">
                {typeof (actionRight) === 'function'
                  ? actionRight()
                  : actionRight}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  if (!Transition) return show ? fileAttachment : null;
  return (
    <Transition unmountOnExit ref={ref} {...props} in={show}>
      {fileAttachment}
    </Transition>
  );
},
);

FileAttachment.displayName = 'FileAttachment';
FileAttachment.propTypes = propTypes;
FileAttachment.defaultProps = defaultProps;
export default FileAttachment;
