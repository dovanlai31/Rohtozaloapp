
import { post, } from '../../../../utils/netwworking';
import { Logg, } from '../../../../utils';

export function SanPham_Info_giftUrbox(params) {
  return (dispatch) => {
    return post('SanPham_Info_giftUrbox', params)
      .then(({ error, data, }) => {

        if (!error) {
          return data;
        } else {
          return '';
        }
      })
      .catch((e) => {		  
        Logg.error(e);
        return '';
      });
  };
}

export function cartPayVoucher(params) {
  return (dispatch) => {
    return post('api_doiqua', params)
      .then(({ error, data, }) => {

        if (!error) {
          return data;
        } else {
          return '';
        }
      })
      .catch((e) => {		  
        Logg.error(e);
        return '';
      });
  };
}

export function sendOTPZMS_API(params) {
  return (dispatch) => {
    return post('sendOTPZMS_API', params)
      .then(({ error, data, }) => {

        if (!error) {
          return data;
        } else {
          return '';
        }
      })
      .catch((e) => {		  
        Logg.error(e);
        return '';
      });
  };
}

export function xacnhanOTP(params) {
  return (dispatch) => {
    return post('xacnhanOTP', params)
      .then(({ error, data, }) => {

        if (!error) {
          return data;
        } else {
          return '';
        }
      })
      .catch((e) => {		  
        Logg.error(e);
        return '';
      });
  };
}
export function getDiaChiKH(params) {
  return (dispatch) => {
    return post('getDiaChiKH', params)
      .then(({ error, data, }) => {
        if (!error) {
          return data;
        } else {
          return '';
        }
      })
      .catch((e) => {		  
        Logg.error(e);
        return '';
      });
  };
}
export function themspgiohang(sp) {
  //console.log("xxxxxxxxxxx"+sp)
  const sanpham = { pk_seq: sp.pk_seq, ten: sp.ten, dongia: sp.dongiaThung, donvi: sp.donvi, HinhAnh: sp.HinhAnh, soluong: sp.soluong,ma:sp.ma,hienhuu:sp.hienhuu,qcThung:sp.qcThung };

  return (dispatch) => {
    dispatch({
      type: 'themspgiohang',
      sanpham: sanpham,

    });
    dispatch({ type: 'tinhtien', });
  };

	
}
