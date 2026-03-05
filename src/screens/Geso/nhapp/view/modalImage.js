
import React  from 'react';
import {View,Modal,TouchableOpacity,StyleSheet, Text ,Platform,Image,ActivityIndicator,} from 'react-native';
import {Icon, } from 'react-native-elements';
import { Colors, } from '../../../../theme';

export default class ModalTakePicture extends React.Component{

  shouldComponentUpdate(visiblePanel){
    return visiblePanel != this.props.visiblePanel;
  }
  render(){
    const {dataImgs,hidepanner,luuanh,visiblePanel,isloading, }=this.props;
    let ct = (
      <View
        style={styles.content}
      >
        <View style={styles.title}>
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
          <View style={styles.viewbtnbot}>
          
            <TouchableOpacity style={{ margin: 5,  alignItems: 'center', }} onPress={ hidepanner}>
              <Text adjustsFontSizeToFit={true} style={{ textAlignVertical: 'center', color: 'black', textAlign:'center',}}>THOÁT</Text>
            </TouchableOpacity>
            {/* <View style={{backgroundColor:Colors.line,height:'100%',width:1,}}></View> */}
            <TouchableOpacity style={{ margin: 5,  alignItems: 'center', }} onPress={ luuanh}>
              <Text adjustsFontSizeToFit={true} style={{ textAlignVertical: 'center', color: 'red',textAlign:'center', }}>CHỌN LƯU</Text>
            </TouchableOpacity>
    
    
          </View>}
      </View>
    
    );

    return (
      <Modal visible={visiblePanel} transparent={true} onRequestClose={() => { }}>
        {(Platform.OS == 'ios' && (
          <View
            behavior={'position'}
            style={styles.Body}
            contentContainerStyle={{
              paddingBottom: 2,
            }}
          >
            {ct}
          </View>
        )) || (
          <View
            behavior={'position'}
            style={styles.Body}
            contentContainerStyle={{
              paddingBottom: 2,
            }}
          >
            {ct}
          </View>
        )}
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  Body:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
   
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingBottom: 10,
    marginVertical: 10,
    alignItems:'center',
    justifyContent:'center',
    
  },
  viewbtnbot:{ width:200, height: 45, flexDirection: 'row',justifyContent:'space-between', alignItems:'center',
    borderTopWidth:1,borderColor: Colors.line,},
  title:{ alignItems: 'center', width: '100%', height: 50, backgroundColor:  Colors.HeaderColor, justifyContent: 'center', 
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3, },
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