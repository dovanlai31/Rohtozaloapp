
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { ErrorMessage, TextCmp } from '../../../common-components';

import { Icon } from 'react-native-elements';
import { Colors } from '../../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import formatter from '../fm';
import { Input } from '../customers/components';
import { none } from 'ramda';
import { RFValue } from 'react-native-responsive-fontsize';


export default class ViewChuphinhTB extends React.Component {

  render() {
    const {
      presschonCT,
      curentCt,
      List_SanPham,
      setISChose,
      curentNPP,
      pressChonNpp,
      dataLogin,
      DiemTLKH,
      showViewAddProduct,
      setModalVisible,
      List_SanPham_Chon,
      onChangeTextSL,
      deleteItem,
      errorMessage,
      onPress1,
    } = this.props

    let tongdiemdh = 0;
    List_SanPham_Chon.map(x => {
      tongdiemdh += (x.soluong * x.Diem)
    })
    console.log('xxyy', errorMessage);
    return (

      <View style={styles.content}>
        {errorMessage !== '' && (
          <ErrorMessage
            message={errorMessage}

            onPress1={onPress1}

            action1Label="Ẩn thông báo"
          // action2Label="Action 2"
          // action3Label="Action 3"
          />
        )}
        <View style={styles.wrapContent}>
          <View style={[styles.btnOne, { borderBottomWidth: 0 }]}>
            <TextCmp style={[styles.tenStyle, { fontWeight: 'bold', fontSize: RFValue(12), color: Colors.textOPVBlue, textTransform: 'uppercase' }]}>{dataLogin.ten}</TextCmp>
          </View>
          <View style={[styles.btnOne, { borderBottomWidth: 0 }]}>
            <TextCmp style={[styles.tenStyle, { color: Colors.textOPVBlue, fontSize: RFValue(12), textTransform: 'uppercase' }]}>{dataLogin.dienthoai}</TextCmp>
          </View>
          <View style={[styles.btnOne,]}>
            <TextCmp style={styles.tenStyle}>{dataLogin.diachi}</TextCmp>
          </View>

          <TouchableOpacity style={styles.btnChonNpp} onPress={() => presschonCT()}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '90%' }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: Colors.BackgrondLightOPV5,
                justifyContent: 'center',
                alignItems: 'center',

              }}>
                <AntDesign size={16} color={Colors.textOPVGreen} name='gift' />

              </View>
              <TextCmp style={{ paddingLeft: 10, fontSize: RFValue(12) }}>{curentCt.label}</TextCmp>
            </View>
            <AntDesign name='down'></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnChonNpp} onPress={() => pressChonNpp()}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '90%' }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: Colors.BackgrondLightOPV5,
                justifyContent: 'center',
                alignItems: 'center',

              }}>
                <AntDesign size={16} color={Colors.textOPVGreen} name='isv' />

              </View>
              <TextCmp style={{ paddingLeft: 10, fontSize: RFValue(12) }}>Nhà phân phối: {curentNPP.ten}</TextCmp>

            </View>
            <AntDesign name='down'></AntDesign>
          </TouchableOpacity>
          <View style={styles.btnChonNpp}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: Colors.BackgrondLightOPV5,
                justifyContent: 'center',
                alignItems: 'center',

              }}>
                <AntDesign size={16} color={Colors.textOPVGreen} name='book' />

              </View>
              <View style={{ paddingLeft: 10 }}>
                <TextCmp style={styles.texttongdiem} >Tổng Điểm: <TextCmp style={styles.texthighlight}>{formatter.format(DiemTLKH)}</TextCmp></TextCmp>
                <TextCmp style={styles.texttongdiem}>Điểm đơn hàng: <TextCmp style={styles.texthighlight}>{formatter.format(tongdiemdh)}</TextCmp></TextCmp>
                <TextCmp style={styles.texttongdiem} >Điểm còn lại: <TextCmp style={styles.texthighlight}>{formatter.format(DiemTLKH - tongdiemdh)}</TextCmp></TextCmp>
              </View>

            </View>


            {/* <AntDesign name='down'></AntDesign> */}
          </View>

          <View style={styles.rowTT}>
            <View style={[styles.col, { flex: 3 }]}><TextCmp style={{ fontSize: RFValue(12), fontWeight: 'bold', color: Colors.textOPVBlue }}>Sản phẩm </TextCmp></View>
            <View style={styles.col}><TextCmp style={{ fontSize: RFValue(12), fontWeight: 'bold', color: Colors.textOPVBlue }} >SL</TextCmp></View>
            <View style={styles.col}><TextCmp style={{ fontSize: RFValue(12), fontWeight: 'bold', color: Colors.textOPVBlue }} >Điểm</TextCmp></View>
            <View style={[styles.col, { flex: 0.5 }]}><TextCmp style={{ fontSize: RFValue(12), fontWeight: 'bold', color: Colors.textOPVBlue }}>Xóa</TextCmp></View>
          </View>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                {List_SanPham_Chon && List_SanPham_Chon.map((x, index) => (
                  <View key={x.masp + '-' + x.TEN} style={[styles.rowTT, styles.rowSP]}>
                    <View style={[styles.col, { flex: 3, fontSize: RFValue(12), }]}><TextCmp style={{ fontSize: RFValue(12), }}><AntDesign name='tagso'></AntDesign> {x.masp + '-' + x.TEN}</TextCmp></View>
                    <View style={styles.col}><TextInput keyboardType='number-pad' onChangeText={(v) => onChangeTextSL(index, v)} style={styles.inputView} value={x.soluong}></TextInput></View>
                    <View style={styles.col}><TextCmp style={{ fontSize: RFValue(12), }}>{x.soluong * x.Diem}</TextCmp></View>
                    <TouchableOpacity onPress={() => deleteItem(x)} style={[styles.col, { flex: 0.3 }]}><AntDesign size={16} name='delete' ></AntDesign></TouchableOpacity>
                  </View>

                ))}

              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showViewAddProduct}
            onRequestClose={() => {

            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <ScrollView>
                  <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <TextCmp style={{ color: Colors.textOPVBlue, fontWeight: 'bold', fontWeight: 'bold', fontSize: RFValue(14) }} >CHỌM SẢN PHẨM</TextCmp>
                    {List_SanPham && List_SanPham.map((x, index) => (<View style={styles.rowsStyle} key={x.masp + '-' + x.TEN}>
                      <View style={{ width: '85%' }}>
                        <TextCmp ><AntDesign name='tagso'></AntDesign>{x.masp + '-' + x.TEN}</TextCmp>
                        <TextCmp style={{ color: Colors.downColor, fontSize: RFValue(12) }} >Điểm: {x.Diem}</TextCmp>
                      </View>
                      <TouchableOpacity style={{ width: '10%' }} onPress={() => setISChose(index)}>
                        <AntDesign size={24} color={x.ischose ? Colors.textOPVGreen : '#BAC4D1'} name={x.ischose ? 'checksquare' : 'checksquareo'}></AntDesign>
                      </TouchableOpacity>

                    </View>))}

                  </View>
                </ScrollView>
                <View style={styles.ViewBottom}>
                  <TouchableOpacity style={styles.btnDangky} onPress={() => setModalVisible(!showViewAddProduct)}>
                    <TextCmp style={{ color: 'white' }}><AntDesign size={20} name='plus'></AntDesign> Lưu</TextCmp>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>

        </View>


      </View>

    );
  }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  content: {
    flex: 1,

    backgroundColor: Colors.BackgrondLightOPV5,

  },
  wrapContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  inputView: { backgroundColor: '#eeee', width: '100%', borderRadius: 3, justifyContent: 'center', alignItems: 'center', fontSize: RFValue(12) },
  rowTT: { flexDirection: 'row', height: 35, alignItems: 'center', backgroundColor: Colors.BackgroundLightBlue, padding: 2 },
  col: { flex: 1, alignItems: 'center', justifyContent: 'center', },
  ViewBottom: { width, justifyContent: 'center', alignItems: 'center' },
  rowSP: { backgroundColor: 'white', height: 65, paddingHorizontal: 5, borderBottomColor: '#eeee', borderBottomWidth: 1 },
  btnOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    backgroundColor: 'white',
    marginTop: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.BackgrondLightOPV5
  },
  texttongdiem: {
    fontSize: RFValue(12),
    textTransform: 'capitalize',
    marginVertical: 2,
  },
  btnChonNpp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.BackgrondLightOPV5
  },
  texthighlight: { fontSize: RFValue(12), fontWeight: '600' },
  rowsStyle: {
    flexDirection: 'row', padding: 15, paddingHorizontal: 5,
    justifyContent: 'space-between', width: '100%', borderColor: 'white', borderBottomWidth: 1,
  },
  modalView: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,


  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',



  },
  tenStyle: {
    fontSize: RFValue(12),
    textTransform: 'capitalize'
  },
  btnDangky: {

    width: 220, height: 55,
    // shadowColor: 'rgba(0,0,0,1)',
    // shadowOffset: { width: 1, height: 3, },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 3,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.textOPVGreen,
    marginTop: 25



  },
  // thông báo lỗi
  errorMessageContainer: {
    backgroundColor: Colors.Analogus2,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorMessageText: {
    color: 'white',
    fontSize: RFValue(12),
  },
  closeButton: {
    marginLeft: 10,
  },
})