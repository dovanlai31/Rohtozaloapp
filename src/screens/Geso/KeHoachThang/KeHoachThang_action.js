
import { post, } from './../../../utils/netwworking';

export function report(payload) {
  return (dispatch) => {
    return  post('KeHoach_TrongThang', payload)
      .then(({ data, error, }) => {
        if (!error) {
          if(data[0].RESULT=='1')
          {return data[0].MSG;}
          else return ''; 
        } else {
         
          return ''; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
