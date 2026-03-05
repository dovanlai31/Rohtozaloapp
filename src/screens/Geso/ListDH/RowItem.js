import React from 'react';
import {
  ActivityIndicator, View, TouchableOpacity, StyleSheet,
  Dimensions, FlatList,
  Platform, Alert,
} from 'react-native';

import { TextCmp } from '../../../common-components';
import { Colors, } from '../../../theme';
import formatter from './../fm';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const { width, height } = Dimensions.get('window')
import moment  from 'moment'
import { RFValue } from 'react-native-responsive-fontsize';
export default class RowItem extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }
  updatedh(item) {
    this.setState({ loading: true })
    this.props.updatedonhang(item)
  }
  render() {
    const { item, index, xoadh, goctdonhang } = this.props;
    const { loading } = this.state
    return (
      <View  style={styles.item}>
        <View style={styles.row}  >
          <View style={{ padding: 10, width: width, }}>
            <TouchableOpacity style={{ marginRight: 30 }} onPress={() => goctdonhang(item)}>
              <TextCmp style={{ padding: 2,fontSize: RFValue(16), fontWeight:'bold', color:Colors.textOPVBlue }}>{item.MADH}</TextCmp>
              <TextCmp style={{ fontSize: RFValue(12), padding: 2,color:Colors.textOPVBlue }}> {item.NGAYDH}</TextCmp>
              <View style={{ borderBottomWidth: 1, borderBottomColor:Colors.BackgrondLightOPV5, marginBottom: 5 }} />
              <TextCmp style={{ fontSize: RFValue(12), padding: 2, }}> Ngày giao hàng dự kiến: { moment(item.NGAYGIAODK).format('YYYY-MM-DD') } </TextCmp>
              <TextCmp style={{ fontSize: RFValue(12), padding: 2, }}> Thành tiền: {formatter.format(item.TONGGIATRI)}</TextCmp>
              <TextCmp style={{ fontSize: RFValue(12), padding: 2,fontWeight:'bold', color: Colors.text0PV }}> Trạng thái: {item.Trangthai} </TextCmp>
            </TouchableOpacity>
          </View>

          {item.Trangthai == 'Đơn hàng đã tiếp nhận' && <TouchableOpacity onPress={() => xoadh(item.MADH)} style={{ position: 'absolute', right: 10, bottom: 20, }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
              {/* <TextCmp>Xóa</TextCmp> */}
              <Icon size={15} name={'trash'} style ={{ padding: 10,color:Colors.text0PV,color:Colors.textOPVGreen}}></Icon>
    
            </View>
          </TouchableOpacity>}

          {/* {item.Trangthai == 'Đơn hàng đã tiếp nhận' &&
            <TouchableOpacity onPress={() => this.updatedh(item)} style={{ position: 'absolute', right: 10, top: 20, }}>
              {this.state.loading == true ? <ActivityIndicator></ActivityIndicator> : <Icon size={15} name={'edit'} style ={{padding: 10, color:Colors.textOPVGreen}}></Icon>}
            </TouchableOpacity>
          } */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'transparent',
    justifyContent: 'center',
    position: 'absolute',
    height: 40,

  },
  row: {
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 5,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: Colors.BackgrondLightOPV,
    shadowOffset: { height: 1, width: 0, },
    //android
    elevation: 2,
    flexDirection: 'row',
    borderRadius:5


  },
  item: {}
});