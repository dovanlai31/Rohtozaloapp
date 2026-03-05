import { post, } from '../../../utils/netwworking';
import {Alert, }from 'react-native';

export function report2(payload) {
  return () => {
    return post('KeHoach_TrongNgayNew', payload)
      .then(({ data, error, }) => {
        if (!error) {
          if (data[0].RESULT === '1')
          {return data[0].MSG;}
          else return '';
        } else {
          return '';
        }
      })
      .catch((e) => {

        return false;
      });
  };
}

export function report(payload) {
  return () => {
    return post('KeHoach_TrongNgay_TBH', payload)
      .then(({ data, error, }) => {
        if (!error) {
          if (data[0].RESULT == '1')
          {return data[0].MSG;}
          else
          {return '';}
        } else {
          return '';
        }
      })
      .catch((e) => {
        return false;
      });
  };
}
export function ViengthamNpp(payload) {
  return () => {
    return post('KeHoach_ViengthamNpp', payload)
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


export function KeHoach_GhichuTT(payload) {
  return () => {
    return post('KeHoach_GhichuTT', payload)
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
export function KeHoach_RoikhoiNpp(payload) {
  return () => {
   
    return post('KeHoach_RoikhoiNpp', payload)
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
export function KeHoach_ChuphinhTT(payload) {
  return () => {
    return post('KeHoach_ChuphinhTT', payload)
      .then(({ data, error, }) => {
       
        if (!error) {
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



export function KeHoach_ChuphinhNpp(nvId, id, image) {
  return (dispatch, state) => {
    let { ddkd_fk, npp_fk, } = state().app.currentNPP;
   
    // public string KeHoach_ChuphinhNpp(string nvId, string id, string image)
    return post('KeHoach_ChuphinhNpp', {
      nvId,
      id,
      image,
    })
      .then(({ data, error, }) => {
       
        if (!error) {
          if(data[0].RESULT=='1')
          {return data[0].MSG;}
          else return ''; 
        } else {
       
          return ''; 
        }
      })
      .catch((e) => {
       
        return false;
      });
  };
}
export function KeHoach_ViengthamKhachhang(payload) {
  return (dispatch) => {
  
    return post('KeHoach_ViengthamKhachhang', payload)
      .then(({ data, error, }) => {
      
     
        if (!error) {
          if (data[0].RESULT != 1)
          {return data[0].MSG;}
          else
          {return '1';}
        } else {
        
          return '';
        }
      })
      .catch((e) => {
       
        return '';
      });
  };
}
export function KeHoach_ChuphinhKhachhang(payload) {
  return (dispatch, state) => {
    //let { ddkd_fk, npp_fk } = state().app.currentNPP;
 
    // public string KeHoach_ChuphinhNpp(string nvId, string id, string image)
    return post('KeHoach_ChuphinhKhachhang', payload)
      .then(({ data, error, }) => {

       
        if (!error) {
          if (data[0].RESULT == '1') {
            // Toast.show(
            // 	'Lưu thành công',
            // 	Toast.POSITION.BOTTOM,
            // 	Toast.LENGTH.SHORT,
            // );
            return true;
          }
          data[0] &&
						data[0].MSG &&
						Alert.alert(
						  'Lỗi',
						  (data[0].MSG && data[0].MSG) || 'Kết nối thất bại',
						);
          return false;
        } else {
          Alert.alert(
            'Lỗi',
            (data[0].MSG && data[0].MSG) || 'Kết nối thất bại',
          );
          return false;
        }
      })
      .catch((e) => {
       
      });
  };
}
export function KeHoach_RoikhoiKhachhang(payload) {
  return (dispatch) => {
   
    return post('KeHoach_RoikhoiKhachhang', payload)
      .then(({ data, error, }) => {
     
        if (!error) {
          if (data[0].RESULT != '1')
          {return data[0].MSG;}
          else
          {return '1';}
        } else {
         
          return '';
        }
      })
      .catch((e) => {
    
        return '';
      });
  };
}
export function KeHoach_CheckToaDoThiTruong(payload) {
  return () => {
   
    return post('KeHoach_CheckToaDoThiTruong', payload)
      .then(({ data, error, }) => {
       
        if (!error) {
          return data[0].MSG;
        } else {
         
          return false;
        }
      })
      .catch((e) => {
      
        return false;
      });
  };
}