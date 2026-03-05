import {post} from '../../../utils/netwworking';

export function getdataLoTrinh(payload) {
  return () => {
    return post('LoTrinhBanHang', payload)
      .then(({data, error}) => {
        if (!error) {
          return data;
        } else {
          return '[]';
        }
      })
      .catch(e => {
        return false;
      });
  };
}
export function NhanVien_LayThongTinDonHang_SanPham(payload) {
  return () => {
    return post('NhanVien_LayThongTinDonHang_SanPham', payload)
      .then(({data, error}) => {
        if (!error) {
          return data;
        } else {
          return false;
        }
      })
      .catch(e => {
        return false;
      });
  };
}
