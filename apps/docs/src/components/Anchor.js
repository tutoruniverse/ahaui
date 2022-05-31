import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

class Anchor extends React.Component {
  static propTypes = {
    target: PropTypes.any.isRequired,
  };

  render() {
    const { as: Tag = "span", className, children, target } = this.props;

    return (
      <Tag
        className={classNames(
          "u-positionRelative u-inlineBlock AnchorWrapper",
          className
        )}
      >
        {children}
        <a
          href={`#${target}`}
          className="u-positionAbsolute AnchorItem"
          aria-hidden
        >
          <span aria-hidden>#</span>
        </a>
      </Tag>
    );
  }
}

export default Anchor;
