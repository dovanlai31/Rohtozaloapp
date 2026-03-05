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
import {
  BallIndicator,
} from 'react-native-indicators';


import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';
import formatter from '../../fm';

const { width, } = Dimensions.get('window');

export default class ViewListSp2 extends React.Component {
  renderItem2 = (item, index) => {
    let color = Colors.colorsRandom[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    if (item//&&item.hienhuu>0 
    ) {
      return (
        <View key={index.toString()}>
          <TouchableOpacity
            style={[styles.row, { backgroundColor: color }]}
            onPress={this.props._gochitietSP(item)}
          >
            <Image
              resizeMode='contain'
              source={{ uri: item.HinhAnh, }}
              style={styles.image} />
            <View style={{
              width: width / 2 - 5,
              backgroundColor: 'white', padding: 5,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <TextCmp numberOfLines={2} style={styles.tensp}>{item.ten}</TextCmp>
              <TextCmp style={{ fontSize: 12, padding: 2, color: Colors.mainColor, textAlign: 'center', }}>{formatter.format(item.dongia)} vnđ</TextCmp>
              {/* <TextCmp style={{ fontSize: 12, padding: 2, textAlign: 'center', }}>1 Thùng = {item.qcThung} {item.donvi}</TextCmp> */}
              {/* <TextCmp style={{ fontSize: 12, padding: 2, color: item.hienhuu == 0 ? Colors.HeaderColor : 'gray', textAlign: 'center', }} >{item.hienhuu == 0 ? 'Hết Tồn' : 'Tồn: ' + item.hienhuu}</TextCmp> */}
            </View>

          </TouchableOpacity>
        </View>



      );
    }
  };

  //  renderItem = (item) => {
  //    if(item.sp.length>0)
  //    return (
  //      <View  style={{ backgroundColor: Colors.backgroundL1, width, marginBottom: 2, }} >

  //        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5, marginLeft: 5, alignItems: 'flex-start', }}>
  //          {item.sp && item.sp.map((item, index) => this.renderItem2(item, index))}
  //        </View>

  //      </View>



  //    );
  //  };




  //  shouldComponentUpdate(listSP){
  //    return listSP!=this.props.listSP;
  //  }
  render() {
    const {
      listSP,
    } = this.props;

    let a = listSP.filter((t) => t.hienhuu > 0)
    return (
      <View style={styles.km}>
        <View style={styles.titleText}>
          <TextCmp style={{ width: width / 2 - 10, marginLeft: 10, textAlign: 'left', fontWeight: 'bold', }}>Sản phẩm</TextCmp>
          <TouchableOpacity >
            <TextCmp style={{ width: width / 2 - 10, marginRight: 10, textAlign: 'right', color: Colors.mainColor, }}></TextCmp>
          </TouchableOpacity>
        </View>
        {listSP.length === 0 ? <BallIndicator style={{ margin: 10 }} size={25} color={Colors.yellow} /> :
          <View style={styles.item1}>
            <FlatList
              numColumns={2}
              style={{ backgroundColor: '#ffff', width, }}
              data={a}
              initialNumToRender={1}
              extraData={a}
              keyExtractor={_keyExtractor}
              renderItem={({ item, index, }) => this.renderItem2(item, index)}
              //removeClippedSubviews={true}
             //onEndReachedThreshold={0.01}
             // maxToRenderPerBatch={5}
             // windowSize={10}
            />
          </View>
        }

      </View>
    );
  }
}


const _keyExtractor = (item) => item.ten + '';

const wi =width/3;
const styles = StyleSheet.create({
  km: {
    //height: height / 5,
    flex: 1,

    backgroundColor: Colors.backgroundL1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',

  },
  titleText: {
    justifyContent: 'space-around', flexDirection: 'row', backgroundColor: Colors.backgroundL1,
    alignItems: 'center', width: width - 10, height: 30,
    marginRight: 5, marginLeft: 4,
    marginTop: 40,
  },
  row: {
    width: width / 2 - 5,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 3,
    //android
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    //shadowColor: 'red',
    shadowOffset: { height: 1, width: 0, },

  },
  image: { width:wi, height:wi, },
  tensp: { fontSize: 13, margin: 10, width: width / 2 - 55, color: 'black', textAlign: 'center', height: 30 },
  item1: { marginTop: 5, backgroundColor: Colors.backgroundL1, height: 'auto', },
});