import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Icon2 from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';

import {Colors} from '../../../../theme';
import {TextCmp} from '../../../../common-components';
import {ImgHotro} from '../../../../assets';
import VideoList from './VideoList';
import KhaoSatView from '../KhaoSatView/KhaoSatView';
const {height, width} = Dimensions.get('window');

const BannerWidth = width - 40;
const BannerHeight = BannerWidth / 2 + 30;

export default class TichDiemVideo extends React.Component {
  shouldComponentUpdate(index) {
    return index != this.props.index;
  }

  render() {
    const {
      index,
      setIndex,
      navigator,
      datathongbao,
      dataLogin,
      isnewnotifywebtintuc,
      onPressKs,
      youtubeVideoUrls,
    } = this.props;
    console.log('youtubeVideoUrlsx', youtubeVideoUrls);
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: null, marginHorizontal: 20}}>
          <TextCmp style={styles.titleComponent}>Tích điểm cùng OPV</TextCmp>
          <View style={styles.bannerContainer}>
            <Image
              resizeMode="cover"
              style={styles.banner}
              source={ImgHotro.Videoks}
            />
       
   
      
            <View style={styles.videoList}>
            <VideoList youtubeVideoUrls={youtubeVideoUrls}  />
            </View>
       
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,

    backgroundColor: Colors.backgroundL3,
    
  },
  titleComponent: {
    paddingVertical: 20,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  bannerContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    width: BannerWidth ,
    height: BannerHeight, 
    justifyContent:'center',
  },
  banner: {
    position:'absolute',
    width: BannerWidth ,
    height: BannerHeight ,
    backgroundColor: Colors.backgroundL1,
    borderRadius: 15,
  },
  videoList: {

    width: '100%',
    height:'80%',
   
    justifyContent:'center',
    alignItems:'center',

   

  },
});
