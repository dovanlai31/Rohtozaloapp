/**
 * @author: Lai.do
 * @date: 2018-12-10 19:14:42 
 *  
 * 
 */
import { connect, } from 'react-redux';

import Banner from './Banner';

import { selectors, } from '../../../stores';

// const mapStateToProps = (state) => ({
//   testData: selectors.home.getTestData(state),
// });

export default connect(
  null,
  null
)(Banner);
