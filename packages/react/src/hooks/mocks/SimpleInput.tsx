import React from 'react';
import useIsFocusVisible from 'hooks/useIsFocusVisible';
import useForkRef from 'hooks/useForkRef';

const SimpleInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  const {
    isFocusVisible,
    handleBlurVisible,
    handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleRef = useForkRef(focusVisibleRef, ref!);

  const [isLocalFocusVisible, setIsLocalFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlurVisible();
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    handleFocusVisible(event);
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(true);
    }
  };

  return (
    <input
      ref={handleRef}
      className={isLocalFocusVisible ? 'focus-visible' : ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
});

export default SimpleInput;
