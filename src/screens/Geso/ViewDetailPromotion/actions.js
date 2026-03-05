
import moment from 'moment';
import { post,modifyXML, } from '../../../utils/netwworking';

export function getInforPromotion(payload) {
  return () => {
    return  post('getInforPromotion', payload)
      .then(({ data, error, }) => {
        if (!error) {
          if (data[0].RESULT=='1') {
            return(data[0].MSG);
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };
}

export function getspkmtra(payload) {
  return () => {
    return  post('getspkmtra', payload)
      .then(({ data, error, }) => {
        if (!error) {
          if (data[0].RESULT=='1') {
            return(data[0].MSG);
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };
}



export function getspkmmua(payload) {
  return () => {
    return  post('getspkmmua', payload)
      .then(({ data, error, }) => {
        if (!error) {
          if (data[0].RESULT=='1') {
            return(data[0].MSG);
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };
}