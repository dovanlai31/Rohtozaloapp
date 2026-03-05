// SplashScreen.js

import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { TextCmp, } from '../../../common-components';
import { ImgOPV } from '../../../assets';
import * as AppsController from '../../../AppController';
import { Colors } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      AppsController.startlogin()
    }, 3000); // Adjust  timeout 
  }

  render() {
    return (
      <ImageBackground   source={ImgOPV.splashB} resizeMode="cover" style={styles.container}>
   
        {/* <Image
          source={ImgOPV.SPlashP} 
          style={styles.image}
          resizeMode="cover"
        /> */}
     {/* <TextCmp style={styles.texttitle}>ROPV</TextCmp> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#06C755'
  },
  image: {
    width: 300/2,
   height: 300/2
    
  },
  texttitle: {
    color: Colors.textOPVGreen,
    fontSize: RFValue(16),
    fontWeight: 'bold'
  }
});

export default SplashScreen;
