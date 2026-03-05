import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import {DotIndicator} from 'react-native-indicators';

import {Colors} from '../../../../theme';
import {TextCmp} from '../../../../common-components';
import formatter from '../../fm';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { RFValue } from 'react-native-responsive-fontsize';
const {width} = Dimensions.get('window');
const margin = 5;
const itemWidth = (width - 2 * margin - 30) / 2;
export default class ViewListSp extends React.Component {
  renderItem2 = (item, index) => {
    let color =
      Colors.colorsRandom[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    if (index < 4 && item && item.hienhuu >= 0) {
      return (
        <View key={index.toString()} style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={[styles.itemCL, {backgroundColor: 'white'}]}
            onPress={this.props._gochitietSP(item)}>
            <Image
              resizeMode="cover"
              source={{uri: item.HinhAnh}}
              style={styles.image}
            />
            <View
              style={{
                width: width / 2 - 5,
                backgroundColor: 'white',
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextCmp numberOfLines={2} style={styles.tensp}>
                {item.ten}
              </TextCmp>
              <View
                style={styles.boxGia}> 
                <View
                  style={styles.textGiatien}>
                 <TextCmp style={{  fontWeight: 'bold',fontSize: RFValue(12),marginRight: 2, padding: 2 ,color:Colors.textOPVCopper2,   }}>
                  { formatter.format(item.dongia) } 
                  {<TextCmp style={{  fontWeight: '500', backgroundColor: null,
                  fontSize: RFValue(10), paddingHorizontal: 10 ,color:Colors.textOPVGreen, borderRadius: 5, }}>
                  {'  VNĐ '}</TextCmp>}</TextCmp>              
                </View>     

              </View>
              {/* <TextCmp style={{ fontSize: 12, padding: 2,     textAlign: 'center', }}>1 Thùng = {item.qcThung} {item.donvi}</TextCmp> */}
              {/* <TextCmp style={{ fontSize: 12, padding: 2, color:item.hienhuu==0? Colors.HeaderColor:'gray',    textAlign: 'center', }} >{item.hienhuu==0?'Hết Tồn':'Tồn: '+item.hienhuu}</TextCmp> */}
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderItem = (item, index) => {
    let a = [];
    //  a=item.sp.filter(x=>x.hienhuu>0)

    if (item.sp.length >= 4) {
      return (
        <View style={{justifyContent: 'center', marginVertical: 10}}>
          {item.sp && (
            <View style={styles.titleText}>
              <View style={styles.titleGroup}>
                <View style={styles.styleO}>
                  <Icon
                    style={{}}
                    size={16}
                    color={Colors.textOPVRed}
                    name="tags"
                  />
                </View>
                <TextCmp style={styles.txtTitle}>{item.ten}</TextCmp>
              </View>
              <TouchableOpacity onPress={this.props.searchclisk(item)}>
                {item.length == 0 ? (
                  <DotIndicator
                    style={styles.txtAll}
                    size={2}
                    color={'#FD693E'}
                  />
                ) : (
                  <View style={styles.titleGrouptwo}>
                    <View style={styles.styleOtwo}>
                      <Icon
                        style={{}}
                        size={16}
                        color={Colors.textOPVCopper}
                        name="grip-horizontal"
                      />
                    </View>
                    <TextCmp style={styles.txtAll}>Xem thêm</TextCmp>
                  </View>
                )

                //<TextCmp style={styles.txtAll}>Xem tất cả</TextCmp>
                }
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.itemContainer}>
            {item.sp &&
              item.sp.map((item, index) => this.renderItem2(item, index))}
          </View>
        </View>
      );
    } else
      return (
        <View style={{height: 1}}>
          <TextCmp />
        </View>
      );
  };

  //  shouldComponentUpdate(listSP){
  //    return listSP!=this.props.listSP;
  //  }
  render() {
    let {listSP} = this.props;
    console.log('listcheck', listSP);
    return (
      <View style={styles.container}>
        {/* {listSP.length===0?  <BallIndicator style={{margin:10}} size={25} color={Colors.yellow} />: */}
        <View style={styles.item1}>
          <FlatList
            style={{
              backgroundColor: Colors.backgroundL3,
              width: width - 20,
              marginHorizontal: 10,
            }}
            data={listSP}
            initialNumToRender={7}
            extraData={listSP}
            keyExtractor={_keyExtractor}
            renderItem={({item, index}) => this.renderItem(item, index)}
            // removeClippedSubviews={true}
            // onEndReachedThreshold={0.01}
          />
        </View>
        {/* } */}
      </View>
    );
  }
}

const _keyExtractor = item => item.id + '';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundL3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: margin,
    backgroundColor: Colors.backgroundL3,
  },
  titleText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',


    //borderColor: Colors.Analogus2,
    //borderTopWidth: 0.5,
    //backgroundColor: Colors.grayMain,

    //backgroundColor:'red'
    //paddingLeft: 5,
  },
  itemCL: {
    width: itemWidth,
    height: itemWidth + 90,
    alignItems: 'center',
    borderRadius: 10,
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  txtTitle: {fontWeight: 'bold', color: Colors.text0PV, fontSize: RFValue(14)},
  titleGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleGrouptwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderColor: Colors.Analogus2,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: Colors.Analogus,
  },
  txtAll: {  textAlign: 'center', color: Colors.textOPVCopper, marginRight: 5, fontSize: RFValue(12)},
  styleO: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    // borderRadius: 15,
    // borderWidth: 0.3,
    // borderColor: Colors.mainColor,
    // backgroundColor: Colors.Analogus,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  styleOtwo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,

    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {width: itemWidth, height: itemWidth},
  tensp: {
    fontSize: RFValue(12),
    width: width / 2 - 55,
    fontWeight: '100',
   // backgroundColor:'yellow',
    color: Colors.text,
    textAlign: 'center',
    height: 45,
  },
  boxGia :{

    borderColor: Colors.backgroundL3,
    borderTopWidth: 2,
    width: itemWidth / 2 + 40,
   // backgroundColor:'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  
  },
  textGiatien : 
    {
      fontSize: RFValue(12),
      color: Colors.textOPVCopper2,            
      alignItems:'center',
      marginVertical: 5,
    }
  // item1:{ marginTop: 5, marginBottom: 5, backgroundColor: Colors.backgroundL1, height: 'auto', },
});
