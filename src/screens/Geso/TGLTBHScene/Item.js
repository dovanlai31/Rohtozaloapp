import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {TextCmp} from '../../../common-components';
import {normalize} from '../../../theme/FontSize';
import { Colors } from '../../../theme';

export default function Item({item, title, selected, onSelect}) {
  let colorText = 'black';
  let background = 'white';
  if (item.daviengtham == 1) {
    colorText = 'blue';
  }
  if (item.codoanhso == 1) {
    colorText = 'red';
  }
  if (!item.daViengTham && item.coDoanhSo && item.dungtuyen == '1') {
    background = '#79E479';
  }
  if (item.dungtuyen == '0' && item.daViengTham) {
    background = '#FFFFA3';
  }
  if (!item.daViengTham && item.coDoanhSo && item.dungtuyen == '0') {
    background = '#a6c3fc';
  }
  if (item && item.khTen) {
    return (
      <TouchableOpacity onPress={()=>onSelect(item)} style={[styles.item, {backgroundColor: background}]}>
        <TextCmp style={[styles.title, {color: colorText}]}>
          {item.khTen}
        </TextCmp>
        <TextCmp style={[styles.title, {color: colorText}]}>
          Địa chỉ: {item.diachi}
        </TextCmp>
        <TextCmp style={[styles.title, {color: colorText}]}>
          Điện thoại: {item.sodienthoai}
        </TextCmp>
      </TouchableOpacity>
    );
  }

  return <View />;
}
const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: Colors.line,// '#eeeeee',
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius:4
  },
  title: {
    fontSize: normalize('Small'),
  },
});
