import { LoguxReduxStore } from '@logux/redux';

export const prerender = async (
  loguxReduxStore: LoguxReduxStore,
  tree: JSX.Element,
  renderFunc: Function,
): Promise<void> => {
  renderFunc(tree);
  // const subscriptions = await loguxReduxStore.client.resolveSubscriptions();
};
