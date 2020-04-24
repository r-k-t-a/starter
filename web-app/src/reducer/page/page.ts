import { PAGE_LOAD, PageState, PageLoadAction } from './types';

export function page(state: PageState = {}, action: PageLoadAction): PageState {
  switch (action.type) {
    case PAGE_LOAD: {
      return { ...state, [action.url]: action.payload };
    }
    default:
      return state;
  }
}
