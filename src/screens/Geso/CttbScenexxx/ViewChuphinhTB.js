
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { TextCmp } from '../../../common-components';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Icon } from 'react-native-elements';
import { Colors } from '../../../theme';

const imgTaked = [
  { label: "Chụp ảnh 1", key: "1" },
  { label: "Chụp ảnh 2", key: "2" },
  // { label: "Chụp ảnh 3", key: "3" },
  // { label: "Chụp ảnh quà tặng", key: "4" }
]
const imgTaked2 = [
  { label: "Chụp ảnh", key: "1" },

  // { label: "Chụp ảnh 3", key: "3" },
  // { label: "Chụp ảnh quà tặng", key: "4" }
]
export default class ViewChuphinhTB extends React.Component {

  render() {
    const {
      onPressListTb,
      currentCttb,
      takePicture,
      dataImgs,
      settab,
      tab,
      DkTB,
      ListTbChuaDK,
      setISChose,
      saveTB,
      loadding
    } = this.props
    let imgs = imgTaked;
    return (
      <View style={styles.content}>
        <View style={styles.tabView}>
          <TouchableOpacity onPress={() => settab(0)} style={[styles.btntap, { borderColor: tab == 0 ? '#9E100C' : 'white', }]}><TextCmp style={styles.txtTT}>Chụp ảnh trưng bày</TextCmp></TouchableOpacity>
          <TouchableOpacity onPress={() => settab(1)} style={[styles.btntap, { borderColor: tab == 1 ? '#9E100C' : 'white', }]}><TextCmp style={styles.txtTT}>Đăng ký trưng bày</TextCmp></TouchableOpacity>
        </View>
        {tab == 0 && <View>
          <TouchableOpacity
            style={styles.dropdownView}
            onPress={onPressListTb}
          >
            <TextCmp style={{ textAlign: 'center', flex: 1, }}>{currentCttb.label}</TextCmp>
            <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
          <View >
            <View style={styles.row}>
              <Icon color='gray' name="camera" size={30} />
              <Text style={{ marginLeft: 5 }}>{'Chụp ảnh'}</Text>
            </View>
            <View style={styles.imageView}>
              <TouchableOpacity onPress={() => takePicture(3)}>
                <View>
                  {dataImgs["img3"] === null ? (
                    <Icon name="image" size={80} color='gray' />
                  ) : (
                    <Image
                      style={styles.imgPicture}
                      source={dataImgs["img3"]}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {loadding == true ? <ActivityIndicator></ActivityIndicator> : <TouchableOpacity style={styles.btnDangky} onPress={() => saveTB()}>
                <TextCmp style={{ color: 'white' }}><Icon2 size={20} name='check'></Icon2> Lưu Ảnh TB</TextCmp>
              </TouchableOpacity>}
            </View>
          </View>
        </View>
        }
        {tab == 1 && <View>
          {/* <TouchableOpacity
            style={styles.dropdownView}
            onPress={onPressListTb}
          >
            <TextCmp style={{ textAlign: 'center', flex: 1, }}>{currentCttb.label}</TextCmp>
            <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity> */}

          <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
            {ListTbChuaDK && ListTbChuaDK.map((x, index) => (<View style={styles.rowsStyle} key={x.SCHEME}>

              <TextCmp style={{ width: '90%' }}>  <Icon2 name='tagso'></Icon2>{x.SCHEME}-{x.label}</TextCmp>
              <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => setISChose(index)}>
                <Icon2 size={24} color={x.ischose ? 'green' : '#BAC4D1'} name={x.ischose ? 'checksquare' : 'checksquareo'}></Icon2>
              </TouchableOpacity>

            </View>))}
            {ListTbChuaDK.length > 0 ? <TouchableOpacity style={styles.btnDangky} onPress={() => DkTB()}>
              <TextCmp style={{ color: 'white' }}><Icon2 size={20} name='check'></Icon2> Đăng Ký</TextCmp>
            </TouchableOpacity> : <TextCmp>Không có chương trình trưng bày chưa đăng ký trong thời điểm hiện tại</TextCmp>}
          </View>

        </View>}


      </View>
    );
  }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 5
  },
  rowsStyle: {
    flexDirection: 'row', padding: 15,
    justifyContent: 'space-between', width: '100%', borderColor: 'white', borderBottomWidth: 1,
  },
  btntap: {
    width: '50%', borderBottomWidth: 2, padding: 15,
    padding: 7, borderColor: '#9E100C', justifyContent: 'center'
    , height: 55, backgroundColor: Colors.HeaderColor, marginRight: 0.5
  },
  txtTT: { textAlign: 'center', fontWeight: 'bold', fontSize: 12, color: 'white' },
  tabView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, width: '100%', },
  ViewLine: {
    height: 45, alignItems: 'center', padding: 10, backgroundColor: '#E65E20', flexDirection: 'row', justifyContent: 'space-between',
    marginVertical: 10
  },
  dropdownView: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingLeft: 5
    // backgroundColor: 'red',
  },
  imgPicture: {
    width: 150,
    height: 150,
    borderRadius: 5
  },
  imageView: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  btnDangky: {

    width: 220, height: 55,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { width: 1, height: 3, },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.downColor,
    marginTop: 25



  }
})