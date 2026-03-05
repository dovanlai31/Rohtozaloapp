import { post, } from '../../../utils/netwworking';
import { Logg, } from '../../../utils';


export function GetKeHoachNV(payload) {
  return () => {
    return post('GetKeHoachNV', payload)
      .then(({ data, error, }) => {
        if (!error) {
          Logg.info('GetKeHoachNV result', data);
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


export function updateKeHoachNhanVienChot(payload) {
    return () => {
      return post('updateKeHoachNhanVienChot', payload)
        .then(({ data, error, }) => {
          if (!error) {
            Logg.info('updateKeHoachNhanVienChot result', data);
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