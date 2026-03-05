import {post} from './../../../../utils/netwworking';

export function report(payload) {
  return dispatch => {
    return post('BaoCao_SuDungKM', payload)
      .then(({data, error}) => {
        console.log('BaoCao_SuDungKM', data, error);
        if (!error) {
          return data;
        } else {
          console.log('get BaoCao_SuDungKM fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get BaoCao_SuDungKM  catch', e);
        return false;
      });
  };
}

export function GetCTKMTuNgay(payload) {
  return dispatch => {
    //dispatch(appActions.showLoading(true));
    return post('GetCTKMTuNgay', payload)
      .then(({data, error}) => {
        //dispatch(appActions.showLoading(false));
        console.log('GetCTKMTuNgay', data, error);
        if (!error) {
          return data;
        } else {
          console.log('get GetCTKMTuNgay fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get GetCTKMTuNgay  catch', e);
        return false;
      });
  };
}
export function getListtrungbay_bc(payload) {
  return dispatch => {
    //dispatch(appActions.showLoading(true));
    return post('getListtrungbay_bc', payload)
      .then(({data, error}) => {
        //dispatch(appActions.showLoading(false));
        console.log('getListtrungbay_bc', data, error);
        if (!error) {
          return data;
        } else {
          console.log('get getListtrungbay_bc fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get getTonkhoPDA  catch', e);
        return false;
      });
  };
}

export function getListkh_bc(payload) {
  return dispatch => {
    //dispatch(appActions.showLoading(true));
    return post('getListkh_bc', payload)
      .then(({data, error}) => {
        //dispatch(appActions.showLoading(false));
        console.log('getListkh_bc', data, error);
        if (!error) {
          return data;
        } else {
          console.log('get getListkh_bc fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get getListkh_bc  catch', e);
        return false;
      });
  };
}
