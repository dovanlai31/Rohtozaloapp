
import {
  SHOW_APP,
  SHOW_LOADING,
  SAVE_CURRENT_NPP,
  SAVE_LIST_BRANCH,
} from './action';
const initState = {
  test: 0,
  showApp: false,
  showLoading: false,
  currentNPP: '',
  isConnected: true,
};

export default function(state = initState, action) {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        test: 10,
      };
    case SHOW_APP:
      return {
        ...state,
        showApp: action.payload,
      };
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: action.payload,
      };
    case SAVE_CURRENT_NPP:
      return {
        ...state,
        currentNPP: action.payload,
      };
    case 'CHANGE_NET_INFO':
      return {
        ...state,
        isConnected: action.value,
      };
    case SAVE_LIST_BRANCH:
      return {
        ...state,
        listBranch: action.payload,
        LoginInfo:action.payload,
      };
    default:
      return state;
  }
}
