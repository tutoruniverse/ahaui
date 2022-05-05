import React, { useState, useEffect, useRef } from 'react';

import { Icon, Dropdown, Button, Loader, Form } from '@ahaui/react';
import copy from 'copy-to-clipboard';

import ColorPicker from './ColorPicker';
import { rgbaToHex8, getContrastBackgroundColor } from '../utils/color';
import { VARIABLES, Presets } from '../constants/common';

const getSlylesheetFromVariables = (variables) => `/*
- Modify predefined CSS variables to custom your theme.
- More info: https://github.com/gotitinc/aha-css#customization
- NOTE: previewing unimported --fontFamily is not supported.
*/
:root {
${Object.keys(variables).reduce((finalString, currentKey) => {
  return `${finalString}  ${currentKey}: ${variables[currentKey]};\n`;
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

const updateHexColor = () => {
  setTimeout(() => {
    [].forEach.call(document.querySelectorAll('.ace_hex-color'), (el) => {
      const color = el.innerHTML;
      el.style.setProperty('--hexColor', color);
    });
  })
}

export default function CustomTheme() {
  const STYLE_STORAGE_KEY = 'aha-docs.custom-theme-style.v2';
  const PRESET_STORAGE_KEY = 'aha-docs.custom-theme-preset.v2';
  const [customStyle, setCustomStyle] = useState('');
  const [AceClass, setAceClass] = useState(null);
  const editorContainerRef = useRef(null);
  const [color, setColor] = useState('#375de7');
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [currentPreset, setCurrentPreset] = useState(null);
  const [lastCopied, setLastCopied] = useState(0);
  const shouldShowCopied = Date.now() - lastCopied < 1000;

  const onEditorChange = (value) => {
    setCustomStyle(value);
    localStorage.setItem(STYLE_STORAGE_KEY, value);
    setCurrentPreset(null);
    updateHexColor();
  }

  const onSelectPreset = (presetKey) => {
    setCurrentPreset(presetKey);
    setShowPresetDropdown(false);
    localStorage.removeItem(STYLE_STORAGE_KEY);
  }

  useEffect(() => {
    const AceEditor = require("react-ace").default;
    require("ace-builds/src-noconflict/theme-github");
    require("../utils/editor/mode-css-custom");
    const langTools = require("ace-builds/src-noconflict/ext-language_tools");
    langTools.addCompleter(ahaVariablesCompleter);
    setAceClass({ AceEditor });
  }, []);

  useEffect(() => {
    const savedCustomStyle = localStorage.getItem(STYLE_STORAGE_KEY);
    if (savedCustomStyle) {
      setCustomStyle(savedCustomStyle);
    } else {
      const savedPresetKey = localStorage.getItem(PRESET_STORAGE_KEY);
      if (savedPresetKey) {
        setCurrentPreset(savedPresetKey);
      } else {
        setCurrentPreset(Object.keys(Presets)[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (currentPreset && Presets[currentPreset]?.variables) {
      setCustomStyle(getSlylesheetFromVariables(Presets[currentPreset].variables));
      localStorage.setItem(PRESET_STORAGE_KEY, currentPreset);
      setTimeout(() => {
        if (editorContainerRef.current?.scrollTo !== undefined) {
          editorContainerRef.current.scrollTo({top: 0, behavior: 'smooth'});
        }
      }, 0);
    }
  }, [currentPreset]);

  useEffect(() => {
    let styleEl = document.getElementById('custom-theme-style-el');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('id', 'custom-theme-style-el');
      document.head.append(styleEl);
    }
    styleEl.textContent = customStyle;
  }, [customStyle]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateHexColor();
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <Dropdown alignRight>
      <Dropdown.Button variant="white" size="small" className="u-shadowMedium">
        <Button.Label>
          Customize Theme
        </Button.Label>
        <Button.Icon>
          <Icon name="arrowDown" size="tiny" />
        </Button.Icon>
      </Dropdown.Button>
      <Dropdown.Container className="u-shadowLarge">
        <Dropdown.Item
          className="u-flex u-flexColumn"
          style={{ padding: 0 }}
        >
          <div
            className="u-borderBottom u-paddingVerticalExtraSmall u-paddingHorizontalSmall u-backgroundLightest u-flex u-justifyContentBetween"
          >
            <div className="u-text500 u-fontMedium">Theme Editor</div>
            <div className="u-flex">
              <div className="u-marginRightExtraSmall">
                <Dropdown
                  alignRight
                  show={showPresetDropdown}
                  onToggle={() => setShowPresetDropdown(!showPresetDropdown)}
                >
                  <Dropdown.Button variant="secondary" size="small">
                    <Button.Label
                      className="u-marginRightTiny"
                      style={{ height: 25 }}
                    >
                      {currentPreset ? (
                        <>
                          <span>Preset:&nbsp;</span>
                          <span
                            style={{
                              color: Presets[currentPreset]?.variables?.['--colorPrimary'],
                            }}
                          >
                            {currentPreset}
                          </span>
                        </>
                      ) : (
                        <span className="u-textLight">Choose Preset</span>
                      )}
                    </Button.Label>
                    <Button.Icon>
                      <Icon name="arrowDown" size="tiny" />
                    </Button.Icon>
                  </Dropdown.Button>
                  <Dropdown.Container className="u-paddingVerticalTiny u-shadowMedium">
                    {Object.keys(Presets).map((presetKey) => (
                      <Dropdown.Item
                        className="u-cursorPointer"
                        onClick={() => onSelectPreset(presetKey)}
                        style={{
                          color: Presets[presetKey]?.variables?.['--colorPrimary'],
                        }}
                      >
                        {presetKey}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Container>
                </Dropdown>
              </div>
              <Form.Group sizeControl="small" className="u-marginNone">
                <Form.InputGroup>
                  <Form.InputGroup.Prepend>
                    <Dropdown drop="left">
                      <Dropdown.Button
                        variant="secondary"
                        className="u-roundedRightNone u-positionRelative u-overflowHidden"
                        style={{
                          color: getContrastBackgroundColor(color),
                          background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
                          backgroundColor: color,
                        }}
                      >
                        <div
                          className="u-positionAbsolute u-positionFull"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                        <Button.Label
                          className="u-positionRelative"
                          style={{
                            height: 25,
                            fontFamily: 'monospace',
                          }}
                        >
                          {color}
                        </Button.Label>
                      </Dropdown.Button>
                      <Dropdown.Container>
                        <ColorPicker
                          defaultColor={color}
                          onChangeComplete={(color) => setColor(rgbaToHex8(color.rgb))}
                        />
                      </Dropdown.Container>
                    </Dropdown>
                  </Form.InputGroup.Prepend>
                  <Form.InputGroup.Append>
                    <Button
                      onlyIcon
                      variant="secondary"
                      size="medium"
                      className="u-roundedLeftNone"
                      onClick={() => {
                        copy(color);
                        setLastCopied(Date.now());
                      }}
                    >
                      <Button.Icon>
                        <Icon
                          name={shouldShowCopied ? 'checkmark' : 'copy'}
                          size="extraSmall"
                          className={shouldShowCopied && 'u-textPositive'}
                        />
                      </Button.Icon>
                    </Button>
                  </Form.InputGroup.Append>
                </Form.InputGroup>
              </Form.Group>
            </div>
          </div>
          {AceClass ? (
            <div
              className="u-overflowVerticalAuto"
              style={{ height: 500 }}
              ref={editorContainerRef}
            >
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
                height="1300px"
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
                onValidate={updateHexColor}
              />
            </div>
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