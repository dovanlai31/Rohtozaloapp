
import moment from 'moment';
import { post,modifyXML, } from '../../../utils/netwworking';
var parseString = require('react-native-xml2js').parseString;

export function getListNotify(payload) {
  return () => {
    return  post('ThongBao_GetList', payload)
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

export function getListAnswer(payload, callback) {
  return () => {
    return post('ThongBao_GetTraLoiList', payload)
      .then(({ data, error, }) => {
        if (!error) {
          const xml =  modifyXML(data);
          parseString(xml, function(err, dt) {
            if (dt) {
              callback(dt.DocumentElement.Table);
            } else {
              callback(false);
            }
          });
        } else {
        
          return false;
        }
      })
      .catch((e) => {
       
        return false;
      });
  };
}

export function postAnswer(payload) {
  return () => {
    return post('ThongBao_TraLoi', payload)
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

export function getNotifyUnread(payload) {
  return () => {
    return post('ThongBao_GetThongBaoChuaDoc', payload)
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

export function readNotify(payload) {
  return () => {
    return post('ThongBao_DaDoc', payload)
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
