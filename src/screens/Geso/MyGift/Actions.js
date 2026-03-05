
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


export function getListDonQuTangOPV(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('getListDonQuTangOPV', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('getListDonQuTangOPV data', data);
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