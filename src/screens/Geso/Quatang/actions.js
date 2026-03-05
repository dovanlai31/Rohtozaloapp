

import { post, } from '../../../utils/netwworking';

export function PanelListQT(payload) {
  return () => {
    return  post('PanelListQT', payload)
      .then(({ data, error, }) => {
        if (!error) {
          return data;
        } else {
          return false; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
export function getLitstDanhmucUrbox(payload) {
  return () => {
    return  post('getAlldanhmuc', payload)
      .then(({ data, error, }) => {
        if (!error) {
          return data;
        } else {
          return false; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
export function listsDanhmucUrbox_v2(payload) {
  return () => {
    return  post('listsDanhmucUrbox_v2', payload)
      .then(({ data, error, }) => {
        if (!error) {
          return data;
        } else {
          return false; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
export function getLitstDanhmucUrbox_cap2(payload) {
  return () => {
    return  post('listsDanhmucUrbox_cap2', payload)
      .then(({ data, error, }) => {
        if (!error) {
          return data;
        } else {
          return false; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
export function getDiaChiKH(params) {
  return (dispatch) => {
    return post('getDiaChiKH', params)
      .then(({ error, data, }) => {
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
export function listsGiftUrbox(payload) {
  return () => {
    return  post('listsGiftUrbox', payload)
      .then(({ data, error, }) => {
        if (!error) {
          return data;
        } else {
          return false; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}

export function getDiemTlKh(payload) {
  return () => {
    return  post('getDiemTlKh', payload)
      .then(({ data, error, }) => {
        if (!error) {
          return data;
        } else {
          return false; 
        }
      })
      .catch((e) => {
        return false;
      });
  };
}

