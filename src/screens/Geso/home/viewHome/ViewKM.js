import React from 'react';
import { HomeICon, CommonIcons, ImgOPV, } from './../../../../assets/index';
import {
  DotIndicator,
} from 'react-native-indicators';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  Image
} from 'react-native';

import { IDs, } from '../../..';
import { AppNavigation } from '../../../../app-navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';
const { width, } = Dimensions.get('window');
const margin = 5;
const itemWidth = (width - 2 * margin - 10) / 3;


export default class ViewKM extends React.Component {
  shouldComponentUpdate(next) {
    return next.listKM != this.props.listKM;
  }

  _keyExtractor = (item) => {
    return item.pk_seq;
  };
  _goViewAllKm = () => {
    const { listKM, navigator, } = this.props;
    navigator._push({
      name: IDs.KmScreen,
      options: {
        topbar: {

          statusBar: {
            backgroundColor: Colors.statusBar,
            // drawBehind: true,
            visible: true,
          },
          background: {
            color: Colors.HeaderColor,
          },
          leftButtons: [
            {
              id: 'btntop',
              icon: CommonIcons.back,
            },
          ],
        },
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        listkm: listKM,
      },

    });

  }
  onSelect(item) {

    AppNavigation.showModal({
      name: IDs.ViewDetailPromotion,
      passProps: {
        item: item,
        dispatch: this.props.dispatch,
        userId: this.props.userId
      },
      options: {
        statusBar: {
          backgroundColor: Colors.statusBar,
          visible: true,
        },
        topBar: {

          visible: false,
          _height: 0,
          drawBehind: true,
          title: {
            text: 'Xem chi tiết khuyết mãi',
          },
          background: {
            color: Colors.HeaderColor,
          },

          rightButtons: [
            {
              id: 'btntop',
              icon: CommonIcons.closeWhite,
            },
          ],
        },
      },
    });
  }
  renderItem = (item, index) => {
    let color = '#f4f1f4'// Colors.colorsRandom[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    if (item) {
      return (
        <TouchableOpacity key={item.ten} onPress={() => this.onSelect(item)} style={styles.CardContainer}>
          <View
            style={[styles.itemCL, { backgroundColor: color }]}
            key={item.ten}

          >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.01)', }}>
              {/* <TextCmp numberOfLines={2} style={{ fontSize: RFValue('12'), fontWeight: '200', padding: 10,width:width/3-5,Height:45, color:Colors.text }}>{item.diengiai}</TextCmp> */}

            </View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                source={{ uri: item.HinhAnh ? item.HinhAnh : 'http://118.69.168.124:8089/AnhChupPDA/VifonShop/sanpham/km.png' }}
                style={styles.image}
              />
              <Image
                style={styles.imageGiatot}
                source={ImgOPV.giatot}
                resizeMode='cover'
              ></Image>
            </View>

            {/* <Image resizeMode ='contain' source={{uri:item.HinhAnh,}}
        style={{ width: width/3 , height: width/3 , padding: 15,borderRadius: 2,marginTop:10 }} 

        /> */}
          </View>
          <TextCmp numberOfLines={2} style={{ fontSize: RFValue('12'), padding: 2, color: Colors.text0PV, }}>{item.diengiai} {<TextCmp style={{ fontWeight: '500', backgroundColor: null, fontSize: RFValue('10'), padding: 5, color: Colors.textOPVGreen, fontSize: RFValue(10), borderRadius: 5, }}></TextCmp>}</TextCmp>
        </TouchableOpacity>



      );
    }
  };
  render() {
    const { listKM, } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleText}>

          <View style={styles.titleGroup}>
            <View style={styles.styleO}>
              <Icon style={{}} size={16} color={Colors.textOPVRed} name='gift'></Icon>
            </View>
            <TextCmp style={styles.txtTitle}> Khuyến mãi giá hời </TextCmp>

          </View>

          <TouchableOpacity onPress={this._goViewAllKm}>
            {listKM.length == 0 ? <DotIndicator style={styles.txtAll} size={2} color={'#FD693E'}></DotIndicator> :
              <View style={styles.titleGrouptwo}>
                <View style={styles.styleOtwo}>
                  <Icon style={{}} size={16} color={Colors.textOPVCopper} name='store'></Icon>
                </View>
                <TextCmp style={styles.txtAll}> Ưu đãi</TextCmp>
              </View>

              //<TextCmp style={styles.txtAll}>Xem tất cả</TextCmp>
            }
          </TouchableOpacity>
        </View>
        {/* <Image  style={styles.imgtag} resizeMode='contain' source={ImgOPV.bordertag}></Image> */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.itemContainer}>
            {listKM && listKM.map((item, index) => this.renderItem(item, index))}
          </View>

        </ScrollView>

      </View>

    );
  }
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // shadowColor: Colors.mainColor,
    // shadowOffset: { height: 1, width: 0 },
    // elevation: 2,
    borderColor: Colors.Analogus2,
    borderWidth: 1,
    width: width - 20,
    marginVertical: 5,
    //backgroundColor:'yellow',

  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'space-between',
    //backgroundColor:"red"

  },
  CardContainer: {
    display: 'flex',
    alignItems: 'center',
    width: itemWidth,

    alignSelf: 'flex-start',
    paddingHorizontal: margin,
    justifyContent: 'space-between',

  },
  titleText: {
    justifyContent: 'space-between', flexDirection: 'row',
    alignItems: 'center', width: '100%',

    borderColor: Colors.Analogus2,
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 5,
  },

  itemCL: {
    width: itemWidth,
    alignItems: 'center',


    // borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.Analogus2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 10,
  },
  txtTitle: { fontWeight: 'bold', color: Colors.textOPVRed, fontSize: RFValue(14) },
  txtAll: { textAlign: 'center', color: Colors.textOPVCopper, marginRight: 5, fontSize: RFValue(12) },
  titleGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleGrouptwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  styleO: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: Colors.textOPVRed,
    //backgroundColor: Colors.Analogus,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  styleOtwo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    // backgroundColor: Colors.Analogus,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    width: itemWidth,
    height: itemWidth,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // backgroundColor: '#ffffff90',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: { width: '100%', height: '100%' },
  imageGiatot: {
    position: 'absolute',
    top: 5,
    width: 40,
    height: 25
  },

  imgtag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 64,
    height: 64,
    zIndex: 100
  },

});