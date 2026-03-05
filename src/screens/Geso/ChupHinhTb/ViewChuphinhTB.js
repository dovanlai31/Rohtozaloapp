
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { ErrorMessage, TextCmp } from '../../../common-components';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import { Colors } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { PulseIndicator } from 'react-native-indicators';

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
      loadding,
      message,
    } = this.props
    let imgs = imgTaked;
    return (
      <View style={styles.content}>
        {
         message !==''&&<ErrorMessage Title='Thông báo' icon={'search1'} message={message}/>
        }
        <View style={styles.wrapContent}>
        <View style={styles.tabView}>
          <TouchableOpacity onPress={() => settab(0)} style={[styles.btntap, { borderColor: tab == 0 ? Colors.BackgrondLightOPVGreen2 : 'white', }]}><TextCmp style={styles.txtTT}>Chụp ảnh trưng bày</TextCmp></TouchableOpacity>
          <TouchableOpacity onPress={() => settab(1)} style={[styles.btntap, { borderColor: tab == 1 ? Colors.BackgrondLightOPVGreen2 : 'white', }]}><TextCmp style={styles.txtTT}>Đăng ký trưng bày</TextCmp></TouchableOpacity>
        </View>
        {tab == 0 && <View>
          <TouchableOpacity         
            style={styles.dropdownView}
            onPress={onPressListTb}
          >
            <TextCmp style={{ textAlign: 'center', flex: 1, fontSize: RFValue(10) }}>{currentCttb.label}</TextCmp>
            <Icon3 name="chevron-down" size={16} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
       
          <View  style={styles.wrapCapture}>
            <View style={styles.row}>
              <Icon color={Colors.textOPVGreen} name="camera" size={30} />
              <Text style={{ marginLeft: 5, fontSize:RFValue(12), color:Colors.textOPVGreen, fontWeight:"bold" }}>{'Chụp ảnh'}</Text>
            </View>
            <View style={styles.imageView}>
              <TouchableOpacity onPress={() => takePicture(3)}>
                <View>
                  {dataImgs["img3"] === null ? (
                    <Icon3 name="photo" size={100} color={Colors.BackgrondLightOPV1} />
                  ) : (
                    <Image
                      style={styles.imgPicture}
                      source={dataImgs["img3"]}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {loadding == true ?  <PulseIndicator style={{alignItems:'center'}} size={20} color={Colors.textOPVGreen} />   : <TouchableOpacity style={styles.btnDangky} onPress={() => saveTB()}>
                <TextCmp style={{ color: Colors.textOPVGreen, fontWeight:'bold' }}><Icon3 size={20} name='check-circle'></Icon3>  Lưu Ảnh TB </TextCmp>
              </TouchableOpacity>}
            </View>
          </View>
         
        </View>
        }
        {tab == 1 && <View  style={{ paddingBottom: 150 ,}}>
          {/* <TouchableOpacity
            style={styles.dropdownView}
            onPress={onPressListTb}
          >
            <TextCmp style={{ textAlign: 'center', flex: 1, }}>{currentCttb.label}</TextCmp>
            <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity> */}
            <ScrollView showsVerticalScrollIndicator={false}   
             showsHorizontalScrollIndicator={false}
            > 
              
             <View style={styles.wrapdangky}>
            
              <View style={[styles.row, {alignSelf:'flex-start',}]}>
                  <Icon2 color={Colors.textOPVGreen} name="plussquare" size={20} />
                  <Text style={{ marginLeft: 5, fontSize:RFValue(12), color:Colors.textOPVGreen, fontWeight:"bold" }}>{'Chọn chương trình đăng ký'}</Text>
                
              </View>
              <View style={{borderBottomWidth:0.5, borderColor: '#BAC4D1', width:'100%'}}>
                  {/* <Icon color={Colors.textOPVGreen} name="camera" size={30} /> */}
                  
                
              </View>

            {ListTbChuaDK && ListTbChuaDK.map((x, index) => (<View style={styles.rowsStyle} key={x.SCHEME}>
             
             <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',    }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18, 
                backgroundColor: Colors.BackgrondLightOPV5, 
                justifyContent: 'center',
                alignItems: 'center',
        
                }}>
                  <Icon3 size={16} color={Colors.textOPVGreen} name='tags' />
              </View> 
              <TextCmp style={{marginHorizontal: 10, width: '70%', fontSize:RFValue(11)}}>      

             {x.SCHEME}-{x.label}</TextCmp>
             </View>
              <TouchableOpacity style={{ marginHorizontal: 0, }} onPress={() => setISChose(index)}>
                <Icon2 size={20} color={x.ischose ? Colors.textOPVGreen : '#BAC4D1'} name={x.ischose ? 'checksquare' : 'checksquareo'}></Icon2>
              </TouchableOpacity>

            </View>))}
            {ListTbChuaDK.length > 0 ? <TouchableOpacity style={styles.btnDangky} onPress={() => DkTB()}>
              <TextCmp style={{ color: Colors.textOPVGreen, fontWeight:"bold" }}><Icon3 size={20} name='check-circle'></Icon3>  Đăng Ký </TextCmp>
            </TouchableOpacity> : <TextCmp styles={{fontSize:RFValue(10), paddingVertical:20,}}> Không có chương trình trưng bày chưa đăng ký trong thời điểm hiện tại</TextCmp>}
           
          </View>
          </ScrollView>
        </View>}

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
  wrapContent : {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },  
  wrapCapture :{
    //backgroundColor: Colors.BackgrondLightOPV1,
    marginTop:10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 15,
    borderColor: Colors.BackgrondLightOPVGreen2
 
  },
  wrapdangky: {
    padding: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  //  backgroundColor:Colors.BackgroundLightBlue,
    borderStyle:'dashed',
    borderWidth: 2,
    borderColor: Colors.BackgrondLightOPVGreen2,
    borderRadius: 10,
  },
  rowsStyle: {
    flexDirection: 'row', padding: 15,
    justifyContent: 'space-between', width: '100%', borderColor: Colors.BackgrondLightOPV5, borderBottomWidth: 1, borderStyle:'dashed', borderRadius: 5,
  },
  btntap: {
    width: '50%', borderBottomWidth: 3, padding: 15,
    padding: 7, borderColor: '#9E100C', justifyContent: 'center'
    , height: 55, backgroundColor: Colors.textOPVGreen, marginRight: 0.5
  },
  txtTT: { textAlign: 'center', fontWeight: 'bold', fontSize: RFValue(12), color: 'white' },
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
    fontSize: RFValue(10),
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
  
  },
  btnDangky: {

    width: 220, height: 55,
    //shadowColor: 'rgba(0,0,0,1)',
    //shadowOffset: { width: 1, height: 3, },
    //shadowOpacity: 0.2,
    //shadowRadius: 2,
   // elevation: 3,
    borderColor: Colors.textOPVGreen,
   // backgroundColor: Colors.textOPVGreen,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 25
    


  }
})