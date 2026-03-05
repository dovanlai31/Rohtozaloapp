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
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {PulseIndicator} from 'react-native-indicators';
import {Colors} from '../../../../theme';
import {DropdownInput, TextCmp, TxtInput} from '../../../../common-components';
import {CheckBox} from 'react-native-elements';
import {CommonIcons, HomeICon, ImgICon} from '../../../../assets';
import Icons from 'react-native-vector-icons/dist/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {DateInput} from '../../../../common-components/DateInput';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('screen');
export default class RegisterView extends React.Component {
  // shouldComponentUpdate(userName, pass, checked) {
  //     return userName !== this.props.userName || pass !== this.props.pass || checked !== this.props.checked;
  // }
  render() {
    const {
      onLogin,
      setloainv,
      onChangeText,
      onPressPrev,
      pass,
      userName,
      dangky,
      checked,
      checkedclick,
      loainv,
      onPressNext,
      takePic,
      onChangeTextRegister,
      disabled,
      Loading,
      userregister,
      onPressDropdown,
      tinhthanhLabel,
      SelectPhuongXa,
      hightLightFields,
    } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{paddingTop: 30}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
            style={''}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={styles.content}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <TouchableHighlight
                  onPress={onPressPrev}
                  style={[
                    styles.btnLoginC,
                    {
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: Colors.textOPVGreen,
                    },
                  ]}
                  underlayColor="transparent"
                  disabled={Loading}>
                  <View>
                    <TextCmp
                      style={{color: Colors.textOPVGreen, fontWeight: 'bold'}}>
                      X
                    </TextCmp>
                  </View>
                </TouchableHighlight>
                <TextCmp
                  style={{
                    color: Colors.textOPVCopper2,
                    fontSize: RFValue(16),
                    fontWeight: 'bold',
                  }}>
                  ĐĂNG KÝ TÀI KHOẢN
                </TextCmp>
              </View>
              <View style={{}}>
                <View style={{marginVertical: 5}}>
                  <TxtInput
                    hightLight={hightLightFields['tennhathuoc']}
                    label={userregister.tennhathuoc.label}
                    text={userregister.tennhathuoc.value}
                    starCheck= {true}
                    style={styles.textInput}
                    onChange={text => onChangeTextRegister(text, 'tennhathuoc')}
                  />
                  <DateInput
                    hightLight={hightLightFields['ngaysinh']}
                    placeholder={'Ngày sinh'}
                    starCheck= {true}
                    date={userregister.ngaysinh.value}
                    onChangeDate={text =>
                      onChangeTextRegister(text, 'ngaysinh')
                    }
                  />
                  <TxtInput
                    hightLight={hightLightFields['sdt']}
                    label={userregister.sdt.label}
                    value={userregister.sdt.value}
                    starCheck= {true}
                    keyboardType="numeric"
                    style={styles.textInput}
                    onChange={text => onChangeTextRegister(text, 'sdt')}
                    placeholder=""
                  />

                  <TxtInput
                    hightLight={hightLightFields['matkhau']}
                    secureTextEntry={true}
                    starCheck= {true}
                    label={userregister.matkhau.label}
                    value={userregister.matkhau.value}
                    style={styles.textInput}
                    onChange={text => onChangeTextRegister(text, 'matkhau')}
                    placeholder=""
                  />
                    <View style={[styles.inputContainer,]}>
                      <TxtInput
                        hightLight={hightLightFields['diachi']}
                        label={userregister.diachi.label}
                        starCheck= {true}
                        value={userregister.diachi.value}
                        style={styles.textInput}
                        onChange={text => onChangeTextRegister(text, 'diachi')}
                        placeholder=""
                      />
                    </View>
                    <View style={[styles.inputContainer,]}>
                      <DropdownInput
                        hightLight={hightLightFields['hangkh']}
                        onPress={() => onPressDropdown('hangkh')}
                        starCheck= {true}
                        text={userregister.hangkh.text}
                        label={userregister.hangkh.label}
                      />
                    </View>
                    <View style={[styles.inputContainer,]}>
                      <DropdownInput
                        hightLight={hightLightFields['kenhbh']}
                        onPress={() => onPressDropdown('kenhbh')}
                        starCheck= {true}
                        text={userregister.kenhbh.text}
                        label={userregister.kenhbh.label}
                      />
                    </View>
                    <View style={[styles.inputContainer,]}>
                      <DropdownInput
                        hightLight={hightLightFields['loaikh']}
                        starCheck= {true}
                        label={userregister.loaikh.label}
                        text={userregister.loaikh.text}
                        onPress={() => onPressDropdown('loaikh')}
                      />
                    </View>

                    <View style={[styles.inputContainer,]}>
                      <DropdownInput
                        hightLight={hightLightFields['khuvuc']}
                        onPress={() => onPressDropdown('khuvuc')}
                        starCheck= {true}
                        text={userregister.khuvuc.text}
                        label={userregister.khuvuc.label}
                      />
                    </View>


                  <DropdownInput
                    hightLight={hightLightFields['tinhthanh']}
                    label={userregister.tinhthanh.label}
                    starCheck= {true}
                    text={tinhthanhLabel}
                    onPress={() => onPressDropdown('tinhthanh')}
                  />
                  <View style={styles.GroupColumns}>
                    <View style={[styles.inputContainer, {marginRight: 10}]}>
                      <DropdownInput
                        hightLight={hightLightFields['quanhuyen']}
                        starCheck= {true}
                        label={userregister.quanhuyen.label}
                        text={userregister.quanhuyen.text}
                        onPress={() => onPressDropdown('quanhuyen')}
                      />
                    </View>
                    <View style={[styles.inputContainer, {marginLeft: 10}]}>
                      <DropdownInput
                        hightLight={hightLightFields['phuongxa']}
                        starCheck= {true}
                        onPress={SelectPhuongXa}
                        text={userregister.phuongxa.text}
                        label={userregister.phuongxa.label}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.GroupColumns}>
                    <View style={[styles.inputContainer, {marginRight: 10}]}>
                      <TxtInput
                        hightLight={hightLightFields['soGPKD']}
                        label={userregister.soGPKD.label}
                        value={userregister.soGPKD.value}
                        starCheck= {true}
                        style={styles.textInput}
                        onChange={text => onChangeTextRegister(text, 'soGPKD')}
                      />
                    </View>
                    <View style={[styles.inputContainer, {marginLeft: 10}]}>
                      <TxtInput
                        hightLight={hightLightFields['mst']}
                        label={userregister.mst.label}
                        value={userregister.mst.value}
                        starCheck= {true}
                        keyboardType="numeric"
                        style={styles.textInput}
                        onChange={text => onChangeTextRegister(text, 'mst')}
                      />
                    </View>
                  </View>
              <View style={styles.GroupColumns}>
                    <View style={[styles.inputContainer, {marginRight: 10}]}>
                      <TouchableOpacity
                        onPress={() => takePic('anhcuahieu', '1')}
                        style={{
                          height: 80,
                        }}>
                        {userregister.anhcuahieu.source1 ? (
                          <Image
                            tintColor={Colors.te}
                            style={styles.viewPic}
                            source={userregister.anhcuahieu.source1}
                          />
                        ) : (
                          <>
                            <View
                              style={styles.btnLoginCamera}
                              underlayColor="transparent">
                              {/* <Icons
                                style={{}}
                                fontSize={'15'}
                                color={Colors.BackgrondLightOPV4}
                                name="compress"
                              /> */}
                              <TextCmp style={styles.loginColor2}>
                                {' Ảnh cửa hiệu'}
                              </TextCmp>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.inputContainer, {marginLeft: 10}]}>
                      <TouchableOpacity
                        onPress={() => takePic('GxPs', 2)}
                        style={{
                          height: 80,
                        }}>
                        {userregister.GxPs.source2 ? (
                          <Image
                            tintColor={Colors.te}
                            style={styles.viewPic}
                            source={userregister.GxPs.source2}
                          />
                        ) : (
                          <>
                            <View
                              style={styles.btnLoginCamera}
                              underlayColor="transparent">
                              {/* <Icons
                                style={{}}
                                fontSize={'15'}
                                color={Colors.BackgrondLightOPV4}
                                name="compress"
                              /> */}
                              <TextCmp style={styles.loginColor2}>
                                {userregister.GxPs.label}
                              </TextCmp>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.GroupColumns}>
                    <View style={[styles.inputContainer, {marginRight: 10}]}>
                      <TouchableOpacity
                        onPress={() => takePic('dudieukienkd', 3)}
                        style={{
                          height: 80,
                        }}>
                        {userregister.dudieukienkd.source3 ? (
                          <View style={{}}>
                            <Image
                              tintColor={Colors.te}
                              style={styles.viewPic}
                              source={userregister.dudieukienkd.source3}
                            />
                          </View>
                        ) : (
                          <>
                            <View
                              style={styles.btnLoginCamera}
                              underlayColor="transparent">
                              {/* <Icons
                                style={{}}
                                fontSize={'15'}
                                color={Colors.BackgrondLightOPV4}
                                name="compress"
                              /> */}
                              <TextCmp style={styles.loginColor2}>
                                {' Chứng nhận \n đăng ký DKKD'}
                              </TextCmp>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.inputContainer, {marginLeft: 10}]}>
                      <TouchableOpacity
                        onPress={() => takePic('andGpdkd', 4)}
                        style={{
                          height: 80,
                        }}>
                        {userregister.andGpdkd.source4 ? (
                          <Image
                            tintColor={Colors.te}
                            style={styles.viewPic}
                            source={userregister.andGpdkd.source4}
                          />
                        ) : (
                          <>
                            <View
                              style={styles.btnLoginCamera}
                              underlayColor="transparent">
                              {/* <Icons
                                style={{}}
                                fontSize={'15'}
                                color={Colors.BackgrondLightOPV4}
                                name="compress"
                              /> */}
                              <TextCmp style={styles.loginColor2}>
                                {' Giấy phép KD'}
                              </TextCmp>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

              <View
              style={{

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableHighlight
                onPress={onPressNext}
                style={styles.btnLogin}
                underlayColor="transparent"
                disabled={Loading}>
                <View>
                  {Loading ? (
                    <PulseIndicator
                      style={{alignItems: 'center'}}
                      size={20}
                      color={'white'}
                    />
                  ) : (
                    <TextCmp style={styles.loginColor}>
                      { 'Hoàn Tất' }
                    </TextCmp>
                  )}
                </View>
              </TouchableHighlight>
            </View>
            
            </ScrollView>

          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 5,
    backgroundColor: 'white',
  },
  content: {

    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'white',
    marginBottom: 20

  },
  GroupColumns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    // color: 'red',
  },
  viewPic: {
    width: 69,
    height: 69,
    borderRadius: 10,
  },
  btnLoginC: {
    flexDirection: 'row',
    width: 30,
    height: 30,

    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 15,
  },
  btnLogin: {
    flexDirection: 'row',
    flex: 1,
    height: 45,
    backgroundColor: Colors.textOPVGreen,
    alignItems: 'center',
    justifyContent: 'center',
    //  borderRadius: 5,
    marginTop: 10,
  },
  btnLoginCamera: {
    flexDirection: 'row',
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#928D8D',
    marginTop: 10,
  },
  logoimg: {width: width / 2.5, height: width / 3.5, marginBottom: 50},
  loginColor2: {color: 'gray', fontSize: RFValue(12), fontWeight: '900'},
  loginColor: {color: 'white', fontWeight: 'bold'},

  icon_account: {width: 20, height: 20, tintColor: 'gray'},
  checkbox: {
    alignItems: 'flex-end',
    backgroundColor: 'white',
    width: '100%',
    borderColor: 'white',
  },
  btnLoaiUser: {
    padding: 15,
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
});
