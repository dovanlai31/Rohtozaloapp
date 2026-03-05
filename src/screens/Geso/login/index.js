import { connect, } from 'react-redux';

import LoginScene from './LoginScene';

//import ScanScreen from './testScanbarcode'

export default connect(
  (state) => ({
    testData: state.test.testData,
    // loginStatus: state.login.loginStatus,
  }),
  (dispatch) => ({ dispatch, }),
)(LoginScene);
