import React from 'react';
import PropTypes from 'prop-types';
import styled from 'astroturf';
import { graphql } from 'gatsby';
import capitalize from 'lodash/capitalize';

function getDoclet(doclets = [], tag) {
  const doclet = doclets.find(d => d.tag === tag);
  return doclet && doclet.value;
}

const Code = styled('code')`
  white-space: nowrap;
`;

const PropDescription = styled('div')`
  & pre {
    border-radius: 0;
    border-width: 0;
    border-left-width: 3px;
  }
`;

function cleanDocletValue(str) {
  return str
    .trim()
    .replace(/^\{/, '')
    .replace(/\}$/, '');
}
function getDisplayTypeName(typeName) {
  if (typeName === 'func') return 'function';
  if (typeName === 'bool') return 'boolean';

  return typeName;
}

function getTypeName(prop) {
  const type = prop.type || {};
  const name = getDisplayTypeName(type.name);

  if (name === 'custom') {
    const dType = getDoclet(prop.doclets, 'type');
    return cleanDocletValue((dType && dType.value) || type.raw);
  }
  return name;
}

class PropTable extends React.Component {
  static propTypes = {
    metadata: PropTypes.object.isRequired,
  };

  getType(prop) {
    const type = prop.type || {};
    const name = getDisplayTypeName(type.name);
    const docletType = getDoclet(prop.doclets, 'type');

    switch (name) {
      case 'object':
        return name;
      case 'union':
        return type.value.reduce((current, val, i, list) => {
          let item = this.getType({ type: val });
          if (React.isValidElement(item)) {
            item = React.cloneElement(item, { key: i });
          }
          current = current.concat(item);

          return i === list.length - 1 ? current : current.concat(' | ');
        }, []);
      case 'array': {
        const child = this.getType({ type: type.value });

        return (
          <span>
            {'array<'}
            {child}
            {'>'}
          </span>
        );
      }
      case 'enum':
        return this.renderEnum(type);
      case 'custom':
        return cleanDocletValue(docletType || type.raw);
      default:
        return name;
    }
  }

  renderRows(propsData) {
    return propsData.filter(
      prop => prop.type && !prop.doclets.private && !prop.doclets.ignore,
    )
      .map((propData) => {
        const { name, description, doclets } = propData;
        const alias = getDoclet(doclets, 'alias');
        const privateProp = getDoclet(doclets, 'private');
        const ignoreProp = getDoclet(doclets, 'ignore');
        const deprecated = getDoclet(doclets, 'deprecated');
        const descHtml = description && description.childMarkdownRemark.html;
        if (privateProp || ignoreProp) return null;
        return (
          <tr key={name}>
            <td>
              {alias || name}
              {' '}
              {this.renderRequiredBadge(propData)}
            </td>
            <td>
              <div>{this.getType(propData)}</div>
            </td>

            <td>{this.renderDefaultValue(propData)}</td>

            <td>
              {!!deprecated && (
                <div className="u-marginBottomTiny">
                  <strong className="u-textNegative">
                    {`Deprecated: ${deprecated} `}
                  </strong>
                </div>
              )}
              {this.renderControllableNote(propData, name)}
              <PropDescription dangerouslySetInnerHTML={{ __html: descHtml }} />
            </td>
          </tr>
        );
      });
  }

  renderDefaultValue(prop) {
    let value = prop.defaultValue && prop.defaultValue.value;
    if (value == null) return null;
    if (getTypeName(prop) === 'elementType') { value = `<${value.replace(/('|")/g, '')}>`; }
    return <Code>{value}</Code>;
  }

  renderControllableNote(prop, propName) {
    const controllable = getDoclet(prop.doclets, 'controllable');
    const isHandler = getDisplayTypeName(prop.type.name) === 'function';

    if (!controllable) {
      return false;
    }

    const text = isHandler ? (
      <span>
        controls
        {' '}
        <code>{controllable}</code>
      </span>
    ) : (
      <span>
          controlled by:
        {' '}
        <Code>{controllable}</Code>
          , initial prop:
        {' '}
        <Code>{`default${capitalize(propName)}`}</Code>
      </span>
    );

    return (
      <div className="u-marginBottomExtraSmall">
        <small>
          <em className="u-textInformation">{text}</em>
        </small>
      </div>
    );
  }

  renderEnum(enumType) {
    const enumValues = enumType.value || [];
    if (!Array.isArray(enumValues)) return enumValues;

    const renderedEnumValues = [];
    enumValues.forEach(({ value }, i) => {
      if (i > 0) {
        renderedEnumValues.push(<span key={`${i}c`}> | </span>);
      }

      renderedEnumValues.push(<code key={i}>{value}</code>);
    });

    return <span>{renderedEnumValues}</span>;
  }

  renderRequiredBadge(prop) {
    if (!prop.required) {
      return null;
    }

    return <span className="u-textNegative u-text100 u-paddingHorizontalTiny">required</span>;
  }

  render() {
    const { metadata } = this.props;
    const propsData = metadata.props || [];

    if (!propsData.length) {
      return (
        <div className="u-textGray u-marginBottomLarge">
          <em>There are no public props for this component.</em>
        </div>
      );
    }

    return (
      <div className="u-overflowAuto u-marginBottomLarge">
        <table className="Table Table--bordered Table--striped u-fontNormal u-textDark u-marginTopSmall u-backgroundWhite">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ maxWidth: '35%', width: 300 }}>Type</th>
              <th style={{ maxWidth: '30%' }}>Default</th>
              <th style={{ minWidth: '35%' }}>Description</th>
            </tr>
          </thead>
          <tbody>{this.renderRows(propsData)}</tbody>
        </table>
      </div>
    );
  }
}

export const metadataFragment = graphql`
  fragment Description_markdown on ComponentDescription {
    childMarkdownRemark {
      html
    }
  }

  fragment PropTable_metadata on ComponentMetadata {
    composes
    displayName
    description {
      ...Description_markdown
    }
    props {
      name
      doclets
      defaultValue {
        value
        computed
      }
      description {
        ...Description_markdown
      }
      required
      type {
        name
        value
        raw
      }
    }
  }
`;

export default PropTable;
