
import { post, } from './../../../../utils/netwworking';

export function report(payload) {
  return () => {
    return post('NhanVien_LoTrinhViengTham', payload)
      .then(({ data, error, }) => { 
        if (!error) {
          return data[0];
        } else {
          return false; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
