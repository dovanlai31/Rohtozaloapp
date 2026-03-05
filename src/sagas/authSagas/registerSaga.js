/**
 * @author: Lai.do
 * @date: 2018-12-12 22:47:35 
 *  
 * 
 */
import { call, select, put, } from 'redux-saga/effects';

import { selectors, actions, } from '../../stores';
import { Logg, FiFetch, SnackBar, } from '../../utils';
import { AppNavigation, } from '../../app-navigation';
import { store, } from '../../redux';

const logg = Logg.create('registerSaga');

export default function * registerSaga(action){
  const registerInput = yield select(selectors.auth.getRegisterInput);
  const isLoading = yield select(selectors.auth.registerLoadingStatus);
  if(isLoading){
    return;
  }
  try {
    
    if(!registerInput){
      throw new Error('Please enter require infomation');
    }
    const {
      firstName,
      lastName,
      email,
      password,
    } = registerInput;
    if(!firstName) {
      throw new Error('Please enter first name');
    }
    if(!lastName) {
      throw new Error('Please enter last name');
    }
    if(!email) {
      throw new Error('Please enter email');
    }
    if(!password) {
      throw new Error('Please enter password');
    }
    yield put(actions.auth.setLoadingRegisterStatus(true));
    yield call(FiFetch.CallApi,{
      api: 'user/users/register',
      method: FiFetch.Methods.POST,
      body: registerInput,
    });
    AppNavigation.showCommonDialog({
      title: 'Register success',
      desc: 'Please check email to active your account then come back and press Login.',
      submitText: 'Login',
      cancelText: 'OK',
      onSubmit: ()=>{
        store.dispatch(actions.auth.setLoginInput({
          email,
          pass: password,
        }));
        const {onLoginSuccess, } = action;
        
        store.dispatch(actions.auth.login(onLoginSuccess));
      },
    });
    yield put(actions.auth.updateRegisterInput());
    const {onSuccess,} = action;
    if(onSuccess){
      onSuccess();
    }
    
    
  }catch({
    message = 'Unknow Error',
  }){
    SnackBar.showError(message);
  } finally {
    yield put(actions.auth.setLoadingRegisterStatus(false));
  }
}