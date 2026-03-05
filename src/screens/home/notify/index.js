import { connect, } from 'react-redux';

import Notify from './Notify';

import { selectors, actions, } from '../../../stores';

const mapStateToProps = (state) => ({
  testData1: selectors.home.getTestData(state),
});

export default connect(
  mapStateToProps,
  null
)(Notify);
