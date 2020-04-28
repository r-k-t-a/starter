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
