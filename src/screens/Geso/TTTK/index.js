import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import ViewTTTK from './View/ViewTTTK';
import { LuuThongTintaiKhoan, } from './Actions/Action';
import { AppNavigation, } from '../../../app-navigation';
import { Logg, } from '../../../utils';
import { Colors, } from '../../../theme';
import { CommonIcons, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';

class TTTK extends React.Component {
    static options = {
      statusBar: {
        backgroundColor: Colors.statusBar,
        // drawBehind: true,
        visible: true,
      },
      topBar: {
        visible: true,
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
          text: 'Thông Tin TK',
        },
      },
    };


    constructor(props) {
      super(props);
      this.state = {
        checked: false,
        form: {
          hoten: '',
          sdt: '',
          diachi: '',
          pascu: '',
          pasmoi1: '',
          pasmoi2: '',
        },
        lock: false,

      };
      
      Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    SetRating(x) {
      this.setState({ valrate: x, });
    }
    navigationButtonPressed({ buttonId, }) {
      if(buttonId==='km_BACK')
      {this.props.navigator._pop();}
    }
    componentDidMount() {
    // lock btn back in android
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

      let lock = this.props.lock;
      if (lock) {
        this.setState({ checked: true, lock: true, });
      }
      let data = this.props.data;
      let form = this.state.form;
      form.hoten = data.ten;
      form.sdt = data.dienthoai;
      form.diachi = data.diachi;
      this.setState({ form: form, });
    }
    componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
    // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
      return true;
    }

    onSubmit = () => {

      let form = this.state.form;

      if (this.state.checked) {
        if (form.pascu.length === 0){
          return   AppNavigation.showCommonDialog({
            title: 'Thông báo',
            desc: 'Chưa nhập mật khẩu cũ',
          });
        }
        if (form.pasmoi1.length === 0){
          return   AppNavigation.showCommonDialog({
            title: 'Thông báo',
            desc: 'Chưa nhập mật khẩu mới',
          });
        }
        if (form.pasmoi1 !== form.pasmoi2){
          return  AppNavigation.showCommonDialog({
            title: 'Thông báo',
            desc: 'Mật khẩu không khớp',
          });  
        }
      }
      const params = { userId: this.props.userID, hoten: form.hoten, diachi: form.diachi, dienthoai: form.sdt, matkhaucu: form.pascu, matkhaumoi: form.pasmoi1, };
      this.props.dispatch(LuuThongTintaiKhoan(params)).then((data) => {

        AppNavigation.showCommonDialog({
          title: 'Thông báo',
          desc: ''+data[0].MSG,
        });  
        if (data[0].MSG === 'Cập nhật thành công!' && this.state.lock) {
             

          let someArray= ['1',];
          AsyncStorage.setItem('ischangepass', JSON.stringify(someArray))
            .then((json) => Logg.info('success!'))
            .catch((error) => Logg.info('error!'));
            
          // this.props.dispatch(pop());
          this.state({ lock: false, });
        }

      });

    }
    checkedclick = () => {
      if (!this.state.lock)
      {this.setState({ checked: !this.state.checked, });}
    }
    onChangeText(text, type) {
      // alert(text+type)
      const form = this.state.form;
      form[type] = text;
      return this.setState({ form: form, });
    }
    render() {
      return (
        <View style={{ flex: 1,backgroundColor:'white' }}>
          <ViewTTTK
            hoten={this.state.form.hoten}
            sdt={this.state.form.sdt}
            diachi={this.state.form.diachi}
            checked={this.state.checked}
            checkedclick={this.checkedclick}
            pascu={this.state.form.pascu}
            pasmoi1={this.state.form.pasmoi1}
            pasmoi2={this.state.form.pasmoi2}
            onChangeText={(t, l) => this.onChangeText(t, l)}
            onSubmit={this.onSubmit}
            lock={this.state.lock}
          ></ViewTTTK>
        </View>
      );
    }
}

export default connect((state) => ({
  userID: state.login.userID,
}), (dispatch) => ({ dispatch, }))(TTTK);