/**
 * @author: Lai.do
 * @date: 2018-11-29 16:34:07 
 *  
 * 
 */
const Types = {
  UPDATE_LOGIN_INPUT: 'auth@UPDATE_LOGIN_INPUT',
  SET_LOGIN_INPUT: 'auth@SET_LOGIN_INPUT',
  UPDATE_REGISTER_INPUT: 'auth@UPDATE_REGISTER_INPUT',
  REGISTER: 'auth@REGISTER',
  LOGIN: 'auth@LOGIN',
  SET_LOADING_REGISTER_STATUS: 'auth@SET_LOADING_REGISTER_STATUS',
  SET_LOADING_LOGIN_STATUS: 'auth@SET_LOADING_LOGIN_STATUS',
};

const Actions = {
  updateLoginInput: (data) => {
    return {
      type: Types.UPDATE_LOGIN_INPUT,
      payload: data,
    };
  },
  updateRegisterInput: (data) => {
    return {
      type: Types.UPDATE_REGISTER_INPUT,
      payload: data,
    };
  },
  register: (onSuccess, onLoginSuccess) => {
    return {
      type: Types.REGISTER,
      onSuccess,
      onLoginSuccess,
    };
  },
  login: (onSuccess) => {
    return {
      type: Types.LOGIN,
      onSuccess,
    };
  },
  setLoadingRegisterStatus: (isLoading) => ({
    type: Types.SET_LOADING_REGISTER_STATUS,
    payload: isLoading,
  }),
  setLoadingLoginStatus: (isLoading) => ({
    type: Types.SET_LOADING_LOGIN_STATUS,
    payload: isLoading,
  }),
  setLoginInput: (data)=>({
    type: Types.SET_LOGIN_INPUT,
    payload: data,
  }),
};

export { Types, Actions };