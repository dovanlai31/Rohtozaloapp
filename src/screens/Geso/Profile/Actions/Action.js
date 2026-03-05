
import { post, } from './../../../../utils/netwworking';
export function getSoLuongDonHang(params) {
  return (dispatch) => {
    return post('getSoLuongDonHang', params)
      .then(({ error, data, }) => {
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
export function ThongTinDonHang(params) {
  return (dispatch) => {
    return post('ThongTinDonHang', params)
      .then(({ error, data, }) => {
        console.log('ThongTinDonHang data', data);
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

export function ChiTietDonHang(params) {
  return (dispatch) => {
    return post('ChiTietDonHang', params)
      .then(({ error, data, }) => {
        console.log('ChiTietDonHang data', data);
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
export function Capnhathinhavata(params) {
  return (dispatch) => {
    return post('Capnhathinhavata', params)
      .then(({ error, data, }) => {
        console.log('Capnhathinhavata data', data);
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

export function getInforKH(params) {
  return (dispatch) => {
    return post('getInforKH', params)
      .then(({ error, data, }) => {
        console.log('getInforKH data', data);
        if (!error) {
          return  data;					
        } else {
          return '';
        }
      })
      .catch((e) => {
        return '';
      });
  };
}

export function xoadonhang(params) {
  return (dispatch) => {
    return post('xoadonhang', params)
      .then(({ error, data, }) => {
        console.log('xoadonhang data', data);
        if (!error) {
          return  data;					
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
export function getdoanhso(params) {
  return (dispatch) => {
    return post('getDoanhSo', params)
      .then(({ error, data, }) => {

        console.log('getDoanhSo data', data);
        if (!error) {
          return  data;					
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
