/**
 * @author: thai.nguyen
 * @date: 2018-12-07 23:21:02
 *
 *
 */
import { connect, } from 'react-redux';

import LoginScreen from './LoginScreen';
import { AppNavigation, } from '../../app-navigation';
import { IDs, } from '..';
const mapDispatchToProps = (dispatch, { navigator, componentId, onDismiss, onSuccess, }) => {
  const close = () => {
    if (onDismiss) {
      onDismiss();
    }
    AppNavigation.dismissModal(componentId);
  };
  const openRegister = () => {
    // console.log('a');
    navigator._push({
      name: IDs.Register,
      isBack: true,
      passProps: {
        onSuccess: ()=>{
          AppNavigation.dismissModal(componentId);
          if(onSuccess){
            onSuccess();
          }
        },
      },
    });
  };
  return {
    close,
    openRegister,
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
