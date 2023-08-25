import React, { useState } from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import Fade from 'components/Fade';
import Icon from 'components/Icon';
import { Transition } from 'react-transition-group';

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
} as const;

function getFileLabel({ fileTypeLabel, fileType }: Pick<FileAttachmentProps, 'fileTypeLabel' | 'fileType'>) {
  if (fileTypeLabel) {
    return typeof fileTypeLabel === 'function' ? fileTypeLabel() : fileTypeLabel;
  }
  return fileType ? fileTypeMeta[fileType].label : fileTypeMeta.undefined.label;
}

const controllables = {
  show: 'onClose',
} as const;

type RefElement = HTMLDivElement | Transition<any>;

export interface FileAttachmentProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;

  /** Define a file format is a standard way that information is encoded for storage in a computer file.  */
  fileType?: keyof typeof fileTypeMeta;

  /** Custom type label  */
  fileTypeLabel?: string | (() => string);

  /** File name  */
  fileName?: string;

  /**
   * Specify whether the Component should contain a close button
  **/
  closeButton?: boolean;

  /**
   * A callback fired when the closeButton is clicked
   * @controllable closeButton
   * */
  onClose?: (show: false, e: React.FormEvent<HTMLButtonElement>) => void;

  /** Controls the visual state of the File Attachment. */
  show?: boolean;

  /** A callback for action left side */
  actionLeft?: string | (() => React.ReactNode);

  /** A callback for action right side */
  actionRight?: string | (() => React.ReactNode);

  /** A `react-transition-group` Transition component used to animate the File Attachment on dismissal. */
  transition?: React.FC | null;
}

const FileAttachment = React.forwardRef((
  uncontrolledProps: FileAttachmentProps,
  ref: React.ForwardedRef<RefElement>,
) => {
  const {
    className,
    fileType,
    fileTypeLabel,
    fileName = 'undefined',
    closeButton = true,
    onClose,
    show = true,
    actionLeft,
    actionRight,
    transition: Transition = Fade,
    ...props
  } = useUncontrolled<FileAttachmentProps>(uncontrolledProps, controllables);

  const [dismissButtonHover, setDismissButtonHover] = useState(false);

  const handleClose = useEventCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.(false, e);
  });

  const fileAttachment = (
    /*
      wrapper attachment root
        - close button
        - file type icon + (file type label + file name)
        - action left + action right
    */
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      {...props}
      className={classNames(
        'FileAttachment',
        'u-flex u-flexColumn u-backgroundOpaline u-border u-borderUltraLight u-roundedMedium u-positionRelative',
        className && className,
      )}
      data-testid="file-attachment"
    >
      {/* close button */}
      {closeButton && (
        <button
          type="button"
          className="FileAttachment-remove u-positionAbsolute u-backgroundTransparent u-borderNone u-cursorPointer u-paddingTiny u-lineHeightReset u-positionTop u-positionRight"
          title="Remove this file"
          onMouseEnter={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onMouseLeave={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onClick={handleClose}
          data-testid="close-button"
        >
          <Icon
            name="close"
            size="tiny"
            className={classNames(
              dismissButtonHover ? 'u-opacityReset' : 'u-opacityHalf',
            )}
            data-testid="close-icon"
          />
        </button>
      )}

      {/* wrapper file type icon + (file type label + file name) */}
      <div className="FileAttachment-context u-flex u-paddingTiny u-alignItemsCenter">

        {/* wrapper file type icon */}
        <div className="FileAttachment-iconWrap u-flexShrink0 u-positionRelative">
          <Icon
            name={fileType && fileTypeMeta[fileType].icon}
            size="large"
            className="FileAttachment-icon u-textPrimary"
            data-testid="file-type-icon"
          />
        </div>

        {/* wrapper file type label + file name */}
        <div className="FileAttachment-info u-flexGrow1 u-paddingLeftTiny u-paddingRightExtraSmall u-overflowHidden">
          {/*
             file type label - default (pdf, sql, ...) | string | function
          */}
          <div
            className="FileAttachment-title u-text200 u-fontMedium u-textUppercase"
            data-testid="wrapper-file-type-label"
          >
            {getFileLabel({ fileTypeLabel, fileType })}
          </div>
          {/* file name */}
          <div
            className="FileAttachment-description u-text100 u-textLight u-textTruncate"
            data-testid="file-name"
          >
            {fileName}
          </div>
        </div>
      </div>

      {/* action left + action right */}
      {(actionLeft || actionRight) && (
        // wrapper both wrapperwrapper action left and wrapperwrapperaction right
        <div className="FileAttachment-action Grid Grid--withoutGutter u-widthFull u-borderTop u-borderUltraLight u-text100">
          {actionLeft && (
            // wrapper wrapper action left
            <div className={classNames(
              'u-sizeFill',
              actionRight && 'u-borderRight u-borderUltraLight',
            )}
            >
              {/* wrapper action left */}
              <div
                className="u-flex u-justifyContentCenter hover:u-backgroundLightest u-cursorPointer"
                data-testid="wrapper-attachment-action-left"
              >
                {typeof (actionLeft) === 'function'
                  ? actionLeft()
                  : actionLeft}
              </div>
            </div>
          )}
          {actionRight && (
            //  wrapper wrapper action right
            <div className="u-sizeFill">
              {/* wrapper action right */}
              <div
                className="u-flex u-justifyContentCenter hover:u-backgroundLightest u-cursorPointer"
                data-testid="wrapper-attachment-action-right"
              >
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
  // render fileAttachment without transition
  if (!Transition) return show ? fileAttachment : null;

  // render fileAttachment with transition
  return (
    <Transition unmountOnExit ref={ref as React.RefObject<Transition<any>>} {...props} in={show}>
      {fileAttachment}
    </Transition>
  );
});

const FileAttachmentWithDisplayName = Object.assign(FileAttachment, {
  displayName: 'FileAttachment',
});

export default FileAttachmentWithDisplayName;
