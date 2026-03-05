import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import ViewTabProfile from './View/View.Profile';
import * as AppsController from '../../../AppController';
import { getSoLuongDonHang, Capnhathinhavata, getInforKH, xoadonhang, getdoanhso, } from './Actions/Action';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { SnackBar, } from '../../../utils';
import { Colors, } from '../../../theme';
import { IDs, } from '../..';
import { Navigation, } from 'react-native-navigation';
import { RFValue } from 'react-native-responsive-fontsize';
const data = [
  { pk_seq: 1, ten: 'sp1', dongia: '123', donvi: 'thùng', HinhAnh: 'http://118.69.168.124:8089/AnhSalesUpDemoShop/sanpham/T001.jpg', },
  { pk_seq: 2, ten: 'sp2', dongia: '123', donvi: 'thùng', HinhAnh: 'http://118.69.168.124:8089/AnhSalesUpDemoShop/sanpham/T001.jpg', },
  { pk_seq: 3, ten: 'sp3', dongia: '123', donvi: 'thùng', HinhAnh: 'http://118.69.168.124:8089/AnhSalesUpDemoShop/sanpham/T001.jpg', },

];
class TabProfile extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
     // drawBehind: false,
      visible: true,
    },

  };

  constructor() {
    super();

    this.state = {
      modalVisible: false,
      index: 0,
      listdonhang: [],
      listGiao: [],
      listHuy: [],
      img: {
        img1: null,
      },
      DoanhSo: '',
      CAPDO: 0,
      SoLuongDonHang: '0-0-0',

    };

  }
  componentDidAppear() {

    this.getSoLuongDonHang();
    this.getInforKH();
    this.getdoanhso();

  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.setState({ SoLuongDonHang: this.props.SoLuongDonHang, });

  }
  changeAvatar = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri, data: response.base64, };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        const { img, } = this.state;
        img['img1'] = source;
        //public String Capnhathinhavata(string khId, String hinhAnhBytes1)
        this.props.dispatch(Capnhathinhavata({ khId: this.props.userID, hinhAnhBytes1: source.data, })).then((data) => {
          if (data.length > 0) {
            this.setState({ img, });
            SnackBar.showSuccess('Đổi avatar thành công');
          }
          else {
            SnackBar.showError('Đổi avatar thất bại');
            return;
          }
        });
      }
    });
  };

  ThongtinTK() {
    let dataLogin = this.props.dataLogin;
    const { navigator, } = this.props;
    navigator._push({
      name: IDs.TTTK,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        data: dataLogin,
      },
    });

  }
  getSoLuongDonHang() {
    this.props.dispatch(getSoLuongDonHang({ userId: this.props.userID, })).then((data) => {
      this.setState({ SoLuongDonHang: data, });
    });

  }
  getInforKH() {
    // public string getInforKH(string token, string imei, string userId)
    this.props.dispatch(getInforKH({ userId: this.props.userID, })).then((data) => {
      if (data) {
        // alert(JSON.stringify(data))
        this.setState({ DoanhSo: data[0], CAPDO: data[0].CAPDO });
      }
    });
  }
  getdoanhso() {
    this.props.dispatch(getdoanhso({ khid: this.props.userID, })).then((data) => {
      if (data) {
        // alert(JSON.stringify(data));
        this.setState({ DoanhSoNam: data, });
      }
    });
  }

  setModalVisible(tt, index) {

    const { navigator, } = this.props;
    navigator._push({
      name: IDs.ListDH,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        index: index,
        userId: this.props.userID,
        dispatch: this.props.dispatch,
      },


    });

  }
  logout() {
    Alert.alert(
      'Thông báo',
      'Bạn chắt chắn muốn thoát chương trình ',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => AppsController.startlogin(), },
      ],
      { cancelable: false, },
    );
  }
  exit = () => {
    //   this.props.dispatch(
    //     push({
    //       routeName: RouteKey.Login,
    //       params: { data: data, onBack: null, },
    //     })
    //   );
  }

  xoadonhang(item) {
    // alert(item)
    this.props.dispatch(xoadonhang({ dhId: item, userId: this.props.userID, })).then((data) => {
      if (data) {
        // alert(JSON.stringify(data))
        if (data[0].RESULT == '1') {
          const listdonhang = this.state.listdonhang.filter((w) => w.MADH !== item);
          this.setState({ listdonhang: listdonhang, });
          this.getSoLuongDonHang();
        } else {
          Notify.show('Lỗi xóa đơn', data[0].MSG);
        }

      }
    });


  }
  Press_lsdiem = () => {

    const { navigator, } = this.props;
    navigator._push({
      name: IDs.ListSuDiem,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind:false, }, }),
        },
        topBar: {
          visible: true,
          drawBehind: false,
          background: {
            color: Colors.HeaderColor,
          },

          title: {
            text: 'Lịch sử điểm',
            color: 'white'
          },
        },
      },
      passProps: {

        userId: this.props.userID,
        dispatch: this.props.dispatch,
      },


    });

  }
  OpenSceneQuaOPV = () => {
    const { navigator, } = this.props;
    navigator._push({
      name: IDs.SceneQuaOPV,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
        topBar: {
          visible: true,
          drawBehind: false,
          background: {
            color: Colors.HeaderColor,
          },

          title: {
            text: 'Quà OPV',
            color: 'white'
          },
          rightButtons: [

            {
              id: 'btntop_save',
              
              text:'LƯU',
              fontSize: RFValue(12),
              color: 'white',
             // icon: CommonIcons.done,
            },
            {
              id: 'btntop_add',
              color: 'white',
              fontSize: RFValue(12),
              text:'THÊM SP',
             // icon: CommonIcons.done,
            },
          ],
        },
      },
      passProps: {

        userId: this.props.userID,
        dispatch: this.props.dispatch,
      },


    });

  }
  OpenSceneTB = () => {
    const { navigator, } = this.props;
    navigator._push({
      name: IDs.CttbScene,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
        topBar: {
          visible: true,
          drawBehind: false,
          background: {
            color: Colors.HeaderColor,
          },

          title: {
            text: 'Trưng bày',
            color: 'white'
          },
        },
      },
      passProps: {

        userId: this.props.userID,
        dispatch: this.props.dispatch,
      },


    });

  }
  OpenSceneTl = () => {
    const { navigator, } = this.props;
    navigator._push({
      name: IDs.SceneTl,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
        topBar: {
          visible: true,
          drawBehind: false,
          background: {
            color: Colors.HeaderColor,
          },

          title: {
            text: 'Đăng ký tích lũy',
            color: 'white'
          },
        },
      },
      passProps: {

        userId: this.props.userID,
        dispatch: this.props.dispatch,
      },


    });

  }
  render() {

    return (
      <View style={{ backgroundColor: Colors.backgroundL1, }}>
        <ViewTabProfile
          ThongtinTK={() => { this.ThongtinTK(); }}
          setModalVisible={(tt, index) => this.setModalVisible(tt, index)}
          data={data}
          SoLuongDonHang={this.state.SoLuongDonHang}
          logout={() => this.logout()}
          dataLogin={this.props.dataLogin}
          dataImgs={this.state.img}
          changeAvatar={this.changeAvatar}
          DoanhSo={this.state.DoanhSo}
          DoanhSoNam={this.state.DoanhSoNam}
          DiemTLKH={this.props.ShopControl.DiemTLKH}
          capdo={this.state.CAPDO}
          Press_lsdiem={this.Press_lsdiem}
          OpenSceneTB={this.OpenSceneTB}
          OpenSceneTl={this.OpenSceneTl}
          OpenSceneQuaOPV={this.OpenSceneQuaOPV}
        >

        </ViewTabProfile>

      </View>
    );
  }
}

export default connect((state) => ({
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
  ShopControl: state.ShopControl
}), (dispatch) => ({ dispatch, }))(TabProfile);