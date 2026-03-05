/**
 * @author: thai.nguyen
 * @date: 2018-11-29 17:22:52
 *
 *
 */
import React from 'react';
import { View, StyleSheet,SafeAreaView } from 'react-native';

import { TextCmp, } from '../../common-components';
import Banner from './banner';
import BannerCoin from './banner-coin';
import Notify from './notify'
import MenuHome from './nenu-home'
import { Logg, } from '../../utils';
import { SafeAreaView } from 'react-native';

const logg = Logg.create('home UI');

export default class HomeScreen extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
      },
    };
  }
  shouldComponentUpdate(){
    return false;
  }
  render() {
    const { onPress, } = this.props;
    logg.info('render home');
    return (
      <SafeAreaView style={styles.container}>
        {/* <Banner /> */}
        {/* <BannerCoin/>
        <Notify/>
        <MenuHome/> */}
        <TextCmp>Home screen</TextCmp>
        <TextCmp onPress={onPress}>test push</TextCmp>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
