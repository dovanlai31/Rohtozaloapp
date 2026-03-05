import React from 'react';
import {Alert,}from 'react-native';
import { connect, } from 'react-redux';
import { report, } from './actions';
import moment from 'moment';
import { Navigation, } from 'react-native-navigation';
import htmlloading from '../../../../common-components/htmlLoading';
import ViewWebBC from '../ViewWebBC';

class Baocao_ql_kpinv extends React.Component {
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
      report: [],
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

        
	    tungay: this.state.payload.tungay, 
	    denngay: this.state.payload.denngay, 
	    ddkdid: this.props.SearchData.NvbhId == null ? '' : this.props.SearchData.NvbhId,
	    nvid: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
	    loainv: this.props.listBranch.LOAI,
	    vung_fk: '', kv_fk: '', asm_fk: '', gsbh_fk: '',
	    npp_fk: this.props.SearchData.NppId == null ? '' : this.props.SearchData.NppId,

	  };
	
	    const { dispatch, } = this.props;
	    this.setState({report:[{'Tải data...':'',},],});
	    dispatch(report(params)).then((res) => {
	    //alert(JSON.stringify(res));
	      if (res.length>0) {
	        this.setState({ report: res, });
	      } else this.setState({ report: [], });
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
	      datatable={true}
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
)(Baocao_ql_kpinv);
