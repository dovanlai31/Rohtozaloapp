/**
 * @author: Lai.do
 * @date: 2018-11-29 17:07:41 
 *  
 * 
 */
import { Provider, store, rehydrateStore, startSaga, } from './redux';
import * as AppsController from './AppController';

import { Logg, FiFetch, } from './utils';
import { registerScreens, } from './screens';
import screenHOC from './app-navigation/screenHOC';
import { AppNavigation, } from './app-navigation';
import { selectors, } from './stores';

const logger = Logg.create('App');

// IMPORTANT: register screens on native level, must be excuted before other code.
registerScreens(screenHOC, store, Provider);

const startApp = async () => {
  // Load the data from storage to redux store
  await rehydrateStore(store);
  //set authorize for FiFetch
  // const userData = selectors.account.getUserData(store.getState());
  // if(userData && userData.token){
  //   logger.info('user data',userData);
  //   FiFetch.setToken(userData.token);
  // }
  
  AppNavigation.setDefaultOptions();

  startSaga();
  AppsController.startSplashScreen();
  //AppsController.startlogin()
 // AppsController.startHome();


 
};

export default { start: startApp, };