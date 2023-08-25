import React, { createRef, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { messagesVariants } from 'constants/messages';
import { setupWithUserEvent } from 'utils/test';
import Message, { MessageProps } from '..';
import { MessageEnum, MessageVariantEnum } from '../Context';

type ExampleComponentProps = Partial<Omit<MessageProps, 'onClose'> & { titleClassName: string, onClose: () => void }>;

describe('components/Message', () => {
  const messageRef = createRef<HTMLDivElement>();
  const closeCallback = jest.fn();

  const Component = (props?: ExampleComponentProps) => {
    const {
      show: propsShow,
      onClose: callback = closeCallback,
      titleClassName,
      ...rest
    } = props || {};

    const [show, setShow] = useState(propsShow);

    const onClose = () => {
      setShow(false);
      callback();
    };

    return (
      <Message ref={messageRef} {...rest} show={show} onClose={onClose}>
        <Message.Container>
          <Message.Title className={titleClassName}>
            Heading
          </Message.Title>
          <Message.Content>
            This is a message-check it out!
          </Message.Content>
        </Message.Container>
      </Message>
    );
  };

  const setup = (props?: ExampleComponentProps) => setupWithUserEvent(render(<Component {...props} />));

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Render with default props', () => {
    it('should render Message with default props', () => {
      const { container } = setup();

      expect(messageRef.current).toBeTruthy();

      expect(messageRef.current?.className).toContain('Message');

      // Message children.
      expect(container.querySelector('.Message-container')).toBeInTheDocument();
      expect(container.querySelector('.Message-title')).toBeInTheDocument();
      expect(container.querySelector('.Message-content')).toBeInTheDocument();

      // Type is form. Variant is information.
      // Variant className.
      expect(messageRef.current?.className).toContain('u-borderInformation u-backgroundInformationLighter');
      // Variant textClassName.
      expect(messageRef.current?.className).toContain('u-textDark');
    });
  });

  describe('Render with passing props', () => {
    const ids = Object.values(MessageVariantEnum);

    it.each(ids)('should render Message with type is form and variant is %s', (variant) => {
      const type = MessageEnum.form;
      const currentVariant = messagesVariants.find((item) => item.type === type && item.id === variant);

      setup({ type, variant });
      expect(messageRef.current).toBeTruthy();
      expect(messageRef.current?.className).toContain('Message');
      expect(messageRef.current?.className).toContain(currentVariant?.className);
      expect(messageRef.current?.className).toContain(currentVariant?.textClassName);
    });

    it.each(ids)('should render Message with type is system and variant is %s', (variant) => {
      const type = MessageEnum.system;
      const currentVariant = messagesVariants.find((item) => item.type === type && item.id === variant);

      setup({ type, variant });
      expect(messageRef.current).toBeTruthy();
      expect(messageRef.current?.className).toContain('Message');
      expect(messageRef.current?.className).toContain(currentVariant?.className);
      expect(messageRef.current?.className).toContain(currentVariant?.textClassName);
    });

    it('should handle onClose correctly', async () => {
      const { user } = setup({ dismissible: true });

      expect(messageRef.current).toBeTruthy();
      const closeBtn = screen.getByTestId('message-close');
      expect(closeBtn).toBeInTheDocument();

      await user.hover(closeBtn);
      expect(closeBtn.className).toContain('u-opacityReset');

      await user.unhover(closeBtn);
      expect(closeBtn.className).toContain('u-opacityHalf');

      closeBtn.click();

      await waitFor(() => expect(messageRef.current).not.toBeInTheDocument());
      expect(closeCallback).toBeCalledTimes(1);
      expect(messageRef.current).toBeFalsy();
    });

    it('should render Message with disabled="true" & dismissible="true"', async () => {
      const { user } = setup({ disabled: true, dismissible: true });

      expect(messageRef.current).toBeTruthy();
      const closeBtn = screen.getByTestId('message-close');
      expect(closeBtn).toBeInTheDocument();

      await user.hover(closeBtn);
      expect(screen.getByTestId('message-close').className).toContain('u-opacityHalf');

      closeBtn.click();

      expect(closeCallback).not.toBeCalled();
    });

    it('should render Message without Transition', () => {
      const className = 'className';
      const titleClassName = 'titleClassName';
      const { container, unmount } = setup({ transition: null, className, titleClassName });

      expect(messageRef.current).toBeTruthy();

      expect(container.querySelector('.Message-container')).toBeInTheDocument();
      expect(container.querySelector('.Message-title')).toBeInTheDocument();
      expect(container.querySelector('.Message-content')).toBeInTheDocument();
      expect(container.querySelector('.className')).toBeInTheDocument();
      expect(container.querySelector('.titleClassName')).toBeInTheDocument();

      // Should not render message.
      unmount();
      expect(messageRef.current).toBeFalsy();

      expect(container.querySelector('.Message-container')).not.toBeInTheDocument();
      expect(container.querySelector('.Message-title')).not.toBeInTheDocument();
      expect(container.querySelector('.Message-content')).not.toBeInTheDocument();
    });
  });
});
