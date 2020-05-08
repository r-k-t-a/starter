import {
  PUSH_ERROR,
  SHIFT_ERROR,
  Error,
  ErrorState,
  ErrorPushAction,
  ErrorShiftAction,
} from './errorReducer.type';

const initialSate: ErrorState = [];

function redefine(payload: Error): Error {
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

export function error(
  state: ErrorState = initialSate,
  { type, payload }: ErrorPushAction | ErrorShiftAction,
): ErrorState {
  switch (type) {
    case PUSH_ERROR:
      return [...state, redefine(payload)];
    case SHIFT_ERROR: {
      const [, ...nextState] = state;
      return nextState;
    }
    default:
      return state;
  }
}
