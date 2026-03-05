/**
 * @author: Lai.do
 * @date: 2018-11-29 16:34:07 
 *  
 * 
 */
const Types = {
  // worker
  SET_USER_DATA: 'account@SET_USER_DATA',
};

const Actions = {
  //worker
  setUserData: (data) => ({ 
    type: Types.SET_USER_DATA, 
    payload: data,
  }),
};

export { Types, Actions };
