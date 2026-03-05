/**
 * @author: Lai.do
 * @date: 2018-12-10 19:26:20 
 *  
 * 
 */
import {
  takeLatest,
} from 'redux-saga/effects';

import { types, } from '../../stores';
import fetchData from './fetchData';

function * watchTestFunct(){
  yield takeLatest(types.home.FETCH_DATA, fetchData);
}


export default [watchTestFunct(),  ];