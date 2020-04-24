import { Language } from '../language/types';

export const PAGE_LOAD = 'page/load';

export interface MenuItem {
  name: string;
  path: string;
}

export type HomePage = {
  availableLanguages: Language[];
  heading: string;
  menu: MenuItem[];
};

export type NotFoundPage = { heading: string; hero: string; menu: MenuItem[] };

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
