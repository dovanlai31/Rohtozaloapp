
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { TextCmp, } from '../../../../common-components';
const { width, height, } = Dimensions.get('window');
import { Colors, } from '../../../../theme';
import { HomeICon, ImgOPV, } from './../../../../assets/index';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import { RFValue } from 'react-native-responsive-fontsize';


export default class TiepTucMuaHang extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <View style={styles.containt}>
        <Image  resizeMode='cover' style={{ width: width/2, height: width/2, marginBottom: 30, }}
          source={ImgOPV.emtyCart} />
           <TextCmp style={styles.TextAlert}>Chưa có sản phẩm trong giỏ hàng</TextCmp>
        <TouchableOpacity onPress={this.props.PressViewAll} style={{backgroundColor:Colors.HeaderColor, padding:10, borderRadius:5}}>
      
          <TextCmp style={{ color:'#ffff',} }> <Icon style ={{color:'#ffff'}}  size={16} color={Colors.textOPVRed} name = 'cart-plus'></Icon> CHỌN SẢN PHẨM</TextCmp>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=>this.props.Scanqrcode()} style={styles.btsScan}>
          <AntDesign color='white' size={30} name='qrcode'></AntDesign>
          <TextCmp style={{color:'white'}}>Scan qrcode</TextCmp>
        </TouchableOpacity> */}



      </View>
    );
  }
}

const styles = StyleSheet.create({
  containt: {
    alignItems: 'center', justifyContent: 'center',
    height, backgroundColor: 'white',
  },
  TextAlert: {
   // backgroundColor:'red',
    fontWeight: '300',
    color: Colors.text,
    fontSize: RFValue(12),
    marginBottom: 10,

  },
  btsScan: {
    padding:10, borderRadius:5, backgroundColor:'green',flexDirection:'row', alignItems:'center'
  },

});