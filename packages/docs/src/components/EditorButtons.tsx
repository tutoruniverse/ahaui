import React, { useCallback, useContext, useState } from 'react';
import clsx from 'clsx';
import { LiveContext } from 'react-live';
import styles from '../theme/Playground/styles.module.scss';

const COPY_INTERVAL = 1000;

export default function EditorButtons({
  isWrapped = false,
  setIsWrapped,
}: {
  isWrapped?: boolean;
  setIsWrapped: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { code } = useContext(LiveContext);
  const [copied, setCopied] = useState(false);

  const handleClickCopy = useCallback(() => {
    if (!copied) {
      setCopied(true);
      navigator.clipboard.writeText(code);
      setTimeout(() => setCopied(false), COPY_INTERVAL);
    }
  }, [code, copied]);

  const handleClickWordWrap = useCallback(() => {
    setIsWrapped((prev) => !prev);
  }, [setIsWrapped]);

  const renderWordWrapIcon = () => (
    <button
      type="button"
      className={clsx('clean-btn', styles.playgroundEditorButton)}
      aria-label="Toggle word wrap"
      title="Toggle word wrap"
      onClick={handleClickWordWrap}
      data-is-wrapped={isWrapped}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={styles.playgroundEditorButtonWordWrapSvg}
      >
        <path
          fill="currentColor"
          d="M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
        />
      </svg>
    </button>
  );

  const renderCopyIcon = () => (
    <button
      type="button"
      aria-label="Copy code to clipboard"
      title="Copy"
      className={clsx('clean-btn', styles.playgroundEditorButton)}
      onClick={handleClickCopy}
      data-is-copied={copied}
    >
      <span
        aria-hidden="true"
        className={styles.playgroundEditorButtonCopySpan}
      >
        <svg
          viewBox="0 0 24 24"
          className={styles.playgroundEditorButtonCopySvg}
        >
          <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={clsx(
            styles.playgroundEditorButtonCopySvg,
            styles.playgroundEditorButtonCopySuccessSvg,
          )}
        >
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </span>
    </button>
  );

  return (
    <div className="u-positionAbsolute u-positionTop u-positionRight">
      <div className={clsx(
        styles.playgroundEditorButtonGroup,
        !isWrapped && styles.playgroundEditorWithWrapEnabled,
      )}
      >
        {renderWordWrapIcon()}
        {renderCopyIcon()}
      </div>
    </div>
  );
}
