import React from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent, AsProp, EnumToUnion } from 'types/common';

enum FeedbackTypeEnum {
  valid = 'valid',
  invalid = 'invalid',
  warning = 'warning'
}

type FeedbackType = EnumToUnion<FeedbackTypeEnum>;

export interface FormFeedbackProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /** Specify whether the feedback is for valid or invalid fields */
  type?: FeedbackType;

  /**
   * Set Form.Feedback visible
   */
  visible?: boolean;
}


export const Feedback: AhaRefForwardingComponent<React.ElementType, FormFeedbackProps> = React.forwardRef(
  (
    {
      className,
      type = FeedbackTypeEnum.valid,
      visible = false,
      as,
      ...props
    }: FormFeedbackProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          'u-marginTopTiny u-widthFull u-text100',
          className && className,
          type && `${type}-feedback`,
          visible && 'is-visible',
        )}
      />
    );
  },
);

export default Object.assign(Feedback, {
  displayName: 'FormFeedback',
});
