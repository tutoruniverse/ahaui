import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useForkRef from 'hooks/useForkRef';
import setRef from 'utils/setRef';

jest.mock('utils/setRef', () => jest.fn());

describe('hooks/useForkRef', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestingComponent = ({
    refAValue,
    refBValue,
  }: {
    refAValue?: any;
    refBValue?: any;
  }) => {
    // render useForkRef hook
    const refA = useRef(refAValue);
    const refB = useRef(refBValue);
    const handleSetRef = useForkRef(
      refAValue ? refA : undefined,
      refBValue ? refB : undefined,
    );

    if (handleSetRef) {
      // trigger set ref function
      handleSetRef('value');
    }

    return <div>testing component</div>;
  };

  it('should set ref correctly', () => {
    render(<TestingComponent refAValue="testingRefA" refBValue="testingRefB" />);

    // expect output
    expect(setRef).toHaveBeenCalledTimes(2);
    expect(setRef).toHaveBeenCalledWith({ current: 'testingRefA' }, 'value');
    expect(setRef).toHaveBeenCalledWith({ current: 'testingRefB' }, 'value');
  });

  it('should not return handleSetRef function when there is no ref', () => {
    // render useForkRef hook
    const { result: {
      current: handleSetRef,
    } } = renderHook(() => useForkRef());

    // expect output
    expect(handleSetRef).toEqual(null);
  });
});
