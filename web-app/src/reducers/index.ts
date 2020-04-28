import { combineReducers } from 'redux';

import { error } from './errorReducer';
import { language } from './languageReducer';
import { page } from './pageReducer';

export * from './errorReducer';
export * from './languageReducer';
export * from './pageReducer';

export const rootReducer = combineReducers({
  error,
  language,
  page,
});
export type RootState = ReturnType<typeof rootReducer>;
