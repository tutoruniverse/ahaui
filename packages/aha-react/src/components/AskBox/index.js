import React from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';

const propTypes = {

};
const defaultProps = {

};

const AskBox = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={classNames(
      'AskBox',
      className && className,
    )}
  />
));

const Title = createBlock('AskBox-title u-text400 lg:u-text500');
const Header = createBlock('AskBox-header u-paddingHorizontalSmall lg:u-paddingHorizontalLarge u-paddingTopSmall lg:u-paddingTopMedium u-paddingBottomSmall');
const Body = createBlock('AskBox-body u-paddingHorizontalSmall lg:u-paddingHorizontalLarge');
const Footer = createBlock('AskBox-footer u-paddingHorizontalSmall lg:u-paddingHorizontalLarge u-paddingBottomSmall lg:u-paddingBottomMedium');
const Note = createBlock('AskBox-note u-textCenter u-text200 u-textGray u-paddingTopSmall');

AskBox.Title = Title;
AskBox.Header = Header;
AskBox.Body = Body;
AskBox.Footer = Footer;
AskBox.Note = Note;
AskBox.displayName = 'AskBox';
AskBox.defaultProps = defaultProps;
AskBox.propTypes = propTypes;

export default AskBox;
