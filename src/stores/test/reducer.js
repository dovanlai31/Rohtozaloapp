/**
 * @author: Lai.do
 * @date: 2018-11-29 16:34:14 
 *  
 * 
 */
import { Types, } from './actions';
import { Helper, } from '../../utils';

const initialState = {
  testData: 'lai null',
}

const reducer =  Helper.createReducer(initialState, {
  //worker
  [Types.TEST]: ({ state, }) => {
    return {
      ...state,
    };
  },
});

export default reducer;