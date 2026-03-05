import { post, } from '../../../utils/netwworking';
import { Logg, } from '../../../utils';


export function getListTraThuong(payload) {
  return () => {
    return post('getListTraThuong', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('getListTraThuong result', data);
          return data;

        } else {
          return false;
        }
      })
      .catch((e) => {

        return false;
      });
  };
}


export function saveDonDoiQa(payload) {
  return () => {
    return post('saveDonDoiQa', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('saveDonDoiQa result', data);
          return data;
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };
}


export function getListTraThuong_SanPham(payload) {
  return () => {
    return post('getListTraThuong_SanPham', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('getListTraThuong_SanPham result', data);
          return data;

        } else {
          return false;
        }
      })
      .catch((e) => {

        return false;
      });
  };
}