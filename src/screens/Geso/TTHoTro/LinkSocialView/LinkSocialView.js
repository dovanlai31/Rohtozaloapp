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
import WebView from 'react-native-webview';
import { Modal } from 'react-native';
const {height, width} = Dimensions.get('window');

const BannerWidth = width - 40;
const BannerHeight = BannerWidth / 2 + 30;
export default class LinkSocialView extends React.Component {
  shouldComponentUpdate(index) {
    return index != this.props.index;
  }

  render() {
    const {
      socialMediaLinks,
      urlLink,
      handlePress,
      modalVisible,
      closeModal
    } = this.props;

    console.log('urlLinkx', urlLink);
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: null, marginHorizontal: 20}}>
          <TextCmp style={styles.titleComponent}>Liên kết khách hàng</TextCmp>
    

        <ScrollView horizontal={true}        showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}  style={styles.scrollView}>
          {socialMediaLinks&&socialMediaLinks.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(link.url)}>
              <View style={styles.linkContainer}>
                <View style={styles.iconWrapper}>
             
                  <Icon name={link.icon} color={Colors.BackgrondLightOPVGreen2} size={50} style={styles.icon} />
                </View>
                <TextCmp style={styles.linkText}>{link.name}</TextCmp>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
    paddingBottom: 20,
  },
  titleComponent: {
    paddingVertical: 20,
    fontSize: RFValue(14),
    fontWeight: 'bold',
 
  },
  titleComponentW: {
    paddingVertical: 20,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: Colors.textOPVGreen
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
  webview: {
    flex: 1,
  },
  linkContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconWrapper: {
    width: width/4,
    height:  width/4,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: Colors.selectedColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
   
  },
  linkText: {
    marginTop: 5,
    fontSize:RFValue(14),
    fontWeight:'bold',
    color: Colors.text
  },
  modalContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});
