/**
 * @author: thai.nguyen
 * @date: 2018-12-12 22:17:25
 *
 *
 */
import { AppValue, } from '../values';
import { Logg, } from '.';

const logg = Logg.create('FiFetch');

let accessToken = '';

export const Methods = {
  POST: 'POST',
  GET: 'GET',
};

export const setToken = (token) => {
  accessToken = token.tokenType + ' ' + token.accessToken;
};

export const CallApi = ({ api, method = 'GET', body, }) => {
  return new Promise((resolve, reject) => {
    try {
      if (!api) {
        throw new Error('Missing endpoint.');
      }
      fetch(`${AppValue.API_URL}${api}`, {
        method,
        ...(method === Methods.POST
          ? {
            body: JSON.stringify(body),
          }
          : {}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
      }).then((res) => {
        const { status, } = res;
        res
          .json()
          .then((data) => {
            if (data) {
              const { errorMessage, errorCode, } = data;
              if (errorCode) {
                reject({ message: `${errorMessage}(code: ${errorCode})`, });
                return;
              }
            }
            resolve(data);
          })
          .catch(() => {
            if (status === 200) {
              resolve();
              return;
            }
            reject({ message: 'Remote server fail with status ' + status, });
          });
      });
    } catch ({ message = 'Unknow Error', }) {
      reject({message,});
    }
  });
};
