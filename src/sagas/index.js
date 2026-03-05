/**
 * @author: Lai.do
 * @date: 2018-11-29 16:46:18 
 *  
 * 
 */
import { all, } from 'redux-saga/effects';

import testSagas from './testSagas';
import homeSagas from './homeSagas';
import navigationSaga from './navigationSaga';
import authSagas from './authSagas';

// More sagas go here...

export default function*() {
  yield all([
    ...testSagas,
    ...homeSagas,
    ...navigationSaga,
    ...authSagas,
    // More sagas destructuring here
  ]);
}