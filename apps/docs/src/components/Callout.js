import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

const propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.oneOf(["danger", "warning"]),
};

function Callout({ title, children, theme }) {
  return (
    <aside
      role="note"
      className={classNames(
        "CallOut",
        theme ? `CallOut--${theme}` : "CallOut--warning"
      )}
    >
      {title && <header className="u-text700">{title}</header>}
      <div>{children}</div>
    </aside>
  );
}

Callout.propTypes = propTypes;

export default Callout;
