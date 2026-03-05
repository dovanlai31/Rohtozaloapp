/**
 * @author: Lai.do
 * @date: 2018-11-29 16:34:14 
 *  
 * 
 */
import { Types, } from './actions';
import { Helper, } from '../../utils';

const initialState = {
  token: null,
  loginInput: null,
  registerInput: null,
  registerLoadingStatus: false,
  loginLoadingStatus: false,
};

const reducer =  Helper.createReducer(initialState, {
  //worker
  [Types.UPDATE_LOGIN_INPUT]: ({ state, action, }) => {
    return {
      ...state,
      loginInput: action.payload? {
        ...state.loginInput || {},
        [action.payload.key]: action.payload.value,
      }: null,
    };
  },
  [Types.UPDATE_REGISTER_INPUT]: ({ state, action, }) => {
    return {
      ...state,
      registerInput: action.payload?{
        ...state.registerInput || {},
        [action.payload.key]: action.payload.value,
      }: null,
    };
  },
  [Types.SET_LOADING_REGISTER_STATUS]: ({state, action,}) =>({
    ...state,
    registerLoadingStatus: action.payload,
  }),
  [Types.SET_LOADING_LOGIN_STATUS]: ({state, action,}) =>({
    ...state,
    loginLoadingStatus: action.payload,
  }),
  [Types.SET_LOGIN_INPUT]: ({state, action,}) => ({
    ...state,
    loginInput: action.payload,
  }),
});

export default reducer;