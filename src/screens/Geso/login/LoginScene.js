import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Keyboard,
  Platform,
  AsyncStorage,
} from 'react-native';
import * as AppsController from '../../../AppController';
import { TextCmp } from '../../../common-components';
import * as LoginAction from './loginAction';
import { AppNavigation } from '../../../app-navigation';
import { Logg } from './../../../utils';
import LoginView from './LoginView';
import { IDs } from '../..';
import codePush from 'react-native-code-push';
import { connect } from 'react-redux';;
import Notify from '../../../utils/Notify';
import ViewDialog from '../../DialogView/DialogView';
import { Alert } from 'react-native';
import ResetPassView from './ResetPassView';
import { Colors } from '../../../theme';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const createListDropdown = (string) => {
  let list = [];

  let index = string.indexOf(';');
  let indexOfHyphen = null;
  // string = string.slice(index + 1, string.length);
  //
  // index = string.indexOf(';');
  while (index !== -1) {
    let temp = string.slice(0, index);
    indexOfHyphen = temp.indexOf('-');
    list.push({
      id: temp.slice(0, indexOfHyphen),
      label: temp.slice(indexOfHyphen + 1, temp.length),
    });
    string = string.slice(index + 1, string.length);
    index = string.indexOf(';');
  }

  indexOfHyphen = string.indexOf('-');

  list.push({
    id: string.slice(0, indexOfHyphen),
    label: string.slice(indexOfHyphen + 1, string.length),
  });
  return list;
};

