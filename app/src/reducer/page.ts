export const PAGE_LOAD = 'page/load';

type HomePage = { h1: string };

export type PagePayload = HomePage;

export interface PageLoadAction {
  payload: HomePage;
  type: typeof PAGE_LOAD;
  url: string;
}

export interface PageState {
  [key: string]: PagePayload;
}

export type PageActionTypes = PageLoadAction;

export function page(state: PageState = {}, { payload, type, url }: PageActionTypes): PageState {
  switch (type) {
    case PAGE_LOAD:
      return { ...state, [url]: payload };
    default:
      return state;
  }
}
