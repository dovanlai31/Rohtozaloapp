


import { post, } from '../../../utils/netwworking';


export function ThayDoiMatKhau(payload) {
  return () => {
    return  post('DDKD_ThayDoiMatKhau', payload)
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
