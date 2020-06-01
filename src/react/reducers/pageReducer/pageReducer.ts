import { PAGE_LOAD, PageState, PageLoadAction } from './pageReducer.type';

export function page(state: PageState = {}, action: PageLoadAction): PageState {
  switch (action.type) {
    case PAGE_LOAD: {
      // eslint-disable-next-line @typescript-eslint/ban-types
      return { ...state, [action.url]: action.payload } as {};
    }
    default:
      return state;
  }
}
