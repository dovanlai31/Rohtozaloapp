
import { post, } from './../../../utils/netwworking';
import { Logg, } from '../../../utils';

export function _getLsitTL(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('getListTL', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('getLsitTL data', data);
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





export function getCTTBay(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('getCTTBay', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('getCTTBay data', data);
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