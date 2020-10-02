// eslint-disable-next-line import/no-cycle
import { Language } from './languageReducer';

// #region TYPES
export const PAGE_LOAD = 'page/load';

export interface MenuItem {
  name: string;
  path: string;
}

export interface HomepagePayload {
  availableLanguages: Language[];
  cta: string;
  heading: string;
  menu: MenuItem[];
}

export interface NotFoundPagePayload {
  heading: string;
  hero: string;
  menu: MenuItem[];
}

export type PagePayload = HomepagePayload | NotFoundPagePayload;

export interface PageLoadAction {
  payload: PagePayload;
  type: typeof PAGE_LOAD;
  url: string;
}

export type PageData = Omit<HomepagePayload, 'availableLanguages'>;

export interface PageState {
  [key: string]: PageData;
}
// #endregion

export default function page(state: PageState = {}, action: PageLoadAction): PageState {
  switch (action.type) {
    case PAGE_LOAD: {
      // eslint-disable-next-line @typescript-eslint/ban-types
      return { ...state, [action.url]: action.payload } as {};
    }
    default:
      return state;
  }
}
