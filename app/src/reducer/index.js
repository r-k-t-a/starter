var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { combineReducers } from 'redux';
import { createLoguxCreator } from '@logux/redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { version } from '../../package.json';
import { page } from './page';
export * from './page';
export var rootReducer = combineReducers({
    page: page
});
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export var createStore = function (config, preloadedState) {
    return createLoguxCreator(__assign({ server: process.env.CLIENT__LOGUX_URL, subprotocol: version }, config))(rootReducer, preloadedState, composeWithDevTools());
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDeEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTlCLGNBQWMsUUFBUSxDQUFDO0FBRXZCLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxlQUFlLENBQUM7SUFDekMsSUFBSSxNQUFBO0NBQ0wsQ0FBQyxDQUFDO0FBVUgsNEVBQTRFO0FBQzVFLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxVQUFDLE1BQWMsRUFBRSxjQUFrQjtJQUM1RCxPQUFBLGtCQUFrQixZQUNoQixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBMkIsRUFDL0MsV0FBVyxFQUFFLE9BQU8sSUFDakIsTUFBTSxFQUNULENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO0FBSnRELENBSXNELENBQUMifQ==