import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {AppNavigation} from '../../../app-navigation';
import {TextCmp} from '../../../common-components';
import {Colors} from '../../../theme';
import {getInforPromotion, getspkmtra, getspkmmua} from './actions';
import formatter from './../fm';
import {themspgiohang} from '../ChitietSP/Action/ChitietSp.action';
import {ImgICon, ImgOPV} from '../../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import DashedLine from 'react-native-dashed-line';
const HEADER_MAX_HEIGHT = 250;

const {width, height} = Dimensions.get('window');
class ViewDetailPromotion extends React.Component {
  constructor() {
    super();
    this.state = {
      report: '',
      loadding: true,
      linkuri: '',
      progress: 0,
      infoPromotion: null,
      ShowspMua: true,
      spkmmua: [],
      ShowTra: true,
      sptra: [],
    };
  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    if (this.props.dispatch) {
      this.getdata();
    }
  }
  getdata() {
    //     DK mua: có 2 loại
    // loại 1: bắt buộc nhập số lượng => tongluong, tongtien trong bang DIEUKIENKHUYENMAI ko co gia tri
    // loại 2: Bất kì trong : co 2 hình thức
    // hình thức 1: tền. cột tong tiền có gia tri
    // hinh thức 2: sl, cột sl có giá tri
    // DK Tra:
    // có 3 loai: bang trakm
    // loại 1: tổng tiền , cột tông tiền có giá tri
    // loai 2: chiết khấu, cột chietkhau co gia tri
    // loai 3: san pham , có 2 hình thức
    // hinh thức 1: bắt buộc nhập soluong (3 côt kia ko gia tri)
    // hình thức 2: bất kì trong (tổng lượng có gia tri)
    // phép toán 2 or, 1 là and
    let params = {ctkmId: this.props.item.pk_seq};
    this.props.dispatch(getInforPromotion(params)).then(res => {
      if (res) {
        this.setState({infoPromotion: JSON.parse(res)});
        this.getspkmmua(JSON.parse(res)[0].PK_SEQMUA);
        this.getspkmtra(JSON.parse(res)[0].PK_SEQTRA);
      }
      //alert(JSON.stringify(params))
    });
  }
  getspkmmua(muakmID) {
    let params = {muakmID: muakmID, userId: this.props.userID};
    //alert(JSON.stringify(params))
    this.props.dispatch(getspkmmua(params)).then(res => {
      //alert(JSON.stringify(res))
      if (res) {
        this.setState({spkmmua: JSON.parse(res)});
      }
    });
  }
  getspkmtra(trakmID) {
    let params = {trakmID: trakmID, userId: this.props.userID};
    //alert(JSON.stringify(params))
    this.props.dispatch(getspkmtra(params)).then(res => {
      if (res) {
        this.setState({sptra: JSON.parse(res)});
      }
    });
  }
  navigationButtonPressed({buttonId}) {
    if (buttonId === 'btntop') {
      AppNavigation.dismissAllModals();
    }
  }
  onPressClose = () => {
    AppNavigation.dismissAllModals();
  };
  PressBuy(item) {
    const {infoPromotion} = this.state;
    AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length + 1);

