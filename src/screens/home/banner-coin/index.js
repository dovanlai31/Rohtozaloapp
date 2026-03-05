/**
 * @author: Lai.do
 * @date: 2018-12-10 19:14:42 
 *  
 * 
 */
import { connect, } from 'react-redux';

import Banner from './BannerCoin';

import { selectors, actions, } from '../../../stores';

const mapStateToProps = (state) => ({
  testData1: selectors.home.getTestData(state),
});

export default connect(
  mapStateToProps,
  null
)(Banner);
