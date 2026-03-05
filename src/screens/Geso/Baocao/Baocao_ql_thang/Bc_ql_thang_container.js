import React from 'react';
import {Alert,}from 'react-native';
import { connect, } from 'react-redux';
import { report, } from './Bc_ql_thang_action';
import moment from 'moment';
import { Navigation, } from 'react-native-navigation';
import htmlloading from '../../../../common-components/htmlLoading';
import ViewWebBC from '../ViewWebBC';
class Baocao_ql_Thang extends React.Component {
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
	      userId: this.props.listBranch.USERID,

	      nvId:this.props.listBranch.ID==null?'':this.props.listBranch.ID,
	      id:this.props.listBranch.ID==null?'':this.props.listBranch.ID,
	      ddkdId: this.props.SearchData.NvbhId ==null?'':this.props.SearchData.NvbhId,
	      thangnam: this.state.payload.tungay,
	      //denngay: this.state.payload.denngay,
	      nppId: this.props.SearchData.NppId ==null?'':this.props.SearchData.NppId,
	      trangthaidh:this.state.currentBranch.id ==null?'':this.state.currentBranch.id,
	      idnhom:'',
	      loai:this.props.listBranch.LOAI,
	      vungId:'',kvId:'',asmId:'',gsbhId:'',
	      trangthaitrave:'',
  
	    };
	  
		  const { dispatch, } = this.props;
		  this.setState({report:htmlloading,});
		  dispatch(report(params)).then((res) => {
	      if (res[0].RESULT=='1') {
			  this.setState({ report: res[0].MSG, });
	      } else this.setState({ report: '<h1>Không có dữ liệu</h1>', });
		  });
  
  
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
		  <ViewWebBC 
	        setToTime={this.setToTime}
	        setFromTime={this.setFromTime}
	        getReport={this.getReport}
	        time={this.state.payload}
	        report={this.state.report}
	        ansearch={this.ansearch}
	        isan={this.state.ansearch}
	        bcthang={true}
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
)(Baocao_ql_Thang);
  