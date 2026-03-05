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
const {height, width} = Dimensions.get('window');

const BannerWidth = width - 40;
const BannerHeight = BannerWidth / 2 + 30;
export default class KhaoSatView extends React.Component {
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
      onPressKs
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={{backgroundColor: null, marginHorizontal: 20}}>
          <TextCmp style={styles.titleComponent}>Khảo sát khách hàng</TextCmp>
          <View style={[styles.bannerContainer]}>
            <Image
              resizeMode="cover"
              style={styles.banner}
              source={ImgHotro.khaosatkh}
            />
            <TouchableOpacity
              onPress={onPressKs}
              style={{
                height: 45,
                position:'absolute',
                bottom: 20,
                right: 20,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: '#5bb2ff',
                borderRadius: 10,
              //  borderColor: Colors.BackgrondLightOPVGreen2,
               // borderWidth: 1,
                marginLeft: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10
                }}>
 

                <TextCmp style={{paddingHorizontal: 10, color: Colors.textOPVBlue , fontSize:RFValue(18), fontWeight:'bold'}}>
                     Khảo sát
                </TextCmp>
                <Icon size={16} color={Colors.textOPVBlue} name="arrow-right" />
              </View>
            </TouchableOpacity>
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
  },
  banner: {
    width: BannerWidth,
    height: BannerHeight,
    backgroundColor: Colors.backgroundL1,
    borderRadius: 15,
  },
});
