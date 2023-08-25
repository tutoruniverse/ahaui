import React from 'react';
import useIsFocusVisible from 'hooks/useIsFocusVisible';
import useForkRef from 'hooks/useForkRef';

const SimpleTextarea = React.forwardRef<HTMLTextAreaElement>((props, ref) => {
  const {
    isFocusVisible,
    handleBlurVisible,
    handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleRef = useForkRef(focusVisibleRef, ref!);

  const [isLocalFocusVisible, setIsLocalFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    handleBlurVisible();
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    handleFocusVisible(event);
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(true);
    }
  };

  return (
    <textarea
      ref={handleRef}
      className={isLocalFocusVisible ? 'focus-visible' : ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
});

export default SimpleTextarea;
