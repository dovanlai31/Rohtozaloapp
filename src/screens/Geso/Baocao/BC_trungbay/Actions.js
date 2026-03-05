import {post} from './../../../../utils/netwworking';

export function report(payload) {
  return dispatch => {
    return post('BCTrungBay', payload)
      .then(({data, error}) => {
        //dispatch(appActions.showLoading(false));
        //console.log('BCTrungBay', data, error);
        if (!error) {
          return data;
        } else {
          console.log('get BCTrungBay fail', data);
          return false;
        }
      })
      .catch(e => {
        console.log('get getTonkhoPDA  catch', e);
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
