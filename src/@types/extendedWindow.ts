import { LoguxReduxStore } from '@logux/redux';

declare global {
  interface Window {
    enhacedStore?: LoguxReduxStore;
  }
}
