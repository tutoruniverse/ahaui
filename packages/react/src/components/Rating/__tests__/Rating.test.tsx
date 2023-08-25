import React, { createRef } from 'react';
import { RenderResult, act, fireEvent, render, screen } from '@testing-library/react';
import { IconNameEnum } from 'components/Icon';
import { SetupWithUserEvent, setupWithUserEvent } from 'utils/test';
import Rating, { RatingProps, clamp } from '..';

describe('components/Rating', () => {
  const ref = createRef();

  const onChange = jest.fn();
  const getLabelText = jest.fn((a) => a);
  const onMouseLeave = jest.fn();
  const onMouseMove = jest.fn();
  const onChangeActive = jest.fn();

  let wrapper: SetupWithUserEvent<RenderResult>;

  const setup = (args?: RatingProps) => {
    wrapper = setupWithUserEvent(render(<Rating ref={ref} {...args} />));
    return wrapper;
  };

  const update = (args?: RatingProps) => {
    wrapper?.rerender(<Rating ref={ref} {...args} />);
  };

  const getSelectedRatingItems = () => document.querySelectorAll('.u-textWarning');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      const { container } = setup();

      expect(ref.current).toBeTruthy();
      expect(container.querySelector('.Rating')).toBeInTheDocument();
      expect(container.querySelectorAll('.Rating-item')).toHaveLength(5);
      expect(getSelectedRatingItems()).toHaveLength(0); // No rating selected
    });
  });

  describe('Render with passing props', () => {
    it('should render rating with more items', () => {
      const { container } = setup({
        value: 2,
        max: 7,
        precision: 1,
        onChangeActive,
        className: 'className',
      });

      expect(ref.current).toBeTruthy();
      expect(container.querySelector('.Rating')).toBeInTheDocument();
      expect(container.querySelector('.className')).toBeInTheDocument();
      expect(container.querySelectorAll('.Rating-item')).toHaveLength(7);
      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected
    });

    it('should update rating on focus correctly', () => {
      // Keyboard navigation: tab/arrow left/arrow right
      // Order: focus -> blur
      setup({
        name: 'Rating name',
        value: 2,
        onChange,
        getLabelText,
        onChangeActive,
      });

      expect(getLabelText).toHaveBeenCalled();
      const ratingItems = screen.getAllByRole('radio');
      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected

      // Layout will not work in JSDOM, hence, focusing item will always be 1
      // We just test that case
      act(() => {
        fireEvent.focus(ratingItems[0]); // Focus
      });
      expect(onChangeActive).toHaveBeenCalledTimes(1);
      expect(getSelectedRatingItems()).toHaveLength(1); // 1 rating selected

      // Rolled back
      act(() => {
        fireEvent.blur(ratingItems[0]); // Blur
      });
      expect(onChangeActive).toHaveBeenCalledTimes(2);
      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected

      expect(onChange).not.toBeCalled();
    });

    it('should update rating on hover correctly', async () => {
      // Mouse interaction: hovering on items
      // Order: mouse move -> mouse leave
      const { user } = setup({
        name: 'Rating name',
        value: 2,
        onChange,
        getLabelText,
        onMouseLeave,
        onMouseMove,
        onChangeActive,
      });

      expect(getLabelText).toHaveBeenCalled();
      const ratingItems = screen.getAllByRole('radio');
      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected

      await user.hover(ratingItems[0]); // Move
      expect(onMouseMove).toHaveBeenCalledTimes(1);
      expect(onChangeActive).toHaveBeenCalledTimes(1);
      expect(getSelectedRatingItems()).toHaveLength(1); // 1 rating selected

      await user.unhover(ratingItems[0]); // Move + Mouse leave
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
      expect(onChangeActive).toHaveBeenCalledTimes(2);
      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected

      expect(onChange).not.toBeCalled();
    });

    it('should update rating on click correctly', async () => {
      // Click on an items
      // Order: mouse move -> focus -> mouse leave
      const { user } = setup({
        name: 'Rating name',
        value: 2,
        onChange,
        getLabelText,
        onChangeActive,
      });

      expect(getLabelText).toHaveBeenCalled();
      const ratingItems = screen.getAllByRole('radio');
      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected

      await user.hover(ratingItems[0]); // Move
      await user.click(ratingItems[0]); // Focus
      await user.unhover(ratingItems[0]); // Move + Mouse leave

      // Rating changed
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toBe(1); // 1 rating selected

      update({
        name: 'Rating name',
        value: 1,
        onChange,
        getLabelText,
        onChangeActive,
      });

      expect(getSelectedRatingItems()).toHaveLength(1); // 1 rating selected
    });

    it('should update rating from keyboard navigation correctly', async () => {
      const { user } = setup({
        name: 'Rating name',
        getLabelText,
      });

      expect(getLabelText).toHaveBeenCalled();
      const ratingItems = screen.getAllByRole('radio');
      expect(getSelectedRatingItems()).toHaveLength(0); // 2 rating selected

      await user.click(document.body);
      await user.tab(); // Focus to the first rating

      expect(ratingItems[0]).toHaveFocus();
      expect(getSelectedRatingItems()).toHaveLength(1); // 1 rating selected

      await user.hover(ratingItems[1]); // simulate pressing arrow right to the second rating item

      await user.type(ratingItems[1], ' '); // trigger onChange input + make rating item focusable
      await user.tab(); // Un-focus

      expect(ratingItems[1]).not.toHaveFocus();
      expect(getSelectedRatingItems()).toHaveLength(2); // 1 rating selected
    });


    it('should handle on focus and hover correctly without onChange and onChangeActive', async () => {
      // In case of mouse interaction
      const { user } = setup({
        name: 'Rating name',
        value: 2,
        getLabelText,
      });

      expect(getLabelText).toHaveBeenCalled();
      const ratingItems = screen.getAllByRole('radio');
      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected

      act(() => {
        fireEvent.focus(ratingItems[0]);
        fireEvent.blur(ratingItems[0]);
      });

      update({
        name: 'Rating name',
        value: 2,
        getLabelText,
      });

      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected

      await user.hover(ratingItems[0]);
      await user.unhover(ratingItems[0]);

      update({
        name: 'Rating name',
        value: 2,
        getLabelText,
      });

      expect(getSelectedRatingItems()).toHaveLength(2); // 2 rating selected
    });

    it.each([
      'readOnly',
      'disabled',
    ])('should render %s rating', (item) => {
      setup({
        value: 3,
        [item]: true,
      });

      expect(ref.current).toHaveClass(`is-${item}`);
    });

    it('should render rating with precision < 1', () => {
      const { container } = setup({
        precision: 0.5,
      });

      expect(container.querySelectorAll('.Rating-item')).toHaveLength(10);
    });

    it('should render with Empty icon', () => {
      setup({
        name: 'Rating name',
        emptyIcon: IconNameEnum.apps,
        getLabelText,
      });

      expect(getLabelText).toHaveBeenCalled();
      expect(document.querySelector('.apps-icon')).toBeInTheDocument();
    });
  });

  describe('Util functions', () => {
    it('should return in range of value', () => {
      const min = 1;
      const max = 5;

      expect(clamp(0, min, max)).toEqual(1);
      expect(clamp(10, min, max)).toEqual(5);
      expect(clamp(3, min, max)).toEqual(3);
    });
  });
});
