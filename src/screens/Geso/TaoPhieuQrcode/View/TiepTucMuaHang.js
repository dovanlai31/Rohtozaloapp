
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
import { HomeICon, } from './../../../../assets/index';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class TiepTucMuaHang extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <View style={styles.containt}>
        <Image style={{ width: width / 2, height: width / 2 - 20, marginBottom: 10, }}
          source={HomeICon.bibicalogo} />
        <TextCmp style={{marginBottom:20}}></TextCmp>
        <TouchableOpacity onPress={()=>this.props.Scanqrcode()} style={styles.btsScan}>
          <AntDesign color='white' size={30} name='qrcode'></AntDesign>
          <TextCmp style={{color:'white'}}>Scan qrcode</TextCmp>
        </TouchableOpacity>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  containt: {
    alignItems: 'center', justifyContent: 'center',
    height, backgroundColor: Colors.backgroundL3,
  },
  btsScan: {
    padding:10, borderRadius:5, backgroundColor:'green',flexDirection:'row', alignItems:'center'
  },

});