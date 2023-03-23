//fork react-overlays/src/useRootClose.js
import contains from 'dom-helpers/contains';
import listen from 'dom-helpers/listen';
import React, { useCallback, useEffect, useRef } from 'react';

import useEventCallback from '@restart/hooks/useEventCallback';
import warning from 'warning';

const escapeKeyCode = 27;

function isLeftClickEvent(event: MouseEvent) {
  return event.button === 0;
}

function isModifiedEvent(event: KeyboardEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export type MouseEvents = {
  [K in keyof GlobalEventHandlersEventMap]: GlobalEventHandlersEventMap[K] extends MouseEvent
  ? K
  : never;
}[keyof GlobalEventHandlersEventMap];

export interface RootCloseOptions {
  disabled?: boolean;
  clickTrigger?: MouseEvents;
}

/**
 * The `useRootClose` hook registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 *
 * @param {Ref<HTMLElement>|HTMLElement} ref  The element boundary
 * @param {function} onRootClose
 * @param {object}  options
 * @param {boolean} options.disabled
 * @param {string}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
 */
function useRootClose(
  ref: React.MutableRefObject<HTMLElement | null> | HTMLElement | null | undefined,
  onRootClose?: (event: Event) => void,
  {
    disabled,
    clickTrigger = 'click',
  }: RootCloseOptions = {},
) {
  const preventMouseRootCloseRef = useRef(false);
  const onClose = onRootClose;

  const handleMouseCapture = useCallback(
    (e: Event) => {
      const currentTarget = ref && ('current' in ref ? ref.current : ref);
      warning(
        !!currentTarget,
        'RootClose captured a close event but does not have a ref to compare it to. '
        + 'useRootClose(), should be passed a ref that resolves to a DOM node',
      );

      preventMouseRootCloseRef.current = !currentTarget
        || isModifiedEvent(e as KeyboardEvent)
        || !isLeftClickEvent(e as MouseEvent)
        || !!contains(currentTarget, e.target as Element);
    },
    [ref],
  );

  const handleMouse = useEventCallback((e) => {
    if (!preventMouseRootCloseRef.current && onClose) {
      onClose(e);
    }
  });

  const handleKeyUp = useEventCallback((e) => {
    if (e.keyCode === escapeKeyCode && onClose) {
      onClose(e);
    }
  });

  useEffect(() => {
    if (disabled || ref == null) return undefined;

    const root = (window.document.querySelector('#root') || document) as HTMLElement;

    // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.
    const removeMouseCaptureListener = listen(
      root,
      clickTrigger,
      handleMouseCapture,
      true,
    );

    const removeMouseListener = listen(root, clickTrigger, handleMouse);
    const removeKeyupListener = listen(root, 'keyup', handleKeyUp);

    let mobileSafariHackListeners: (() => void)[] = [];
    if ('ontouchstart' in root) {
      mobileSafariHackListeners = [].slice
        .call(root.children)
        .map((el) => listen(el, 'mousemove', () => { }));
    }

    return () => {
      removeMouseCaptureListener();
      removeMouseListener();
      removeKeyupListener();
      mobileSafariHackListeners.forEach((remove) => remove());
    };
  }, [
    ref,
    disabled,
    clickTrigger,
    handleMouseCapture,
    handleMouse,
    handleKeyUp,
  ]);
}

export default useRootClose;
