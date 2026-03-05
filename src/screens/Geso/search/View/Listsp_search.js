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
const _renderItem = (item, _gochitietSP) => {
  let color = Colors.colorsRandom[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
  return (
    <View style={{ backgroundColor: color, margin: 5, borderRadius: 5, }}>
      <TouchableOpacity
        style={styles.item}
        onPress={_gochitietSP(item)}
      >
        <Image resizeMode={'contain'} source={{ uri: item.HinhAnh, }}
          style={styles.image} />
       <View style={styles.textContainer}>
          <View style={styles.textContent}>
            <TextCmp numberOfLines={3} style={styles.name}>{item.ten}</TextCmp>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.textContent}>
            <TextCmp style={styles.price}>{formatter.format(item.dongia)} <TextCmp style={styles.VND}>{' VNĐ '} </TextCmp></TextCmp>
          </View>
        </View>
      </TouchableOpacity>
    </View>

  );
};
const _keyExtractor = (item) => {
  return item.pk_seq;
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
  onChangeText
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
          // ListHeaderComponent={(item)=>{
          // return(<View style={{backgroundColor:'#eeee', padding:5}}><TextCmp>{searchKeyword}</TextCmp></View>)
          // }}
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
          renderItem={({ item, }) => _renderItem(item, _gochitietSP)}
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
                key={item}
                onPress={() => timkiem(item)}
                style={{ height: 30, borderRadius: 1, backgroundColor: '#eeeeee', margin: 5, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={CommonIcons.done} style={styles.img}></Image>
                <TextCmp style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, }}>{item}</TextCmp>
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
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data
     || nextProps.searchKeyword !== this.props.searchKeyword
     || nextProps.historyKey !== this.props.historyKey
     
  }
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
      onChangeText
    } = this.props;
  //  console.log('historyKeyprops', this.props);
    return (
      content(
        data,
        _gochitietSP,
        searchKeyword,
        keyList,
        timkiem,
        historyKey,
        deleteHistorryKeySearch,
        searchOption,
        onChangeText
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // margin: 5,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  textContainer: {
    padding: 5,
  },
  textContent: {
    height: 50, 
    justifyContent: 'center',
  },
  titleText: {
    justifyContent: 'space-around', flexDirection: 'row',
    alignItems: 'center', width: width - 10, height: 35, marginTop: 5,
  },
  item: {
    width: width / 2 - 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: width / 2 - 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textContainer: {
    padding: 5,
  },
  name: {
    textAlign: 'center',
    fontSize: RFValue(10),
    color: Colors.text,
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
    color: Colors.HeaderColor,
  },

});