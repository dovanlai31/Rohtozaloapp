/**
 * @author: Lai.do
 * @date: 2018-11-29 16:34:07 
 *  
 * 
 */
const Types = {
  // worker
  FETCH_DATA: 'home@FETCH_DATA',
  UPDATE_DATA: 'home@UPDATE_DATA',
};

const Actions = {
  //worker
  fetchData: (data) => ({ 
    type: Types.FETCH_DATA, 
    payload: data,
  }),
  updateData: (data) => ({
    type: Types.UPDATE_DATA,
    payload: data,
  }),
};

export { Types, Actions };