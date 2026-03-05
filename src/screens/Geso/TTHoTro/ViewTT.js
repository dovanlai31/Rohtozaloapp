import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TextCmp} from '../../../common-components';
import {Colors} from '../../../theme';
import {CommonIcons, ImgHotro} from '../../../assets';
import ViewKhaoSat from './Khaosat';
import ViewHoTro from './Hotro/index';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { RFValue } from 'react-native-responsive-fontsize';

const {height, width} = Dimensions.get('window');

const BannerWidth = width;
const BannerHeight = width / 3 + 120;
export default class ViewTT extends React.Component {
  shouldComponentUpdate(index) {
    return index != this.props.index;
  }

  render() {
    const {
      index,
      setIndex,
      navigator,
      datathongbao,
      dataLogin,
      isnewnotifywebtintuc,
      callPhone,
      ChatLive,
    } = this.props;

    return (


      <View style={''} >
        <View style={[styles.bannerContainer]}>
          <Image
            resizeMode="cover"
            style={styles.banner}
            source={ImgHotro.hotrokhbanner}
          />
            <TextCmp numberOfLines={1} style={styles.TextHearderCard}>Gắn kết khách hàng </TextCmp>
        </View>
        <View style={[styles.ContentTT]}>

          <View style={styles.UserDetailsCard}>
    
            <View style={{ flexWrap: 'wrap',flex: 2, flexDirection: 'row', justifyContent:'center' }}> 
            <TextCmp numberOfLines={3} style={styles.TextHearderCard2}>
            Cần hỗ trợ nhanh vui lòng gọi <TextCmp style={{ fontWeight: 'bold' }}>{'028 7775 2275'}</TextCmp> (7:00AM -5:00PM),
            hoặc gửi tin nhắn trực tiếp trên ứng dụng
          </TextCmp>
            </View>
             <View style={{ flex: 1, flexDirection:"row",}}>
                <TouchableOpacity  onPress={callPhone}style={{flex:1,  justifyContent:'center',alignItems:"center", borderRadius: 10, borderColor:Colors.BackgrondLightOPVGreen2 , borderWidth: 1, marginRight: 5}}>
                  <View style={{flexDirection:"row", justifyContent:"center", alignItems:'center', }}>
                  <Icon2  size={16} color={Colors.BackgrondLightOPVGreen2} name="phone" />
                  
                  <TextCmp style={{paddingHorizontal: 10,color:Colors.BackgrondLightOPVGreen2}}>Gọi</TextCmp>
                  </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={ChatLive} style={{flex:1,  justifyContent:'center',alignItems:"center", backgroundColor:Colors.BackgrondLightOPVGreen2, borderRadius: 10, borderColor:Colors.BackgrondLightOPVGreen2 , borderWidth: 1,  marginLeft :5}}>
                  <View style={{flexDirection:"row", justifyContent:"center", alignItems:'center',}}>
                  <Icon  size={16} color={'white'} name="comment-alt" />
                  
                  <TextCmp style={{paddingHorizontal: 10, color:'white'}}>Gửi tin nhắn</TextCmp>
                  </View>

                </TouchableOpacity>


            </View>
          
          </View>
        
        </View>
        {/* <ViewThongBao navigator={navigator} datathongbao={datathongbao}></ViewThongBao> */}
        {/* <ViewKhaoSat datakhaosat = {this.props.datakhaosat} navigator={navigator}> </ViewKhaoSat> */}
        {/* <ViewHoTro></ViewHoTro> */}
      </View>
 
          
    );
  }
}
const styles = StyleSheet.create({
  MainView: {flex: 1},

  bannerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'red',
    
  },
  banner: {
    width: BannerWidth,
    height: BannerHeight,
    backgroundColor: Colors.backgroundL1,
  },
  TextHearderCard2: {
    fontSize: RFValue(14),
    borderColor: Colors.textOPVCopper2,
    alignItems:'flex-start',
    textAlign:'left'


  },
  ContentTT:{
    flex: 2,
    backgroundColor:Colors.backgroundL3,
    //backgroundColor: 'red'
  },
  TextHearderCard: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: Colors.text,
    position:'absolute',
    top: 30,
   // backgroundColor: 'blue',


  },
  
  UserDetailsCard: {
    padding: 10,
    height: width/3,
    zIndex: 90,
    width: width - 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -30,
    marginBottom: 10,
    borderRadius: 14,
    // ...Platform.select({
    //   android: {elevation: 3},
    //   ios: {
    //     shadowColor: '#d3d3d3',
    //     shadowOpacity: 1,
    //     shadowRadius: 3,
    //     shadowOffset: {
    //       width: 2,
    //       height: 2,
    //     },
    //   },
    // }),
  },
});
