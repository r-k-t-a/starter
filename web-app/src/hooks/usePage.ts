import { LoguxSubscribeAction } from '@logux/server';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'reducers';
import { useSubscription } from './useSubscription';

export interface PageSubscribeAction extends LoguxSubscribeAction {
  url: string;
}

export function usePage<P>(): [P | undefined, boolean] {
  const { pathname, search } = useLocation();
  const url = `${pathname}${search}`;
  const isLoading = useSubscription([{ channel: 'page', url }]);
  const data = (useSelector(({ page }: RootState) => page[url]) as unknown) as P;
  return [data, isLoading];
}
