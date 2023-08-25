import React from 'react';
import useForkRef from 'hooks/useForkRef';
import useIsFocusVisible from 'hooks/useIsFocusVisible';

const SimpleButton = React.forwardRef<HTMLButtonElement>((props, ref) => {
  const {
    isFocusVisible,
    handleBlurVisible,
    handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleRef = useForkRef(focusVisibleRef, ref!);

  const [isLocalFocusVisible, setIsLocalFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    handleBlurVisible();
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    handleFocusVisible(event);
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(true);
    }
  };

  return (
    <button
      type="button"
      ref={handleRef}
      className={isLocalFocusVisible ? 'focus-visible' : ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      Hello
    </button>
  );
});

export default SimpleButton;
