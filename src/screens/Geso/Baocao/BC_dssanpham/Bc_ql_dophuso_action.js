import {post} from '../../../../utils/netwworking';

export function DoanhsoBanhang(payload) {
  return () => {
    return post('BaoCaoDoanhSo', payload)
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
