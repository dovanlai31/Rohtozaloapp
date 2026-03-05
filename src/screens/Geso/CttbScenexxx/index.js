
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import { Navigation, } from 'react-native-navigation';
import ViewChuphinhTB from './ViewChuphinhTB';
import ViewDialog from '../DialogView/DialogView';
import { AppNavigation } from '../../../app-navigation';
import { showSuccess } from '../../../utils/SnackBar';
import { getCTTBList, ThemChuongTrinhTB,KhachHang_ChupAnh_TB } from './actions';
import { connect } from 'react-redux'
const listtuyen = [
  { ten: 'Chọn Tuyến', key: '', },
  { ten: 'Thứ 2', key: '2', },
  { ten: 'Thứ 3', key: '3', },
  { ten: 'Thứ 4', key: '4', },
  { ten: 'Thứ 5', key: '5', },
  { ten: 'Thứ 6', key: '6', },
  { ten: 'Thứ 7', key: '7', },
];
class ChupAnhTB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTuyen: { ten: 'Chọn Tuyến', key: '', },
      currentCttb: { label: 'Chọn CTTB', id: '', },
      img: {
        img1: null,
        img2: null,
        img3: null,

      },
      tab: 0,
      listTb: [],
      ListTbChuaDK: [],
      loadding: false
    };
  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this._getCTTBList()
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'btntop') {
      //showSuccess('Lưu thành công')
      this.props.navigator._pop()
    }
  }

  _getCTTBList() {

    const params = {
      khId: this.props.userID,
    };

    this.props.dispatch(getCTTBList(params)).then((data) => {
      if (data) {
        if (data[0].RESULT == 1) {
          let arr = JSON.parse(data[0].MSG).filter(r => r.DANGKY == 0)
          this.setState({
            listTb: JSON.parse(data[0].MSG),
            ListTbChuaDK: arr
          });
        }

      } else alert("lỗi ")
    });
    return;

  }



  takePicture = index => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };


    ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri, data: response.data };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        const { img } = this.state;
        img["img" + index] = source;
        this.setState({ img });

      }
    });
  };
  // onPressListtuyen = () => {
  //   AppNavigation.showCommonDialog({
  //     renderContent: () =>
  //       <ViewDialog title={'Chọn Tuyến'}
  //         content={listtuyen}
  //         onPressItem={(item) => {
  //           if (item && item.ten)
  //             this.setState({ currentTuyen: item, });
  //         }}
  //       />,
  //   });

  // }
  settab(t) {

    this.setState({ tab: t, currentCttb: { label: 'Chọn CTTB', id: '', }, })
  }
  onPressListTb = () => {
    const { listTb, tab } = this.state;


    let arr = listTb.filter(r => r.DANGKY == 1)
    if (tab == 1)
      arr = listTb.filter(r => r.DANGKY == 0)

    if (arr.length < 1)
      return Alert.alert("Thông báo", "Không có chương trình trưng bày nào chạy trong thời gian hiện tại, vui lòng thử lại sau")
    AppNavigation.showCommonDialog({
      renderContent: () =>
        <ViewDialog title={''}
          content={arr}
          onPressItem={(item) => {
            if (item && item.id)
              this.setState({ currentCttb: item, });
          }}
        />,
    });
  }
  setISChose(i) {
    const { ListTbChuaDK } = this.state;
    ListTbChuaDK[i].ischose = ListTbChuaDK[i].ischose ? false : true
    this.setState({ ListTbChuaDK })


  }

  DkTB = () => {
    const { ListTbChuaDK } = this.state;
    let arr = ListTbChuaDK.filter(r => r.ischose)
    if (arr.length == 0) return Alert.alert("Thông báo ", "Vui lòng chọn chương trình trưng bày")
    //    public string ThemChuongTrinhTB(string khId, string ddkdId, string CTTB)


    let CTTB = "";
    arr.map(e => {
      CTTB += e.id + "#";
    })
    CTTB = CTTB.slice(0, CTTB.length - 1)
    const params = {
      khId: this.props.userID,
      CTTB,
      ddkdId: ''
    };

    this.props.dispatch(ThemChuongTrinhTB(params)).then((data) => {
      if (data) {
        Alert.alert("Thông báo", "" + data)
      } else alert("lỗi ")
    });
    return;

  }
  saveTB() {
    const { currentCttb, img } = this.state
    if (currentCttb.id.length < 2) return Alert.alert("Thông báo", "Vui lòng chọn chương trình trưng bày")
    if (img.img3 == null) return Alert.alert("Thông báo", "Vui lòng Chụp ảnh trưng bày trước khi nhấn lưu")
    this.setState({ loadding: true })
    //
    //public string KhachHang_ChupAnh_TB(string khId, string chupAnh1, byte[] hinhAnhBytes1, string cttbId )
    const params = {
      khId: this.props.userID,
      hinhAnhBytes1: img.img3.data,
      cttbId: currentCttb.id
    };

    this.props.dispatch( KhachHang_ChupAnh_TB(params)).then((data) => {
      this.setState({ loadding: false })
      if (data) {
        Alert.alert("Thông báo", "" + data[0].MSG)
        if (data[0].RESULT == 1) {
         
        }
      
      } else alert("lỗi ")
    });
   

  }
  render() {
    const { currentCttb, img, tab, listTb, ListTbChuaDK, loadding } = this.state

    return (

      <ViewChuphinhTB
        currentCttb={currentCttb}
        takePicture={(t) => this.takePicture(t)}
        dataImgs={img}
        settab={(t) => this.settab(t)}
        tab={tab}
        onPressListTb={this.onPressListTb}
        ListTbChuaDK={ListTbChuaDK}
        setISChose={(i) => this.setISChose(i)}
        DkTB={this.DkTB}
        saveTB={() => this.saveTB()}
        loadding={loadding}
      />


    );
  }
}
export default connect((state) => ({
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
  ShopControl: state.ShopControl
}), (dispatch) => ({ dispatch, }))(ChupAnhTB);