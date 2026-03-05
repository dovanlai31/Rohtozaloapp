/**
 * @author: Lai.do
 * @date: 2018-12-13 23:12:45 
 *  
 * 
 */
import {
  put,
  select,
  call,
} from 'redux-saga/effects';

import {Platform,} from 'react-native';

import { selectors, actions, } from '../../stores';
import { SnackBar, FiFetch, Logg, } from '../../utils';
import { AppNavigation, } from '../../app-navigation';
import { delay, } from 'redux-saga';
import { store, } from '../../redux';

const logg = Logg.create('loginSaga');

export default function * loginSaga(action){
  const {
    onSuccess,
  } = action;
  const isLoading = yield select(selectors.auth.loginLoadingStatus);
  if(isLoading) return;
  try{
    const loginInput = yield select(selectors.auth.getLoginInput);
    
    if(!loginInput){
      throw new Error('Please enter all infomation');
    }
    const {
      email,
      pass,
    } = loginInput;
    if(!email){
      throw new Error('Please enter email');
    }
    if(!pass){
      throw new Error('Please enter password');
    }
    yield put(actions.auth.setLoadingLoginStatus(true));
    const loginResult = yield call(FiFetch.CallApi,{
      api: 'user/auth/login-step-1',
      method: FiFetch.Methods.POST,
      body: {
        email,
        password: pass,
        client: Platform.OS,
        captcha: 'None',
      },
    });
    logg.info(loginResult);
    const {status, token,} = loginResult;
    yield put(actions.auth.setLoadingLoginStatus(false));
    
    if(status === 2){
      AppNavigation.showCommonDialog({
        title: 'Confirm new IP.',
        desc: 'You login with new IP. Please check email and confirm this IP then come back and press Confirmed',
        submitText: 'Confirmed',
        cancelText: 'Cancel',
        onSubmit: function (){
          store.dispatch(actions.auth.login(onSuccess));
        },
      });
      return;
    }
    if(status === 1){
      yield put(actions.auth.updateLoginInput(null));
      yield put(actions.account.setUserData({token,}));
      SnackBar.showSuccess('Login success');
      FiFetch.setToken(token);
      if(onSuccess){
        onSuccess();
      }
    }

  }catch({message = 'Unknow Error',}){
    SnackBar.showError(message);
    yield put(actions.auth.setLoadingLoginStatus(false));
  }
}