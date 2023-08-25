import React, { Fragment } from 'react';
import { useDynamicImport } from 'docusaurus-plugin-react-docgen-typescript/dist/esm/hooks';
import { Props, PropItem } from 'react-docgen-typescript';
import ReactMarkdown from 'react-markdown';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsLight';

import { usePrismTheme } from '@docusaurus/theme-common';

export default function PropTable({ name }: { name: string }) {
  const props: Props | undefined = useDynamicImport(name);
  const prismTheme = usePrismTheme();

  const renderRequiredBadge = (prop: PropItem) => {
    if (!prop.required) {
      return null;
    }

    return (
      <span className="u-textNegative u-text100 u-paddingHorizontalTiny">
        required
      </span>
    );
  };

  const renderItemValue = (value: string) => {
    if (!value) {
      return null;
    }

    if (typeof value === 'string') {
      if (value.includes('"') || value.includes("'")) {
        return <code>{value.replace(/"/g, "'")}</code>;
      }
    }

    return <code>{value}</code>;
  };

  const renderValue = (value: string) => {
    if (!value) {
      return null;
    }

    // Arrow function or long string
    if (value.includes('=>') || value.length > 100) {
      return (
        <Highlight {...defaultProps} code={value} language="tsx" theme={theme}>
          {({
            className, style, tokens, getLineProps, getTokenProps,
          }) => (
            <pre className={className} style={{ ...style, width: '100%' }}>
              {tokens.map((line, i) => (
                <div
                  {...getLineProps({ line, key: i })}
                  style={{
                    // @ts-ignore
                    textWrap: 'balance',
                  }}
                >
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      );
    }

    return renderItemValue(value);
  };

  const renderType = ({ prop, key }:{prop: PropItem, key: string}) => {
    const basicType = ['boolean', 'number', 'string', 'function', 'object'];
    const { type } = prop;
    const { name } = prop;

    if (name === 'as') {
      return 'ElementType';
    }

    if (
      type.raw?.startsWith(
        'ReactElement<any, string | JSXElementConstructor<any>>',
      )
    ) {
      return 'ReactElement';
    }

    if (type.raw && basicType.includes(type.raw)) {
      return <code key={key}>{type.raw}</code>;
    }

    if (type.value) {
      if (type.value.length > 1) {
        return (type.value as { value: string }[])?.map((item, index) => (index ? (
          <Fragment key={item.value}>
            {' | '}
            {renderItemValue(item.value)}
          </Fragment>
        ) : (
          <Fragment key={item.value}>
            {renderItemValue(item.value)}
          </Fragment>
        )));
      }

      return (
        <Fragment key={key}>
          {renderValue(type.value[0].value)}
        </Fragment>
      );
    }

    return (
      <Fragment key={key}>
        {renderValue(type.raw || type.name)}
      </Fragment>
    );
  };

  if (!props) {
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
            <th style={{ width: 200 }}>Name</th>
            <th style={{ minWidth: '35%' }}>Type Description</th>
            <th style={{ width: 200, maxWidth: '30%' }}>Default Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props).map((key) => {
            const prop = props[key];

            return (
              <tr key={key}>
                <td>
                  <div>
                    {key}
                    {renderRequiredBadge(prop)}
                  </div>
                </td>
                <td>
                  <ReactMarkdown>{prop.description}</ReactMarkdown>
                  {renderType({ prop, key })}
                </td>
                <td>
                  {renderValue(prop.defaultValue && prop.defaultValue.value)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
