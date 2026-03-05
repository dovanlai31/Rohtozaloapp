import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Colors, } from '../../../../theme';
import Icon from '../../../../assets/Icons';

export default function ViewTT({
  data,
  VtKhNv,
  Rdnpp,
  visiblePanel,
  dataImgs,
  takePicture,
  hidepanner,
  KeHoach_ChuphinhTT,
  ghichu,
  isloading,
}) {
  //console.log('report', report);
  let ct = (
    <View
      style={{
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingBottom: 10,
        marginVertical: 10,
      }}
    >
      <View style={{ alignItems: 'center', width: '100%', height: 45, backgroundColor: Colors.HeaderColor, justifyContent: 'center', }}>
        <Text style={{ color: 'white', fontWeight: 'bold', }}>CHỤP HÌNH</Text>
      </View>
      <View style={styles.imageView}>
        <TouchableOpacity >
          <View>
            {dataImgs['img1'] === null ? (
              <Icon name="take-image" size={110} />
            ) : (
              <Image
                style={styles.imgPicture}
                source={dataImgs['img1']}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {isloading?  <ActivityIndicator size="large" color={Colors.HeaderColor} />: 
        <View style={{ width: '100%', minHeight: 25, flexDirection: 'row',justifyContent:'space-between', }}>
          <TouchableOpacity style={{  width: '50%', alignItems: 'center', } } onPress={()=>hidepanner()}
          >
            <Text adjustsFontSizeToFit={true} style={{ textAlignVertical: 'center', color: 'black', }}>THOÁT</Text>

          </TouchableOpacity>
          <TouchableOpacity style={{  width: '50%', alignItems: 'center', }}
            onPress={KeHoach_ChuphinhTT}
          >
            <Text adjustsFontSizeToFit={true} style={{ textAlignVertical: 'center', color: 'red', }}>CHỌN LƯU</Text>
          </TouchableOpacity>
        </View>}

      
    </View>

  );


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={[styles.intop, { width: '20%', borderColor: 'red', borderRightWidth: 0.5, },]}>
          <Text style={{ color: 'black', }}>TỈNH THÀNH</Text>
        </View>
        <View style={[styles.intop, { width: '20%', borderColor: 'red', borderRightWidth: 0.5, },]}>
          <Text style={{ color: 'black', }}>QUẬN HUYỆN</Text>
        </View>
        <View style={[styles.intop, { width: '25%', borderColor: 'red', borderRightWidth: 0.5, },]}>
          <Text style={{ color: 'black', }}>ĐỊA CHỈ</Text>
        </View>
        <View style={[styles.intop, { width: '10%', borderColor: 'red', borderRightWidth: 0.5, },]}>
          <Text style={{ color: 'black', }}>VT</Text>
        </View>
				 <View style={[styles.intop, { width: '15%', borderColor: 'red', borderRightWidth: 0.5, },]}>
          <Text style={{ color: 'black',textAlign:'center', }}>CHỤP HÌNH</Text>
        </View>
        <View style={[styles.intop, { width: '10%', borderColor: 'red', borderRightWidth: 0.5, },]}>
          <Text style={{ color: 'black', }}>GHI CHÚ </Text>
        </View>
				
			

      </View>
      <ScrollView>
        {
          data.map((item, index) => (
            <View
              key={item.id}
              style={styles.row}
              //onPress={() => cliskItemName(item)}
            >

              <View style={[styles.inRow, { width: '20%', },]}>
                <Text style={{ color: 'black', }}>{item.tinh}</Text>
              </View>
              <View style={[styles.inRow, { width: '20%', },]}>
                <Text style={{ color: 'black', }}>{item.quan}</Text>
              </View>
              <View style={[styles.inRow, { width: '25%', },]}>
                <Text style={{ color: 'black', }}>{item.diachi}</Text>
              </View>
              <TouchableOpacity style={[styles.inRow, { width: '10%', },]} onPress={() => VtKhNv(item, 1)} >
                < Icons name={item.vt1 == 1 ? 'connected' : 'disconnect'} size={item.vt1 == 1 && 20 || 25} color={item.vt1 == 1 ? '#27ae60' : 'rgba(0,0,0,0.5)'} />
              </TouchableOpacity>
							 <View style={[styles.inRow, { width: '15%', },]}>
                <TouchableOpacity onPress={() => takePicture(item)} >
                  <Icons name={item.ch == 1 ? 'connected' : 'disconnect'} size={item.ch == 1 && 20 || 25} color={item.ch == 1 ? '#27ae60' : 'rgba(0,0,0,0.5)'} />
                </TouchableOpacity>
              </View>
              <View style={[styles.inRow, { width: '10%', },]}>
                <TouchableOpacity onPress={()=>ghichu(item)} >
                  <Icons name={item.ghichu == 1 ? 'connected' : 'disconnect'} size={item.ghichu == 1 && 20 || 25} color={item.ghichu == 1 ? '#27ae60' : 'rgba(0,0,0,0.5)'} />
                </TouchableOpacity>

              </View>							
            </View>
          ))
        }
      </ScrollView>

      <Modal visible={visiblePanel} transparent={true} onRequestClose={() => { }}>
        {(Platform.OS == 'ios' && (
          <View
            behavior={'position'}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            contentContainerStyle={{
              paddingBottom: 2,
            }}
          >
            {ct}
          </View>
        )) || (
          <View
            behavior={'position'}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            contentContainerStyle={{
              paddingBottom: 2,
            }}
          >
            {ct}
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#DCDEE3',
    padding: 3,
    //borderRadius:5

  },
  top: {
    marginTop: 5,
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    top: 2,
    justifyContent: 'center',
    paddingLeft: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  intop: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    //borderBottomWidth:0.5,
    //borderTopWidth:0.5,
    alignItems: 'center',

  },
  row: {
    //height: 40,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    top: 2,
    justifyContent: 'center',
    paddingLeft: 2,
    borderBottomWidth: 0.2,
    borderColor: 'gray',

  },
  inRow: {
    width: '100%',
    //height: 40,
    justifyContent: 'center',
    borderColor: 'gray',
    borderRightWidth: 0.2,

    alignItems: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  imageView: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  imgPicture: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 5,
  },

});
