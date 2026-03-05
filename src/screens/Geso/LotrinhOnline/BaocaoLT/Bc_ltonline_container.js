import React from 'react';
import {Alert,}from 'react-native';
import { connect, } from 'react-redux';
import ReportView from './Bc_ltonline_Presenter';
import { report, } from './Bc_ltonline_action';
import moment from 'moment';
import { Navigation, } from 'react-native-navigation';
import htmlloading from '../../../../common-components/htmlLoading';

class BcltOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'Chọn NPP',
      visiblePanel: false,
      searchKeyword: '',
      currentCustomer: '',
      payload: {

        tungay: moment(new Date()).format('YYYY-MM-DD'),
        denngay: moment(new Date()).format('YYYY-MM-DD'),

      },
      report: '',
      ansearch:false,
    };
  }

  componentDidMount() {
    this.navigationEventListener =   Navigation.events().bindComponent(this);
    // this.getReport();
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'btntop') {
      this.getReport();
    }
  }
	getReport = () => {
	  let params = {
	    nvId: this.props.listBranch.USERID,
	    ddkdId: this.props.SearchData.NvbhId,
	    tungay: this.state.payload.tungay,
	    denngay: this.state.payload.denngay,
	    nppId: this.props.SearchData.NppId,

	  };
	  if (params.ddkdId) {
	    const { dispatch, } = this.props;
	    this.setState({report:htmlloading,});
	    dispatch(report(params)).then((res) => {
	      if (res[0].RESULT=='1') {
	        this.setState({ report: res[0].MSG, });
	      } else this.setState({ report: '<h1>Không có dữ liệu</h1>', });
	    });
	  } else {
	    Alert.alert('Thông báo', 'Vui lòng chọn nhân viên bán hàng');
	  }

	};



	setToTime = (date) => {
	  const { payload, } = this.state;
	  payload.denngay = date;
	  this.setState({ payload, });
	};

	setFromTime = (date) => {
	  const { payload, } = this.state;
	  payload.tungay = date;
	  this.setState({ payload, });
	};
	ansearch=()=>{
	  const a=this.state.ansearch;
	  this.setState({ansearch:!a,});
	}

	render() {
	  return (
	    <ReportView
	      setToTime={this.setToTime}
	      setFromTime={this.setFromTime}
	      getReport={this.getReport}
	      time={this.state.payload}
	      report={this.state.report}
	      ansearch={this.ansearch}
	      isan={this.state.ansearch}
	    />
	  );
	}
}

export default connect(
  (state) => ({
    listBranch: state.app.listBranch,
    SearchData: state.SearchData,
  }),
  (dispatch) => ({ dispatch, }),
)(BcltOnline);
