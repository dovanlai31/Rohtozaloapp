import React from 'react';
import { View, StyleSheet, Image } from 'react-native';


import { TextCmp, } from '../../../common-components';
import { Logg, } from '../../../utils';
import { Colors, } from '../../../theme';
import { HomeICon } from '../../../assets';
const logg = Logg.create('banner UI');

// const coins = [

// ]

export default class Notify extends React.Component {

  // shouldComponentUpdate({testData1,}, {data,}) {
  //   return false;
  // }

  renderNotify() {

  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.Notify}>
          <Image source={HomeICon.volume} style={styles.iconVolume} />
          <TextCmp  style={styles.text}>Hello all people...</TextCmp>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    alignContent:'center',
    height: 35,
    backgroundColor: Colors.backgroundL1,
    justifyContent: 'center',
  },
  Notify: {
    alignContent: 'center',
    padding: 5,
    borderTopColor: Colors.line, borderTopWidth: 0.5,
    marginHorizontal: 10, marginVertical: 2,
    flexDirection: 'row',
  },
  iconVolume: {
    marginHorizontal: 10,
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  text:{
    color:'white',
    fontSize: 14 ,
  }


});