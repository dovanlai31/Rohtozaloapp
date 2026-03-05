
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {connect,}from 'react-redux';
import * as AppsController from '../../../AppController';
import ViewAccount from './view/viewaccount';
import { ThayDoiMatKhau, } from './actions';
import { SnackBar, } from '../../../utils';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ddkdId:'', // this.props.ddkdId,
        matkhaucu: '',
        matkhaumoi: '',
        repeat: '',

      },
      userName:'',
    };
  }
  
  onChangeText = (text, name) => {
    const { user, } = this.state;
    user[name] = text;
    this.setState({ user, });
  };
  dangxuat=()=>{
    Alert.alert(
      'Thông Báo',
      'Bạn có muốn thoát chương trình',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => AppsController.startlogin(),},
      ],
    
    );
   
  }
  onSave = () => {
    const { matkhaucu, matkhaumoi, repeat, } = this.state.user;
    if (matkhaucu === '' || matkhaumoi === '' || repeat === '') {
      return Alert.alert(
        'Lỗi',
        'Không được bỏ trống các ô nhập dữ liệu',
      );
    }

    if (matkhaumoi !== repeat) {
      return  Alert.alert(
        'Lỗi',
        'Mật khẩu xác nhận không trùng khớp',
      );
    }
 
    this.props.dispatch(ThayDoiMatKhau(this.state.user)).then((res)=>{
      if(!res)
      {alert('lỗi');}
      else
      
      {
        SnackBar.showSuccess('Lưu thành công');
        // AppsController.startlogin();
      }
    });
  };
  render(){
    return (
      <ViewAccount
        dangxuat={this.dangxuat}
        user={this.props.listBranch}
        userName={this.props.listBranch.ID +'-'+ this.props.listBranch.TEN }
        onChangeText={this.onChangeText}
        onSave={this.onSave}
        isupdate={true}
      ></ViewAccount>
    );
  }
}
export default connect(
  (state) => ({
    listBranch: state.app.listBranch,
  }),
  (dispatch) => ({ dispatch, }),
)(Account);