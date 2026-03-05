/**
 * @author: Lai.do
 * @date: 2018-12-12 10:39:45 
 *  
 * 
 */
import { connect, } from 'react-redux';

import LoginInput from './LoginInput';
import { selectors, actions, } from '../../../stores';

const mapStateToProps = (state) => ({
  loginInput: selectors.auth.getLoginInput(state),
});

const mapDispatchToProps = (dispatch) => {
  const onChangeLoginInput = (key, value) => {
    dispatch(actions.auth.updateLoginInput({key, value,}));
  };
  return {
    onChangeLoginInput,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInput);