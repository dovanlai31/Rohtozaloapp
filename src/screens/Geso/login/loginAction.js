import {post} from '../../../utils/netwworking';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
import {Logg} from '../../../utils';

export function login(params) {
  return dispatch => {
    // dispatch(appActions.showLoading(true));
    return post('Login', params)
      .then(({error, data}) => {
        //dispatch(appActions.showLoading(false));
        console.log('data Login', data);
        if (!error) {
          if (data[0].RESULT === '1') {
            let INFO = JSON.parse(data[0].INFO);
            let ListNpp= JSON.parse(data[0].ListUser);
           let ListDdkd = JSON.parse(data[0].ListDdkd);
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                userName: INFO[0].userName,
                userID: INFO[0].pk_seq,
                dataLogin: INFO[0],
                imei:'',
                ListNpp:ListNpp,
                ListDdkd:ListDdkd
              },
            });
            return data[0];
          }
          
          else {
            dispatch({
              type: LOGIN_FAIL,
              message: data[0].MSG,
            });
            return data[0];
          }
        } else {
          dispatch({
            type: LOGIN_FAIL,
            message: data,
          });
          return data[0];
        }
      })
      .catch(e => {
        // dispatch(appActions.showLoading(false));
        dispatch({
          type: LOGIN_FAIL,
          message: '',
        });
        return false;
      });
  };
}
export function getversion(params) {
  return () => {
    Logg.info('CheckVersion', params);
    return post('CheckVersion', params)
      .then(({data, error}) => {
        Logg.info('CheckVersion data', data);
        if (!error) {
          // alert(data)
          return data;
        } else {
          Logg.info('getPromotion fail');
          return false;
        }
      })
      .catch(e => {
        Logg.info('getPromotion catch', e);
        return false;
      });
  };
}
export function getNewInfo(payload) {
  return dispatch => {

    return post('KhachHang_GetNewInfo', payload)
      .then(({data, error}) => {
       
        if (!error) {
          console.log('KhachHang_GetNewInfo', data, error);
          return data;
        } else {
          console.log(' KhachHang_GetNewInfo fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get KhachHang_GetNewInfo  catch', e);
        return false;
      });
  };
}

export function getTinhthanh(payload) {
  return dispatch => {
    //	dispatch(appActions.showLoading(true));
    return post('gettinhthanh', payload)
      .then(({data, error}) => {
    
        if (!error) {
          console.log('getTinhthanh', data, error);
          return data;
        } else {
          console.log('get gettinhthanh fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get getTinhthanh  catch', e);
        return false;
      });
  };
}
export function getListQuanhuyen(payload) {
  return dispatch => {
    //	dispatch(appActions.showLoading(true));
    return post('getListQuanhuyen', payload)
      .then(({data, error}) => {
        console.log('getListQuanhuyen', data, error);
        if (!error) {
          return data;
        } else {
          console.log('get getListQuanhuyen fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get getTinhthanh  catch', e);
        return false;
      });
  };
}
export function getListXaPhuong(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('getListXaPhuong', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('getListXaPhuong data', data);
        if (!error) {
          return data;					
        } else {
          return '';
        }
      })
      .catch((e) => {
        //	dispatch(appActions.showLoading(false));
        return '';
      });
  };
}

export function getListNCC(payload) {
  return dispatch => {
    //	dispatch(appActions.showLoading(true));
    return post('getListNCC', payload)
      .then(({data, error}) => {
        console.log('getListNCC', data, error);
        if (!error) {
          return data;
        } else {
          console.log('get getListNCC fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get getListNCC  catch', e);
        return false;
      });
  };
}
export function createCustomer(payload) {
  return dispatch => {
    return post('TaoMoiKhachHang', payload)
      .then(({data, error}) => {
        console.log('get TaoMoiKhachHang', data, error);
        if (!error) {
          return data;
        } else {
          return false;
        }
      })
      .catch(e => {
        console.log('get TaoMoiKhachHang catch', e);
        return false;
      });
  };
}
export function createNhanvien(payload) {
  return dispatch => {
    return post('TaoMoiNhanvien', payload)
      .then(({data, error}) => {
        console.log('get TaoMoiNhanvien', data, error);
        if (!error) {
          return data;
        } else {
          return false;
        }
      })
      .catch(e => {
        console.log('get TaoMoiNhanvien catch', e);
        return false;
      });
  };
}

export function checkMail(payload) {
  return dispatch => {
    return post('checkMail', payload)
      .then(({data, error}) => {
        console.log('get checkMail', data, error);
        if (!error) {
          return data;
        } else {
          return false;
        }
      })
      .catch(e => {
        console.log('get checkMail catch', e);
        return false;
      });
  };
}


export function SaveResetPass(payload) {
  return dispatch => {
    return post('SaveResetPass', payload)
      .then(({data, error}) => {
        console.log('get SaveResetPass', data, error);
        if (!error) {
          return data;
        } else {
          return false;
        }
      })
      .catch(e => {
        console.log('get SaveResetPass catch', e);
        return false;
      });
  };
}


export function Check_Login_Muti_Cus(payload) {
  return dispatch => {
    return post('Check_Login_Muti_Cus', payload)
      .then(({data, error}) => {
        console.log('get Check_Login_Muti_Cus', data, error);
        if (!error) {
          return data[0];
        } else {
          return false;
        }
      })
      .catch(e => {
        console.log('get Check_Login_Muti_Cus catch', e);
        return false;
      });
  };
}
