/**
 * @author: Lai.do
 * @date: 2018-11-29 16:34:14 
 *  
 * 
 */
import { Types, } from './actions';
import { Helper, } from '../../utils';

const initialState = {
  userData: null,
};

const reducer =  Helper.createReducer(initialState, {
  [Types.SET_USER_DATA]: ({ state, action, }) => {
    return {
      ...state,
      userData: action.payload?{
        ...state.userData || {},
        ...action.payload,
      }: null,
    };
  },
  
});

export default reducer;