import { Language } from '../language/language.type';

export const PAGE_LOAD = 'page/load';

export interface MenuItem {
  name: string;
  path: string;
}

export interface HomePage {
  availableLanguages: Language[];
  cta: string;
  heading: string;
  menu: MenuItem[];
}

export interface NotFoundPage {
  heading: string;
  hero: string;
  menu: MenuItem[];
}

export type PagePayload = HomePage | NotFoundPage;

export interface PageLoadAction {
  payload: PagePayload;
  type: typeof PAGE_LOAD;
  url: string;
}

export type PageData = Omit<HomePage, 'availableLanguages'>;

export interface PageState {
  [key: string]: PageData;
}