    let sanpham = {
      qcThung: item.qcThung,
      soluong:
        infoPromotion[0].TONGLUONGMUA < item.qcThung
          ? 1
          : infoPromotion[0].TONGLUONGMUA,
      pk_seq: item.PK_SEQ,
      ten: item.TEN,
      dongia: item.dongia,
      dongiaThung: item.dongiaThung,
      donvi: item.donvi,
      HinhAnh: item.Anh,
      ma: item.MA,
      hienhuu: 1000,
    };
    // item.qcThung*infoPromotion[0].TONGLUONGMUA
    //return alert(JSON.stringify(sanpham))
    //return alert(sanpham.soluong)
    this.props.dispatch(themspgiohang(sanpham));
    AppNavigation.dismissAllModals();
    AppNavigation.changeTab(2);
  }
  renderItem(item) {
    //alert('xxx')
    const {infoPromotion} = this.state;
    if (item.dongia > 0)
      return (
        <View key={item.TEN} style={styles.Row}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
           
                borderRadius:10,
              }}>
              <Image
                style={{width: 70, height: 70}}
                source={{uri: item.Anh}}
              />
            </View>

            <View style={{width: '50%'}}>
              <TextCmp style={[styles.textSp, {fontWeight: 'bold'}]}>
                {item.TEN}
              </TextCmp>
              <TextCmp style={[styles.textSp, {color: Colors.textOPVGray}]}>
                Mã: {item.MA}
              </TextCmp>
              {/* <TextCmp>Quy cách: 1 thùng= {item.qcThung} {item.donvi}</TextCmp> */}
              <TextCmp
                style={[
                  styles.textSp,
                  {color: Colors.textOPVRed, fontWeight: 'bold'},
                ]}>
                {formatter.format(item.dongia)}{' '}
                <TextCmp
                  style={[
                    styles.textSp,
                    {
                      color: Colors.textOPVGreen,
                      fontWeight: 'bold',
                      fontSize: RFValue(13),
                    },
                  ]}>
                  {' '}
                  VNĐ
                </TextCmp>
              </TextCmp>
            </View>
            <View style={{width: '20%'}}>
              <TouchableOpacity
                style={{
                  height: 35,
                  margin: 5,
                  width: 35,

                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => this.PressBuy(item)}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.BackgroundLightWhite,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5
                    name="cart-plus"
                    size={20}
                    color={Colors.textOPVGreen}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    return <View />;
  }
  renderItemTRa(item) {
    const {infoPromotion} = this.state;
    return (
      <View key={item.TEN} style={styles.RowTra}>
        <TextCmp
          style={[
            styles.textSp,
            {fontWeight: 'bold', color: Colors.textOPVGreen},
          ]}>
          {item.TEN}
        </TextCmp>
        <TextCmp
          style={[
            styles.textSp,
            {fontSize: RFValue(10), color: Colors.textOPVGray},
          ]}>
          Mã: {item.MA}
        </TextCmp>
      </View>
    );
  }
  onPressViewSpKM = () => {
    this.setState({ShowspMua: !this.state.ShowspMua});
  };
  onPressTang = () => {
    this.setState({ShowTra: !this.state.ShowTra});
  };
  render() {
    const {ShowTra, sptra, infoPromotion, spkmmua, ShowspMua} = this.state;
    const {item} = this.props;

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
                uri:item.banner?item.banner:item.HinhAnh 
            }}
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
        <View
          style={{
            position: 'absolute',
            top: 30,
            right: 5,
            zIndex: 300,
            flexDirection: 'row',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity onPress={this.onPressViewSpKM}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <FontAwesome5
                name={ShowspMua ? 'sort-amount-down' : 'sort-amount-up'}
                size={15}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
          {/* {infoPromotion && infoPromotion[0].LOAITRA == 3 ?  <TouchableOpacity   onPress={this.onPressTang}>
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <FontAwesome5 name={ShowTra?'gift':'gift'} size={15} color='#fff' />
                </View>
        </TouchableOpacity> : null} */}
        </View>
        <ScrollView  
        showsVerticalScrollIndicator={false}
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
                <TextCmp style={styles.texttieude}>{item.diengiai}</TextCmp>
                <TextCmp style={styles.textday}>
                  {item.TUNGAY} đến {item.DENNGAY}
                </TextCmp>
              </View>
            </View>
            <View style={styles.contentView}>
               <View style={styles.textdiengiaiOne}>
                  <TextCmp style={styles.textdiengiai}>
                {'Điều kiện:'}{infoPromotion ? infoPromotion[0].diengiaimua : ''}
                  </TextCmp>
                  {infoPromotion &&
                    infoPromotion[0].LOAITRA == 3 &&
                    infoPromotion[0].HINHTHUCTRA == 2 && (
                      <TextCmp style={styles.textdiengiai}>
                        Bất kì trong các sản phẩm
                      </TextCmp>
                    )}
                </View>
                {/* <View style={{padding: '5%', width: '90%'}}>
                  <DashedLine
                    dashLength={10}
                    dashThickness={1}
                    dashGap={5}
                    dashColor={Colors.textOPVGray}
                    dashStyle={{borderRadius: 5}}
                  />
                </View> */}
              {ShowspMua && (
                <>
                <View style={{flex: 1}}>
                  {spkmmua &&
                    spkmmua.map(item => {
                      return this.renderItem(item);
                    })}
                </View>
                <View style={{padding: '5%', width: '90%'}}>
                <DashedLine
                  dashLength={10}
                  dashThickness={1}
                  dashGap={5}
                  dashColor={Colors.textOPVGray}
                  dashStyle={{borderRadius: 5}}
                />
                </View>
                </>
              )}

              <View
                style={{width, justifyContent: 'center', alignItems: 'center'}}>
                {/* <View style={{padding: '5%', width: '90%'}}>
                  <DashedLine
                    dashLength={10}
                    dashThickness={1}
                    dashGap={5}
                    dashColor={Colors.textOPVGray}
                    dashStyle={{borderRadius: 5}}
                  />
                </View> */}
                <TextCmp
                  style={{
                    fontSize: RFValue(13),
                    paddingVertical: 10,
                    color: Colors.text0PV,
                
                  }}>
                  Khuyến mãi {infoPromotion ? infoPromotion[0].diengiaitra : ''}
                  {infoPromotion && infoPromotion[0].LOAITRA == 2 && (
                    <TextCmp> {' ' + infoPromotion[0].CHIETKHAU + '%'}</TextCmp>
                  )}
                </TextCmp>
              </View>
              {ShowTra && (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Colors.BackgroundLightWhite,
                  }}>
                  {sptra &&
                    sptra.map(item => {
                      return this.renderItemTRa(item);
                    })}
                </View>
              )}

              {/* <TouchableOpacity
                onPress={this.onPressTang}
                style={[
                  styles.btnBuy,
                  {
                    backgroundColor:
                      infoPromotion && infoPromotion[0].LOAITRA == 3
                        ? Colors.BackgroundLighOPVGreen3
                        : 'gray',
                  },
                ]}>
                <TextCmp style={{color: 'white'}}>Xem sản phẩm tặng</TextCmp>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    userID: state.login.userID,
    ShopControl: state.ShopControl,
    DataAllSP: state.login.DataAllSP,
    dataLogin: state.login.dataLogin,
  }),
  dispatch => ({dispatch}),
)(ViewDetailPromotion);

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
    fontSize: RFValue(13),
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
    width: '100%',
    fontSize: RFValue(13),
    
  },

  btnClose: {
    position: 'absolute',
    top: 5,
    left: 5,
    height: 55,
    justifyContent: 'center',
    alignContent: 'center',
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
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.HeaderColor,
    width: '80%',
    alignSelf: 'center',
    margin: 10,
  },
  Row: {
    padding: 10,
    margin: 10,
    backgroundColor: Colors.grayMain,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 3,
  },
  RowTra: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  textSp: {
    fontSize: RFValue(11),
  },
});
