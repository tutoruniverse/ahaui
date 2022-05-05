import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Form from 'components/Form';
import Icon from 'components/Icon';
import Button from 'components/Button';


const propTypes = {
  /** Callback fired when the Search Button is clicking */
  onClickButton: PropTypes.func,
  /** The icon to display. The name can get from Component Icon */
  buttonIcon: PropTypes.string,
  /**
   * Sets sizeInput on `Input` and size on `Button`.
   * @default 'medium'
   * @type {('small'|'medium'|'large')}
   * */
  sizeControl: PropTypes.string,
  /** Custom text button */
  buttonText: PropTypes.string,
};

const defaultProps = {
  buttonIcon: 'search',
};

const SearchBox = React.forwardRef(({ className, sizeControl, onClickButton, buttonIcon, buttonText, ...props }, ref) => (

  <Form.Group
    sizeControl={sizeControl}
    className={classNames(
      'SearchBox',
      className && className
    )}
  >
    <Form.InputGroup>
      <Form.Input
        ref={ref}
        {...props}
        type="search"
      />
      <Form.InputGroup.Append>
        <Button size={sizeControl} variant="secondary" onClick={onClickButton}>
          {buttonText && (
          <Button.Label>{buttonText}</Button.Label>
          )}
          {buttonIcon && (
          <Button.Icon><Icon name={buttonIcon} /></Button.Icon>
          )}
        </Button>
      </Form.InputGroup.Append>
    </Form.InputGroup>
  </Form.Group>

));

SearchBox.displayName = 'SearchBox';
SearchBox.defaultProps = defaultProps;
SearchBox.propTypes = propTypes;
export default SearchBox;
