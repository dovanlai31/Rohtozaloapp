/**
 * @author: Lai.do
 * @date: 2018-12-12 15:19:54 
 *  
 * 
 */
import {connect,} from 'react-redux';

import RegisterScreen from './RegisterScreen';
const mapDispatchToProps = (dispatch, { navigator, }) => {
  const goBack = () => {
    navigator._pop();
  };
  return {
    goBack,
  };
};


export default connect(null, mapDispatchToProps)(RegisterScreen);