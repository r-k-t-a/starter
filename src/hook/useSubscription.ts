import { useSubscription as useClientSubscription } from '@logux/redux';
import { useDispatch } from 'react-redux';
import flow from 'lodash/flow';

const isNode = !!(typeof process !== 'undefined' && process.versions && process.versions.node);

type UseSubscription = typeof useClientSubscription;

const parseAction = (channel: string | {}): {} =>
  typeof channel === 'string' ? { channel } : channel;
const addType = (action: {}): {} => ({ ...action, type: 'logux/subscribe' });

const useServerSubscription: UseSubscription = (channels) => {
  const dispatch = flow(parseAction, addType, useDispatch());
  channels.forEach(dispatch);
  return false;
};

export const useSubscription = isNode ? useServerSubscription : useClientSubscription;
