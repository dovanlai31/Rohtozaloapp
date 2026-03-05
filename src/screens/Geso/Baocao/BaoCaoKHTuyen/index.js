/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import {Alert,}from 'react-native';
import { connect, } from 'react-redux';
import { report, } from './action';
import moment from 'moment';
import { Navigation, } from 'react-native-navigation';
import htmlloading from '../../../../common-components/htmlLoading';
import ViewWebBC from '../ViewWebBC';
import { AppNavigation, } from '../../../../app-navigation';
import ViewDialog from './../../DialogView/DialogView';
const listtuyen = [
  { ten: 'Tất cả tuyến', key: '', },
  { ten: 'Thứ 2', key: '2', },
  { ten: 'Thứ 3', key: '3', },
  { ten: 'Thứ 4', key: '4', },
  { ten: 'Thứ 5', key: '5', },
  { ten: 'Thứ 6', key: '6', },
];
class Baocao_kh_tuyen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'Chọn NPP',
      visiblePanel: false,
      searchKeyword: '',
      currentCustomer: '',
      currentTuyen:  { ten: 'Tất cả tuyến', key: '', },
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

	  if(this.props.SearchData.NvbhId == null){
	   return Alert.alert('Thông Báo','Vui lòng chọn nhân viên bán hàng'); 
	  }
	  let params = {
	    nppId: this.props.SearchData.NppId == null ? '' : this.props.SearchData.NppId,
	    ddkdId: this.props.SearchData.NvbhId == null ? '' : this.props.SearchData.NvbhId,
	    ngayId: this.state.currentTuyen.key,
	    loainv:this.props.listBranch.LOAI,
	    nvId :this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
	  };	
      
	    const { dispatch, } = this.props;
	    this.setState({report:htmlloading,});
	    dispatch(report(params)).then((res) => {
	    //alert(JSON.stringify(res));
		
	      if (res&& res[0].RESULT == '1') {
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
    onPressListtuyen=()=>{
        
      AppNavigation.showCommonDialog({renderContent: ()=> 
        <ViewDialog  title={'Chọn Tuyến'} 
          content={listtuyen} 
          onPressItem ={(item)=>{
            this.setState({currentTuyen:item,});
          }}
        />,});
        
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
	      antungaydenngay={true}
	      listtuyen={listtuyen}
          currentTuyen={this.state.currentTuyen}
          onPressListtuyen={this.onPressListtuyen}
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
)(Baocao_kh_tuyen);
