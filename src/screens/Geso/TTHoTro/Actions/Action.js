
import { post, } from './../../../../utils/netwworking';
import { Logg, } from '../../../../utils';

export function KhaoSat_GetList(params) {
  return (dispatch) => {
    return post('KhaoSat_GetList', params)
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


export function getListCSTDVideo(params) {
  return (dispatch) => {
    return post('getListCSTDVideo', params)
      .then(({ error, data, }) => {
        Logg.info('getListCSTDVideo data', data);
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
export function tichdemxemvideo(params) {
  return (dispatch) => {
    return post('tichdemxemvideo', params)
      .then(({ error, data, }) => {
        Logg.info('tichdemxemvideo data', data);
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
export function thongbao_getlist(params) {
  return (dispatch) => {
    return post('getAllThongBao', params)
      .then(({ error, data, }) => {
        Logg.info('getAllThongBao data', data);
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