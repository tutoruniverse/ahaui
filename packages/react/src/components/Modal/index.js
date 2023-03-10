import React, { useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { elementType } from 'prop-types-extra';
import createBlock from 'utils/createBlock';
import Fade from 'components/Fade';
import Header from './Header';
import Inside from './Inside';
import ModalContext from './Context';

const propTypes = {
  /**
  * Modal size variants
  * @default 'medium'
  * */
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
    'extraLarge',
  ]),
  /**
   * Render modal without trigger
   * */
  relative: PropTypes.bool,
  /**
   * Vertically center the Dialog in the window
   * @default false
   * */
  centered: PropTypes.bool,
  /** When true The modal will show itself. */
  show: PropTypes.bool,
  /** A callback fired when the header closeButton or non-static backdrop is clicked. Required if either are specified. */
  onHide: PropTypes.func,
  /** A `react-transition-group` Transition component used to animate the Message on dismissal. */
  transition: elementType,
};

const defaultProps = {
  show: false,
  size: 'medium',
  relative: false,
  transition: Fade,
};

const Modal = React.forwardRef(({ children, size, show, onHide, relative, centered, transition: Transition, ...props }, ref) => {
  const modalContainerId = 'aha-design-system-react-modal-backdrop';
  const [modalContainer, setModalContainer] = useState();
  useEffect(() => {
    let modalRoot = document.body.querySelector(`#${modalContainerId}`);
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = modalContainerId;
    }
    document.body.appendChild(modalRoot);
    setModalContainer(modalRoot);
    return () => {
      modalRoot.remove();
    };
  }, [modalContainerId]);
  useEffect(() => {
    if (!relative) {
      document.body.classList.add('ModalOpen');
    }
    return () => {
      document.body.classList.remove('ModalOpen');
    };
  }, [relative]);

  const renderBackDrop = show && !relative;

  const modalContext = useMemo(() => ({
    onHide: () => onHide(),
  }), [onHide]);

  const modal = (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'Modal',
        centered && 'Modal--centered',
        !relative && 'u-positionFixed u-positionTop u-positionLeft u-positionBottom u-positionRight',
        (show && !relative) && 'u-zIndexModal',
        relative && 'Modal--relative u-positionRelative',
        size && `Modal--${size}`,
      )}
    >
      <div className={classNames(
        'Modal-dialog u-positionRelative',
        !relative && 'u-marginExtraSmall md:u-marginVerticalMedium md:u-marginHorizontalAuto',
        size === 'extraLarge' && 'md:u-paddingHorizontalSmall',
      )}
      >
        <div className={classNames(
          'Modal-container u-positionRelative u-flex u-flexColumn u-widthFull u-roundedLarge u-shadowLarge',
        )}
        >
          {children}
        </div>
      </div>
    </div>
  );
  if (!Transition) return show ? modal : null;
  let backdrop;
  let dialog;
  if (Transition) {
    dialog = (
      <Transition
        appear
        unmountOnExit
        in={show}
      >
        {modal}
      </Transition>
    );
  }
  if (Transition && renderBackDrop) {
    backdrop = (
      <Transition
        appear
        unmountOnExit
        in={show}
      >
        <div className={classNames(
          'Modal-backDrop u-positionFixed u-positionFull u-backgroundBlack',
          show && 'u-zIndexModalBackDrop',
        )}
        />
      </Transition>
    );
  }
  if (!modalContainer) return null;
  return relative ? modal : ReactDOM.createPortal((
    <ModalContext.Provider value={modalContext}>
      {backdrop}
      {dialog}
    </ModalContext.Provider>
  ), modalContainer);
});

const Title = createBlock('Modal-title u-text600 u-fontMedium u-textCenter');
const Body = createBlock('Modal-body u-paddingHorizontalMedium u-backgroundWhite u-paddingTopSmall u-paddingBottomMedium');
const Footer = createBlock('Modal-footer u-backgroundLightest u-paddingMedium u-flex u-alignItemsCenter u-justifyContentEnd');
Modal.Title = Title;
Modal.Header = Header;
Modal.Inside = Inside;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.defaultProps = defaultProps;
Modal.displayName = 'Modal';
Modal.propTypes = propTypes;

export default Modal;
