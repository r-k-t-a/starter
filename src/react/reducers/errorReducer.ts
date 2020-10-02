// #region TYPES
export const PUSH_ERROR = 'error/push';
export const SHIFT_ERROR = 'error/shift';

export interface Error {
  name: string;
  message: string;
  type: string;
}

export type ErrorState = Error[];

export interface ErrorPushAction {
  type: typeof PUSH_ERROR;
  payload: Error;
}
export interface ErrorShiftAction {
  type: typeof SHIFT_ERROR;
  payload: never;
}
// #endregion

const initialSate: ErrorState = [];

function normalize(payload: Error): Error {
  switch (payload.type) {
    case 'timeout':
    case 'syncError':
      return {
        ...payload,
        name: 'Timeout Error',
        message: 'Our server has closed the connection. You can not continue.',
      };
    case 'wrong-protocol':
    case 'wrong-subprotocol':
      return {
        ...payload,
        name: 'Protocol Error',
        message: 'Saving is not working. Please reload the page.',
      };
    case 'denied':
    case 'wrong-credentials':
      return {
        ...payload,
        name: 'Access Denied',
        message: 'Our server has rejected your request.',
      };
    case 'bruteforce':
    case 'error':
    case 'wrong-format':
    case 'unknown-message':
      return {
        ...payload,
        name: 'Server error',
        message: 'Sorry, we have not saved your changes.',
      };
    default:
      return payload;
  }
}

function concat(state: ErrorState, action: ErrorPushAction): ErrorState {
  const nextError = normalize(action.payload);
  return state.filter(({ message }) => message !== nextError.message).concat(nextError);
}

export default function error(
  state: ErrorState = initialSate,
  action: ErrorPushAction | ErrorShiftAction,
): ErrorState {
  switch (action.type) {
    case PUSH_ERROR:
      return concat(state, action);
    case SHIFT_ERROR: {
      const [, ...nextState] = state;
      return nextState;
    }
    default:
      return state;
  }
}
