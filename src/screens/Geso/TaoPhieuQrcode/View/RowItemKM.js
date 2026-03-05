
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
import { CommonIcons, ImgICon, } from '../../../../assets';
import AppValue from '../../../../values/AppValue';

export default class RowItemKm extends React.Component {
  shouldComponentUpdate(item){return item!=this.props.item;
  }
  
  render(){
    const { item,}= this.props;
    return (
      <View key={item.id} style={styles.viewrow}>
        {item.HinhAnh != '' && item.HinhAnh != AppValue.NoImagUrl ? 
          <Image
            style={styles.gift}
            source={{ uri: item.HinhAnh, }}
          >
          </Image>
          :<Image source={ImgICon.gift} style={styles.gift}></Image>
        }
        <View style={styles.rightitem}>
          <TextCmp style={[styles.txtKM,styles.txtsoluong,]} numberOfLines={2}>KM: {item.DienGiai} </TextCmp>
          {item.Scheme &&  <TextCmp style={[styles.txtKM,styles.txtsoluong,]} numberOfLines={2}>Scheme: {item.Scheme}</TextCmp> }
          {item.soluong !==0 && <TextCmp style={[styles.txtKM,styles.txtsoluong,]} numberOfLines={1}>Số Lượng: {item.soluong}</TextCmp>} 
          {item.TongGiaTri&&<TextCmp style={[styles.txtKM,styles.txtsoluong,]} numberOfLines={1}>Tổng tiền {formatter.format(item.TongGiaTri)} vnđ</TextCmp>}
          {/* <TextCmp >{item.HinhAnh }</TextCmp> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  rightitem:{ justifyContent: 'center',width:width-55,marginLeft:10, margin:5, },
  txtsoluong:{fontSize:13,},
  txtKM:{color:'red',width:'88%'},
  gift:{width:40,height:40, margin:5,},
  viewrow:{ flexDirection: 'row', width, borderBottomWidth: 0.5, alignContent: 'center', borderColor: Colors.backgroundL1, padding: 5, },
  
});