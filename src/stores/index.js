
import { combineReducers, } from 'redux';

import { testReducer, testTypes, testActions, testSelectors, } from './test';
import { homeReducer, homeTypes, homeActions, homeSelectors, } from './home';
import { authReducer, authTypes, authActions, authSelectors, } from './auth';
import { accountReducer, accountTypes, accountActions, accountSelectors, } from './account';
//
import ShopControl from '../screens/Geso/reducers/ShopControl';
import loginReducer from '../screens/Geso/reducers/LoginReducer';
import datachat from '../screens/Geso/TTHoTro/Hotro/LChat/reducers/chat.reducer';
const rootReducer = combineReducers({
  test: testReducer,
  home: homeReducer,
  auth: authReducer,
  account: accountReducer,
  ShopControl,
  login: loginReducer,
  datachat ,
});

const types = {
  test: testTypes,
  home: homeTypes,
  auth: authTypes,
  account: accountTypes,
};

const actions = {
  test: testActions,
  home: homeActions,
  auth: authActions,
  account: accountActions,
};

const selectors = {
  test: testSelectors,
  home: homeSelectors,
  auth: authSelectors,
  account: accountSelectors,
};

export { rootReducer, types, actions, selectors };