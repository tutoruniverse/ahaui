import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import BubbleChat, { BubbleChatProps, BubbleChatTypeEnum, BubbleChatVariantEnum } from '..';

describe('components/BubbleChat', () => {
  const ref = createRef<HTMLDivElement>();
  const childrenRef = createRef<HTMLDivElement>();

  const children = (
    <div ref={childrenRef}>Text message</div>
  );

  const setup = (props?: BubbleChatProps) => setupWithUserEvent(render(<BubbleChat ref={ref} {...(props || {})} />));

  const getBubbleContainer = () => screen.getByTestId('bubble-chat-container');

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      expect(ref.current).toBeTruthy();
      expect(ref.current?.className).toContain('BubbleChat');
    });
  });

  describe('Render with passing props', () => {
    const options = [
      {
        id: 1,
        name: 'Option 1',
      },
      {
        id: 2,
        name: 'Option 2',
      },
      {
        id: 3,
        name: 'Option 3',
      },
    ];
    const currentOption = 1;
    const onSelectOption = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it.each(
      Object.values(BubbleChatTypeEnum),
    )('should render bubble with type="%s"', (type) => {
      const { container } = setup({ avatar: 'default', type });

      expect(ref.current).toBeTruthy();
      expect(ref.current?.className).toContain('BubbleChat');
      const avatar = container.getElementsByClassName('Avatar');
      expect(avatar).toHaveLength(1);
    });

    it('should render with all properties', () => {
      const avatar = () => (
        <div className="Avatar">Avatar</div>
      );
      const actionBar = (<div>Action bar</div>);

      const variant = BubbleChatVariantEnum.primary;
      const className = 'className';
      const textClassName = 'textClassName';
      const actionBarClassName = 'actionBarClassName';

      const { container } = setup({
        variant,
        time: 'today',
        avatar,
        className,
        textClassName,
        actionBar,
        actionBarClassName,
      });

      expect(ref.current).toBeTruthy();
      expect(container.querySelector('.BubbleChat-time')).toBeInTheDocument();
      expect(container.querySelector('.Avatar')).toBeInTheDocument();
      expect(container.querySelector(`.${className}`)).toBeInTheDocument();
      expect(container.querySelector(`.${actionBarClassName}`)).toBeInTheDocument();
      expect(container.querySelector(`.${textClassName}`)).toBeInTheDocument();
    });

    it('should render bubble when typing', () => {
      const { container } = setup({ isTyping: true });
      const typingElement = container.querySelector('.BubbleChat-typing');
      expect(typingElement).toBeInTheDocument();
    });

    describe('options prop', () => {
      it('should render bubble with options', async () => {
        const textClassName = 'textClassName';
        const { user, container } = setup({
          options,
          onSelectOption,
          currentOption,
          textClassName,
        });

        expect(container.querySelector(`.${textClassName}`)).toBeInTheDocument();
        const optionButton = screen.getByTestId('bubble-chat-options');
        expect(optionButton).toBeInTheDocument();

        await user.click(optionButton);

        const optionButtons = screen.getAllByTestId('bubble-chat-option');
        expect(optionButtons).toHaveLength(3);
        expect(optionButtons[0].className).toContain('u-backgroundPrimary');

        await user.click(optionButtons[1]);

        expect(onSelectOption).toBeCalledTimes(1);
        expect(onSelectOption).toHaveBeenCalledWith(options[1].id);
      });

      it('should handle disabled option correctly', async () => {
        const { user } = setup({
          options,
          onSelectOption,
          currentOption,
          disabledOption: true,
        });

        const optionButtons = screen.getAllByTestId('bubble-chat-option');
        expect(optionButtons[0]).toHaveClass('u-cursorNotAllow u-textWhite');
        [1, 2].forEach((opt) => {
          expect(optionButtons[opt]).toHaveClass('u-cursorNotAllow u-textGray');
        });

        await user.click(optionButtons[1]);
        expect(onSelectOption).not.toBeCalled();
      });
    });

    it('should render options with disabledOptions', async () => {
      const { user } = setup({ options, onSelectOption, disabledOption: true });
      const optionButton = screen.getByTestId('bubble-chat-options');
      expect(optionButton).toBeInTheDocument();

      await user.click(optionButton);

      const optionButtons = screen.getAllByTestId('bubble-chat-option');
      expect(optionButtons).toHaveLength(3);

      optionButtons.forEach((option) => {
        expect(option.className).toContain('u-cursorNotAllow');
      });
    });

    it('should render with children', () => {
      setup({ children });

      expect(ref.current).toBeTruthy();
      expect(childrenRef.current).toBeTruthy();
    });

    it.each([
      [BubbleChatTypeEnum.inbound, 'right'],
      [BubbleChatTypeEnum.outbound, 'left'],
      [BubbleChatTypeEnum.system, 'left'],
    ])('should render actionBar with type="%s"', (type, position) => {
      const actionBar = (<div>Action bar</div>);
      const actionBarClassName = 'actionBarClassName';
      setup({ type, actionBar, actionBarClassName });

      const actionBarElement = screen.getByTestId('bubble-chat-action-bar');
      const alignClassName = position === 'right' ? 'u-positionRight-100' : 'u-positionLeft-100';
      expect(actionBarElement).toHaveClass(alignClassName);
    });

    describe('time prop', () => {
      it.each([
        [BubbleChatTypeEnum.inbound, 'right'],
        [BubbleChatTypeEnum.outbound, 'left'],
        [BubbleChatTypeEnum.system, 'left'],
      ])('should render time correctly', (type, position) => {
        const time = '16:24';
        setup({ type, time });
        const bubbleContainer = getBubbleContainer();

        expect(bubbleContainer.children.length).toBe(4);
        const timeElementIdx = position === 'left' ? 3 : 2;
        const timeElement = bubbleContainer.children[timeElementIdx];

        expect(timeElement).toHaveClass('BubbleChat-time');
        expect(timeElement).not.toHaveClass('u-textRight');
        expect(timeElement).toHaveTextContent(time);
      });

      it.each([
        [BubbleChatTypeEnum.inbound, 'right'],
        [BubbleChatTypeEnum.outbound, 'left'],
        [BubbleChatTypeEnum.system, 'left'],
      ])('should align time with children correctly', (type, position) => {
        const time = '16:24';
        setup({ type, time, children });

        const bubbleContainer = getBubbleContainer();
        const timeElementIdx = position === 'left' ? 3 : 2;
        const timeElement = bubbleContainer.children[timeElementIdx];

        if (position === 'right') {
          expect(timeElement).toHaveClass('u-textRight');
        } else {
          expect(timeElement).not.toHaveClass('u-textRight');
        }
      });
    });

    describe('avatar prop', () => {
      it.each([
        [BubbleChatTypeEnum.inbound, 'right'],
        [BubbleChatTypeEnum.outbound, 'left'],
        [BubbleChatTypeEnum.system, 'left'],
      ])('should render avatar and type="%s"', (type, position) => {
        const avatar = () => (
          <div className="Avatar">Avatar</div>
        );

        const { container } = setup({ type, avatar });

        expect(ref.current).toBeTruthy();
        expect(ref.current?.className).toContain('BubbleChat');
        expect(container.querySelector('.Avatar')).toBeInTheDocument();

        const bubbleContainer = getBubbleContainer();
        const avatarElementIdx = position === 'left' ? 0 : 1;
        expect(bubbleContainer.children[avatarElementIdx])
          .toHaveAttribute('data-testid', 'bubble-chat-avatar');
      });

      it.each([
        [BubbleChatTypeEnum.inbound, 'right'],
        [BubbleChatTypeEnum.outbound, 'left'],
        [BubbleChatTypeEnum.system, 'left'],
      ])('should render empty avatar and type="%s"', (type, position) => {
        setup({ type });

        expect(ref.current).toBeTruthy();
        expect(ref.current?.className).toContain('BubbleChat');

        const bubbleContainer = getBubbleContainer();
        const avatarElementIdx = position === 'left' ? 0 : 1;
        expect(bubbleContainer.children[avatarElementIdx])
          .toHaveAttribute('data-testid', 'bubble-chat-avatar__empty');
      });
    });
  });
});
