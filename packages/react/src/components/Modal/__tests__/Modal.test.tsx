import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Modal, { ModalSizeEnum } from '..';

const MODAL_CONTAINER_ID = 'aha-design-system-react-modal-backdrop';

describe('components/Modal', () => {
  const modalRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    render(<Modal ref={modalRef} {...props} />);
  };

  describe('Render without passing props', () => {
    it('should not render the modal', () => {
      setup();
      expect(modalRef.current).toBeFalsy();
    });
  });

  describe('Render with passing props', () => {
    it('should render without crashing', () => {
      setup({ show: true });
      expect(modalRef.current).toBeTruthy();
      expect(modalRef.current).toHaveClass('Modal');

      expect(screen.getByTestId('modal-backDrop')).toBeTruthy();
      expect(modalRef.current?.parentElement).toHaveProperty('id', MODAL_CONTAINER_ID);
      expect(modalRef.current?.parentElement?.parentElement).toBe(document.body);
    });

    it('should not render the modal when show prop is false', () => {
      setup({ show: false });
      expect(modalRef.current).toBeFalsy();
    });

    it.each(Object.keys(ModalSizeEnum))('should render the correct size %s', (size) => {
      setup({ show: true, size });

      expect(modalRef.current).toHaveClass(`Modal--${size}`);

      // check Modal-dialog
      if (size === ModalSizeEnum.extraLarge) {
        expect(screen.queryByTestId('modal-dialog')).toHaveClass('md:u-paddingHorizontalSmall');
      }
    });

    it('should render children', () => {
      const children = (
        <>
          <Modal.Title data-testid="modal-title">Title</Modal.Title>
          <Modal.Body data-testid="modal-body">Body</Modal.Body>
          <Modal.Footer data-testid="modal-footer">Footer</Modal.Footer>
        </>
      );

      setup({ show: true, children });

      const modalContainer = screen.queryByTestId('modal-container');
      expect(modalContainer?.children.length).toBe(3);
      expect(screen.queryByTestId('modal-title')).toBeTruthy();
      expect(screen.queryByTestId('modal-title')).toHaveTextContent('Title');
      expect(screen.queryByTestId('modal-body')).toBeTruthy();
      expect(screen.queryByTestId('modal-body')).toHaveTextContent('Body');
      expect(screen.queryByTestId('modal-footer')).toBeTruthy();
      expect(screen.queryByTestId('modal-footer')).toHaveTextContent('Footer');
    });

    it('should render with centered prop', () => {
      setup({ show: true, centered: true });

      expect(modalRef.current).toHaveClass('Modal--centered');
    });

    it('should render with relative prop', () => {
      setup({ show: true, relative: true });

      expect(modalRef.current).toHaveClass('Modal--relative u-positionRelative');
      expect(screen.queryByTestId('modal-backDrop')).not.toBeInTheDocument();
    });

    it('should render modal inside existing modal root element', () => {
      const modalRootElement = document.createElement('div');
      modalRootElement.id = MODAL_CONTAINER_ID;
      document.body.appendChild(modalRootElement);
      setup({ show: true });

      expect(modalRef.current?.parentElement).toBe(modalRootElement);
    });

    it('should render without transition but show', () => {
      setup({ show: true, transition: null });
      expect(modalRef.current).toBeTruthy();
      expect(modalRef.current).not.toHaveClass('Fade');
    });

    it('should render without transition and show', () => {
      setup({ transition: null });
      expect(modalRef.current).toBeFalsy();
    });
  });
});
