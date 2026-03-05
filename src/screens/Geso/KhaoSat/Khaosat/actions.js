
import { post } from './../../../../utils/netwworking';
import { Logg, } from '../../../../utils';

export function KhaoSat_GetList(params) {
    return (dispatch) => {
      return  post('KhaoSat_GetList', params)
        .then(({ error, data, }) => {           
          Logg.info('KhaoSat_GetList data', data);
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