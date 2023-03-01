import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import Media from 'components/Media';
import Icon from 'components/Icon';

const propTypes = {
  /** Custom topic label */
  topicLabel: PropTypes.string,
  /** The topic name */
  topicName: PropTypes.string,
  /** Custom description label */
  descriptionLabel: PropTypes.string,
  /** The description value */
  descriptionValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Custom additional label */
  additionalLabel: PropTypes.string,
  /** The additional value */
  additionalValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Providing a `src` will render an `<img>` element */
  src: PropTypes.string,
  /**
   * A callback for image
   */
  onClickImage: PropTypes.func,
  /** A callback for action bottom */
  action: PropTypes.func,
};
const defaultProps = {
  topicLabel: 'QUESTION IS ABOUT',
  descriptionLabel: 'DESCRIPTION',
  additionalLabel: 'ADDITIONAL INFORMATION',
};

const ProblemInfo = React.forwardRef(({ topicLabel, topicName, descriptionLabel, descriptionValue, action, additionalLabel, additionalValue, src, onClickImage, ...props }, ref) => {
  const [isImgHover, setImgHover] = useState(false);
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'ProblemInfo',
        'u-roundedLarge u-marginBottomSmall u-text200 u-textGray u-overflowHidden u-border u-borderUltraLight',
      )}
    >
      <div className="u-backgroundOpaline u-paddingExtraSmall">
        <div className="Grid Grid--smallGutter u-marginBottomSmall">
          <div className="u-sizeFull sm:u-size1of4 u-marginBottomSmall u-marginBottomNone">
            {src
              && onClickImage ? (
                <div
                  onMouseOver={() => setImgHover(true)}
                  onMouseLeave={() => setImgHover(false)}
                  className="u-positionRelative u-cursorPointer"
                  onClick={onClickImage}
                >
                  <div className="u-positionAbsolute u-positionCenter u-zIndexPositive">
                    <div className="u-positionRelative u-roundedCircle u-overflowHidden u-flex u-alignItemsCenter u-justifyContentCenter" style={{ width: 32, height: 32 }}>
                      <div className={classNames(
                        'u-positionAbsolute u-positionFull u-opacityHalf',
                        isImgHover ? 'u-backgroundDark' : ' u-backgroundBlack',
                      )}
                      />
                      <Icon name="search" className="u-textWhite u-lineHeightNone u-positionRelative" />
                    </div>
                  </div>
                  <Media as="img" src={src} aspectRatio="classic" className="u-roundedMedium" />
                </div>
              ) : (
                <Media as="img" src={src} aspectRatio="classic" className="u-roundedMedium" />
              )}
          </div>
          {topicName && (
            <div className="u-sizeFull sm:u-size3of4">
              <div className="u-fontMedium u-marginBottomTiny">
                {topicLabel}
              </div>
              <div className="u-marginBottomTiny">{topicName}</div>
            </div>
          )}
        </div>
        {descriptionValue && (
          <div className="u-marginBottomExtraSmall">
            <div className="u-fontMedium u-marginBottomTiny">
              {descriptionLabel}
            </div>
            <div className="u-paddingBottomExtraSmall">
              {typeof (descriptionValue) === 'function'
                ? descriptionValue()
                : descriptionValue}
            </div>
          </div>
        )}
        {additionalValue && (
          <div className="u-marginBottomExtraSmall">
            <div className="u-fontMedium u-marginBottomTiny">
              {additionalLabel}
            </div>
            <div className="u-paddingBottomExtraSmall">
              {typeof (additionalValue) === 'function'
                ? additionalValue()
                : additionalValue}
            </div>
          </div>
        )}
      </div>
      {action && (
        <div className="u-borderTop u-borderUltraLight u-text100 u-flex u-justifyContentCenter u-paddingTiny u-backgroundOpaline hover:u-backgroundLightest u-cursorPointer">
          {typeof (action) === 'function'
            ? action()
            : action}
        </div>
      )}
    </div>
  );
});

const Note = createBlock('QuestionDescription-note u-textCenter u-text200 u-textGray u-paddingTopSmall');

ProblemInfo.Note = Note;
ProblemInfo.displayName = 'ProblemInfo';
ProblemInfo.defaultProps = defaultProps;
ProblemInfo.propTypes = propTypes;

export default ProblemInfo;
