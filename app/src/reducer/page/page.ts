import { PAGE_LOAD, PageState, PageActionTypes } from './types';

export function page(state: PageState = {}, action: PageActionTypes): PageState {
  switch (action.type) {
    case PAGE_LOAD: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { availableLanguages, ...payload } = action.payload;
      return { ...state, [action.url]: payload };
    }
    default:
      return state;
  }
}
