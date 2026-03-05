
import { post, } from '../../../utils/netwworking';
import { Logg, } from '../../../utils';

export function cart_getlist_urbox(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('cart_getlist_urbox', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('cart_getlist_urbox data', data);
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