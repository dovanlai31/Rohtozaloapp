import React from 'react';
import {
  View, Dimensions,

} from 'react-native';
const { width, height, } = Dimensions.get('window');
export const ItemMini = () => {
  return (
    <View style={{ width, height: width / 2, backgroundColor: 'red', }}></View>
  );
};

export const ItemFull = () => {
  return (
    <View style={{ width, height: height / 1.5, backgroundColor: 'gray', }}></View>
  );
};