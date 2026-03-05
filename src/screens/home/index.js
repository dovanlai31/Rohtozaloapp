/**
 * @author: thai.nguyen
 * @date: 2018-11-29 16:24:38
 *
 *
 */
import { connect, } from 'react-redux';

import HomeScreen from './HomeScreen';

import { AppNavigation, } from '../../app-navigation';
import { selectors, actions, } from '../../stores';
import { IDs, } from '..';

const mapStateToProps = (state) => ({
  testData: selectors.home.getTestData(state),
});

const mapDispatchToProps = (dispatch, { navigator,}) => {
  const onPress = () => {
    AppNavigation.showCommonDialog({
      title: 'Test push',
      desc: 'hahaha',
    });
  };
  return {
    onPress,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
