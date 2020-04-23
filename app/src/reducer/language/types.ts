export const SET_LANGUAGE = 'SET_LANGUAGE';

export interface Language {
  name: string;
  token: string;
}

export interface LanguageState {
  availableLanguages: Language[];
  currentLanguage: string;
}

export interface LanguageSetAction {
  token: string;
  type: typeof SET_LANGUAGE;
}
