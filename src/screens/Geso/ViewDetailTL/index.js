
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Navigation } from 'react-native-navigation';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { AppNavigation } from '../../../app-navigation';
import { TextCmp } from '../../../common-components';
import { Colors } from '../../../theme';
import { GetDetailCTTLDangKy, getspkmtra, getspkmmua } from './actions';
import formatter from './../fm';
import { themspgiohang } from '../ChitietSP/Action/ChitietSp.action';
import DashedLine from 'react-native-dashed-line';
import { RFValue } from 'react-native-responsive-fontsize';
import { ImgOPV } from '../../../assets';
const HEADER_MAX_HEIGHT = 250;

const { width, height } = Dimensions.get('window')
class ViewDetailPromotion extends React.Component {
  constructor() {
    super();
    this.state = {
      report: '',
      loadding: true,
      linkuri: '',
      progress: 0,
      infoPromotion: null,
      ShowspMua: false,

      spkmmua: [],
      ShowTra: true,
      sptra: [],
    }
  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);

    if (this.props.dispatch) {
      this.getdata();
      this.getspkmtra();
    }

  }
  getdata() {

    let params = { TlId: this.props.item.PK_SEQ, khId: this.props.userID, }
    this.props.dispatch(GetDetailCTTLDangKy(params)).then(res => {
      if (res) {
        this.setState({ infoPromotion: res })

      }

    })
  }

  getspkmmua(muakmID) {
    let params = { muakmID: muakmID, userId: this.props.userID }
    //alert(JSON.stringify(params))
    this.props.dispatch(getspkmmua(params)).then(res => {
      if (res) {
        this.setState({ spkmmua: JSON.parse(res) })
      }

    })
  }
  getspkmtra() {
    let params = { TlId: this.props.item.PK_SEQ, khId: this.props.userID, }
    //alert(JSON.stringify(params))
    this.props.dispatch(getspkmtra(params)).then(res => {
      //alert(JSON.stringify(res))
      if (res) {
        this.setState({ sptra: res })
      }

    })
  }
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'btntop') {
      AppNavigation.dismissAllModals();
    }
  }
  onPressClose = () => {
    AppNavigation.dismissAllModals();
  }
  PressBuy(item) {
    const { infoPromotion } = this.state;
    //alert(JSON.stringify(item))
    AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length + 1);

    let sanpham = { pk_seq: item.PK_SEQ, ten: item.TEN, dongia: item.dongia, donvi: item.donvi, HinhAnh: item.Anh, ma: item.MA, hienhuu: 1000, };
    sanpham.soluong = infoPromotion[0].TONGLUONGMUA;// item.qcThung*infoPromotion[0].TONGLUONGMUA
    //return alert(sanpham.soluong)
    this.props.dispatch(themspgiohang(sanpham));
    AppNavigation.dismissAllModals();
    AppNavigation.changeTab(2);
  }
  renderItem(item) {
    return <View key={item.TEN} style={styles.Row} >
        <View style={{width:70, height:70, backgroundColor:Colors.grayMain, borderRadius:5,}}>
        <Image style={{ width: 70, height: 70 }} source={{ uri: item.HinhAnh    }}></Image>
        </View>
        <View style={{paddingHorizontal:20,}}>
        <TextCmp  style={{fontSize:RFValue(13)}} > {item.TEN}</TextCmp>
        <TextCmp  style={{fontSize:RFValue(13)}}> Số Lượng: {item.soluong}</TextCmp>
        <TextCmp  style={{fontSize:RFValue(13)}}> Mức: {item.mucthuongtl_fk}</TextCmp>
        </View>


    </View>
  }
  renderItemTRa(item) {

    return <View key={item.TEN} style={styles.Row} >
      {/* <Image style={{ width: 70, height: 70 }} source={{ uri: item.HinhAnh }}></Image> */}
      <View style={{paddingHorizontal:20,}}>
        <TextCmp style={{fontSize:RFValue(13)}}> {item.TEN}</TextCmp>
        <TextCmp style={{fontSize:RFValue(13)}}> Số Lượng: {item.soluong}</TextCmp>
        <TextCmp style={{fontSize:RFValue(13)}}> Mức: {item.mucthuongtl_fk}</TextCmp>
      </View>


    </View>
  }
  onPressViewSpKM = () => {
    this.setState({ ShowspMua: !this.state.ShowspMua })
  }
  onPressTang = () => {
    this.setState({ ShowTra: !this.state.ShowTra })
  }
  render() {
    const { ShowTra, sptra, infoPromotion, spkmmua, ShowspMua } = this.state;
    const { item } = this.props;

    return (
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          flex: 1,
          backgroundColor: Colors.BackgroundLightWhite,
        }}>
        <View
          style={{
            height: HEADER_MAX_HEIGHT,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: Colors.Analogus,
            zIndex: 0,
            width: width,
          }}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              // uri:
              //   'https://img.freepik.com/free-vector/flat-sale-banner-with-photo_23-2149026968.jpg',
              uri: item.HinhAnh || 'https://vifon.com.vn/vnt_upload/weblink/200616-Cover-website.png'}}
          />
        </View>
        <TouchableOpacity
          style={{position: 'absolute', top: 30, left: 20, zIndex: 300}}
          onPress={this.onPressClose}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="left" size={15} color="#fff" />
          </View>
        </TouchableOpacity>

        <ScrollView  showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1, height: 'auto', zIndex: 50, marginBottom:20,}}>
        <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.BackgroundLighOPVGreen3,
              marginTop: HEADER_MAX_HEIGHT,
              flex: 1,
              width: '100%',
            
            }}>
                     <View style={styles.tieude}>
              <View style={styles.ContentImage}>
                <Image
                  resizeMode="contain"
                  style={styles.image2}
                  source={ImgOPV.LogoMain}
                />
              </View>
              <View style={styles.ContentVoucher}>
                <TextCmp style={styles.texttieude}>{item.DIENGIAI}</TextCmp>
                <TextCmp style={styles.textday}>
                  {item.TUNGAY} đến {item.DENNGAY}
                </TextCmp>
              </View>
         </View> 
         <View style={styles.contentView}>
         <View style={styles.textdiengiaiOne}>
            {/* <TextCmp>Chi tiết chương trình tích lũy  </TextCmp> */}
            {infoPromotion && infoPromotion.length > 0 && infoPromotion.map(item => {
              if (item.STT == 1)
                return (
                  <View key={item.DIENGIAI} style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btnBuy} onPress={this.onPressViewSpKM}>
                      <TextCmp style={{ textAlign: 'center', fontSize: RFValue(13) }} >Khách hàng đã đăng kí: mức {item.muc} - Tối thiểu: {item.tumuc}  </TextCmp>
                    </TouchableOpacity>
                  </View>)
            })}

            <TextCmp style={styles.textdiengiai}> Sản phẩm mua </TextCmp>
            {/* <View style={{padding: '5%', width: '90%'}}>
                  <DashedLine
                    dashLength={10}
                    dashThickness={1}
                    dashGap={5}
                    dashColor={Colors.textOPVGray}
                    dashStyle={{borderRadius: 5}}
                  />
           </View> */}
            {infoPromotion && infoPromotion.length > 0 && infoPromotion.map(item => {

              return this.renderItem(item)
            })}
            {/* {ShowspMua && <View style={{ flex: 1 }}>
              {spkmmua && spkmmua.map(item => {
                return this.renderItem(item)
              })}
            </View>} */}
            <View style={{padding: '5%', width: '90%', }}>
                  <DashedLine
                    dashLength={10}
                    dashThickness={1}
                    dashGap={5}
                    dashColor={Colors.textOPVGray}
                    dashStyle={{borderRadius: 5}}
                  />
           </View>
           <TextCmp style={{fontSize: RFValue(13), fontWeight:'bold', color: Colors.textOPVGreen}}>Sản phẩm trả: {infoPromotion ? infoPromotion[0].diengiaitra : ''}
              {infoPromotion && infoPromotion[0].LOAITRA == 2 && <TextCmp> {' ' + infoPromotion[0].CHIETKHAU + '%'}</TextCmp>}
            </TextCmp>

            {/* <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.onPressTang} style={[styles.btnBuy, { backgroundColor: infoPromotion && infoPromotion[0].LOAITRA == 3 ? Colors.HeaderColor : 'gray' }]}>
                <TextCmp style={{ color: 'white' }}>Xem sản phẩm tặng</TextCmp>
              </TouchableOpacity>
            </View> */}
            <View>
              {sptra && sptra.length > 0 && sptra.map(item => {
                return (this.renderItemTRa(item));
              })}
            </View>
            </View>
             </View>
          </View>
        </ScrollView>


      </View>
    );
  }




}

