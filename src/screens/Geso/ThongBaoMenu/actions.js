import { post, } from '../../../utils/netwworking';

export function getListNotify(payload) {
  return () => {
    return   post('ThongBao_GetList', payload)
      .then(({ data, error, }) => {
        if (!error) {
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