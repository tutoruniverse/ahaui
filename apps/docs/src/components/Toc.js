import React from "react";
import { createBlock } from '@ahaui/react3';

export const TocContext = React.createContext();

const propTypes = {};

const SidePanel = createBlock('TocSidePanel');

function toTree(list) {
  // eslint-disable-next-line
  let map = {};
  // eslint-disable-next-line
  let root = { children: [] };
  // eslint-disable-next-line
  let parents = [];
  let last = null;

  // eslint-disable-next-line
  for (let item of list) {
    // debugger;
    if (last && item.level > last.level) parents.push(last);
    if (last && item.level < last.level) parents.pop();
    last = item;
    // eslint-disable-next-line prefer-const
    let parent = parents[parents.length - 1];
    map[item.id] = map[item.id] || [];
    item.children = map[item.id];
    if (parent && parent.level < item.level) {
      map[parent.id] = map[parent.id] || [];
      map[parent.id].push(item);
    } else root.children.push(item);
  }
  return root;
}
export class TocProvider extends React.Component {
  constructor(...args) {
    super(...args);

    this.list = new Map();

    this.state = {
      tree: { children: [] },
      registerNode: this.handleRegisterNode,
    };
  }

  handleRegisterNode = (level, title, id) => {
    if (level === 1) return;
    this.list.set(id, { level, title, id });
    cancelAnimationFrame(this.rafHandle);
    this.rafHandle = requestAnimationFrame(() => {
      this.setState({ tree: toTree(this.list.values()) });
    });
  };

  render() {
    const { children } = this.props;
    return (
      <TocContext.Provider value={this.state}>{children}</TocContext.Provider>
    );
  }
}

TocProvider.propTypes = propTypes;

function renderNode(root) {
  return (
    <>
      {root.title && <a href={`#${root.id}`}>{root.title}</a>}
      <ul className="u-listStyleTypeNone u-listStylePositionInside">
        {root.children.map((item, idx) => (
          <li className="TocListItem" key={idx} level={item.level}>
            {renderNode(item)}
          </li>
        ))}
      </ul>
    </>
  );
}

function Toc(props) {
  return (
    <SidePanel {...props}>
      <TocContext.Consumer>{(c) => renderNode(c.tree)}</TocContext.Consumer>
    </SidePanel>
  );
}

export default Toc;
