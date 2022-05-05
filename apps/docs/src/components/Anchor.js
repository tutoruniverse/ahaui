import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { css } from 'astroturf';

const styles = css`
  .wrapper {
    padding-right: 1em;
  }
  .anchor {
    font-size: 90%;
    right: 0.3em;
    padding-top: 0.1em;
    opacity: 0;

    &:focus,
    :global(.__heading):hover & {
      text-decoration: none;
      opacity: 0.5;
    }
  }
`;

class Anchor extends React.Component {
  static propTypes = {
    target: PropTypes.any.isRequired,
  };

  render() {
    const { as: Tag = 'span', className, children, target } = this.props;

    return (
      <Tag className={classNames(
        'u-positionRelative u-inlineBlock ',
        className,
        styles.wrapper,
      )}
      >
        {children}
        <a
          href={`#${target}`}
          className={classNames(
            'u-positionAbsolute',
            styles.anchor,
          )}
          aria-hidden
        >
          <span aria-hidden>#</span>
        </a>
      </Tag>
    );
  }
}

export default Anchor;
