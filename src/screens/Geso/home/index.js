import { connect, } from 'react-redux';

import HomeScene from './HomeScene';

export default connect(
  (state) => ({
    testData: state.test.testData,
    userID: state.login.userID,
    NhaCCid:state.login.NhaCCid,
    DataAllSP: state.login.DataAllSP,
    SanPhamList: state.login.SanPhamList,

    // loginStatus: state.login.loginStatus,
  }),
  (dispatch) => ({ dispatch, }),
)(HomeScene);

