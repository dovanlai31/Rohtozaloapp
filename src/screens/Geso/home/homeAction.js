
import { post, } from './../../../utils/netwworking';
import { Logg, } from '../../../utils';

export function PanelList(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('PanelList', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('PanelList data', data);
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

export function NhanhangList(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('NhanhangList', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('NhanhangList data', data);
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

export function ChungLoaiList(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('ChungLoaiList', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('ChungLoaiList data', data);
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
export function CtkmList(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('CtkmList', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('CtkmList data', data);
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
export function SanPhamList(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('SanPhamList', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('SanPhamList data', data);
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
export function checkTLPanner(params) {
  return (dispatch) => {
    //dispatch(appActions.showLoading(true));
    return post('checkTLPanner', params)
      .then(({ error, data, }) => {
        //dispatch(appActions.showLoading(false));
        Logg.info('checkTLPanner data', data);
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
