import React  from 'react';
import {View,StyleSheet,TextInput,} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import { Colors, } from '../../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default class ViewGhiChu extends React.Component{
  shouldComponentUpdate(){
    return false;
  }
  render(){
    return(
      <View>
        {/* <View style={styles.rowhinhthuctt}>
          <TextCmp style={styles.txthttt}>Hình thức thanh toán</TextCmp>
          <TextCmp>Tiền mặt</TextCmp>
        </View> */}

        <View style={styles.ghichuview}>
          <View style={styles.notebtn}>
          {/* <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,
              
                  elevation: 1,
                  backgroundColor: Colors.BackgroundLightWhite,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                 <FontAwesome5 name='pen' color={Colors.HeaderColor} size={15}></FontAwesome5>
                </View> */}
           <TextCmp style={styles.txtviewgc}> Ghi Chú </TextCmp>
          </View>

          <View style={styles.ghichu} >
            <TextInput multiline={true}
              style={styles.viewinput} 
              placeholder=" Nhập nội dung ghi chú cho đơn hàng này " 
              underlineColorAndroid="transparent"
              onChangeText = {(text)=>this.props.onChangeGhichu(text)}
            >                                         
            </TextInput>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rowhinhthuctt:{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'gray', },
  ghichuview:{ padding: 5, width:'100%', marginTop: 5, paddingBottom:50,  },
  txtviewgc:{ color: Colors.HeaderColor, paddingVertical:10,  fontSize:RFValue(13), fontWeight:'bold' },
  viewinput:{ width: '100%', minHeight: 50, borderWidth:2, borderRadius:5, borderColor:'#eeee' },
  txthttt:{ width: '70%', },
  ghichu:{ 
    flexDirection: 'row', borderBottomWidth:1 ,borderColor: Colors.backgroundL1, width: '100%', justifyContent: 'center',
     alignContent: 'center', borderRadius: 2 , 
  },
  notebtn:{flexDirection:'row' ,
  justifyContent:'flex-start',
   alignItems:'center', 
 
  
  }
});
