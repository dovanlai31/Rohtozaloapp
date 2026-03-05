
import { post, } from './../../../../utils/netwworking';
import { Logg, } from '../../../../utils';

export function SanPham_Info(params) {
  return (dispatch) => {
    return post('SanPham_Info', params)
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
  const sanpham = { pk_seq: sp.pk_seq, ten: sp.ten, dongia: sp.dongia, donvi: sp.donvi, HinhAnh: sp.HinhAnh, soluong: sp.soluong,ma:sp.ma,hienhuu:sp.hienhuu,qcThung:sp.qcThung };

  return (dispatch) => {
    dispatch({
      type: 'themspgiohang',
      sanpham: sanpham,

    });
    dispatch({ type: 'tinhtien', });
  };

	
}
