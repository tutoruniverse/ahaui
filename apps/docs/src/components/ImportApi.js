import styled from 'astroturf';
import copy from 'copy-text-to-clipboard';
import React, { useCallback, useMemo, useState } from 'react';
import { Tooltip, Overlay, Icon } from '@ahaui/react';

const Link = styled('span')`
  font-size: 1rem;
  padding: 0 0.5rem;
  cursor: pointer;
`;

const Keyword = styled('span')`
  color: #a626a4;
`;

const Code = styled('code')`
  padding: 0;
  display: inline-block;
  color: #50a14f;
  background-color: transparent;
  margin-bottom: 1rem;
`;

const COPY_IMPORT_TEXT = 'Copy import code';
const COPIED_IMPORT_TEXT = 'Copied!';

const CopyImport = ({ name }) => {
  const [text, setText] = useState(COPY_IMPORT_TEXT);
  const textToCopy = useMemo(
    () => `import { ${name} } from '@ahaui/react'`,
    [name],
  );

  const handleCopy = useCallback(() => {
    copy(textToCopy);
    setText(COPIED_IMPORT_TEXT);
    setTimeout(() => setText(COPY_IMPORT_TEXT), 2000);
  }, [textToCopy]);

  return (
    <Overlay.Trigger
      overlay={props => (
        <Tooltip {...props} id={`copy-${name}-import-tooltip`}>{text}</Tooltip>
      )}
    >
      <Link onClick={handleCopy} className="js-search-exclude">
        <Icon name="copy" />
        <span className="u-srOnly">{`Copy import code for the ${name} component`}</span>
      </Link>
    </Overlay.Trigger>
  );
};

export default ({ name }) => (
  <>
    <Code aria-label={`Import code for the ${name} component`}>
      <Keyword>import</Keyword>
      &nbsp;
      {`{ ${name} }`}
      &nbsp;
      <Keyword>from</Keyword>
      &nbsp;
      '@ahaui/react'
    </Code>
    <CopyImport name={name} />
  </>
);
