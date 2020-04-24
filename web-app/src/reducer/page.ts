import { PAGE_LOAD, PageState, PageActionTypes } from './types';

export function page(state: PageState = {}, { payload, type, url }: PageActionTypes): PageState {
  switch (type) {
    case PAGE_LOAD:
      return { ...state, [url]: payload };
    default:
      return state;
  }
}
