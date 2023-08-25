import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import Form from '..';

describe('components/Form/Feedback', () => {
  const feedbackRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();

  const setup = (props = {}) => {
    render(
      (
        <Form>
          <Form.Group>
            <Form.Input value="" onChange={() => {}} ref={inputRef} />
            <Form.Feedback {...props} ref={feedbackRef} />
          </Form.Group>
        </Form>
      ),
    );

    expect(feedbackRef.current).toBeTruthy();
    expect(inputRef.current).toBeTruthy();
  };

  describe('Render Feedback without passing props', () => {
    it('should render Feedback without passing props', () => {
      setup();

      expect(feedbackRef.current).not.toHaveClass('is-visible');

      expect(feedbackRef.current).toHaveClass('valid-feedback');
    });
  });

  describe('Render Feedback with passing props', () => {
    it.each(['invalid', 'warning'])('should render Feedback with type = "%s"', (type) => {
      setup({ type });

      expect(feedbackRef.current).toHaveClass(`${type}-feedback`);
    });

    it('should render Feedback with visible = "true"', () => {
      setup({ visible: true });
      expect(feedbackRef.current).toHaveClass('is-visible');
    });

    it('should render with className', () => {
      const className = 'feedbackClassName';
      setup({ className });
      expect(feedbackRef.current).toHaveClass(className);
    });
  });
});
