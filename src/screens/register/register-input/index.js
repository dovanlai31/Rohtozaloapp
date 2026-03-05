/**
 * @author: Lai.do
 * @date: 2018-12-12 20:39:05 
 *  
 * 
 */
import {connect,} from 'react-redux';

import RegisterInput from './RegisterInput';
import { selectors, actions, } from '../../../stores';

const mapStateToProps = (state) => ({
  registerInput: selectors.auth.getRegisterInput(state),
});

const mapDispatchToProps = (dispatch) => {
  const onChangeRegisterInput = (key, value) => {
    dispatch(actions.auth.updateRegisterInput({key, value,}));
  };
  return {
    onChangeRegisterInput,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterInput);