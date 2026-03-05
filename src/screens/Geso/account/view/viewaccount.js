
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import Icon from '../../../../assets/Icons';
import { Colors, } from '../../../../theme';
export default class ViewAccount extends React.Component {

  render(){
    const {
      user,
      userName,
      onChangeText, isupdate,dangxuat,onSave, }= this.props;
    return (
      <View style={styles.content}>
        <TouchableOpacity style={styles.top}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()} >
          {/* <TextCmp style={{color:'white',marginTop:10,}}>Tài Khoản :</TextCmp> */}
        </TouchableOpacity>
        {/* <TextCmp>ViewAccount screen</TextCmp> */}
        <View style ={styles.ViewA}>
          <View style ={styles.avatar}></View>
        </View>
       
        <View style={styles.container}>
          <View style={styles.containerView}>
            <TextCmp style={styles.title}>TK: {userName}</TextCmp>
            
            <TextCmp onPress={dangxuat} style={{color:Colors.HeaderColor, fontStyle:'italic',}} >Đăng xuất</TextCmp>
          </View>
          

          {!isupdate&&
           <TouchableOpacity
             activeOpacity={1}
             onPress={() => Keyboard.dismiss()}
             style={styles.containerView2}
           >
           
       

             <View style={styles.viewInput}>
               <View style={{ flex: 1, }}>
                 <TextCmp style={styles.textColor}>
                   <Icon name="lock" size={18} />
                 </TextCmp>
               </View>
               <View style={{ flex: 8, }}>
                 <TextInput
                   underlineColorAndroid="transparent"
                   secureTextEntry
                   placeholder="Mật khẩu cũ"
                   style={styles.textInput}
                   value={user.matkhaucu}
                   onChangeText={(text) => onChangeText(text, 'matkhaucu')}
                 />
               </View>
             </View>
             <View style={styles.viewInput}>
               <View style={{ flex: 1, }}>
                 <TextCmp style={styles.textColor}>
                   <Icon name="pass" size={18} />
                 </TextCmp>
               </View>
               <View style={{ flex: 8, }}>
                 <TextInput
                   placeholder="Mật khẩu mới"
                   underlineColorAndroid="transparent"
                   style={styles.textInput}
                   value={user.matkhaumoi}
                   onChangeText={(text) => onChangeText(text, 'matkhaumoi')}
                   secureTextEntry
                 />
               </View>
             </View>
             <View style={styles.viewInput}>
               <View style={{ flex: 1, }}>
                 <TextCmp style={styles.textColor}>
                   <Icon name="padlock" size={18} />
                 </TextCmp>
               </View>
               <View style={{ flex: 8, }}>
                 <TextInput
                   underlineColorAndroid="transparent"
                   placeholder="Xác nhận mật khẩu mới"
                   style={styles.textInput}
                   value={user.repeat}
                   secureTextEntry
                   onChangeText={(text) => onChangeText(text, 'repeat')}
                 />
               </View>
             </View>
           
             <TouchableOpacity style={styles.btnLuu} onPress= {onSave}>
               <TextCmp style={{color:'white',}}>Lưu</TextCmp>
             </TouchableOpacity>

           </TouchableOpacity>

          }
         
          {/* <View style={styles.viewlogout}>
            <TouchableOpacity style={styles.btnLuu}>
              <TextCmp style={{color:'white',}}>Đăng xuất</TextCmp>
            </TouchableOpacity>
          </View>
        */}

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content:{
    flex:1,
  },
  top:{
    height:140,
    backgroundColor:Colors.HeaderColor,
    alignItems:'center',
  },
  ViewA:{
    height:100,
    width:'100%',
    position:'absolute', top:80,
    alignItems:'center',
    justifyContent:'center',
  },
  viewlogout:{
    marginTop:10,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  avatar:{
    height:140,
    width:140,
    borderRadius:70,
    borderWidth:3,
    borderColor:'white',
    backgroundColor:'#E1E2E1',
  
  },
  containerView: {
   
    paddingTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  
  },
  containerView2:
  {
   
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  
  },
  title: { marginBottom: 10, fontSize: 20,textAlign:'center', },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#9e9e9e',
    marginBottom: 10,
  },
  textColor: { color: '#9e9e9e', textAlign: 'center', },
  textInput: { color: '#9e9e9e', height: 40, },
  btnLuu:{
    width:250,
    height:40,
    backgroundColor:Colors.HeaderColor,
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
    marginHorizontal:30,
    borderRadius:4,
  },
  container:{
    marginVertical:20,
  },
});
