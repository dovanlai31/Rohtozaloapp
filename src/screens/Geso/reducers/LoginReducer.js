import { removeAccents } from '../../../utils/netwworking';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, } from '../login/loginAction';
const initState = {
  loginStatus: '',
  logining: false,
  userID:'',
  versionCode:'999999999999',
  versionName:'9999999999999',
  DataAllSP:[],
  DataSPSearch:[],
  SanPhamList:[],

};

export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        logining: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,

        logining: false,
        loginStatus: 'login thành công',
      };
    case 'setsStore':
      return {
        ...state,
        DataAllSP: action.DataAllSP,
      }; 
    case 'SanPhamList':
        return {
          ...state,
          SanPhamList: action.SanPhamList,
        }; 
      
    case 'setsDataSearch':
      let data= [];
      if(action.searchKeyword!='')
      data = state.DataAllSP.filter(
            (sp) => (removeAccents(sp.ten)  + '').toLowerCase().indexOf(removeAccents(action.searchKeyword ).toLowerCase()) > -1
              || (sp.clTen + '').toLowerCase().indexOf( action.searchKeyword.toLowerCase()) > -1
              || (sp.nhTen + '').toLowerCase().indexOf( action.searchKeyword.toLowerCase()) > -1
              || (sp.tennhomhang + '').toLowerCase().indexOf( action.searchKeyword.toLowerCase()) > -1
          )
      if(action.searchKeyword=='-All-'){
        data = state.DataAllSP
      }
      return {
        ...state,
        DataSPSearch: data,
      }; 
    case LOGIN_FAIL:
      return {
        ...state,
        logining: false,
        loginStatus: action.message ? action.message : 'Lỗi',
      };
    case 'LOGOUT':
      return initState;
    default:
      return state;
  }
}
