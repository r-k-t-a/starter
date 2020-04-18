import { LoguxSubscribeAction } from '@logux/server';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState, PagePayload } from 'reducer';
import { useSubscription } from './useSubscription';

export interface PageSubscribeAction extends LoguxSubscribeAction {
  url: string;
}

export function usePage(): [PagePayload | undefined, boolean] {
  const { pathname, search } = useLocation();
  const url = `${pathname}${search}`;
  const isLoading = useSubscription([{ channel: 'page', url }]);
  const data = useSelector(({ page }: RootState) => page[url]);
  return [data, isLoading];
}
