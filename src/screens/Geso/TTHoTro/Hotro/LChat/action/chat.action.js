import { Logg, } from '../../../../../../utils';
import { post, } from './../../../../../../utils/netwworking';


export function submitChat(x, params) {
  return (dispatch) => {
    return post('SendMessagePDA', params)
      .then(({ error, data, }) => {

        Logg.info('SendMessagePDA', data);
        if (data[0].RESULT == '1') {
          dispatch({
            type: 'onSend',
            messages: x,

          });
          return true;

        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
export function reviceSmS(data) {
  return (dispatch) => {
    const messages = {
      _id: 98,
      text: JSON.parse(data.data).message,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'VF',
        avatar: JSON.parse(data.data).avatar,
      },
    };

    dispatch({
      type: 'reviceSmS',
      messages: messages,
      loai: JSON.parse(data.data).type,

    });
  };
}
export function savetokentosever(payload) {
  return (dispatch) => {
    return post('Token_user', payload)
      .then(({ data, error, }) => {
        Logg.info('Token_user', data, payload);
        if (!error) {
          Logg.info('get Token_user', data[0].MSG);
          if (data[0].RESULT == '1') {
            return (data[0].MSG);
          } else {
            return false;
          }
        } else {
          Logg.info('get Token_user fail', data);
          return false;
        }
      })
      .catch((e) => {
        Logg.info('get savetokentosever catch', e);
        return false;
      });
  };
}
export function MessageList(params) {
  return (dispatch) => {
    return post('MessageList', params)
      .then(({ error, data, }) => {
      console.log('MessageList data xx  : '+params, data  );
        if (!error) {  
          //(data[0].RESULT =='1')
          return dispatch({
            type: 'MessageList',
            data: data,
            id:params.khId,

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
export function setnotify(isonoff) {
  return (dispatch) => {

    dispatch({
      type: 'setnotify',
      setnotify: isonoff,

    });
  };
}
export function SetisScrenchatactive(isonoff) {
  return (dispatch) => {

    dispatch({
      type: 'SetisScrenchatactive',
      isScrenchatactive: isonoff,

    });
  };
}