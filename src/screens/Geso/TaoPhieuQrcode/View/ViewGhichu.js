import React  from 'react';
import {View,StyleSheet,TextInput,} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import { Colors, } from '../../../../theme';

export default class ViewGhiChu extends React.Component{
  shouldComponentUpdate(){
    return false;
  }
  render(){
    return(
      <View>
        {/* <View style={styles.rowhinhthuctt}>
          <TextCmp style={styles.txthttt}>Hình thức thanh toán</TextCmp>
          <TextCmp>Tiền mặt</TextCmp>
        </View> */}

        <View style={styles.ghichuview}>
          <TextCmp style={styles.txtviewgc}> Ghi Chú </TextCmp>
          <View style={styles.ghichu} >
            <TextInput multiline={true}
              style={styles.viewinput} 
              placeholder="Nhập nội dung ghi chú cho đơn hàng này" 
              underlineColorAndroid="transparent"
              onChangeText = {(text)=>this.props.onChangeGhichu(text)}
            >                                         
            </TextInput>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rowhinhthuctt:{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'gray', },
  ghichuview:{ padding: 10, marginTop: 5, },
  txtviewgc:{ color: 'black', padding: 5, },
  viewinput:{ width: '95%', minHeight: 50, },
  txthttt:{ width: '70%', },
  ghichu:{ 
    flexDirection: 'row', borderBottomWidth:1 ,borderColor: Colors.backgroundL1, width: '100%', justifyContent: 'center', alignContent: 'center', borderRadius: 2 , 
  },
});
