
import { post, } from './../../../../utils/netwworking';
export function ApKhuyenMaiDonHang(params) {
  return (dispatch) => {
    return post('ApKhuyenMaiDonHang', params)
      .then(({ error, data, }) => {
        console.log('ApKhuyenMaiDonHang data', data);
        if (!error) {
          return data;
        } else {
          return '';
        }
      })
      .catch((e) => {
        return '';
      });
  };
}
export function createDonHang(params,method) {
  return (dispatch) => {
    return post( method, params)
      .then(({ error, data, }) => {
        console.log('createDonHang data', data);
        if (!error) {
          return data ;
        } else {
          return '';
        }
      })
      .catch((e) => {
        return '';
      });
  };
}
export function createDonHangQrcode(params,method) {
  return (dispatch) => {
    return post( method, params)
      .then(({ error, data, }) => {
        console.log('createDonHangQrcode data', data);
        if (!error) {
          return data ;
        } else {
          return '';
        }
      })
      .catch((e) => {
        return '';
      });
  };
}
export function gettichluy(params) {
  return (dispatch) => {
    return post('gettichluy', params)
      .then(({ error, data, }) => {
        console.log('gettichluy data', data);
        if (!error) {
          return data ;
        } else {
          return '';
        }
      })
      .catch((e) => {
        return '';
      });
  };
}

export function gettichluy_Theodon(params) {
  return (dispatch) => {
    return post('gettichluy_Theodon', params)
      .then(({ error, data, }) => {
        console.log('gettichluy_Theodon data', data);
        if (!error) {
          return data ;
        } else {
          return '';
        }
      })
      .catch((e) => {
        return '';
      });
  };
}