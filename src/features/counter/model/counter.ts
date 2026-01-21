import { createStore, createEvent } from 'effector';

export const increment = createEvent();
export const decrement = createEvent();

export const $counter = createStore(0)
  .on(increment, (state) => state + 1)
  .on(decrement, (state) => state - 1);
