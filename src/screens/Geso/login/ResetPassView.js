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
    ImageBackground
} from 'react-native';
import { Colors, } from '../../../theme';
import { DropdownInput, TextCmp, } from '../../../common-components';
import { CheckBox, } from 'react-native-elements';
import { CommonIcons, HomeICon, ImgICon, } from '../../../assets';
import Checkupdate from './checkupdate';
import Icon from '../../../assets/Icons';
import AppValue from '../../../values/AppValue';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('screen')
export default class ResetPassView extends React.Component {
    // shouldComponentUpdate(userName, pass, checked) {
    //     return userName !== this.props.userName || pass !== this.props.pass || checked !== this.props.checked;
    // }
    render() {
        const { onLogin,
            setloainv,
            onChangeText,
            onPressPrev,
            pass,
            userName,
            dangky,
            checked,
            checkedclick, step,
            loainv, onPressNext, takePic, onChangeTextRegister,
            Loading, userregister, onPressDropdown, tinhthanhLabel } = this.props;
        console.log('XCXCXCXuserregister', userregister)
        return (
            <ImageBackground source={ImgICon.bgVf} resizeMode={'cover'} style={{ width, height, backgroundColor: 'white' }} >
                <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={styles.container}>

                    <View style={{ height: height / 2.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image resizeMode='contain' style={{ width: width / 3, height: width / 6, marginBottom: 50 }} source={HomeICon.bibicalogo2}></Image>
                        <TextCmp style={{ color: 'black', fontSize: 28, margin: 20 }}>Quên mật khẩu</TextCmp>

                    </View>

                    {(step == 0) && <View style={{ marginVertical: 10 }}>

                        <TextCmp style={styles.viewInput2}>Số điện thoại đăng nhập</TextCmp>
                        <View style={styles.viewInput} >
                            <TextInput
                                value={userregister.sdt.value}
                                style={styles.textInput}
                                onChangeText={(text) => onChangeTextRegister(text, 'sdt')}
                            // placeholder='Nhập tên nhà thuốc'
                            ></TextInput>
                        </View>

                        <TextCmp style={styles.viewInput2}>Mật Khẩu Mới</TextCmp>
                        <View style={styles.viewInput} >
                            <TextInput
                                secureTextEntry
                                value={userregister.matkhau.value}
                                style={styles.textInput}
                                onChangeText={(text) => onChangeTextRegister(text, 'matkhau')}
                                placeholder=''></TextInput>
                        </View>
                        <TextCmp style={styles.viewInput2}>Xác nhận lại mật khẩu mới</TextCmp>
                        <View style={styles.viewInput} >
                            <TextInput
                                secureTextEntry
                                value={userregister.matkhau2}
                                style={styles.textInput}
                                onChangeText={(text) => onChangeTextRegister(text, 'matkhau2')}
                                placeholder=''></TextInput>
                        </View>

                    </View>}
                    {step == 1 && <View style={{ marginVertical: 30 }}>
                        <TextCmp style={styles.viewInput2}>Vui lòng nhập mã OTP</TextCmp>

                        <View style={styles.viewInput} >
                            <TextInput
                                value={userregister.otp.value}
                                style={styles.textInput}
                                onChangeText={(text) => onChangeTextRegister(text, 'otp')}
                                placeholder=''></TextInput>
                        </View>

                        <TextCmp style={[styles.viewInput2, { color: 'red', margin: 10 }]}>Mã OTP đã được gửi về địa chỉ email đăng ký của số điện thoại này</TextCmp>
                    </View>}


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: 100 }}>
                        <TouchableHighlight
                            onPress={onPressPrev}
                            style={[styles.btnLogin, { backgroundColor: 'gray' }]}
                            underlayColor="transparent"
                            disabled={Loading}
                        >
                            <View>
                              
                                    <TextCmp style={styles.loginColor}>Quay lại</TextCmp>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => onPressNext()}
                            style={styles.btnLogin}
                            underlayColor="transparent"
                            disabled={Loading}
                        >
                            <View>
                                {Loading ? <ActivityIndicator size="small" color="#00ff00" /> :
                                    <TextCmp style={styles.loginColor}>{((step == 2 && loainv == 0) || (step == 1 && loainv == 1)) ? 'Hoàn Tất' : 'Tiếp theo'}</TextCmp>}
                            </View>
                        </TouchableHighlight>
                    </View>

                </TouchableOpacity>
            </ImageBackground>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(0, 0, 0, 0.6)'
        // backgroundColor: 'black',
    },
    texttitle: { fontSize: 18, },
    rowloai: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#eeee', width: '90%', borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'gray'
    },

    viewPic: {
        width: 69, height: 69,

    },
    ViewTop: {
        backgroundColor: Colors.HeaderColor, height: width * 2, width: width * 2, position: 'absolute'
        , top: -width * 2 + 100, borderRadius: 45, justifyContent: 'center'
    },
    txtTitle: {
        fontSize: 24,
        margin: 20,
        color: Colors.HeaderColor,
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#9e9e9e',
        marginBottom: 10,
        marginHorizontal: 30,
        width: width - 50

    },
    viewInput2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0,
        borderColor: '#9e9e9e',
        // marginBottom: 10,
        marginHorizontal: 30,
        width: width - 50,
        color: '#928D8D'

    },
    textInput: { color: 'gray', height: 40, width: width - 50, },
    btnLogin: {
        flexDirection: 'row',
        flex: 1,
        height: 45,
        backgroundColor: Colors.HeaderColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 30,
        marginHorizontal: 30,
    },
    logoimg: { width: width / 2.5, height: width / 3.5, marginBottom: 50, },
    loginColor: { color: Colors.backgroundL1, },
    icon_account: { width: 20, height: 20, tintColor: 'gray', },
    checkbox: { alignItems: 'flex-end', backgroundColor: 'white', width: '100%', borderColor: 'white', },
    btnLoaiUser: { padding: 15, justifyContent: 'center', alignContent: 'center', flex: 1 }
});