class LoginGeso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      user: {
        tendangnhap: '',
        matkhau: '',
        isAndroid: Platform.OS === 'android' ? 1 : 0,
        versionCode: '999999999999',
        versionName: '9999999999999',
        NhaCCid: '',
        imei: '',
        token: '',
        khid: '',
      },
      Skiplogin: 1,
      showdangky: 0,
      showResetpass: 0,
      step: 0,
      loainv: 0,
      disabled: false,
      showPassword: false,
      userregister: {
        tennhathuoc: {
          value: '',
          isValidate: false,
          label: 'Tên nhà thuốc*',
          dungchung: true,
          err: 'Vui lòng nhập tên nhà thuốc',
        },
        ngaysinh: {
          value: '',
          isValidate: false,
          label: 'Ngày sinh*',
          err: 'Vui lòng nhập ngày sinh ',
        },
        diachi: {
          value: '',
          isValidate: false,
          label: 'Địa chỉ xuất HĐ* ',
          err: 'Vui lòng nhập địa chỉ',
        },
        mst: {
          value: '',
          isValidate: false,
          label: 'Mã số thuế* ',
          err: 'Vui lòng nhập Mã số thuế',
        },
        anhcuahieu: {
          // Chụp ảnh cửa hiệu
          value: '',
          isValidate: true,
          source1: null, // anhr anhdGpd
          label: 'Ảnh cửa hiệu',
          err: 'Vui lòng chụp ảnh cửa hiệu',
        },
        GxPs: {
          // Chụp ảnh GxPs
          value: '',
          isValidate: true,
          source2: null, // anhr anhdGpd
          label: 'Ảnh GxPs',
          err: 'Vui lòng chụp  ảnh GxPs',
        },
        dudieukienkd: {
          // Chụp ảnh giấy chứng nhận đăng ký kinh doanh DKKD
          value: '',
          isValidate: true,
          source3: null, // anhr anhdGpd
          label: 'Ảnh đăng ký kinh doanh DKKD',
          err: 'Vui lòng chụp ảnh đăng ký kinh doanh DKKD',
        },
        andGpdkd: {
          // anh andGpdkd
          value: '',
          isValidate: true,
          source4: null, // anhr anhdGpd
          label: 'Ảnh GPKD',
          err: 'Vui lòng chụp  ảnh giấy phép kinh doanh',
        },
        soGPKD: {
          // anh andGpdkd
          value: '',
          isValidate: false,
          label: 'số giấy phép KD*',
          err: 'Vui lòng chụp  ảnh giấy phép kinh doanh',
        },

        tinhthanh: {
          value: '',
          text: '',
          isValidate: false,
          label: 'Tỉnh/Thành*',
          title: 'Chọn tỉnh thành',
          err: 'Vui lòng nhập tỉnh thành',
        },
        quanhuyen: {
          value: '',
          text: '',
          isValidate: false,
          label: 'Quận huyện*',
          title: 'Chọn quận huyện',
          err: 'Vui lòng nhập quận huyện ',
        },
        phuongxa: {
          value: '',
          text: '',
          isValidate: false,
          label: 'Phường xã*',
          title: 'Chọn phường xã',
          err: 'Vui lòng nhập phường xã',
        },
        sdt: {
          value: '',
          isValidate: false,
          label: 'Số di dộng *',
          err: 'Vui lòng nhập Số điện thoại',
        },
        loaikh: {
          value: '',
          text: '',
          isValidate: false,
          list: [],
          label: 'Loại khách hàng*',
          title: 'Chọn loại hàng khách',
          err: 'Vui lòng chọn loại hàng khách',

        },
        hangkh: {
          value: '100007',
          text: 'D',
          isValidate: true,
          list: [],
          label: 'Hạng khách hàng*',
          title: 'Chọn hạng khách hàng',
          err: 'Vui lòng chọn hạng khách hàng',
        },
        khuvuc: {
          value: '',
          text: '',
          isValidate: false,
          list: [],
          label: 'Khuc vực*',
          title: 'Khu vực',
          err: 'Vui lòng khu vực',
        },

        matkhau: {
          value: '',
          isValidate: false,
          label: 'Mật khẩu*',
          err: 'Vui lòng nhập Mật khẩu',
        },

      },
      tinhthanhList: [],
      quanhuyenList: [],
      ListXaPhuong: [],
      tinhthanhLabel: 'Chọn tỉnh thành',
      ListNCC: [],
      ShowListUser: false,
      ListUser: null,
      khid_old: '',
      hightLightFields: {}
    };
  }
  componentDidMount() {


    // this.getListXaPhuong();
    // this.getListNCC();
    const user = this.state.user;
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let val = store[i][1];

          if (key === 'username' && val.length > 0) {
            user.tendangnhap = val;
            this.setState({ user, checked: true });
          }
          if (key === 'pass' && val.length > 0) {
            user.matkhau = val;
            this.setState({ user });
          }
          if (key === 'khid' && val.length > 0) {
            user.khid = val;
            this.setState({ user, khid_old: val });
          }
        });
      });
    });
  }

  onChangeText = (text, name) => {
    const { user } = this.state;
    user[name] = text;
    this.setState({ user });
    if (name == 'tendangnhap' && text.length == 10 && user.khid == '') {
      this.onEndEditing();
    }
  };


  getListNCC = () => {
    this.props.dispatch(LoginAction.getListNCC()).then(res => {
      if (res && res.length > 0) {
        let listdata = [];

        JSON.parse(res[0].content).map(item => {
          let item2 = {
            label: item.Ten,
            id: item.Pk_seq,
          };
          listdata.push(item2);
        });

        this.setState({ ListNCC: listdata });
      } else this.setState({ ListNCC: [] });
    });
    //} else {
  };



  onPressSelectNCC = () => {
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          title={'Chọn Nhà cung cấp'}
          content={this.state.ListNCC}
          onPressItem={item => {
            if (item.id != null) {
              const user = this.state.user;
              user.NhaCCid = item.id;
              this.setState({ NhaCC: item });
              this.onPressLogin(item.id);
            }
          }}
        />
      ),
    });
  };
  onEndEditing = c => {
    // check trùng khách hang số di động
    const { tendangnhap, matkhau } = this.state.user;
    if (tendangnhap !== '' ) {
      // this.setState({ Loading: true });
      this.props
        .dispatch(LoginAction.Check_Login_Muti_Cus(this.state.user))
        .then(_ => {
          //this.setState({ Loading: false });
          //
          if (_.RESULT == '-1') {
            this.setState({
              ShowListUser: true,
              ListUser: JSON.parse(_.ListUser),
            });
          } else {
            const { user } = this.state;
            user.khid = '';
            this.setState({ user });
          }
        })
        .catch(e => Logg.error(e));
    } else {
    }
  };
  onPressLogin = c => {
    const { tendangnhap, matkhau } = this.state.user;

    if (c && c.pk_seq) this.state.user.khid = c.pk_seq;

    if (tendangnhap !== '' && matkhau !== '') {
      this.setState({ Loading: true });
      this.props
        .dispatch(LoginAction.login(this.state.user))
        .then(_ => {
          this.setState({ Loading: false });
          if (_.RESULT === '1') {
            //luudata login
            this.checkedclick();
            this.goHome();
          } else if (_.RESULT === '-1') {
            // alert(JSON.stringify(_.ListUser))
            this.setState({
              ShowListUser: true,
              ListUser: JSON.parse(_.ListUser),
            });
          } else {
            Alert.alert('Đăng nhập lỗi', '' + _.MSG);
          }
        })
        .catch(e => Logg.error(e));

      /////save data login
      const user = this.state.user;
      let multi_set_pairs = [
        ['username', '' + user.tendangnhap],
        ['pass', '' + user.matkhau],
        ['khid', '' + user.khid],
      ];

      if (this.state.checked) {
        AsyncStorage.multiSet(multi_set_pairs, e => {
          //Logg.error(e);
        });
      }
    } else {
      AppNavigation.showCommonDialog({
        title: 'Đăng nhập không thành công',
        desc: 'Không được bỏ trống tên Tài khoản và Mật khẩu',
      });
    }
  };

  // requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         'title': 'Saleup',
  //         'message': 'Saleup' +
  //           ',  '

  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {

  //     } else {

  //     }
  //   } catch (err) {

  //     console.warn(err)
  //   }
  // }

  // shouldComponentUpdate(listkm) {
  //   return listkm != this.props.listkm;
  // }

  checkedclick() {
    const user = this.state.user;
    let multi_set_pairs = [
      ['username', '' + user.tendangnhap],
      ['pass', '' + user.matkhau],
    ];
    let multi_set_ = [['username', ''], ['pass', '']];

    // if (!this.state.checked) {
    AsyncStorage.multiSet(multi_set_pairs, err => { });
    // } else {
    //   AsyncStorage.multiSet(multi_set_, (err) => {
    //   });
    //   this.onChangeText('', 'userName');
    //   this.onChangeText('', 'pass');
    // }
    this.setState({ checked: !this.state.checked });
  }
  goHome() {
    AppsController.startHome();
  }

  getversion() {
    this.props
      .dispatch(
        LoginAction.getversion({
          code: 'mystring.vs_code',
          name: 'mystring.vs_name',
        }),
      )
      .then(_ => {
        if (_ === 0) {
          if (Platform.OS === 'android') {
            this.setState({ isshowupdate: true });
          }
        }
      })
      .catch();
  }
  dangky(t) {

    const { navigator, } = this.props;
    return navigator._push({
      name: IDs.RegisterUser,

    });
    //this.setState({ showdangky: this.state.showdangky == 0 ? 1 : 0 });
  }
  resetPass() {
    // this.setState({showResetpass: this.state.showResetpass == 0 ? 1 : 0});
    const { tendangnhap,khid } = this.state.user
    if (tendangnhap.length < 9) {
      return Alert.alert("Thông báo", "Vui lòng nhập số điện thoại")
    }
    const { navigator, } = this.props;
    return navigator._push({
      name: IDs.QuenMatKhau,
      passProps: {
        sodienthoai: tendangnhap,
        khid:khid 
      },
      options: {
        topBar: {
          title: {
            text: 'Quên mật khẩu',
          },
          background: {
            color: Colors.HeaderColor,
          },
          // visible: false,
          // _height: 0,
          // drawBehind: false,
          // rightButtons: [
          //   {
          //     id: 'btntop',
          //     icon: CommonIcons.done,
          //   },
          // ],
        },
        bottomTabs: {
          visible: false,
          ...Platform.select({android: {drawBehind: true}}),
        },
      },

    });

  }


  SaveResetPass = () => {
    const { userregister } = this.state;
    let payload = {};
    let chjecknull = '';
    for (var key in userregister) {
      if (key == 'sdt' || key == 'matkhau' || key == 'otp') {
        if (userregister[key].value.length < 1) {
          chjecknull =
            userregister[key].label + ' chưa nhập , vui lòng kiểm trả lại ';
        }
        payload[key] = userregister[key].value;
      }
    }
    if (chjecknull.length > 0) return Alert.alert('Thông báo', chjecknull);

    // return Alert.alert("Thông báo", 'OPT không hợp lệ')

    this.props.dispatch(LoginAction.SaveResetPass(payload)).then(res => {
      if (res) {
        if (res[0].RESULT == 1) {
          this.setState({ step: 0, showResetpass: false });
          Alert.alert('Thông báo', res[0].MSG);
          return;
        } else {
          Alert.alert('Thông báo', res[0].MSG);
        }
      } else {
        return Alert.alert('Thông báo', res[0].MSG);
      }
    });
  };
  checkMail = () => {
    const { userregister } = this.state;

    let payload = {};
    let chjecknull = '';
    for (var key in userregister) {
      if (key == 'sdt' || key == 'matkhau' || key == 'matkhau2') {
        if (userregister[key].value.length < 1) {
          chjecknull =
            userregister[key].label + ' chưa nhập , vui lòng kiểm trả lại ';
        }
        payload[key] = userregister[key].value;
      }
    }
    if (chjecknull.length > 0) return Alert.alert('Thông báo', chjecknull);

    if (payload.matkhau !== payload.matkhau2) {
      return Alert.alert(
        'Thông báo',
        'Mật khẩu xác nhận không khớp vui lòng kiểm tra lại',
      );
    }
    this.setState({ Loading: true });
    this.props.dispatch(LoginAction.checkMail(payload)).then(res => {
      this.setState({ Loading: false });
      if (res) {
        if (res[0].RESULT == 1) {
          let a = this.state.step + 1;
          this.setState({ step: a });
        } else {
          Alert.alert('Thông báo', res[0].MSG);
        }
      } else {
        return Alert.alert('Thông báo', res[0].MSG);
      }
    });
  };


  SelectionCus(c) {
    const { user } = this.state;
    user.khid = c.pk_seq;
    this.setState({ ShowListUser: false, user });
    // this.onPressLogin(c)
  }
  toggleShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };
  render() {
    let { loginStatus } = this.props;
    const { tendangnhap, matkhau } = this.state.user;
    const { userregister, tinhthanhLabel, ListUser, ShowListUser, hightLightFields } = this.state;
    // return<View></View>

    return (
      <LoginView
        onPressStatus={() => {
          //Toast.show('abc', Toast.POSITION.CENTER, Toast.LENGTH.SHORT);
        }}
        showPassword={this.state.showPassword}
        toggleShowPassword={() => this.toggleShowPassword()}
        onLogin={this.onPressLogin}
        onEndEditing={this.onEndEditing}
        loginStatus={loginStatus}
        onChangeText={this.onChangeText}
        userName={tendangnhap}
        pass={matkhau}
        checked={this.state.checked}
        checkedclick={() => this.checkedclick()}
        SkipLogin={this.state.Skiplogin}
        Loading={this.state.Loading}
        dangky={() => this.dangky()}
        showdangky={this.state.showdangky}
        resetPass={() => this.resetPass()}
        ShowListUser={ShowListUser}
        ListUser={ListUser}
        SelectionCus={c => this.SelectionCus(c)}
      />
    );
  }
}
MyApp = codePush(codePushOptions)(LoginGeso);
export default connect(
  state => ({
    // loginStatus: state.login.loginStatus,
  }),
  dispatch => ({ dispatch }),
)(MyApp);
