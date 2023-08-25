import React from 'react';
import useForkRef from 'hooks/useForkRef';
import useIsFocusVisible from 'hooks/useIsFocusVisible';

const SimpleContentEditable = React.forwardRef<HTMLSpanElement, { children?: React.ReactNode }>((props, ref) => {
  const {
    isFocusVisible,
    handleBlurVisible,
    handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleRef = useForkRef(focusVisibleRef, ref!);

  const [isLocalFocusVisible, setIsLocalFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLSpanElement>) => {
    handleBlurVisible();
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLSpanElement>) => {
    handleFocusVisible(event);
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(true);
    }
  };

  return (
    <span
      contentEditable
      ref={handleRef}
      className={isLocalFocusVisible ? 'focus-visible' : ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      {props.children || 'Hello'}
    </span>
  );
});

export default SimpleContentEditable;