export default connect((state) => ({
  userID: state.login.userID,
  ShopControl: state.ShopControl,
  DataAllSP: state.login.DataAllSP,
  dataLogin: state.login.dataLogin,
}), (dispatch) => ({ dispatch, }))(ViewDetailPromotion);


const styles = StyleSheet.create({
  image: {
    height: HEADER_MAX_HEIGHT,
    width: width,

    backgroundColor:Colors.Analogus,

  },
  image2: {
    height: 60,
    width: 60,

    alignSelf: 'center',
    // backgroundColor:"yellow"
  },
  ContentVoucher: {
    width: '70%',
    //backgroundColor:"blue",
    alignItems: 'flex-start',
    padding:5,
    margin:5,
  },
  ContentImage: {
    width: '20%',
    height: '100%',
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayMain
  },
  tieude: {
    position: 'absolute',
    top: -40,

    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  
    backgroundColor: 'white',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    width: '90%',

    elevation: 1,
    flexDirection: 'row',
    zIndex: 60,
  },
  texttieude: {
    color: Colors.text0PV,
    fontSize: RFValue(12),
    fontWeight: 'bold',
    width: '100%',
    paddingVertical: 5,
    textTransform: 'uppercase',
  },
  textday: {
    color: Colors.textOPVGray,
    fontSize: RFValue(13),
  },
  textdiengiaiOne: {
    width: '80%',
    fontSize: RFValue(13),
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  textdiengiai: {
    fontWeight:'bold',
    fontSize: RFValue(13),
    color: Colors.textOPVGreen
  },

  btnClose: {
    position: 'absolute', top: 5,
    left: 5, height: 55, justifyContent: 'center', alignContent: 'center'
  },
  contentView: {
    backgroundColor: Colors.BackgroundLightWhite,
    width,
    flex: 1,
    paddingTop: 100,
    justifyContent:'center',
    alignItems:'center',
  },
  btnBuy: {
    // position: 'absolute',
    // bottom: 5,
    minHeight: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%', margin: 5, padding: 5

  },
  Row: {
    flexDirection: 'row',
    marginVertical: 7,
    borderColor: 'white',
    borderTopWidth: 1,
    //justifyContent: 'center',
    alignItems: 'center'
  }
})
