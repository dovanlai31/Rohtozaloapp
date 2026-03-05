import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { Logg, } from '../../../../utils';
import { BottomBarAssets, CommonIcons, HomeICon, ImgOPV, IconOPV } from './../../../../assets/index';
import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IDs } from '../../..';
import * as AppsController from '../../../../AppController'
const { width, } = Dimensions.get('window');

export default class HeaderOne extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  openlink = (e) => () => {
    Linking
      .openURL(e)
      .catch((err) => Logg.error('An error occured', err));
  }
  _quetQR = () => {

    this.props.navigator._push({
      name: IDs.TaoPhieuQrcode,
      options: {
        topbar: {
          leftButtons: [
            {
              id: 'CHITIETSP_BACK',
              icon: CommonIcons.back,
            },
          ],
        },
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      // passProps: {
      //   data: data,
      // },


    });
  }
  logout= ()=> {
    Alert.alert(
      'Thông báo',
      'Bạn chắt chắn muốn thoát chương trình ',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () =>AppsController.startlogin(),},
      ],
      {cancelable: false,},
    );
  }
  _infoKh =() =>{
    return this.logout()
    let dataLogin = this.props.dataLogin;
    console.log('thosxxx', this.props);
    const {navigator,} = this.props;
    navigator._push({
      name:   IDs.TTTK,
      options:{
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        data:dataLogin,
      },     
    });
  
  }
  _infoTB =() =>{
    let dataLogin = this.props.dataLogin;
    console.log('thosxxx', this.props);
    const {navigator,} = this.props;
    navigator._push({
      name:   IDs.ThongBaoKM,
      options:{
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        data:dataLogin,
      },     
    });
  
  }
  _infoKM =() =>{
    
    let  {dataLogin,listKM} =this.props;
    console.log('thosxxx', this.props);
    const {navigator,} = this.props;
    navigator._push({
      name:   IDs.KmScreen,
      options:{
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        data:dataLogin,
        listkm: listKM,
      },     
    });
  
  }

  render() {
   // console.log('propsss', this.props.dataLogin);
    const { searchclisk , dataLogin} = this.props;
   // console.log('dataLoginx', this.props.dataLogin);
    return (
      <View style={styles.header}>
        <View style={styles.topvew}>
           <Image resizeMode='cover' style={{width:70, height:40 ,marginLeft: 5}} source={ImgOPV.LogoMain}/> 
          <TextCmp numberOfLines={1} style={styles.texttop}>
           
            {'   RVOPV - Vững tin gắn kết'.toUpperCase()}
            </TextCmp>
        </View>

        <View style={{flexDirection:'row', alignSelf:'stretch', justifyContent:'space-between',
         marginHorizontal: 10, alignItems:'center'}}>

          <View style={styles.seachheader}>

            <TouchableOpacity style={styles.search} onPress={searchclisk}>
              <View >
                <Image style={styles.iconsearch} source={BottomBarAssets.search}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textsearch} onPress={searchclisk({ten:''})}>
              <View  >
                <TextCmp style={{ color: 'gray', fontSize: 12, }}> Tìm kiếm sản phẩm ...    </TextCmp>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.viewQr} onPress={searchclisk('')}>
             <Icon name='qrcode'></Icon>
            </TouchableOpacity> */}

          </View>

          <TouchableOpacity  onPress={this._infoKM} >
            {/* <Icon containerStyle={{ }}

              name='account-settings'
              size={20}
              color={'#efffce'}
            // onPress={() => console.log('hello')} 
            /> */}
            <Image source={IconOPV.ticket} style={[styles.IconC, {tintColor: Colors.textOPVGreen}]}></Image>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this._infoTB} >
            {/* <Icon containerStyle={{ }}

              name='account-settings'
              size={20}
              color={'#efffce'}
            // onPress={() => console.log('hello')} 
            /> */}
            <Image source={IconOPV.notifi} style={[styles.IconC, {tintColor: Colors.textOPVGreen}]}></Image>
          </TouchableOpacity>
          {/* <View style={{width:2, height:20, backgroundColor:Colors.Analogus2}}></View> */}
          <TouchableOpacity  onPress={this._infoKh} >
            {
             dataLogin.avatar.includes('.jpg') ?<Image source={{uri: dataLogin.avatar}} style={[styles.avatar, {}]}></Image>
              :<Image source={IconOPV.users} style={[styles.IconC, {tintColor: Colors.textOPVGreen}]}></Image>
             }  
             
          </TouchableOpacity>
        </View>



      </View>
    );
  }
}



const styles = StyleSheet.create({
  header: {
    height: 100,
   // backgroundColor: Colors.HeaderColor,
    backgroundColor:'#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    //backgroundColor: Colors.grayMain,
  //  borderColor: Colors.BackgrondLightOPV2,
    //borderWidth: 1,
    alignSelf: 'flex-start'
  

  },
  viewQr: {

    justifyContent: 'center', 
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 5,
   // borderWidth: 2,
    //borderColor: Colors.accentLight, 
   // backgroundColor: Colors.accentLight, 
    justifyContent: 'center',
    alignItems: 'center', 
  
  },
  IconC:{
    width:30,
    height:30
  },

  IconA:{
    width:30,
    height:30,

  },
  seachheader: {
    height: 35,
    width: '70%',
    //marginTop: Platform.OS == 'ios' ? 18 : 15,
    marginBottom: 2,
    backgroundColor: 'white',
    borderRadius: 3,
    borderColor: Colors.Analogus2,
    borderWidth: 0.5,
    backgroundColor:Colors.Analogus
       
  },
  iconsearch: {
    position: 'absolute',
    bottom: 0,
    left: 3,
    width: 20,
    height: 20,
    tintColor: 'gray',

  },
  search: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'transparent',


  },
  textsearch: {
    position: 'absolute',
    bottom: 8,
    left: 40,
    //height:'100%',
    width: '90%',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'transparent',




  },
  iconbbc: {
    width: 20 * 250 / 94,
    height: 20,
  },
  topvew: {
     width:'100%',
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height:50,
    marginHorizontal:10
  },
  texttop: {
    color: Colors.textOPVGreen,
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 14,
  

  },
  styleicfacebook: {
    width: 30,
    height: 30,
    margin: 5,
  },
});