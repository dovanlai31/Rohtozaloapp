import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import {

  PulseIndicator,

} from 'react-native-indicators';
import { Colors, } from '../../../theme';
import { TextCmp, } from '../../../common-components';
import { CheckBox, } from 'react-native-elements';
import { HomeICon, ImgICon, ImgOPV, } from '../../../assets';
import Checkupdate from './checkupdate';
import Iconx from '../../../assets/Icons';
import AppValue from '../../../values/AppValue';
import Icons from 'react-native-vector-icons/dist/FontAwesome5'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('screen')
export default class LoginView extends React.Component {
  // shouldComponentUpdate(userName, pass, checked) {
  //   return userName !== this.props.userName || pass !== this.props.pass || checked !== this.props.checked;
  // }
  render() {
    const {
      onLogin,
      onChangeText,
      pass,
      userName,
      dangky,
      checked,
      showPassword,
      checkedclick, Loading, toggleShowPassword, ListUser, ShowListUser, SelectionCus, onEndEditing, resetPass } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ImageBackground source={ImgOPV.bgMain} resizeMode={'cover'} style={{ width, height, backgroundColor: 'fcfdff' }} >
          <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={styles.container}>
            {/* <View style={styles.ViewTop}></View> */}
            {/* <View style={{
          position: 'absolute', top: 50, width: 100, height: 100, backgroundColor: '#eeee', borderRadius: 50,
          justifyContent: 'center', alignItems: 'center',

        }}>
          <IconAntDesign color={Colors.HeaderColor} name="user" size={30} />
        </View> */}
            {/* <StatusBar backgroundColor={Colors.statusBar} barStyle="dark-content" /> */}
            <View style={styles.ViewtitleText}>
              {/* <TextCmp style={{color:Colors.textOPVCopper2,      textAlign:'right',  fontWeight:'bold',fontSize:RFValue('20')}}>Đăng Nhập
            </TextCmp> */}
              <Image resizeMode='contain' style={{ width: width / 2.5, height: 140, alignItems: 'flex-end' }} source={ImgOPV.LogoLoginP}></Image>
            </View>
            {/* <View style={styles.ViewtitleText2}>  

               <Image resizeMode='contain' style={{  flex:1,width: width/1.5, alignItems:'flex-end',}} source={ImgOPV.textlogo}></Image>
            </View> */}


            <View style={styles.viewInput}>
              {/* <Image source={BottomBarAssets.Account} style={styles.icon_account} ></Image> */}
              {/* <Icon color='blue' name="username" size={18} /> */}

              <View style={{ flex: 5, marginLeft: 10, }}>
                <TextInput
                  onEndEditing={() => onEndEditing()}
                  underlineColorAndroid="transparent"
                  placeholder="Tên đăng nhập"
                  style={styles.textInput}
                  value={userName}
                  keyboardType='phone-pad'
                  onChangeText={(text) => onChangeText(text, 'tendangnhap')}
                />


              </View>
            </View>
            <View style={styles.viewInput}>
              {/* <Image source= {BottomBarAssets.lock} style = {styles.icon_account}></Image> */}
              {/* <Icon color='blue' name="pass" size={18} /> */}
              <View style={{ flex: 5, marginLeft: 10, }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Mật khẩu"
                  style={styles.textInput}
                  value={pass}

                  secureTextEntry={!showPassword}
                  onChangeText={(text) => onChangeText(text, 'matkhau')}
                />
              </View>
              <Icon
                size={24}
                name={showPassword ? 'water' : 'water-off'}
                type='material-community'
                color={showPassword ? Colors.textOPVGreen : Colors.textOPVGreen}
                onPress={toggleShowPassword} />
            </View>
            {/* <CheckBox
            center
            title='Lưu đăng nhập'
            checked={checked}
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor={Colors.HeaderColor}
            size={18}
            containerStyle={styles.checkbox}
            textStyle={{ fontSize: 12, fontWeight: 'normal', color: 'gray', }}
            onPress={checkedclick}
          /> */}


            <TouchableHighlight
              onPress={onLogin}
              style={styles.btnLogin}
              underlayColor="transparent"
              disabled={Loading}
            >
              <>

                {Loading ?
                  <PulseIndicator style={{ alignItems: 'center' }} size={20} color={'white'} />
                  :
                  <>
                    <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: null }}>
                      <Icons style={{}} fontSize={'15'} color={'white'} name="shopping-cart" />
                    </View>
                    <TextCmp style={styles.loginColor}>{'Đăng nhập'}

                    </TextCmp>
                  </>

                }




