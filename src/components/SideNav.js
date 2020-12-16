import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Collapse, Logo, SafeAnchor, Icon, Dropdown, Button, Loader } from '@ahaui/react';
import { Link } from 'gatsby';
import styled from 'astroturf';
import Menu from './Menu';

const searchIndices = [
  { name: 'Docs', title: 'Docs', hitComp: 'AllHit' },
];


const SidePanel = styled('div')`
  @import '../css/theme';

  composes: u-flex u-flexColumn u-backgroundWhite from global;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: 0;
    z-index: 1000;
    height: 100vh;
    border-right: 1px solid $divider;
  }

  & > * + * {
  }
`;

const OverflowWrapper = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-up(md) {
    overflow: hidden;
    display: block !important;
    height: 100% !important;
  }
`;

const MenuWrapper = styled('div')`
  @import '../css/theme';

  composes: u-webkitScrollbar u-marginTopExtraSmall u-marginBottomMedium from global;

  @include media-breakpoint-up(md) {
    height: 100% !important;
    overflow: auto;
  }
`;

const VARIABLES = {
  "--colorPrimaryLighter": "#e7ecfc",
  "--colorPrimaryLight": "#d7defa",
  "--colorPrimary": "#375de7",
  "--colorFocusPrimary": "#375de733",
  "--colorPrimaryDark": "#2c4ab8",
  "--colorPrimaryDarker": "#21388b",
  "--colorAccentLighter": "#fff1e8",
  "--colorAccentLight": "#fbdfcc",
  "--colorAccent": "#ed6200",
  "--colorFocusAccent": "#ed620033",
  "--colorAccentDark": "#d55800",
  "--colorAccentDarker": "#a64500",
  "--colorNegativeLighter": "#ffd2d8",
  "--colorNegativeLight": "#f6bcc3",
  "--colorNegative": "#d0021b",
  "--colorFocusNegative": "#d0021b33",
  "--colorNegativeDark": "#b50016",
  "--colorNegativeDarker": "#960012",
  "--colorWarningLighter": "#fdf4d0",
  "--colorWarningLight": "#fff0b3",
  "--colorWarning100": "#ffe380",
  "--colorWarning": "#ffc400",
  "--colorFocusWarning": "#ffc40033",
  "--colorWarning300": "#ffab00",
  "--colorWarningDark": "#ff991f",
  "--colorPositiveLighter": "#d7f9e7",
  "--colorPositiveLight": "#aceccb",
  "--colorPositive": "#22a861",
  "--colorFocusPositive": "#22a86133",
  "--colorPositiveDark": "#019044",
  "--colorPositiveDarker": "#017a3a",
  "--colorInformationLighter": "#e7ecfc",
  "--colorInformationLight": "#d7defa",
  "--colorInformation": "#375de7",
  "--colorFocusInformation": "#375de733",
  "--colorInformationDark": "#2c4ab8",
  "--colorInformationDarker": "#21388b",
  "--fontFamily": "Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif",
  "--fontRegular": "400",
  "--fontMedium": "500",
  "--fontBold": "700",
  "--radiusSmall": "2px",
  "--radiusMedium": "4px",
  "--radiusLarge": "8px",
  "--radiusExtraLarge": "16px",
};

const defaultCustomStyle = `/*
- Modify predefined CSS variables to custom your theme
- More info: https://github.com/gotitinc/aha-css#customization
*/
:root {
${Object.keys(VARIABLES).reduce((finalString, currentKey) => {
  return `${finalString}  ${currentKey}: ${VARIABLES[currentKey]};\n`;
}, '')}}
`;

const ahaVariablesCompleter = {
  getCompletions: function(editor, session, pos, prefix, callback) {
    const variableList = Object.keys(VARIABLES);
    callback(null, [
      ...variableList.map(function(word) {
        return {
          caption: word,
          value: word,
          meta: 'variable',
        };
      })
    ]);
  }
}

const CustomTheme = () => {
  const STORAGE_KEY = 'aha-docs.custom-theme-style.v1';
  const [customStyle, setCustomStyle] = useState(defaultCustomStyle);
  const [AceClass, setAceClass] = useState(null);

  const onEditorChange = (value) => {
    setCustomStyle(value);
  }

  useEffect(() => {
    const AceEditor = require("react-ace").default;
    require("ace-builds/src-noconflict/mode-css");
    require("ace-builds/src-noconflict/theme-github");
    const langTools = require("ace-builds/src-noconflict/ext-language_tools");
    langTools.addCompleter(ahaVariablesCompleter);
    setAceClass({ AceEditor });
  }, []);

  useEffect(() => {
    const savedCustomStyle = localStorage.getItem(STORAGE_KEY);
    if (savedCustomStyle) {
      setCustomStyle(savedCustomStyle);
    }
  }, []);

  useEffect(() => {
    let styleEl = document.getElementById('custom-theme-style-el');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('id', 'custom-theme-style-el');
      document.head.append(styleEl);
    }
    styleEl.textContent = customStyle;
    localStorage.setItem(STORAGE_KEY, customStyle);
  }, [customStyle]);

  return (
    <Dropdown alignRight>
      <Dropdown.Button variant="white" size="small" className="u-shadowMedium">
        <Button.Label>
          Custom Theme
        </Button.Label>
        <Button.Icon>
          <Icon name="arrowDown" size="tiny" />
        </Button.Icon>
      </Dropdown.Button>
      <Dropdown.Container className="u-shadowLarge">
        <Dropdown.Item
          className="u-overflowHidden"
          style={{ padding: 0 }}
        >
          {AceClass ? (
            <AceClass.AceEditor
              placeholder="Enter your custom CSS here"
              mode="css"
              theme="github"
              name="custom-theme-editor"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              wrapEnabled={true}
              width={700}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                useWorker: false,
              }}
              value={customStyle}
              onChange={onEditorChange}
            />
          ) : (
            <div className="u-paddingHorizontalExtraLarge u-paddingVerticalTiny">
              <Loader />
            </div>
          )}
        </Dropdown.Item>
      </Dropdown.Container>
    </Dropdown>
  );
}

const SideNav = React.forwardRef(({ location, ...props }, ref) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidePanel {...props} ref={ref}>
      {/* Only show theme editor on large screen */}
      <div className="u-hidden md:u-block">
        <div className="u-positionFixed u-positionTop u-positionRight u-marginMedium">
          <CustomTheme />
        </div>
      </div>
      <div className="Grid Grid--withoutGutter u-paddingTopSmall u-paddingHorizontalSmall">
        <div className="u-size6of12 md:u-sizeFull">
          <Logo as={Link} to="/" src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-with-text.svg"  height={48} />
        </div>
        <div className="u-size6of12">
          <div className="md:u-hidden u-flex u-alignItemsCenter u-justifyContentEnd">
            <Icon className={classNames('u-marginLeftExtraSmall u-cursorPointer hover:u-textLink', collapsed && 'u-textLink')} onClick={() => setCollapsed(!collapsed)} size="medium" name="menu" />
          </div>
        </div>
      </div>

      <Collapse in={collapsed}>
        <OverflowWrapper>
          <MenuWrapper>

            <Menu location={location} />
          </MenuWrapper>
        </OverflowWrapper>
      </Collapse>
      <div className="u-text100 u-textGray u-hidden md:u-block u-paddingVerticalExtraSmall u-paddingHorizontalSmall u-marginTopSmall u-borderTop">
        <span>Powered by</span>
        &nbsp;
        <SafeAnchor href="https://www.got-it.ai/">Got It, Inc.</SafeAnchor>
      </div>
    </SidePanel>
  );
});

export default SideNav;
