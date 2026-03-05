
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TextInput
} from 'react-native';

import { ErrorMessage, TextCmp } from '../../../common-components';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import { Colors } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { PulseIndicator } from 'react-native-indicators';
import OTPTextInput from 'react-native-otp-textinput'

export default class ViewQuanMatKhau extends React.Component {


  render() {
    const {
      sodienthoai,
      handleTextChange,
      xacnhanOTP,
      loadding,
      optSuccess,
      onChangeText,
      pasmoi1,
      pasmoi2,
      onSubmit
    } = this.props

    return (
      <View style={styles.content}>

        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          {!optSuccess ? <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '95%' }}>
              <TextCmp style={styles.txtTT}>Xác thực OTP</TextCmp>

              <OTPTextInput inputCount={6} handleTextChange={(text) => handleTextChange(text)} autoFocus={true} ref={e => (this.otpInput = e)} ></OTPTextInput>
            </View>
            <TextCmp style={{ padding: 20 }}>Mã xác thực OTP được gởi về số điện thoại {sodienthoai}</TextCmp>


            {loadding ? <ActivityIndicator size={'large'}></ActivityIndicator> : <TouchableOpacity onPress={() => xacnhanOTP()} style={styles.btnDangky}>
              <TextCmp>Xác nhận</TextCmp>
            </TouchableOpacity>}
          </View> : <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <TextInput
              underlineColorAndroid="transparent"
              style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '80%', margin: 5, height:55}}
              onChangeText={(text) => onChangeText(text, 'pasmoi1')}
              placeholder={'mật khẩu mới'}
              value={pasmoi1}
              secureTextEntry={true}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '80%', margin: 5,height:55 }}
              onChangeText={(text) => onChangeText(text, 'pasmoi2')}
              placeholder={'nhập lại mật khẩu mới'}
              value={pasmoi2}
              secureTextEntry={true}
            />
            {loadding ? <ActivityIndicator size={'large'}></ActivityIndicator> : <TouchableOpacity onPress={() => onSubmit()} style={styles.btnDangky}>
              <TextCmp>Lưu</TextCmp>
            </TouchableOpacity>}
          </View>


          }


        </View>

      </View>
    );
  }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  content: {
    flex: 1,

    backgroundColor: Colors.BackgrondLightOPV5,


  },
  wrapContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  wrapCapture: {
    //backgroundColor: Colors.BackgrondLightOPV1,
    marginTop: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 15,
    borderColor: Colors.BackgrondLightOPVGreen2

  },
  wrapdangky: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor:Colors.BackgroundLightBlue,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: Colors.BackgrondLightOPVGreen2,
    borderRadius: 10,
  },
  rowsStyle: {
    flexDirection: 'row', padding: 15,
    justifyContent: 'space-between', width: '100%', borderColor: Colors.BackgrondLightOPV5, borderBottomWidth: 1, borderStyle: 'dashed', borderRadius: 5,
  },
  btntap: {
    width: '50%', borderBottomWidth: 3, padding: 15,
    padding: 7, borderColor: '#9E100C', justifyContent: 'center'
    , height: 55, backgroundColor: Colors.textOPVGreen, marginRight: 0.5
  },
  txtTT: { textAlign: 'center', fontWeight: 'bold', fontSize: RFValue(18), color: Colors.HeaderColor, margin: 20 },
  tabView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, width: '100%', },
  ViewLine: {
    height: 45, alignItems: 'center', padding: 10, backgroundColor: '#E65E20', flexDirection: 'row', justifyContent: 'space-between',
    marginVertical: 10
  },
  dropdownView: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
    fontSize: RFValue(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingLeft: 5
    // backgroundColor: 'red',
  },
  imgPicture: {
    width: 150,
    height: 150,
    borderRadius: 5
  },
  imageView: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,

  },
  btnDangky: {

    width: 220, height: 55,
    //shadowColor: 'rgba(0,0,0,1)',
    //shadowOffset: { width: 1, height: 3, },
    //shadowOpacity: 0.2,
    //shadowRadius: 2,
    // elevation: 3,
    borderColor: Colors.textOPVGreen,
    // backgroundColor: Colors.textOPVGreen,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 25



  }
})