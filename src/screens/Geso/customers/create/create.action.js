import { post } from "../../../../utils/netwworking";

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
        console.log('getListXaPhuong', data, error);
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