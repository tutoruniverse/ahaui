import ReactDOM from 'react-dom';
import classNames from 'classnames';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import PropTypes from 'prop-types';
import qsa from 'dom-helpers/querySelectorAll';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import SplitPane from 'react-split-pane';
import Faker from 'faker/locale/en_US';
import React, {
  useCallback,
  useEffect,
  useRef,
  useContext,
  useState,
} from 'react';

import {
  LiveContext,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live';
import * as AhaReact from '@ahaui/react';
import PlaceholderImage from './PlaceholderImage';

const scope = {
  useEffect,
  useRef,
  useState,
  ...AhaReact,
  ReactDOM,
  classNames,
  PropTypes,
  SplitPane,
  PlaceholderImage,
  Faker,
};

const StyledContainer = AhaReact.createBlock('u-positionRelative u-marginBottomLarge u-backgroundWhite');
const EditorInfoMessage = AhaReact.createBlock('u-backgroundPositiveLighter u-textDark u-positionAbsolute u-positionTop u-positionRight u-text100 u-paddingHorizontalExtraSmall u-paddingVerticalTiny');
const StyledPreview = AhaReact.createBlock('u-positionRelative u-paddingSmall u-paddingBottomMedium');
function Preview({ className, transparentBackground }) {
  const exampleRef = useRef();
  const live = useContext(LiveContext);
  const [hjs, setHjs] = useState(null);
  useEffect(() => {
    import('holderjs').then(({ default: hjs_ }) => {
      hjs_.addTheme('gray');
      setHjs(hjs_);
    });
  }, []);
  useIsomorphicEffect(() => {
    if (!hjs) {
      return;
    }

    hjs.run({
      theme: 'gray',
      images: qsa(exampleRef.current, 'img'),
    });
  }, [hjs, live.element]);

  const handleClick = useCallback((e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
    }
  }, []);
  let styles = {};
  if (transparentBackground) {
    styles = {
      backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)),linear-gradient(to right, black 50%, white 50%),linear-gradient(to bottom, black 50%, white 50%)',
      backgroundBlendMode: 'normal, difference, normal',
      backgroundSize: '24px 24px',
    };
  }
  return (
    <React.Fragment>
      <StyledPreview
        ref={useMergedRefs(exampleRef, live)}
        aria-label="Code Example"
        className={className}
        onClick={handleClick}
        style={styles}
      >
        <LivePreview />
      </StyledPreview>
      <LiveError className="u-positionRelative u-paddingHorizontalSmall u-paddingVerticalExtraSmall u-border u-borderNegativeLight  u-backgroundNegativeLighter u-textDark u-marginVerticalNone u-text100 u-textPreLine" />
    </React.Fragment>
  );
}

let uid = 0;

function Editor() {
  const [focused, setFocused] = useState(false);
  const [ignoreTab, setIgnoreTab] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const mouseDownRef = useRef(false);

  const idRef = useRef(null);
  if (idRef.current === null) idRef.current = `described-by-${++uid}`;
  const id = idRef.current;

  const handleKeyDown = useCallback(
    (e) => {
      if (ignoreTab) {
        if (e.key !== 'Tab' && e.key !== 'Shift') {
          if (e.key === 'Enter') e.preventDefault();
          setIgnoreTab(false);
        }
      } else if (e.key === 'Escape') {
        setIgnoreTab(true);
      }
    },
    [ignoreTab],
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
    setIgnoreTab(!mouseDownRef.current);
    setKeyboardFocused(!mouseDownRef.current);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    mouseDownRef.current = true;
    window.setTimeout(() => {
      mouseDownRef.current = false;
    });
  }, []);

  const showMessage = keyboardFocused || (focused && !ignoreTab);

  return (
    <div
      className="u-positionRelative u-overflowVerticalAuto"
      style={{
        maxHeight: '60vh',
      }}
    >
      <LiveEditor
        className="u-positionRelative u-backgroundDark u-textWhite"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        ignoreTabKey={ignoreTab}
        aria-describedby={showMessage ? id : null}
        aria-label="Example code editor"
        padding={16}
      />
      {showMessage && (
        <EditorInfoMessage id={id} aria-live="polite">
          {ignoreTab ? (
            <>
              Press
              <kbd className="u-marginHorizontalTiny u-backgroundBlack u-textWhite u-paddingHorizontalTiny u-roundedMedium u-lineHeightReset">enter</kbd>
              or type a key to enable tab-to-indent
            </>
          ) : (
            <>
                Press
              <kbd className="u-marginHorizontalTiny u-backgroundBlack u-textWhite u-paddingHorizontalTiny u-roundedMedium u-lineHeightReset">esc</kbd>
                to disable tab trapping
            </>
          )}
        </EditorInfoMessage>
      )}
    </div>
  );
}

const PRETTIER_IGNORE_REGEX = /({\s*\/\*\s+prettier-ignore\s+\*\/\s*})|(\/\/\s+prettier-ignore)/gim;
const propTypes = {
  codeText: PropTypes.string.isRequired,
};

function CodeView({ codeText, exampleClassName, showCode = true, transparentBackground = false }) {
  // Remove Prettier comments and trailing semicolons in JSX in displayed code.
  const code = codeText
    .replace(PRETTIER_IGNORE_REGEX, '')
    .trim()
    .replace(/>;$/, '>');
  const [openCode, setOpenCode] = useState(false);
  return (
    <StyledContainer>
      <LiveProvider
        scope={scope}
        code={code}
        mountStylesheet={false}
        noInline={codeText.includes('render(')}
      >
        <div className="u-positionRelative u-border u-borderUltraLight">
          <Preview transparentBackground={transparentBackground} showCode={showCode} className={exampleClassName} />
          {showCode && (
            <AhaReact.Overlay.Trigger
              placement="top"
              overlay={props => (
                <AhaReact.Tooltip id="code-view-show-code" {...props}>
                  {openCode ? 'Hide the source' : 'Show the source'}
                </AhaReact.Tooltip>
              )}
            >
              <div
                className="u-positionAbsolute u-fontSizeNone u-positionRight u-positionBottom  u-border u-borderBottomNone u-borderRightNone u-borderUltraLight"
              >
                <div
                  className="u-flexInline u-lineHeightReset u-backgroundWhite hover:u-backgroundLighter u-paddingHorizontalExtraSmall u-cursorPointer"
                  onClick={() => setOpenCode(!openCode)}
                >
                  <AhaReact.Icon name="code" size="extraSmall" />
                </div>
              </div>
            </AhaReact.Overlay.Trigger>
          )}
        </div>
        {showCode && (
          <AhaReact.Collapse
            in={openCode}
          >
            <div>
              <Editor />
            </div>
          </AhaReact.Collapse>
        )}
      </LiveProvider>
    </StyledContainer>
  );
}

CodeView.propTypes = propTypes;

export default CodeView;
