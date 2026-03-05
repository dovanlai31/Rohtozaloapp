
import { post, } from '../../../utils/netwworking';
import { Logg, } from '../../../utils';


export function luuphuongxa(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('luuphuongxa', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('luuphuongxa data', data);
        if (!error) {
          return data;					
        } else {
          return '';
        }
      })
      .catch((e) => {
        //	dispatch(appActions.showLoading(false));
        return '';
      });
  };
}
export function getListXaPhuong(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('getListXaPhuong', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('getListXaPhuong data', data);
        if (!error) {
          return data;					
        } else {
          return '';
        }
      })
      .catch((e) => {
        //	dispatch(appActions.showLoading(false));
        return '';
      });
  };
}


export function getListQuan(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('getListQuan', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('getListQuan data', data);
        if (!error) {
          return data;					
        } else {
          return '';
        }
      })
      .catch((e) => {
        //	dispatch(appActions.showLoading(false));
        return '';
      });
  };
}


export function getLichSuDiemTL(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('getLichSuDiemTL', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('getLichSuDiemTL data', data);
        if (!error) {
          return data;					
        } else {
          return '';
        }
      })
      .catch((e) => {
        //	dispatch(appActions.showLoading(false));
        return '';
      });
  };
}