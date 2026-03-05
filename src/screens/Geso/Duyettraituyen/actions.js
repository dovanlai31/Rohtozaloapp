import { post, } from '../../../utils/netwworking';
import { Logg, } from '../../../utils';


export function getListKHChot(payload) {
  return () => {
    return post('GetThongDanhSachDuyetBanTraiTuyen', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('GetThongDanhSachDuyetBanTraiTuyen result', data);
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
export function DuyetKhQL(payload) {
  return () => {
    return post('DuyetBanTraiTuyenNVBH', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('DuyetBanTraiTuyenNVBH result', data);
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