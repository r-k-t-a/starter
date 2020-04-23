import { PAGE_LOAD, PageState, PageActionTypes } from './types';

export function page(state: PageState = {}, action: PageActionTypes): PageState {
  switch (action.type) {
    case PAGE_LOAD:
      const { availableLanguages, ...payload } = action.payload;
      return { ...state, [action.url]: payload };
    default:
      return state;
  }
}
