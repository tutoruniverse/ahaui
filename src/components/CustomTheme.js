import React, { useState, useEffect } from 'react';

import { Icon, Dropdown, Button, Loader } from '@ahaui/react';

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

export default function CustomTheme() {
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
              width="700px"
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