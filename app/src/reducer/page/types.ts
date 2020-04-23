import { Language } from '../language/types';

export const PAGE_LOAD = 'page/load';

export type HomePage = {
  availableLanguages: Language[];
  heading: string;
  menu: { name: string; path: string }[];
};

export interface PageLoadAction {
  payload: HomePage;
  type: typeof PAGE_LOAD;
  url: string;
}

export type PageData = Omit<HomePage, 'availableLanguages'>;

export interface PageState {
  [key: string]: PageData;
}

export type PageActionTypes = PageLoadAction;
