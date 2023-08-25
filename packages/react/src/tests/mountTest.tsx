import React from 'react';
import { render } from '@testing-library/react';

export default function mountTest(Component: React.ComponentType, props: any) {
  describe('mount and unmount', () => {
    // https://github.com/ant-design/ant-design/pull/18441
    it('component could be updated and unmounted without errors', () => {
      const { unmount, rerender } = render(<Component {...props} />);

      expect(() => {
        rerender(<Component />);
        unmount();
      }).not.toThrow();
    });
  });
}
