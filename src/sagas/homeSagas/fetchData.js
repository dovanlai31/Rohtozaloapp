/**
 * @author: Lai.do
 * @date: 2018-12-10 19:27:29 
 *  
 * 
 */
// call put select 
import {call, put, select,} from 'redux-saga/effects';
import { selectors, actions, } from '../../stores';
import { delay, } from 'redux-saga';
import { Logg, } from '../../utils';

const logg = Logg.create('home saga');

export default function * fetchData(action){
  logg.info(action);
  const {
    payload,
  } = action;

  const testData = yield select(selectors.home.getTestData);

  logg.info('befo delay');
  
  const data = yield call(delay, 2000);

  logg.info('after delay');
  yield put(actions.home.updateData(payload));
}