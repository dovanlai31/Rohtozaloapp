/**
 * @author: thai.nguyen
 * @date: 2018-12-12 21:16:42
 *
 *
 */
import { connect, } from 'react-redux';

import RegisterSubmit from './RegisterSubmit';
import { selectors, actions, } from '../../../stores';

const mapStateToProps = (state) => ({
  isLoading: selectors.auth.registerLoadingStatus(state),
});

const mapDispatchToProps = (dispatch, { navigator, onSuccess, }) => {
  const register = () => {
    dispatch(
      actions.auth.register(() => {
        navigator._pop();
      }, ()=>{
        if(onSuccess){
          onSuccess();
        }
      })
    );
  };
  return {
    register,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterSubmit);
