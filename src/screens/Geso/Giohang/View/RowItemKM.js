
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import { TextCmp, } from '../../../../common-components';
const { width, } = Dimensions.get('window');
import { Colors, } from '../../../../theme';
import formatter from './../../fm';
import { CommonIcons, ImgICon, ImgOPV, } from '../../../../assets';
import AppValue from '../../../../values/AppValue';
import { RFValue } from 'react-native-responsive-fontsize';

export default class RowItemKm extends React.Component {
  // shouldComponentUpdate(item){return item!=this.props.item;
  // }
  
  render(){
    const { item,}= this.props;
    return (
      <View key={item.id} style={styles.viewrow}>
        {item.HinhAnh != '' && item.HinhAnh != AppValue.NoImagUrl ? 
          <Image
            resizeMode='cover'
            style={styles.gift}
            source={{ uri: item.HinhAnh, }}
          >
          </Image>
          :<Image  resizeMode='cover' source={ImgOPV.giftdiscountR} style={styles.gift2}></Image>
        }
        <View style={styles.rightitem}>
          <TextCmp style={[styles.txtKM,styles.txtsoluong,]} numberOfLines={2}>KM: {item.DienGiai} </TextCmp>
          {item.Scheme &&  <TextCmp style={[styles.txtKM2,styles.txtsoluong,]} numberOfLines={2}>Scheme: {item.Scheme}</TextCmp> }
          {item.soluong !==0 && <TextCmp style={[styles.txtKM2,styles.txtsoluong,]} numberOfLines={1}>Số Lượng: {item.soluong}</TextCmp>} 
          {item.TongGiaTri&&item.TongGiaTri>0&&<TextCmp style={[styles.txtKM2,styles.txtsoluong,]} numberOfLines={1}>Tổng tiền {formatter.format(item.TongGiaTri)} vnđ</TextCmp>}
          {/* <TextCmp >{item.HinhAnh }</TextCmp> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  rightitem:{ justifyContent: 'center',width:width-55,marginLeft:10, margin:5, },
  txtsoluong:{fontSize:RFValue(11),},
  txtKM:{color:'red',width:'88%'},
  txtKM2:{color:Colors.text0PV,width:'88%'},
  gift:{width:40,height:40, margin:5,borderRadius:5, backgroundColor:Colors.RedAnalogus},
  gift2:{width:40,height:40, margin:5, backgroundColor:'white'},
  viewrow:{ flexDirection: 'row', width, borderBottomWidth: 0.5, 
  alignContent: 'center', borderColor: Colors.backgroundL1, padding: 5, },
  
});