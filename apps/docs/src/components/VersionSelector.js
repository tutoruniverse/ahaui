import React, { useState } from "react";
import { Dropdown, Button, Icon, Loader } from "@ahaui/react3";
import classNames from "classnames";
import ahaReactConfig from "../../config";

export default function VersionSelector() {
  const [versions, setVersions] = useState(null);
  const [show, setShow] = useState(false);
  const currentVersion = ahaReactConfig.version.split(".")[0];
  const onToggle = async (state) => {
    setShow(state);
    if (!state) {
      setVersions(null);
    } else {
      try {
        const res = await fetch(
          "https://api.github.com/repos/gotitinc/ahaui/releases"
        );
        const versions = await res.json();
        const validVersions = versions
          .filter((version) => version.target_commitish === "main")
          .map((version) => version.name.split(".")[0])
          .filter((item, pos, self) => self.indexOf(item) == pos)
          .slice()
          .sort((a, b) =>
            b.localeCompare(a, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          );
        setVersions(validVersions);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onVersionClick = (version) => {
    if (version === currentVersion) {
      onToggle(false);
      return;
    }
    const newHref = window.location.href.replace(currentVersion, version);
    window.location.href = newHref;
  };
  const mapVersions =
    !versions || versions.length === 0 ? [+currentVersion] : versions;

  return (
    <div className="u-textLeft">
      <Dropdown show={show} onToggle={onToggle}>
        <Dropdown.Button variant="secondary" size="small" className="">
          <Button.Label className="u-marginRightExtraSmall u-fontMedium">
            <span className="u-textPrimary">{`v${currentVersion}.x`}</span>
          </Button.Label>
          <Button.Icon>
            <Icon name="arrowDown" size="tiny" />
          </Button.Icon>
        </Dropdown.Button>
        <Dropdown.Container className="u-paddingVerticalExtraSmall u-shadowMedium">
          {mapVersions.map((version, index) => (
            <Dropdown.Item
              key={version}
              className={classNames(
                "u-flex u-justifyContentBetween u-alignItemsCenter u-text200",
                version !== currentVersion && "u-cursorPointer"
              )}
              onClick={() => onVersionClick(version)}
            >
              <span
                className={classNames(
                  "u-marginLeftExtraSmall",
                  version === currentVersion && "u-fontMedium"
                )}
              >
                v{version}.x
                {index === 0 && " (latest)"}
              </span>
              {version === currentVersion && (
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
  );
}
