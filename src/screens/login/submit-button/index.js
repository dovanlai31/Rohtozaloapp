/**
 * @author: Lai.do
 * @date: 2018-12-12 10:50:10 
 *  
 * 
 */
import { connect, } from 'react-redux';

import LoginSubmitButton from './LoginSubmitButton';
import { selectors, actions, } from '../../../stores';
import { AppNavigation, } from '../../../app-navigation';

const mapStateToProps = (state) => ({
  isLoading: selectors.auth.loginLoadingStatus(state),
});

const mapDispatchToProps = (dispatch, {onSuccess, componentId,}) => {
  const onLoginSuccess = () => {
    AppNavigation.dismissModal(componentId);
    if(onSuccess){
      onSuccess();
    }
  };
  const login = () => {
    dispatch(actions.auth.login(onLoginSuccess));
  };
  return {
    login,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSubmitButton);