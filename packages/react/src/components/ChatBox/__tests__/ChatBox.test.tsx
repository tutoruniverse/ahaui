import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import ChatBox from '..';

describe('components/ChatBox', () => {
  const chatBoxRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    const setupResult = setupWithUserEvent(render(<ChatBox {...props} ref={chatBoxRef} />));

    // Check if we can pass ref
    expect(chatBoxRef.current).toBeTruthy();
    expect(chatBoxRef.current).toHaveClass('ChatBox');

    return setupResult;
  };

  describe('Render with passing props', () => {
    it('should render the ChatBox with custom classNames', () => {
      const className = 'custom className';

      setup({ className });

      expect(chatBoxRef.current).toHaveClass(className);
    });

    it('should render List subcomponent with children, custom classNames and innerClassName', () => {
      const children = (
        <ChatBox.List className="custom-class" innerClassName="inner-custom-class">
          <div>Message 1</div>
          <div>Message 2</div>
        </ChatBox.List>
      );

      setup({ children });

      const list = screen.queryByTestId('chatbox-list');
      const innerList = screen.queryByTestId('chatbox-innerlist');
      expect(list).toBeInTheDocument();
      expect(list?.children.length).toBe(1);
      expect(list?.firstChild?.childNodes.length).toBe(2);
      expect(list).toHaveClass('custom-class');
      expect(innerList).toHaveClass('inner-custom-class');
    });

    it('should render the Attachment subcomponent', () => {
      const children = (
        <ChatBox.Attachment>
          <div>Attachment content</div>
        </ChatBox.Attachment>
      );

      setup({ children });

      const attachment = chatBoxRef.current?.firstChild;
      expect(attachment).toBeInTheDocument();
      expect(attachment).toHaveClass('ChatBox-attachment');
      expect(attachment?.textContent).toBe('Attachment content');
    });

    it('should renders the Info subcomponent with custom classNames', () => {
      const children = (
        <ChatBox.Info className="custom-class">
          <div>Info content</div>
        </ChatBox.Info>
      );

      setup({ children });

      const info = chatBoxRef.current?.firstChild;
      expect(info).toBeInTheDocument();
      expect(info).toHaveClass('ChatBox-info custom-class');
      expect(info?.textContent).toBe('Info content');
    });

    it('should render the Context subcomponent with children and custom classNames', () => {
      const children = (
        <ChatBox.Context className="custom-class">
          <div>Context content</div>
        </ChatBox.Context>
      );

      setup({ children });

      const context = chatBoxRef.current?.firstChild;
      expect(context).toBeInTheDocument();
      expect(context?.textContent).toBe('Context content');
      expect(context).toHaveClass('custom-class');
    });

    it('should render the Notice subcomponent with children and custom classNames', () => {
      const children = (
        <ChatBox.Notice className="custom-class">
          <div>Notice content</div>
        </ChatBox.Notice>
      );

      setup({ children });

      const notice = chatBoxRef.current?.firstChild;
      expect(notice).toBeInTheDocument();
      expect(notice?.textContent).toBe('Notice content');
      expect(notice).toHaveClass('custom-class');
    });

    it('should call a click handler when the component is clicked', async () => {
      const handleClick = jest.fn();

      const { user } = setup({ onClick: handleClick });

      await user.click(chatBoxRef.current as Element);
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
