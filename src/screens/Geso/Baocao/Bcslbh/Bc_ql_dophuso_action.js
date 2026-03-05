import {post} from '../../../../utils/netwworking';

export function BaoCao_SanLuongBanHang(payload) {
  return () => {
    return post('BaoCao_SanLuongBanHang', payload)
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
export function LayDanhSachKh(payload) {
  return () => {
    return post('getKhachHangList', payload)
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
