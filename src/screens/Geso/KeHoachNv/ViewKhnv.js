import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Colors} from '../../../theme';
import Icons from '../../../assets/Icons';
import {TextCmp} from '../../../common-components';
export default class ViewKhnv extends React.Component {
  renderItem = item => {
    return (
      <View style={[styles.top, {marginTop: 0, backgroundColor: 'white'}]}>
        <View
          style={[
            styles.intop,
            {width: '35%', borderColor: '#eeeeee', borderRightWidth: 0.5},
          ]}>
          <Text style={{color: 'black', fontSize: 10}}>{item.nhanvien}</Text>
        </View>
        <View
          style={[
            styles.intop,
            {width: '15%', borderColor: '#eeeeee', borderRightWidth: 0.5},
          ]}>
          <Text style={{color: 'black', fontSize: 10}}>{item.thang}</Text>
        </View>
        <View
          style={[
            styles.intop,
            {width: '15%', borderColor: '#eeeeee', borderRightWidth: 0.5},
          ]}>
          <Text style={{color: 'black', fontSize: 10}}>{item.nam}</Text>
        </View>
        <View
          style={[
            styles.intop,
            {width: '20%', borderColor: '#eeeeee', borderRightWidth: 0.5},
          ]}>
          <Text style={{color: 'black', fontSize: 10}}>{item.ngaytao}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.pressItem(item)}
          style={[styles.intop, {width: '15%', borderColor: '#eeeeee'}]}>
          <Icons
            name={item.trangthai != 0 ? 'connected' : 'disconnect'}
            size={(item.trangthai != 0 && 20) || 25}
            color={item.trangthai != 0 ? '#27ae60' : 'rgba(0,0,0,0.5)'}
          />
          {/* <Text style={{ color: 'black',fontSize:10, }}>TT</Text> */}
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {time, setFromTime, onPressBtn, currentLoainv, data} = this.props;
    return (
      <View style={styles.containt}>
        <View style={styles.row}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              backgroundColor: Colors.HeaderColor,
            }}>
            <TextCmp adjustsFontSizeToFit={true} style={styles.alignText}>
              Chọn Tháng
            </TextCmp>
          </View>

          <DatePicker
            androidMode="spinner"
            style={{flex: 2}}
            date={time.tungay}
            mode="date"
            placeholder="select date"
            format={'YYYY-MM'}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateText: {color: 'black', fontSize: 14},
              dateInput: {
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderTopWidth: 0,
                borderBottomWidth: 0.5,
              },
            }}
            onDateChange={setFromTime}
          />
        </View>
        <TouchableOpacity style={styles.dropdownView} onPress={onPressBtn}>
          <Text style={{textAlign: 'center', flex: 1}}>
            {currentLoainv.ten}
          </Text>
          <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
        </TouchableOpacity>

        <View style={styles.top}>
          <View
            style={[
              styles.intop,
              {width: '35%', borderColor: '#eeeeee', borderRightWidth: 0.5},
            ]}>
            <Text style={{color: 'black'}}>Nhân Viên</Text>
          </View>
          <View
            style={[
              styles.intop,
              {width: '15%', borderColor: '#eeeeee', borderRightWidth: 0.5},
            ]}>
            <Text style={{color: 'black'}}>Tháng</Text>
          </View>
          <View
            style={[
              styles.intop,
              {width: '15%', borderColor: '#eeeeee', borderRightWidth: 0.5},
            ]}>
            <Text style={{color: 'black'}}>Năm</Text>
          </View>
          <View
            style={[
              styles.intop,
              {width: '20%', borderColor: '#eeeeee', borderRightWidth: 0.5},
            ]}>
            <Text style={{color: 'black'}}>Ngày Tạo</Text>
          </View>
          <View style={[styles.intop, {width: '15%', borderColor: '#eeeeee'}]}>
            <Text style={{color: 'black'}}>TT</Text>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item.trangthai}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containt: {flex: 1, marginHorizontal: 2},
  row: {flexDirection: 'row', marginTop: 1, alignItems: 'center'},
  alignText: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    color: 'white',
  },
  top: {
    marginTop: 5,
    height: 40,
    width: '100%',
    backgroundColor: 'gray',
    flexDirection: 'row',
    top: 2,
    justifyContent: 'center',
    paddingLeft: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  intop: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    alignItems: 'center',
  },
  dropdownView: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
  },
});
