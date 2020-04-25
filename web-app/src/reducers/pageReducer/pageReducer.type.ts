import { Language } from '../languageReducer/languageReducer.type';

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
