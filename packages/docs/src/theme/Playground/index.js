import React, { useState } from "react";
import clsx from "clsx";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { usePrismTheme } from "@docusaurus/theme-common";
import styles from "./styles.module.scss";
import * as AhaReact from "@ahaui/react";

function Header({ children }) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
}
function LivePreviewLoader() {
  // Is it worth improving/translating?
  // eslint-disable-next-line @docusaurus/no-untranslated-text
  return <div>Loading...</div>;
}
function ResultWithHeader({ additionalStyles, onToggleCode, showCode }) {
  return (
    <div className={"u-positionRelative " + (showCode ? "u-borderBottom" : "")}>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div
        className={styles.playgroundPreview}
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
        placement="top"
        overlay={(props) => (
          <AhaReact.Tooltip id="code-view-show-code" {...props}>
            {showCode ? "Hide the source" : "Show the source"}
          </AhaReact.Tooltip>
        )}
      >
        <div className="u-positionAbsolute u-fontSizeNone u-positionRight u-positionBottom  u-border u-borderBottomNone u-borderRightNone u-borderUltraLight">
          <div
            className="u-flexInline u-lineHeightReset u-backgroundWhite hover:u-backgroundLighter u-paddingHorizontalExtraSmall u-cursorPointer"
            onClick={onToggleCode}
          >
            <AhaReact.Icon name="code" size="extraSmall" />
          </div>
        </div>
      </AhaReact.Overlay.Trigger>
    </div>
  );
}
function ThemedLiveEditor() {
  const isBrowser = useIsBrowser();
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      key={String(isBrowser)}
      className={styles.playgroundEditor}
    />
  );
}
function EditorWithHeader() {
  return <ThemedLiveEditor />;
}
export default function Playground({ children, transformCode, ...props }) {
  const {
    siteConfig: { themeConfig },
  } = useDocusaurusContext();
  const {
    liveCodeBlock: { playgroundPosition },
  } = themeConfig;
  const prismTheme = usePrismTheme();
  const noInline = props.metastring?.includes("noInline") ?? false;
  const additionalStyles = props.metastring?.includes("dark")
    ? {
        backgroundColor: "#172b4d",
      }
    : props.metastring?.includes("transparent")
    ? {
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)),linear-gradient(to right, black 50%, white 50%),linear-gradient(to bottom, black 50%, white 50%)",
        backgroundBlendMode: "normal, difference, normal",
        backgroundSize: "24px 24px",
      }
    : {};

  const [showCode, setShowCode] = useState(false);

  return (
    <div className={styles.playgroundContainer}>
      {/* @ts-expect-error: type incompatibility with refs */}
      <LiveProvider
        code={children.replace(/\n$/, "")}
        noInline={noInline}
        transformCode={transformCode ?? ((code) => `${code};`)}
        theme={prismTheme}
        {...props}
      >
        <ResultWithHeader
          additionalStyles={additionalStyles}
          onToggleCode={() => setShowCode((cur) => !cur)}
          showCode={showCode}
        />
        {showCode && <EditorWithHeader />}
      </LiveProvider>
    </div>
  );
}
