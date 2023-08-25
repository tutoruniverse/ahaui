import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Fade from 'components/Fade';
import Button from 'components/Button';
import Modal from '.';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template : ComponentStory<typeof Modal> = (args) => {
  const {
    show: defaultShow,
    ...rest
  } = args;

  const [show, setShow] = useState(defaultShow);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        <Button.Label>Open Modal</Button.Label>
      </Button>
      {show && (
      <Modal {...rest} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleClose}>Ok, Got It!</Button>
        </Modal.Footer>
      </Modal>
      )}
    </>
  );
};

export const ModalWithControlButton = Template.bind({});
ModalWithControlButton.argTypes = {
  show: {
    table: {
      disable: true,
    },
  },
  onHide: {
    table: {
      disable: true,
    },
  },
  transition: {
    table: {
      disable: true,
    },
  },
};
ModalWithControlButton.args = {
  size: 'medium',
  show: false,
  relative: false,
  centered: false,
  transition: Fade,
};
