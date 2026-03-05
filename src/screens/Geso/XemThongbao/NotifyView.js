import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Image,
  Dimensions,
} from 'react-native';
import { TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';
import { HomeICon, } from './../../../assets/index';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const {height,}=Dimensions.get('window');


export default class NotifyView extends React.Component {

  render(){
    const {
      data,
      answer,

      saveAnswer,
      isShowContent,
      changeContent,
      listAnswer,
      viewDocument,
      onChangeAnswer,
    }=this.props;
    let CovertName  = data.filename
    if (CovertName.endsWith(",")) {
      CovertName = CovertName.slice(0, -1);
     }
    let  thongbao_kq = CovertName.split(",").map(item => item.trim());
  
    if (isShowContent) {
      return (
        <View style={styles.container}>
         
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
            style={[styles.content,]}
          >
            <ScrollView>
              <View style={{height:height-130, padding: 10, borderRadius: 10, backgroundColor:'white'}}>
              <TextCmp style={styles.textContent}>{data.TIEUDE}</TextCmp> 

              <View style={styles.groupTitle}>
                

                {thongbao_kq[0] !== '0' && (
                    thongbao_kq.map((filename, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.save}
                        onPress={() => viewDocument({  linkUrl:data.linkUrl+filename,  filename})}
                      >
              
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',  height:30,  width:'100%',
                        backgroundColor: Colors.Analogus, paddingHorizontal:10, borderRadius:5, borderWidth: 0.5, borderColor: Colors.textOPVCopper3}}>
                          <Icon  name='attachment' color={Colors.textOPVCopper3}/>
                          <TextCmp numberOfLines={1} style={{color:Colors.textOPVCopper3,}}> {filename}</TextCmp>

                        </View>
                        </TouchableOpacity>
                    ))
                  )}
               </View>
                <View style={styles.Line}></View>

                <TextCmp style={{fontSize: RFValue(12) , color: Colors.text0PV}}>{data.NOIDUNG }</TextCmp>
                
            
            
              </View>
            </ScrollView>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.btnShow} onPress={changeContent}>
            <TextCmp>XEM CÁC CÂU TRẢ LỜI</TextCmp>
          </TouchableOpacity>
           */}
        
          {/* <View style={[styles.row,]}>
            <TextInput
              underlineColorAndroid="transparent"
              style={[
                styles.btnShow,
                {
                  flex: 4,
                  textAlign: 'center',
                  paddingTop: 10,
                },
              ]}
              placeholder="Nhập câu trả lời"
              multiline={true}
              onChangeText={onChangeAnswer}
              value={answer}
            />
            <TouchableOpacity
              style={[styles.btnShow, { flex: 1, },]}
              onPress={saveAnswer}
            >
         
              <Image source={HomeICon.send} style={styles.imgsend}></Image>
            </TouchableOpacity>
          </View> */}
        </View>
      );
    }
    else
    {return (
      <View style={styles.container}>
            
        <View
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
          style={[styles.content,]}
        >
          <ScrollView>
            {!listAnswer || listAnswer.length === 0 ? (
              <TextCmp style={styles.textContent}>Chưa có câu trả lời</TextCmp>
            ) : (
              listAnswer.map((item, index) => {
                return (
                  <View key={index}>
                    <Text>
                      {(typeof item.TRALOI[0] == 'string' && item.TRALOI[0]) ||
                                                    ''}
                    </Text>
                    <Text style={{ textAlign: 'right', }}>
                                                ( {item.TEN[0]} - {item.THOIDIEM[0]} )
                    </Text>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.btnShow} onPress={changeContent}>
          <TextCmp>XEM NỘI DUNG THÔNG BÁO</TextCmp>
        </TouchableOpacity>
        <View style={[styles.row,]}>
          <TextInput
            style={[
              styles.btnShow,
              {
                flex: 4,
                textAlign: 'center',
                paddingTop: 10,
              },
            ]}
            underlineColorAndroid="transparent"
            placeholder="Nhập câu trả lời"
            multiline={true}
            onChangeText={onChangeAnswer}
            value={answer}
          />
          <TouchableOpacity
            style={[styles.btnShow, { flex: 1, },]}
            onPress={saveAnswer}
          >
            <TextCmp>Trả lời</TextCmp>
            <Image source={HomeICon.send} style={styles.imgsend}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );}
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },

  row: {
    flexDirection: 'row',
  },
  content: {
    margin:10,
    flex: 1,
    backgroundColor: Colors.BackgrondLightOPV5
  },
  textContent: { color: Colors.textOPVGreen, marginVertical:10, fontSize:RFValue(14), fontWeight:'bold' },
  groupTitle : {
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'flex-end',
  flexWrap:'wrap'
  },
 
  Line: {
  
    height:2,
    width: '100%',
    backgroundColor:Colors.grayMain,
    marginBottom: 10,
  },
  save:{  flexDirection: 'row',marginVertical:10 ,width: '40%', marginRight: 10, flexWrap:'wrap' },
  btnShow: {
    borderTopWidth: 1,
    borderColor:Colors.line,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  imgsend:{width:18,height:18,tintColor:'gray',},
});
