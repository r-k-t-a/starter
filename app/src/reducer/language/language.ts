import { SET_LANGUAGE, LanguageState, LanguageSetAction } from './types';
import { PAGE_LOAD, PageActionTypes } from '../page/types';

const initialSate: LanguageState = {
  availableLanguages: [],
  currentLanguage: 'en',
};

export function language(
  state: LanguageState = initialSate,
  action: PageActionTypes | LanguageSetAction,
): LanguageState {
  switch (action.type) {
    case PAGE_LOAD:
      const { availableLanguages } = action.payload;
      if (availableLanguages) return { ...state, availableLanguages };
      return state;
    case SET_LANGUAGE:
      return { ...state, currentLanguage: action.token };
    default:
      return state;
  }
}
