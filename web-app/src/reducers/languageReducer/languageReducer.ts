import { SET_LANGUAGE, LanguageState, LanguageSetAction } from './languageReducer.type';
import { PAGE_LOAD, PageLoadAction } from '../pageReducer/pageReducer.type';

const initialSate: LanguageState = {
  availableLanguages: [],
  currentLanguage: 'en',
};

export function language(
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
