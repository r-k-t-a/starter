import { combineReducers } from 'redux';

import { language } from './language';
import { page } from './page';

export * from './language';
export * from './page';

export const rootReducer = combineReducers({
  language,
  page,
});
export type RootState = ReturnType<typeof rootReducer>;
