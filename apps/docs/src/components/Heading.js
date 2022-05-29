import React from 'react';
import classNames from 'classnames';
import mapContextToProps from '@restart/context/mapContextToProps';
import { TocContext } from './Toc';

class Heading extends React.Component {
  componentDidMount() {
    const { h, registerNode, id, title } = this.props;
    if (!registerNode) return;
    registerNode(parseInt(h, 10), title, id);
  }

  render() {
    const { h, id, children, className } = this.props;
    const H = `h${h}`;
    return (
      <H id={id} className={classNames(className, 'Heading')}>
        <div className="HeadingInner">{children}</div>
      </H>
    );
  }
}

export default mapContextToProps(
  TocContext,
  c => ({ registerNode: c.registerNode }),
  Heading,
);