              </>
            </TouchableHighlight>
            {/* 
         <TextCmp onPress={onLogin}>Click to Login</TextCmp>
                    <TextCmp>{loginStatus}</TextCmp>  */}
            <TouchableOpacity onPress={() => resetPass()} style={{ padding: 10, marginTop: 10 }}>
              <TextCmp style={{ fontWeight: 'bold', color: 'black', fontSize: RFValue(12) }}>Quên mật khẩu?</TextCmp>
            </TouchableOpacity>
            {/* <View style={{padding:10}}>
            <TextCmp style={{color:'gray',fontSize:12}}>-----------------Hoặc------------------</TextCmp>
          </View> */}
            {/* <TouchableOpacity onPress={() => dangky(1)} style={{ padding: 10 }}>
              <TextCmp style={{ fontSize: RFValue(12) }}>Bạn chưa có tài khoản?  <TextCmp style={{ fontWeight: 'bold', color: 'black', fontSize: RFValue(12) }}>Đăng ký</TextCmp></TextCmp>
            </TouchableOpacity> */}
            <TextCmp style={{ fontSize: 8, margin: 20, color: 'gray', }}>phiển bản: {AppValue.VSAPPINFO.puclic_day + ' -  ' + AppValue.MODE}</TextCmp>
            <Checkupdate></Checkupdate>
          </TouchableOpacity>
        </ImageBackground>

        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowListUser}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            // setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.viewTittle}>
                <TextCmp style={styles.modalText}>{'Chọn khách hàng ?'.toLocaleUpperCase()}  </TextCmp>
              </View>
              <ScrollView>
                {ListUser && ListUser.map(cus => {
                  return (
                    <TouchableOpacity onPress={() => SelectionCus(cus)} key={cus.pk_seq + ''} style={styles.rowSlectCus}>
                      <Image style={styles.avatar} source={{ uri: cus.avatar }} ></Image>
                      <TextCmp style={{ width: '90%', fontSize: RFValue('12'), paddingHorizontal: 10, textTransform: 'capitalize' }}>{cus.pk_seq}-{cus.ten}</TextCmp>
                      {/* <IconAntDesign name='right'></IconAntDesign> */}
                    </TouchableOpacity>
                  )
                })

                }
              </ScrollView>




            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.6)'
    // backgroundColor: 'black',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F5F5F5' },
  rowSlectCus: { flexDirection: 'row', alignItems: 'center', padding: 10, width: '90%', justifyContent: 'space-between', },
  ViewTop: {
    backgroundColor: Colors.HeaderColor, height: width * 2, width: width * 2, position: 'absolute'
    , top: -width * 2 + 100, borderRadius: 45, justifyContent: 'center'
  },
  txtTitle: {
    fontSize: 24,
    margin: 20,
    color: Colors.HeaderColor,
  },
  viewTittle: {
    height: 55, justifyContent: 'center', alignItems: 'center'
    , width: '95%', shadowRadius: 4,
    borderBottomColor: Colors.text, borderBottomWidth: .4
  },
  viewInput: {

    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    width: '70%',
    borderBottomColor: Colors.textOPVGreen,

    //
    marginHorizontal: 30,
    marginVertical: 20,
    //
    //backgroundColor:'red'

  },
  textInput: { color: Colors.accent, fontSize: RFValue(18) },
  btnLogin: {
    flexDirection: 'row',
    width: '70%',
    height: 50,
    backgroundColor: Colors.textOPVGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,


    marginTop: 30,
    marginHorizontal: 30,
  },
  logoimg: { width: width / 2.5, height: width / 3.5, marginBottom: 50, },
  loginColor: { color: 'white', fontWeight: 'bold', },
  icon_account: { width: 20, height: 20, tintColor: 'gray', },
  checkbox: { alignItems: 'flex-end', backgroundColor: 'white', width: '100%', borderColor: 'white', },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  ViewtitleText: {
    color: Colors.textOPVGreen,
    width: '70%',

    // backgroundColor:'red',
    alignItems: 'flex-end'
  },
  ViewtitleText2: {
    color: Colors.textOPVGreen,
    width: '70%',
    height: 150,
    // backgroundColor:'red',
    alignItems: 'flex-end'
  },
  modalView: {
    //margin: 20,
    // position:'absolute',bottom:0,
    width: '80%',
    padding: 3,
    backgroundColor: "transparent",
    borderRadius: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    height: '60%',
    backgroundColor: 'white'

  },
  modalText: { fontWeight: 'bold', fontSize: RFValue(12), color: Colors.textOPVCopper2 }
});
