/**
 * @author: Lai.do
 * @date: 2018-12-10 19:35:23 
 *  
 * 
 */
import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import Swiper from 'react-native-swiper';

import { TextCmp, } from '../../../common-components';
import { Logg, } from '../../../utils';
import { Colors, } from '../../../theme';
import { HomeICon } from '../../../assets';

const logg = Logg.create('banner UI');
const { width } = Dimensions.get('window')
// const coins = [

// ]

export default class Banner extends React.Component {

  // shouldComponentUpdate({testData1,}, {data,}) {
  //   return false;
  // }

  renderSliderCoin1() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper autoplay={false}
          dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          activeDot={<View style={{ backgroundColor: Colors.selectedColor, width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          paginationStyle={{
            bottom: 1
          }} loop>

          <View style={styles.slide}>
            <View style={[styles.block, { borderRightWidth: 0.5 }]}>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>BNB/BTC</TextCmp>
              <TextCmp style={[styles.text, { color: 'white' }]}>0.0012</TextCmp>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>0.33% </TextCmp>
            </View>
            <View style={[styles.block, { borderRightWidth: 0.5 }]}>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>BNB/BTC</TextCmp>
              <TextCmp style={[styles.text, { color: 'white' }]}>0.0012</TextCmp>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>0.33% </TextCmp>
            </View>
            <View style={styles.block}>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>BNB/BTC</TextCmp>
              <TextCmp style={[styles.text, { color: 'white' }]}>0.0012</TextCmp>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>0.33% </TextCmp>
            </View>
          </View>
          
          <View style={styles.slide}>
            <View style={[styles.block, { borderRightWidth: 1}]}>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>BNB/BTC</TextCmp>
              <TextCmp style={[styles.text, { color: 'white' }]}>0.0012</TextCmp>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>0.33% </TextCmp>
            </View>
            <View style={[styles.block, { borderRightWidth: 1 }]}>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>BNB/BTC</TextCmp>
              <TextCmp style={[styles.text, { color: 'white' }]}>0.0012</TextCmp>
              <TextCmp style={[styles.text, { fontSize: 12 }]}>0.33% </TextCmp>
            </View>
            <View style={styles.block}>
              <View style={{ flexDirection: 'row',alignItems:'center',alignContent:'center',justifyContent:'center' }}>
                <TextCmp style={styles.text}>More</TextCmp>
                <Image source={HomeICon.double} style={styles.icondouble} />
              </View>

            </View>
          </View>
        </Swiper>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: Colors.backgroundL1,
  },
  text: {
    alignContent: 'center',
    marginVertical: 2,
    textAlign: 'center',
    color: Colors.blurWhite,
  },
  slide: {
    flexDirection: 'row',
    width,
    height: 80,
    alignContent: 'center',
    //marginVertical: 10,


  },
  block: {
    justifyContent: 'center',
    alignContent: 'center',
    width: width/3,
    borderColor: Colors.line,
    marginVertical: 10,
  },
  icondouble: {
    marginHorizontal: 5,
    width: 16,
    height: 16,
    tintColor: Colors.blurWhite,
  }

});