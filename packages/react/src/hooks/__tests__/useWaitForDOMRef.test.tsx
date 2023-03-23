import React, { useEffect, useRef } from 'react';
import { render } from '@testing-library/react';
import useWaitForDOMRef from 'hooks/useWaitForDOMRef';
import type { DOMContainer } from 'hooks/useWaitForDOMRef';

jest.mock('utils/setRef', () => jest.fn());
jest.mock('dom-helpers/ownerDocument', () => jest.fn(() => ({
  body: 'documentBody',
})));

describe('hooks/useWaitForDOMRef', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle useWaitForDOMRef correctly', () => {
    const handleResolvedRef = jest.fn();
    const div = document.createElement('div');

    const getResultTesting = <T, >(expectedOutput: T) => (output: T) => expect(output).toEqual(expectedOutput);
    const TestingComponent = ({
      domElement,
      onResolvedRef,
      handleResultTesting,
      refIsFunction = false,
      refIsANode = false,
      refIsNull = false,
    }: {
      domElement: HTMLElement | null;
      onResolvedRef: jest.Mock;
      refIsFunction?: boolean;
      refIsANode?: boolean;
      refIsNull?: boolean;
      handleResultTesting: (output: any) => void;
    }) => {
      const domRef = useRef(domElement);

      let inputRef: DOMContainer = domRef;
      if (domElement === null && refIsNull) {
        inputRef = null;
      } else if (refIsFunction) {
        inputRef = () => domRef;
      } else if (refIsANode) {
        inputRef = domElement;
      }

      const resolvedDOM = useWaitForDOMRef(inputRef, onResolvedRef);

      useEffect(() => {
        handleResultTesting(resolvedDOM);
        // Should not make handleResultTesting a dependency,
        // since we only want testing function to run after resolvedDOM has changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [resolvedDOM]);

      return <div>Testing</div>;
    };

    const { rerender } = render(
      <TestingComponent
        domElement={null}
        refIsNull
        onResolvedRef={handleResolvedRef}
        // When there is no ref, it should return document.body
        handleResultTesting={getResultTesting('documentBody')}
      />,
    );

    rerender(
      <TestingComponent
        domElement={null}
        onResolvedRef={handleResolvedRef}
        // When ref is not a valid DOM node, it should return null
        handleResultTesting={getResultTesting(null)}
      />,
    );

    rerender(
      <TestingComponent
        domElement={div}
        onResolvedRef={handleResolvedRef}
        // When ref value is a DOM node, it should resolve the node value
        handleResultTesting={getResultTesting(div)}
      />,
    );

    rerender(
      <TestingComponent
        domElement={div}
        refIsFunction
        onResolvedRef={handleResolvedRef}
        // When ref is a function, it should resolve function and return the function returned value's current field
        handleResultTesting={getResultTesting(div)}
      />,
    );

    rerender(
      <TestingComponent
        domElement={div}
        refIsANode
        onResolvedRef={handleResolvedRef}
        // When ref is a DOM node, it should return that exact node
        handleResultTesting={getResultTesting(div)}
      />,
    );

    expect(handleResolvedRef).toHaveBeenCalledWith(div);
  });
});
