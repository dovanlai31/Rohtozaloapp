import React from 'react';
import { connect, } from 'react-redux';
import {Alert,}from 'react-native';
import MapViewltbh from './map_ltbh_Presenter';
import { report, } from './map_ltbh_action';
import moment from 'moment';
import { Navigation, } from 'react-native-navigation';
class map_ltbh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: '[]',
      gocus: true,
      tungay: moment(new Date()).format('YYYY-MM-DD'),
		
    };
		
  }

  componentDidMount() {
    this.navigationEventListener =   Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'btntop') {
      this.getReport();
    }
  }
	getReport = () => {

	  let payload = {
	    nvId: this.props.listBranch.USERID,
	    ngay: this.state.tungay,
	    ddkdId: this.props.SearchData.NvbhId,
	  };


	  this.setState({ gocus: true, });
	  const { dispatch, } = this.props;
		
	  if (payload.ddkdId) {
	    dispatch(report(payload)).then((res) => {
	      if (res.RESULT == '1') {
	        this.setState({ report: res, });
	        //alert(res)				
	      } else
	      {
	        this.setState({ report: '[]', });
	        Alert.alert('Thông báo', 'Không có dữ liệu');
	      } 
	    });
	  } else {
	    Alert.alert('Thông báo', 'Vui lòng chọn nhân viên bán hàng');
	  }

	};
	onscrollView(sc) {
	  sc.scrollTo({ x: 0, });
	}
	gotoCurrentLocation(latitude, longitude, map) {
		
	  if (this.state.gocus) {
	    setTimeout((_)=>{
	      map.animateToRegion({
	        latitude: latitude,
	        longitude: longitude,
	        latitudeDelta: 0.0922,
	        longitudeDelta: 0.0421,
	      }, 1000);
	      this.setState({ gocus: false, });
			  }, 1000);	
	  }

	}
	
	

	setFromTime = (date) => {
	  //let  tungay  = this.state.tungay;
	  //tungay = date;
	  this.setState({ tungay:date, });
	};

	render() {
	  return (
	    <MapViewltbh
	     
	      setFromTime={this.setFromTime}
	      getReport={this.getReport}
	      time={this.state.tungay}
	      report={this.state.report}
	      gotoCurrentLocation={(lat, lon, map) => this.gotoCurrentLocation(lat, lon, map)}
	      gocus={this.state.gocus}
	      onscrollView={(sc) => this.onscrollView(sc)}
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
)(map_ltbh);
