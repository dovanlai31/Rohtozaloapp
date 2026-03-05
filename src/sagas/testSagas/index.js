/**
 * @author: Lai.do
 * @date: 2018-11-29 16:47:27 
 *  
 * 
 */
import {
  takeLatest,
} from 'redux-saga/effects';

import { types, } from '../../stores';
import testFunction from './testFunction';

function * watchTestFunction(){
  yield takeLatest(types.test.TEST, testFunction);
}
export default [watchTestFunction(), ];