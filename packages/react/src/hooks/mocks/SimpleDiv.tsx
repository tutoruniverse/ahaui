import React from 'react';
import useForkRef from 'hooks/useForkRef';
import useIsFocusVisible from 'hooks/useIsFocusVisible';

const SimpleDiv = React.forwardRef<HTMLDivElement>((props, ref) => {
  const {
    isFocusVisible,
    handleBlurVisible,
    handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleRef = useForkRef(focusVisibleRef, ref!);

  const [isLocalFocusVisible, setIsLocalFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    handleBlurVisible();
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    handleFocusVisible(event);
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(true);
    }
  };

  return (
    <div
      ref={handleRef}
      className={isLocalFocusVisible ? 'focus-visible' : ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      Hello
    </div>
  );
});

export default SimpleDiv;
