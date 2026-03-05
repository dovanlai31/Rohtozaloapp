
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
    

} from 'react-native';
import { CheckBox, Icon, } from 'react-native-elements';
import { Colors, } from '../../../../theme';
const { width, height, } = Dimensions.get('window');

export default class ViewTTTK extends React.Component {

  render(){

    const { 
      hoten, sdt, diachi,
      onChangeText,
      checked,
      checkedclick,
      pascu, pasmoi1, pasmoi2,
      onSubmit,
      lock,}= this.props;
    return (
      <View style={styles.fill}>
        
        <ScrollView style={{ height: height - 100, marginBottom: 30, }}>
          <View>
            <View style={{ padding: 10, justifyContent: 'center', alignContent: 'center', }}>
              <Text> Họ tên khách hàng </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '97%', }}
                onChangeText={(text) => onChangeText(text, 'hoten')}
                value={hoten}
              />
            </View>
        
            <View style={{ padding: 10, justifyContent: 'center', alignContent: 'center', }}>
              <Text> Địa chỉ</Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '97%', }}
                onChangeText={(text) => onChangeText(text, 'diachi')}
                value={diachi}
                multiline= {true}
              />
            </View>
            <View style={{ padding: 10, justifyContent: 'center', alignContent: 'center', }}>
              <Text> Số điện thoại</Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '97%', }}
                onChangeText={(text) => onChangeText(text, 'sdt')}
                value={sdt}
              />
            </View>
            <CheckBox
              center
              title='Đổi mật khẩu'
              checked={checked}
              checkedIcon='check-square'
              uncheckedIcon='square'
              checkedColor={Colors.HeaderColor}
              size={18}
              containerStyle={{ alignItems: 'flex-start', backgroundColor: '#FFFFFF', width: '100%', borderColor: '#FFFFFF', }}
              textStyle={{ fontSize: 12, fontWeight: 'normal', color: 'gray', }}
              onPress={checkedclick}
            />
          </View>
          {checked &&
                            <View style={{ padding: 10, }}>
                              <TextInput
                                underlineColorAndroid="transparent"
                                style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '80%', margin:5, }}
                                onChangeText={(text) => onChangeText(text, 'pascu')}
                                placeholder={'mật khẩu cũ'}
                                value={pascu}
                              />
                              <TextInput
                                underlineColorAndroid="transparent"
                                style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '80%',margin:5, }}
                                onChangeText={(text) => onChangeText(text, 'pasmoi1')}
                                placeholder={'mật khẩu mới'}
                                value={pasmoi1}
                              />
                              <TextInput
                                underlineColorAndroid="transparent"
                                style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '80%',margin:5, }}
                                onChangeText={(text) => onChangeText(text, 'pasmoi2')}
                                placeholder={'nhập lại mật khẩu mới'}
                                value={pasmoi2}
                              />
                            </View>
        
          }
        
        
        
        
        </ScrollView>
        
        <View style={{ height: 45, width, position: 'absolute', bottom: 0, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
          <TouchableOpacity onPress = {onSubmit} >
            <View style={{ height: 35, width: width - 30, backgroundColor: Colors.HeaderColor, borderRadius: 3, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', }}> Lưu thay đổi </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    marginTop:55,
    height: height-55,
    width: width,
    alignContent: 'center',
    backgroundColor: 'white',

  },

});