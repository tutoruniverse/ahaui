import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

export type SetupWithUserEvent<R> = R & {
  user: UserEvent;
}

const userEventConfig = {
  delay: null,
  advanceTimers: (time: number) => jest.advanceTimersByTime(time),
};

export const setupWithUserEvent = <R>(renderResult: R): SetupWithUserEvent<R> => {
  const user = userEvent.setup({
    ...userEventConfig,
  });
  return {
    ...renderResult,
    user,
  };
};
