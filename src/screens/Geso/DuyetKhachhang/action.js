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
export function DuyetKhQL(payload) {
  return () => {
    return post('DuyetKhQL', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('DuyetKhQL result', data);
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