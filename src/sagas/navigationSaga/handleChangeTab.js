/**
 * @author: Lai.do
 * @date: 2018-12-11 16:48:18 
 *  
 * 
 */
import {select, call,} from 'redux-saga/effects';
import { delay, } from 'redux-saga';
import {Logg,} from '../../utils';
import { selectors, } from '../../stores';
import { AppNavigation, } from '../../app-navigation';
import { IDs, } from '../../screens';

const logg = Logg.create('handleChangeTab');

export default function * handleChangeTab(dataTab){
  const {selectedTabIndex, unselectedTabIndex, } = dataTab;
  logg.info(dataTab);
  // if(selectedTabIndex === 3){
  //   const account = yield select(selectors.account.getUserData);
  //   if(!account){
  //     AppNavigation.showModal({
  //       name: IDs.Login,
  //       passProps: {
  //         onDismiss: () => {
  //           AppNavigation.changeTab(unselectedTabIndex);
  //         },
  //       },
  //     });
  //   }
  // }
  
}