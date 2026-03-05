/**
 * @author: Lai.do
 * @date: 2018-11-29 16:37:34 
 *  
 * 
 */
import { Logg, } from '.';

const logger = Logg.create('Helper logger');
const createReducer = (initialState: Object, handlers: Object) => (
  state: Object = initialState,
  action: Object
) => {
  if (handlers.hasOwnProperty(action.type)) {
    logger.info(`handling action with \n\ttype = ${action.type} \n\tpayload = ${action.payload}`);
    return handlers[action.type]({ state, action, });
  } else return state;
};

export {
  createReducer
};