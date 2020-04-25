import { combineReducers } from 'redux';

import { language } from './languageReducer';
import { page } from './pageReducer';

export * from './languageReducer';
export * from './pageReducer';

export const rootReducer = combineReducers({
  language,
  page,
});
export type RootState = ReturnType<typeof rootReducer>;
