import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image, ScrollView,
} from 'react-native';
const { width, height, } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign';

import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';
import formatter from '../../fm';
import { CommonIcons, } from '../../../../assets';
import { RFValue } from 'react-native-responsive-fontsize';
const _renderItem = (item, _gochitietSP, index) => {
  let vtc = index % 3;
  let color = Colors.colorsRandom[vtc];
  return (
    <View style={{ backgroundColor: color, margin: 5, borderRadius: 5, width: width / 2 - 10, height: width / 3 + 120 }}>
      <TouchableOpacity
        style={styles.item}
        onPress={_gochitietSP(item)}
      >
        <View style={styles.imageContainer}>
          <Image resizeMode={'cover'} source={{ uri: item.image }}
            style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <TextCmp numberOfLines={3} style={styles.name}>{item.title}</TextCmp>
          <TextCmp style={styles.price}>{formatter.format(item.price)} <TextCmp style={styles.VND}>{' VNĐ '}</TextCmp></TextCmp>
        </View>
      </TouchableOpacity>
    </View>
  );
};
// const _renderItem = (item, _gochitietSP,index) => {
//   let vtc=index%3

//   let color =Colors.colorsRandom[vtc]// Colors.colorsRandom[Math.floor(Math.random() * (2 - 0 + 1) + index)];
//   return (
//     <View style={{ backgroundColor: color }}>
//       <TouchableOpacity
//         style={styles.item}
//         onPress={_gochitietSP(item)}
//       >
//         <Image resizeMode='cover' source={{ uri: item.image, }}
//           style={{ width: width / 2 - 2, height: 120,
//            borderTopRightRadius: 2, }} />
//         <View style={{ padding: 5, }}>
//           <TextCmp numberOfLines={3} style={styles.name}>{item.title}</TextCmp>
//           <TextCmp style={{ textAlign: 'center', fontSize: 10, padding: 2, color: Colors.HeaderColor, width: width / 2 - 55, }}>{formatter.format(item.price)} vnđ</TextCmp>
//           {/* <TextCmp style={{ fontSize: 12, padding: 2, width: width / 2 - 55, textAlign: 'center', }}>1 Thùng = {item.qcThung} {item.donvi}</TextCmp> */}
//           {/* <TextCmp style={{ fontSize: 12, padding: 2, color: item.hienhuu == 0 ? Colors.HeaderColor : 'gray', textAlign: 'center', }} >{item.hienhuu == 0 ? 'Hết Tồn' : 'Tồn: ' + item.hienhuu}</TextCmp> */}
//         </View>

//       </TouchableOpacity>
//     </View>

//   );
// };
const _keyExtractor = (item) => {
  return item.title;
};

