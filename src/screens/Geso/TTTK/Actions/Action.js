
import { post, } from './../../../../utils/netwworking';

export function LuuThongTintaiKhoan(params) {
  return (dispatch) => {
    return post('LuuThongTintaiKhoan', params)
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
export function LuuThongTintaiKhoan_Shop(params) {
  return (dispatch) => {
    return post('LuuThongTintaiKhoan_Shop', params)
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