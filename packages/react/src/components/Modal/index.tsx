import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import Fade from 'components/Fade';
import type { EnumToUnion } from 'types/common';
import { type TransitionProps, TransitionActions } from 'react-transition-group/Transition';
import Header, { ModalHeaderProps } from './Header';
import Inside from './Inside';
import ModalContext from './Context';

export enum ModalSizeEnum {
  small = 'small',
  medium = 'medium',
  large = 'large',
  extraLarge = 'extraLarge',
}

type Size = EnumToUnion<ModalSizeEnum>;

export interface ModalProps extends React.HTMLAttributes<HTMLElement> {
  /**
  * Modal size variants
  * */
  size?: Size,
  /**
   * Render modal without trigger
   * */
  relative?: boolean,
  /**
   * Vertically center the Dialog in the window
   * @default false
   * */
  centered?: boolean,
  /** When true The modal will show itself. */
  show?: boolean,
  /** A callback fired when the header closeButton or non-static backdrop is clicked. Required if either are specified. */
  onHide?: () => void,
  /** A `react-transition-group` Transition component used to animate the Message on dismissal. */
  transition?: React.FC<TransitionProps & TransitionActions>;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      children,
      size = ModalSizeEnum.medium,
      show = false,
      onHide,
      relative = false,
      centered = false,
      transition: Transition = Fade,
      ...props
    } : ModalProps,
    ref : React.ForwardedRef<HTMLDivElement>,
  ) => {
    const modalContainerId = 'aha-design-system-react-modal-backdrop';
    const [modalContainer, setModalContainer] = useState<Element>();
    useEffect(() => {
      let modalRoot = document.body.querySelector(`#${modalContainerId}`);
      if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = modalContainerId;
      }
      document.body.appendChild(modalRoot);
      setModalContainer(modalRoot);
      return () => {
        modalRoot?.remove();
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

    const hasBackDrop = show && !relative;

    const modalContext = useMemo(() => ({
      onHide,
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
          className,
        )}
      >
        <div
          className={classNames(
            'Modal-dialog u-positionRelative',
            !relative && 'u-marginExtraSmall md:u-marginVerticalMedium md:u-marginHorizontalAuto',
            size === 'extraLarge' && 'md:u-paddingHorizontalSmall',
          )}
          data-testid="modal-dialog"
        >
          <div
            className={classNames(
              'Modal-container u-positionRelative u-flex u-flexColumn u-widthFull u-roundedLarge u-shadowLarge',
            )}
            data-testid="modal-container"
          >
            {children}
          </div>
        </div>
      </div>
    );
    // Don't have transition
    if (!Transition) return show ? modal : null;
    let backdrop;

    // Have transition
    const dialog = (
      <Transition
        timeout={300}
        appear
        unmountOnExit
        in={show}
      >
        {modal}
      </Transition>
    );

    if (hasBackDrop) {
      backdrop = (
        <Transition
          timeout={300}
          appear
          unmountOnExit
          in={show}
        >
          <div
            className={classNames(
              'Modal-backDrop u-positionFixed u-positionFull u-backgroundBlack',
              show && 'u-zIndexModalBackDrop',
            )}
            data-testid="modal-backDrop"
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

const ModalCompound = Object.assign(Modal, {
  Title,
  Header,
  Inside,
  Body,
  Footer,
  displayName: 'Modal',
});

export default ModalCompound;
export type { ModalHeaderProps };
