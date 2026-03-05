
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
import ViewQuanMatKhau from './ViewChuphinhTB';
import ViewDialog from '../DialogView/DialogView';
import { AppNavigation } from '../../../app-navigation';
import { showSuccess } from '../../../utils/SnackBar';
import { } from './actions';
import { connect } from 'react-redux'
import { sendOTPZMS_API, xacnhanOTP } from '../ChitietGQuaTang/Action/ChitietSp.action';
import { LuuThongTintaiKhoan_Shop } from '../TTTK/Actions/Action';

class QuenMatKhau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OTP: '',
      optSuccess: 0,
      loadding: false,
      form: {
        sdt: '',
        pasmoi1: '',
        pasmoi2: '',
      },

    };
  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);

    this.sendOTP_API()
  }
  sendOTP_API() {
    const params = {
      user_id: this.props.sodienthoai,
      type: 2//
      ,khid:this.props.khid
    };

    this.setState({ loadding: true })
    this.props.dispatch(sendOTPZMS_API(params)).then((res) => {
      console.log('sendOTPZMS_API', res)
      this.setState({ loadding: false })
      if (res) {
        this.setState({ loadding: false, })
        if (res == 1) {
          //this.showOTP();
          showSuccess("Gởi otp thành công")
          return
        } else Alert.alert("Thông báo", 'Lỗi gởi OTP:'+ res)
      }

    });
  }
  xacnhanOTP = () => {
    const { OTP, cur_sp } = this.state
    if (OTP.length < 6) {
      return Alert.alert("Thông báo ", "OTP không hợp lệ")
    }

    this.setState({ loadding: true })
    const params = {
      user_id: this.props.sodienthoai,
      OTP: OTP,
      type: '2'  /// reset mat khaiu
      ,khid:this.props.khid
    };
    this.props.dispatch(xacnhanOTP(params)).then((res) => {
      console.log('xacnhanOTP', res)

      this.setState({ loadding: false })
      if (res) {
        this.setState({ loadding: false, })
        if (res == 1) {
          this.setState({ optSuccess: 1 })
          return
        } else Alert.alert("Thông báo", res)
      }

    });

  }

  onSubmit = () => {
    let form = this.state.form;


    if (form.pasmoi1.length === 0) {
      return AppNavigation.showCommonDialog({
        title: 'Thông báo',
        desc: 'Chưa nhập mật khẩu mới',
      });
    }
    if (form.pasmoi1 !== form.pasmoi2) {
      return AppNavigation.showCommonDialog({
        title: 'Thông báo',
        desc: 'Mật khẩu không khớp',
      });
    }

    const params = {
      dienthoai: this.props.sodienthoai,
      matkhaumoi: form.pasmoi1,
      opt:this.state.OTP,
      khid:this.props.khid
    };
    this.props.dispatch( LuuThongTintaiKhoan_Shop(params)).then((data) => {
      if(data[0].RESULT==1){

        showSuccess("đổi mật khẩu thành công")
        this.props.navigator._pop()
        return
      }else  Alert.alert("Thông báo", data[0].MSG)


    });

  }

  onChangeText(text, type) {
    // alert(text+type)
    const form = this.state.form;
    form[type] = text;
    return this.setState({ form: form, });
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'btntop') {
      //showSuccess('Lưu thành công')
      this.props.navigator._pop()
    }
  }

  handleTextChange(t) {
    this.setState({ OTP: t })


  }
  xacnhanOTP() {

    const { OTP, optSuccess } = this.state
    if (OTP.length < 6) {
      return Alert.alert("Thông báo", "OTP không hợp lệ")
    }



  }
  render() {
    const { loadding, optSuccess } = this.state

    return (
      <ViewQuanMatKhau
        optSuccess={optSuccess}
        loadding={loadding}
        xacnhanOTP={this.xacnhanOTP}
        sodienthoai={this.props.sodienthoai}
        handleTextChange={(t) => this.handleTextChange(t)}
        pasmoi1={this.state.form.pasmoi1}
        pasmoi2={this.state.form.pasmoi2}
        onChangeText={(t, l) => this.onChangeText(t, l)}
        onSubmit={this.onSubmit}
      />


    );
  }
}
export default connect((state) => ({
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
  ShopControl: state.ShopControl
}), (dispatch) => ({ dispatch, }))(QuenMatKhau);