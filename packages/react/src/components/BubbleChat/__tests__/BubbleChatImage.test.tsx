import React, { createRef, useMemo } from 'react';
import { render, screen } from '@testing-library/react';
import BubbleChatImage from '../Image';
import Context from '../Context';
import { BubbleChatTypeEnum, BubbleChatType } from '..';

describe('components/BubbleChatImage', () => {
  const ref = createRef<HTMLDivElement>();

  const Wrapper = ({ children, type }: { children: React.ReactNode, type: BubbleChatType }) => {
    const contextValue = useMemo(() => ({ type }), [type]);

    return (
      <Context.Provider value={contextValue}>
        {children}
      </Context.Provider>
    );
  };

  const setup = (props?: Partial<React.ComponentPropsWithRef<'img'>> & { type?: BubbleChatType }) => {
    const { type = BubbleChatTypeEnum.inbound, ...rest } = props || {};

    return render(
      <Wrapper type={type}>
        <BubbleChatImage ref={ref} {...rest} />
      </Wrapper>,
    );
  };

  describe('Render without passing props', () => {
    it('should render with default params', () => {
      setup();

      expect(ref.current).toBeTruthy();
      expect(ref.current?.className).toContain('BubbleChat-image');
      expect(ref.current?.className).toContain('u-textRight');
    });
  });

  describe('Render with passing props', () => {
    it('should render with src', async () => {
      const src = 'https://www.example.com';

      setup({ src });
      expect(ref.current).toBeTruthy();
      const bubbleImg = await screen.findByRole('img');
      expect(bubbleImg.getAttribute('src')).toBe(src);
    });

    it('should render with custom style', async () => {
      const className = 'custom className';

      setup({ className });
      expect(ref.current).toBeTruthy();
      expect(ref.current?.className).toContain(className);
    });
  });
});
