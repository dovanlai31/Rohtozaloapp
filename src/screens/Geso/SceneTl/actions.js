import { post, } from '../../../utils/netwworking';
import { Logg, } from '../../../utils';


export function getListKHChot(payload) {
  return () => {
    return post('getListKHChot', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('getListKHChot result', data);
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

export function KhachHang_ChupAnh_TB(payload) {
  return () => {
    return post('KhachHang_ChupAnh_TB', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('KhachHang_ChupAnh_TB result', data);
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

export function ThemChuongTrinhTB(payload) {
  return () => {
    return post('ThemChuongTrinhTB', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('ThemChuongTrinhTB result', data);
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

export function getCTTBList(payload) {
  return () => {
    return post('getCTTBList', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('getCTTBList result', data);
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


export function DangkyTL(payload) {
  return () => {
    return post('DangkyTL', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('DangkyTL result', data);
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
export function getListTLChuaDK(payload) {
  return () => {
    return post('getListTLChuaDK', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('getListTLChuaDK result', data);
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