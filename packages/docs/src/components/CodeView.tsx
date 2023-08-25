import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
// TODO: Use iframe to have up-to-date Aha version in monorepo
// @ts-ignore
import * as AhaReact from '@ahaui/react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  LiveProvider, LiveEditor, LiveError, LivePreview,
} from 'react-live';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { usePrismTheme } from '@docusaurus/theme-common';
import styles from '@site/src/theme/Playground/styles.module.scss';
import ReactLiveScope from '../theme/ReactLiveScope';
import EditorButtons from './EditorButtons';

function LivePreviewLoader() {
  // Is it worth improving/translating?
  // eslint-disable-next-line @docusaurus/no-untranslated-text
  return <div>Loading...</div>;
}

function ResultWithHeader({
  additionalStyles,
  classNames,
  onToggleCode,
  showCode,
}: {
  additionalStyles: React.CSSProperties;
  classNames?: string;
  onToggleCode: () => void;
  showCode?: boolean;
}) {
  return (
    <div className={`u-positionRelative ${showCode ? 'u-borderBottom' : ''}`}>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div
        className={clsx(styles.playgroundPreview, classNames)}
        style={{
          ...additionalStyles,
        }}
      >
        <BrowserOnly fallback={<LivePreviewLoader />}>
          {() => (
            <>
              <LivePreview />
              <LiveError />
            </>
          )}
        </BrowserOnly>
      </div>
      <AhaReact.Overlay.Trigger
        delay={0}
        placement="top"
        // eslint-disable-next-line react/no-unstable-nested-components
        overlay={(props) => (
          <AhaReact.Tooltip id="code-view-show-code" {...props}>
            {showCode ? 'Hide the source' : 'Show the source'}
          </AhaReact.Tooltip>
        )}
      >
        <div className="u-positionAbsolute u-fontSizeNone u-positionRight u-positionBottom  u-border u-borderBottomNone u-borderRightNone u-borderUltraLight">
          <div
            className="u-flexInline u-lineHeightReset u-backgroundWhite hover:u-backgroundLighter u-paddingHorizontalExtraSmall u-cursorPointer"
            onClick={onToggleCode}
            onKeyDown={(e) => {
              if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                onToggleCode();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <AhaReact.Icon name="code" size="extraSmall" />
          </div>
        </div>
      </AhaReact.Overlay.Trigger>
    </div>
  );
}

function ThemedLiveEditor({
  code,
  onChange,
}: {
  code: string,
  onChange: (code: string) => void;
}) {
  const isBrowser = useIsBrowser();
  const [isWrapped, setIsWrapped] = useState(false);

  return (
    <div className={clsx('u-positionRelative', styles.playgroundEditorContainer)}>
      <LiveEditor
        // We force remount the editor on hydration,
        // otherwise dark prism theme is not applied
        key={String(isBrowser)}
        code={code}
        className={clsx(
          styles.playgroundEditor,
          !isWrapped && styles.playgroundEditorNoWrapped,
          'u-overflowVerticalAuto',
        )}
        onChange={onChange}
      />

      <EditorButtons
        isWrapped={isWrapped}
        setIsWrapped={setIsWrapped}
      />
    </div>
  );
}

export default function Playground({
  codeText,
  transparentBackground = false,
  exampleClassName = 'u-backgroundWhite',
  ...props
}: {
  codeText: string;
  exampleClassName?: string;
  transparentBackground?: boolean;
}) {
  const [code, setCode] = useState(() => codeText.replace(/\n$/, ''));
  const prismTheme = usePrismTheme();
  const additionalStyles = transparentBackground
    ? {
      backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)),linear-gradient(to right, black 50%, white 50%),linear-gradient(to bottom, black 50%, white 50%)',
      backgroundBlendMode: 'normal, difference, normal',
      backgroundSize: '24px 24px',
    }
    : {};

  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    import('holderjs').then(({ default: hjs_ }) => {
      hjs_.addTheme('gray');
    });
  }, []);

  return (
    <div
      className={clsx(
        styles.playgroundContainer,
        'u-border u-borderUltraLight',
      )}
    >
      <LiveProvider
        code={code}
        theme={prismTheme}
        scope={ReactLiveScope}
        {...props}
      >
        <ResultWithHeader
          additionalStyles={additionalStyles}
          onToggleCode={() => setShowCode((cur) => !cur)}
          showCode={showCode}
          classNames={exampleClassName}
        />
        {showCode && (
          <ThemedLiveEditor
            code={code}
            onChange={setCode}
          />
        )}
      </LiveProvider>
    </div>
  );
}
