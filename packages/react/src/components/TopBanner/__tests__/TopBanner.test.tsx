import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopBanner from '..';

describe('components/TopBanner', () => {
  const topBannerRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    render(
      <TopBanner {...props} ref={topBannerRef} />,
    );
    // Check if we can pass ref
    expect(screen.queryByTestId('TopBanner')).toBeTruthy();
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      expect(screen.queryByTestId('TopBanner-button')).not.toBeTruthy();
    });
  });

  describe('Render with passing props', () => {
    it('should render background', () => {
      const bgImage = 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/topBanner/bg-1.png';
      setup({ bgImage });

      // check visible when having bgImage value
      expect(screen.queryByTestId('TopBanner-background')).toBeTruthy();
      // check set image src in img tag
      expect((screen.queryByTestId('TopBanner-background-image') as HTMLImageElement).src).toEqual(bgImage);
    });

    it('should render exactly with dismissible value', () => {
      setup({ dismissible: true });

      // check visible when bgImage value is true
      expect(screen.queryByTestId('TopBanner-button')).toBeTruthy();
    });

    it('should be called onClose when TopBanner-button was clicked', async() => {
      const onClose = jest.fn();
      setup({ dismissible: true, onClose });
      await userEvent.click(screen.queryByTestId('TopBanner-button') as Element);

      // check visible when bgImage value is true
      expect(onClose).toBeCalledTimes(1);
    });

    it('should render with children', () => {
      const children = <span data-testid="span-test">Add to TopBanner</span>;
      setup({ children });

      // check visible when bgImage value is true
      expect(screen.queryByTestId('span-test')).toBeTruthy();
    });
  });
});
