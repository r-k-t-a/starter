import { LoguxReduxStore } from '@logux/redux';

declare global {
  interface Window {
    loguxReduxStore?: LoguxReduxStore;
  }
}
