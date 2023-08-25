import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import useWaitForDOMRef, { resolveRef } from 'hooks/useWaitForDOMRef';
import type { DOMContainer } from 'hooks/useWaitForDOMRef';

jest.mock('utils/setRef', () => jest.fn());
jest.mock('dom-helpers/ownerDocument', () => jest.fn(() => ({
  body: 'documentBody',
})));

const spyDocument = jest.spyOn(global, 'document', 'get');

describe('hooks/useWaitForDOMRef', () => {
  let resolvedRef: HTMLElement | null | undefined;
  const handleResolvedRef = jest.fn();

  beforeEach(() => {
    resolvedRef = undefined;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestingComponent = ({
    domElement,
    onResolvedRef,
    refIsFunction = false,
    refIsNode: refIsANode = false,
    refIsNull = false,
  }: {
      domElement: HTMLElement | null;
      onResolvedRef?: jest.Mock;
      refIsFunction?: boolean;
      refIsNode?: boolean;
      refIsNull?: boolean;
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

    resolvedRef = useWaitForDOMRef(inputRef, onResolvedRef);
    return <div>Testing</div>;
  };

  it('should handle no ref correctly', () => {
    render(
      <TestingComponent
        domElement={null}
        refIsNull
        onResolvedRef={handleResolvedRef}
      />,
    );
    // When there is no ref, it should return document.body
    expect(resolvedRef).toEqual('documentBody');
    expect(handleResolvedRef).toHaveBeenCalledWith('documentBody');
  });

  it('should handle invalid ref correctly', () => {
    render(
      <TestingComponent
        domElement={null}
        onResolvedRef={handleResolvedRef}
      />,
    );
    // When ref is not a valid DOM node, it should return null
    expect(resolvedRef).toEqual(null);
    expect(handleResolvedRef).not.toHaveBeenCalled();
  });

  it('should handle DOM node ref correctly', () => {
    const div = document.createElement('div');
    render(
      <TestingComponent
        domElement={div}
        onResolvedRef={handleResolvedRef}
      />,
    );
    // When ref value is a DOM node, it should resolve the node value
    expect(resolvedRef).toEqual(div);
    expect(handleResolvedRef).toHaveBeenCalledWith(div);
  });

  it('should handle function ref correctly', () => {
    const div = document.createElement('div');
    render(
      <TestingComponent
        domElement={div}
        refIsFunction
        onResolvedRef={handleResolvedRef}
      />,
    );
    // When ref is a function, it should resolve function and return the function returned value's current field
    expect(resolvedRef).toEqual(div);
    expect(handleResolvedRef).toHaveBeenCalledWith(div);
  });

  it('should handle Node ref correctly', () => {
    const div = document.createElement('div');
    render(
      <TestingComponent
        domElement={div}
        refIsNode
        onResolvedRef={handleResolvedRef}
      />,
    );
    // When ref is a DOM node, it should return that exact node
    expect(resolvedRef).toEqual(div);
    expect(handleResolvedRef).toHaveBeenCalledWith(div);
  });

  it('should handle on ref change correctly', () => {
    const div = document.createElement('div');

    const { rerender } = render(
      <TestingComponent
        domElement={null}
        onResolvedRef={handleResolvedRef}
      />,
    );

    expect(resolvedRef).toEqual(null);
    expect(handleResolvedRef).not.toHaveBeenCalled();

    // On early ref: when ref from null to a DOM node
    rerender(
      <TestingComponent
        domElement={null}
        refIsNode
        onResolvedRef={handleResolvedRef}
      />,
    );

    expect(resolvedRef).toEqual('documentBody');
    expect(handleResolvedRef).toHaveBeenCalledWith('documentBody');

    // On different nextRef: when ref from a DOM node to another DOM node
    rerender(
      <TestingComponent
        domElement={div}
        refIsNode
        onResolvedRef={handleResolvedRef}
      />,
    );

    expect(resolvedRef).toEqual(div);
    expect(handleResolvedRef).toHaveBeenCalledWith(div);
  });

  describe('Utils resolveRef', () => {
    afterEach(() => {
      spyDocument.mockRestore();
    });

    it('should handle no document correctly', () => {
      spyDocument.mockImplementation(() => undefined as unknown as Document);
      expect(resolveRef(null)).toBe(undefined);
    });

    it('should handle no ref correctly', () => {
      expect(resolveRef(null)).toBe('documentBody');
    });

    it('should handle invalid ref correctly', () => {
      expect(resolveRef({ current: null })).toBe(null);
    });

    it('should handle DOM node ref correctly', () => {
      const div = document.createElement('div');
      expect(resolveRef(div)).toBe(div);
    });

    it('should handle function ref correctly', () => {
      const div = document.createElement('div');
      expect(resolveRef(() => div)).toBe(div);
    });
  });
});
