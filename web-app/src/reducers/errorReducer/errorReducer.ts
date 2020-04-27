import {
  PUSH_ERROR,
  SHIFT_ERROR,
  ErrorState,
  ErrorPushAction,
  ErrorShiftAction,
} from './errorReducer.type';

const initialSate: ErrorState = [];

export function error(
  state: ErrorState = initialSate,
  { type, payload }: ErrorPushAction | ErrorShiftAction,
): ErrorState {
  switch (type) {
    case PUSH_ERROR:
      return [...state, payload];
    case SHIFT_ERROR: {
      const [, ...nextState] = state;
      return nextState;
    }
    default:
      return state;
  }
}