const content = (
  data,
  _gochitietSP,
  searchKeyword,
  keyList,
  timkiem,
  historyKey,
  deleteHistorryKeySearch,
  viewabilityConfig,
  searchOption,
  onChangeText,
  LitstDanhmucUrbox,
  LitstDanhmucUrbox_cap2
) => {

  if (searchKeyword) {
    return (
      <View style={styles.container}>
        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
          <TextCmp>{searchKeyword}</TextCmp>

          <TouchableOpacity onPress={() => timkiem('')} style={{ width: 33 }}>
            <Icon size={20} name='close'></Icon>
          </TouchableOpacity>
        </View>

        <FlatList
          ListHeaderComponent={(x) => {
            return (<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>

              {LitstDanhmucUrbox_cap2 && LitstDanhmucUrbox_cap2.map(item => <View key={item.title}>
                <TouchableOpacity
                  key={item.title}
                  onPress={() => timkiem(item, 1)}
                  style={{ height: 30, borderRadius: 1, backgroundColor: '#eeeeee', margin: 5, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                 {item.images&& <Image source={{ uri: item.images, }} style={styles.img}></Image>}
                  <TextCmp style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, }}>{item.title}</TextCmp>
                </TouchableOpacity>
              </View>)}
            </View>)
          }}
          initialNumToRender={10}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews={true}
          data={data}
          // data={data = data.filter(
          //   (sp) => (sp.ten + '').toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
          //     || (sp.clTen + '').toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
          //     || (sp.tennhomhang + '').toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
          // )}
          keyExtractor={_keyExtractor}
          renderItem={({ item, index }) => _renderItem(item, _gochitietSP, index)}
          //getItemLayout={this._getItemLayout}
          onEndReachedThreshold={0.01}
          numColumns={2}
          onEndReached={(xxx) => {
            // console.log(xxx);
            //this.handleLoadMore.bind(this);
          }
          }
        />

        {/* <View style={{ height: 40 }}></View> */}
      </View>);
  }
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'white', }}>
        {/* <View style={{ margin: 10, height: 30, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
         
          <TextCmp style={{ fontSize: 14, marginLeft: 10, color: 'black', }}> Từ khóa hot</TextCmp>
        </View> */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
          {keyList.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.title}
                onPress={() => timkiem(item, 1)}
                style={{ height: 30, borderRadius: 1, backgroundColor: '#eeeeee', margin: 5, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={{ uri: item.images }} style={styles.img}></Image>
                <TextCmp style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, }}>{item.title}</TextCmp>
              </TouchableOpacity>
            );
          })}
        </View>
      </View  >

      <View style={{ backgroundColor: 'white', }}>
        <View style={styles.titleText}>
          <TextCmp style={{ width: width / 2 - 10, marginLeft: 10, textAlign: 'left', fontSize: 14, color: 'black', }}>Lịch sử tìm kiếm </TextCmp>
          <TouchableOpacity onPress={deleteHistorryKeySearch}>

            <TextCmp style={{ width: width / 2 - 10, marginRight: 10, textAlign: 'right', color: Colors.HeaderColor, }}>Xóa</TextCmp>
          </TouchableOpacity>
        </View>
        <View >
          {historyKey && historyKey.map((item, index) => {
            if (index < 10) {
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => timkiem(item)}
                  style={{ height: 30, borderRadius: 1, margin: 5, justifyContent: 'center', }}>
                  <View style={{ flexDirection: 'row', }}>
                    <TextCmp style={{ justifyContent: 'center', paddingHorizontal: 10, width: '90%', }}>{item}</TextCmp>

                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
    </View>);
};


export default class Listsp_search extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.data !== this.props.data || nextProps.searchKeyword !== this.props.searchKeyword
  // }

  render() {
    const {
      data,
      _gochitietSP,
      searchKeyword,
      keyList,
      timkiem,
      historyKey,
      deleteHistorryKeySearch,
      searchOption,
      onChangeText,
      LitstDanhmucUrbox,
      LitstDanhmucUrbox_cap2

    } = this.props;

    return (
      content(
        data,
        _gochitietSP,
        searchKeyword,
        keyList,
        timkiem,
        historyKey,
        deleteHistorryKeySearch,
        "viewabilityConfig",
        searchOption,
        onChangeText,
        LitstDanhmucUrbox,
        LitstDanhmucUrbox_cap2
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    alignItems: 'center',
    // backgroundColor: 'yellow',
    overflow: "hidden"

  },
  titleText: {
    justifyContent: 'space-between', flexDirection: 'row',
    alignItems: 'stretch', width: width - 10,
    marginBottom: 20,
  },
  img: { width: 25, height: 25,borderRadius:5, backgroundColor:'white' },
  itemCL: {
    width: width / 4,
    alignItems: 'center',
    //backgroundColor:'#ffff'  ,
    //borderRadius:2,
    borderRightColor: 'gray',
    // marginVertical: 30,
    borderRadius: 2,
    //backgroundColor: Colors.HeaderColor,


  },
  imageContainer: {
    width: width / 2 + 10,
    height: width / 3 + 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: "hidden"
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    padding: 5,
    // backgroundColor:'blue',
    justifyContent: 'center'
  },
  name: {
    textAlign: 'center',
    fontSize: RFValue(12),
    color: 'black',
    marginTop: 5,
  },
  price: {
    textAlign: 'center',
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: Colors.textOPVRed,
    marginTop: 5,
  },
  VND: {
    textAlign: 'center',
    fontSize: RFValue(10),
    color: Colors.textOPVGreen,
  },
});