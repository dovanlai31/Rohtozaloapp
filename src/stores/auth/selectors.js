/**
 * @author: Lai.do
 * @date: 2018-11-29 16:34:17 
 *  
 * 
 */
export const getToken = (state) => state.auth.token;

export const getLoginInput = (state) => state.auth.loginInput;
export const getRegisterInput = (state) => state.auth.registerInput;
export const loginLoadingStatus = (state) => state.auth.loginLoadingStatus;
export const registerLoadingStatus = (state) => state.auth.registerLoadingStatus;