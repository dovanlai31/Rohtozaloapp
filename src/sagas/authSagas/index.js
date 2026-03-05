/**
 * @author: Lai.do
 * @date: 2018-12-12 22:46:51 
 *  
 * 
 */
import {
  takeLatest,
} from 'redux-saga/effects';

import { types, } from '../../stores';
import registerSaga from './registerSaga';
import loginSaga from './loginSaga';

function * watchRegister(){
  yield takeLatest(types.auth.REGISTER, registerSaga);
}
function * watchLogin(){
  yield takeLatest(types.auth.LOGIN, loginSaga );
}
export default [watchRegister(), watchLogin(),];