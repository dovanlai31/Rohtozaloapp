
import { post, } from './../../../utils/netwworking';

export function SanPhamListDH(params) {

  return (dispatch) => {
    return post('SanPhamListDH', params)
      .then(({ error, data, }) => {
        if (!error) {
          return data;					
        } else {
          return '';
        }
      })
      .catch((e) => {
        return '';
      });
  };
}