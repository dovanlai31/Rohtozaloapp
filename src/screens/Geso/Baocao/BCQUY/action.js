import {post} from '../../../../utils/netwworking';

export function report(payload) {
  return () => {
    return post('BaoCao_DoanhSoTrongThang', payload)
      .then(({data, error}) => {
        if (!error) {
          return data;
        } else {
          return false;
        }
      })
      .catch(e => {
        return false;
      });
  };
}
