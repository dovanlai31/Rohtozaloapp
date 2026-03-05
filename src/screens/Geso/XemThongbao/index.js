
import React from 'react';
import {
  View,
  Text,
  Platform,
  Keyboard,
} from 'react-native';
import {connect, } from 'react-redux';
import { getListAnswer, postAnswer, } from './actions';
import { SnackBar, } from '../../../utils';
import NotifyView from './NotifyView';
import { IDs, } from '../..';
import { Colors } from '../../../theme';
import { CommonIcons } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
class XemThongbao extends React.Component {
	static options = {
		statusBar: {
		  backgroundColor: Colors.statusBar,
		  // drawBehind: true,
		  visible: true,
		},
		topBar: {
		  visible: true,
		  drawBehind: false,
		  background: {
			 color: Colors.HeaderColor,
		  },
		  leftButtons: [
			 {
				id: 'km_BACK',
				icon: CommonIcons.back2,
			 },
		  ],
		  title: {
			 text: 'Xem chi tiết thông báo',
		  },
		},
	 };
  constructor(props) {
    super(props);
    this.state = {
      isShowContent: true,
      listAnswer: null,
      answer: '',
    };
	 Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  navigationButtonPressed({ buttonId, }) {
	if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
 }
  componentDidMount() {
	  
   // this.getAnswer();
  }

	getAnswer = () => {
	  this.props.dispatch(
	    getListAnswer(
	      {
	        manhanvien: this.props.ddkdId,
	        thongbao_fk: this.props.data.PK_SEQ,
	      },
	      (dt) => {
	        if (dt) {
	          this.setState({ listAnswer: dt, });
	        } else {
	          this.setState({ listAnswer: [], });
	        }
	      }
	    )
	  );
	};

	saveAnswer = () => {
	//   this.props
	//     .dispatch(
	//       postAnswer({
	//         ddkdId: this.props.ddkdId,
	//         thongbao_fk: this.props.data.PK_SEQ,
	//         noidung: this.state.answer,
	//       })
	//     )
	//     .then((res) => {
	//       if (res) {
	//         // Notify.show('Thông báo', 'Gửi câu trả lời thành công');
	//         SnackBar.showSuccess( 'Gửi câu trả lời thành công');
	//         this.getAnswer();

	//         this.setState({ answer: '', });
	//         Keyboard.dismiss();
	//       } else {
	//         //Notify.show('Thông báo', 'Gửi câu trả lời không thành công');
	//         SnackBar.showError( 'Gửi câu trả lời không thành công');
	//         Keyboard.dismiss();
	//       }
	//     });
	};

	changeContent = () => this.setState({ isShowContent: !this.state.isShowContent, });

	onChangeAnswer = (text) => this.setState({ answer: text, });

	viewDocument = ({linkUrl, filename}) => {
	//   this.props.dispatch(
	//     push({
	//       routeName: RouteKey.ViewDocument,
	//       params: { filename, linkUrl, },
	//     })
	//   );
	//console.log('linkUrlx', linkUrl);
	  this.props.navigator._push({
	    name: IDs.XemWebFile,  //.Register,
	    passProps: {
		  data:linkUrl
	    },
	    options: {         
		  topBar: {
	        title: {
			  text:'',
	        },
		  
		  },
		  bottomTabs:{
	        visible: false,
	        ...Platform.select({ android: { drawBehind: true, }, }),
		  },
	    },
	   
	  });

	};

	render(){
	  return (
		  <View style={{flex:1,}}>
	      <NotifyView 
	    
	        answer={this.state.answer}
	        saveAnswer={this.saveAnswer}
	        data={this.props.data}
	        onChangeAnswer={this.onChangeAnswer}
	        isShowContent={this.state.isShowContent}
	        changeContent={this.changeContent}
	        listAnswer={this.state.listAnswer}
	        getAnswer={this.getAnswer}
	        viewDocument={this.viewDocument}
	  />
		  </View>
	   
	  );
	}
}
export default connect(
  (state) => ({
    //ddkdId: state.app.currentNPP.ddkd_fk,
   //  nppId: state.app.currentNPP.npp_fk,
   //  ddkdId: state.app.listBranch.USERID,
  }),
  (dispatch) => ({ dispatch, })
)(XemThongbao);