import React, { useCallback, useMemo, useState } from "react";
import copy from "copy-text-to-clipboard";
import { Tooltip, Overlay, Icon } from "@ahaui/react";

const COPY_IMPORT_TEXT = "Copy import code";
const COPIED_IMPORT_TEXT = "Copied!";

const CopyImport = ({ name }) => {
  const [text, setText] = useState(COPY_IMPORT_TEXT);
  const textToCopy = useMemo(
    () => `import { ${name} } from '@ahaui/react'`,
    [name]
  );

  const handleCopy = useCallback(() => {
    copy(textToCopy);
    setText(COPIED_IMPORT_TEXT);
    setTimeout(() => setText(COPY_IMPORT_TEXT), 2000);
  }, [textToCopy]);

  return (
    <Overlay.Trigger
      delay={{ show: 500, hide: 2000 }}
      overlay={(props) => (
        <Tooltip {...props} id={`copy-${name}-import-tooltip`}>
          {text}
        </Tooltip>
      )}
    >
      <span
        onClick={handleCopy}
        className="js-search-exclude u-text300 u-paddingHorizontalExtraSmall u-cursorPointer"
      >
        <Icon name="copy" />
        <span className="u-srOnly">{`Copy import code for the ${name} component`}</span>
      </span>
    </Overlay.Trigger>
  );
};

export default ({ name }) => (
  <>
    <code
      className="u-paddingNone u-inlineBlock u-textGreen300 u-backgroundTransparent u-marginBottomSmall"
      aria-label={`Import code for the ${name} component`}
    >
      <span className="u-textPurple300">import</span>
      &nbsp;
      {`{ ${name} }`}
      &nbsp;
      <span className="u-textPurple300">from</span>
      &nbsp; '@ahaui/react'
    </code>
    <CopyImport name={name} />
  </>
);
