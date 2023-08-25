import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Progress, { ProgressVariantEnum, variantsClassName } from '..';


describe('components/Progress', () => {
  const progressRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    const { container } = render(<Progress {...props} ref={progressRef} />);

    // Check if we can pass ref
    expect(progressRef.current).toBeTruthy();
    expect(progressRef.current).toHaveClass('Progress');

    return { container };
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      // Check if component has default props set
      expect(progressRef.current).toBeTruthy();
      expect(progressRef.current).toHaveClass('Progress u-backgroundUltraLight');
      expect(progressRef.current).toHaveStyle({ height: '8px' });

      expect(screen.queryByTestId('progress-bar')).toHaveClass('Progress-bar');
      expect(screen.queryByTestId('progress-bar')).toHaveStyle({ width: '100%' });

      expect(screen.queryByTestId('progress-label')).toBeFalsy();
    });
  });

  describe('Render with passing props', () => {
    it('renders correctly with custom props', () => {
      const className = 'u-textNegative';
      setup({ variant: ProgressVariantEnum.accent, now: 50, height: 12, label: '50%', labelClassName: 'custom-label', animated: true, striped: true, border: true, className });

      const progress = progressRef.current;
      const progressBar = screen.queryByTestId('progress-bar');
      const progressLabel = screen.queryByTestId('progress-label');

      expect(progress).toHaveStyle({ height: '12px' });
      expect(progress).toHaveClass('Progress--striped Progress--animated');
      expect(progress).toHaveClass(`u-border ${variantsClassName.borderColor.accent}`);
      expect(progress).toHaveClass(className);

      expect(progressBar).toHaveClass(variantsClassName.backgroundColor.accent);
      expect(progressBar).toHaveStyle({ width: '50%' });

      expect(progressLabel).toBeTruthy();
      expect(progressLabel).toHaveClass('custom-label');
      expect(progressLabel).toHaveClass(variantsClassName.textColor.accent);
      expect(progressLabel?.innerHTML).toEqual('50%');
    });
  });
});
