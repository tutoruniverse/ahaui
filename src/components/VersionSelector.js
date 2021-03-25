import React, { useState } from 'react';
import { Dropdown, Button, Icon, Loader } from '@ahaui/react';
import classNames from 'classnames';
import ahaReactConfig from '../../config';

export default function VersionSelector() {
  const [versions, setVersions] = useState(null);
  const [show, setShow] = useState(false);

  const onToggle = async (state) => {
    setShow(state);
    if (!state) {
      setVersions(null);
    } else {
      try {
        const res = await fetch('https://api.github.com/repos/gotitinc/aha-react/releases');
        const versions = await res.json();
        const validVersions = versions
          .filter((version) => version.target_commitish === 'master')
          .map((version) => version.name)
          .slice()
          .sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
        setVersions(validVersions);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const onVersionClick = (version) => {
    if (version === ahaReactConfig.version) {
      onToggle(false);
      return;
    }
    const newHref = window.location.href.replace(ahaReactConfig.version, version);
    window.location.href = newHref;
  }

  return (
    <div className="u-textLeft">
      <Dropdown show={show} onToggle={onToggle}>
        <Dropdown.Button variant="secondary" size="small" className="">
          <Button.Label className="u-marginRightExtraSmall u-fontMedium">
            <span>Aha React:&nbsp;</span>
            <span className="u-textPrimary">{`v${ahaReactConfig.version}`}</span>
          </Button.Label>
          <Button.Icon>
            <Icon name="arrowDown" size="tiny" />
          </Button.Icon>
        </Dropdown.Button>
        <Dropdown.Container className="u-paddingVerticalExtraSmall u-shadowMedium">
          {versions?.map((version, index) => (
            <Dropdown.Item
              key={version}
              className={classNames(
                'u-flex u-justifyContentBetween u-alignItemsCenter',
                version !== ahaReactConfig.version && 'u-cursorPointer'
              )}
              onClick={() => onVersionClick(version)}
            >
              <span
                className={classNames(
                  'u-marginLeftExtraSmall',
                  version === ahaReactConfig.version && 'u-fontMedium'
                )}
              >
                {version}
                {index === 0 && ' (latest)'}
              </span>
              {version === ahaReactConfig.version && (
                <Icon name="checkmark" size="extraSmall" />
              )}
            </Dropdown.Item>
          ))}
          {!versions && (
            <div className="u-paddingHorizontalExtraLarge u-textCenter">
              <Loader />
            </div>
          )}
        </Dropdown.Container>
      </Dropdown>
    </div>
  )
}