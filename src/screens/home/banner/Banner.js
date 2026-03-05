/**
 * @author: Lai.do
 * @date: 2018-12-10 19:35:23 
 *  
 * 
 */
import React from 'react';
import { View, StyleSheet, } from 'react-native';

import Swiper from 'react-native-swiper';

import { TextCmp, } from '../../../common-components';
import { Logg, } from '../../../utils';
import { Colors, } from '../../../theme';


const logg = Logg.create('banner UI');

export default class Banner extends React.Component {

  // shouldComponentUpdate({testData,}) {
  //   if(this.props.testData !== testData) return true;
  // }

  _renderDot = (page)=>{
    return <View style={styles.pageView}>
      <TextCmp style={styles.page}>{page + 1}</TextCmp>
    </View>;
  }

  render() {
    //logg.info('render banner');
    return (
      <View style={styles.container}>
        <Swiper renderPagination={this._renderDot} autoplay={true}>
          <View style={styles.slide1}>
            <TextCmp style={styles.text}>Baner1</TextCmp>
          </View>
          <View style={styles.slide1}>
            <TextCmp style={styles.text}>Banner 2</TextCmp>
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '30%',
    backgroundColor: '#fff',
  },
  slide1: {
    height: 100,
  },
  pageView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.selectedColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  page: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});