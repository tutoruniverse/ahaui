import React from 'react';
import styled from 'astroturf';
import { Tooltip, Overlay, Icon } from '@ahaui/react';

import { version } from '../../../package.json';

const Link = styled('a')`
  font-size: 1rem;
  padding: 0 0.5rem;
`;

export default (props) => {
  const { component } = props;
  const linkToComponentOnGitHub = `//github.com/tutoruniverse/design-system/tree/v${version}/src/components/${component}/index.js`;

  return (
    <Overlay.Trigger
      overlay={props => (
        <Tooltip {...props} id={`view-${component}-source-tooltip`}>
          View source file
        </Tooltip>
      )}
    >
      <Link href={linkToComponentOnGitHub} className="js-search-exclude">

        <Icon name="code" />
        <span className="u-srOnly">view source file</span>
      </Link>
    </Overlay.Trigger>
  );
};
