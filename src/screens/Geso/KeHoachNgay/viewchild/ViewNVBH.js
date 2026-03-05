import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import { Colors, } from '../../../../theme';
import Icon from '../../../../assets/Icons';
import { TextCmp, } from '../../../../common-components';


export default class   ViewNVBH extends React.Component{
  //console.log('report', report);
  render(){
    const {
      data,
      VtKhNv,
      Rdnpp,
      visiblePanel,
      dataImgs,
      takePicture,
      hidepanner,
      luuanh,
      isloading,
    }=this.props;
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
        <View style={{ alignItems: 'center', width: '100%', height: 45, backgroundColor:Colors.HeaderColor , justifyContent: 'center', }}>
          <TextCmp style={{ color: 'white', fontWeight: 'bold', }}>CHỤP HÌNH</TextCmp>
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
          <View style={{  width: '100%', minHeight: 25, flexDirection: 'row',justifyContent:'space-between', }}>
        
            <TouchableOpacity style={{  width: '50%', alignItems: 'center', }} onPress={() => hidepanner()}>
              <TextCmp adjustsFontSizeToFit={true} style={{ textAlignVertical: 'center', color: 'black', }}>THOÁT</TextCmp>
            </TouchableOpacity>
            <TouchableOpacity style={{  width: '50%', alignItems: 'center', }} onPress={() => luuanh(1)}>
              <TextCmp adjustsFontSizeToFit={true} style={{ textAlignVertical: 'center', color: 'red', }}>CHỌN LƯU</TextCmp>
            </TouchableOpacity>
  
  
          </View>
        }
      </View>
    );
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={[styles.intop, { width: '25%', borderColor: 'red', borderRightWidth: 0.5, },]}>
            <TextCmp style={{ color: 'black', }}>KHÁCH HÀNG</TextCmp>
          </View>
          <View style={[styles.intop, { width: '30%', borderColor: 'red', borderRightWidth: 0.5, },]}>
            <TextCmp style={{ color: 'black', }}>ĐỊA CHỈ</TextCmp>
          </View>
          <View style={[styles.intop, { width: '15%', borderColor: 'red', borderRightWidth: 0.5, },]}>
            <TextCmp style={{ color: 'black', }}>VT</TextCmp>
          </View>
          <View style={[styles.intop, { width: '15%', borderColor: 'red', borderRightWidth: 0.5, },]}>
            <TextCmp style={{ color: 'black', }}>CHỤP HÌNH</TextCmp>
          </View>
          <View style={[styles.intop, { width: '15%', borderColor: 'red', borderRightWidth: 0.5, },]}>
            <TextCmp style={{ color: 'black', }}>RỜI ĐI </TextCmp>
          </View>
  
        </View>
  
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(item, index) => item.khId+''}
          renderItem={({ item, }) => (<View
            style={styles.row}
          >
  
            <View style={[styles.inRow, { width: '25%', },]}>
              <TextCmp style={styles.textrow}>{item.name}</TextCmp>
            </View>
            <View style={[styles.inRow, { width: '30%', },]}>
              <TextCmp style={styles.textrow}>{item.diachi}</TextCmp>
            </View>
            <TouchableOpacity style={[styles.inRow, { width: '15%', },]} onPress={() => VtKhNv(item, 1)} >
              <Icons name={item.vt1 != 0 ? 'connected' : 'disconnect'} size={item.vt1 != 0 && 20 || 25} color={item.vt1 != 0 ? '#27ae60' : 'rgba(0,0,0,0.5)'} />
            </TouchableOpacity>
            <View style={[styles.inRow, { width: '15%', },]}>
              <TouchableOpacity onPress={() => takePicture(item, 1)} >
                <Icons name={item.ch != 0 ? 'connected' : 'disconnect'} size={item.ch != 0 && 20 || 25} color={item.ch != 0 ? '#27ae60' : 'rgba(0,0,0,0.5)'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.inRow, { width: '15%', },]}>
              <TouchableOpacity onPress={() => Rdnpp(item, 1)} >
                <Icons name={item.rd1 != 0 ? 'connected' : 'disconnect'} size={item.rd1 != 0 && 20 || 25} color={item.rd1 != 0 ? '#27ae60' : 'rgba(0,0,0,0.5)'} />
              </TouchableOpacity>
  
            </View>
          </View>)}
        />
  
  
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
    borderBottomWidth:1,
    borderColor: Colors.line,

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
  textrow:{ color: 'black', fontSize:14,textAlign:'left',width:'100%', },
  imageView: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 5,
  },
  imgPicture: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 5,
  },

});
