// eslint-disable-next-line import/no-cycle
import { PAGE_LOAD, PageLoadAction } from './pageReducer';

// #region
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
// #endregion

const initialSate: LanguageState = {
  availableLanguages: [],
  currentLanguage: 'en',
};

export default function language(
  state: LanguageState = initialSate,
  action: PageLoadAction | LanguageSetAction,
): LanguageState {
  switch (action.type) {
    case PAGE_LOAD: {
      if ('availableLanguages' in action.payload)
        return { ...state, availableLanguages: action.payload.availableLanguages };
      return state;
    }
    case SET_LANGUAGE:
      return { ...state, currentLanguage: action.token };
    default:
      return state;
  }
}
