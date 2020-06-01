import { LoguxReduxStore } from '@logux/redux';

export const prerender = async (
  loguxReduxStore: LoguxReduxStore,
  tree: JSX.Element,
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderFunc: Function,
): Promise<void> => {
  renderFunc(tree);
  // const subscriptions = await loguxReduxStore.client.resolveSubscriptions();
};
