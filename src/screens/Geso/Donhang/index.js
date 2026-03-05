/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2019-01-24 15:15:48
 * @modify date 2019-01-24 15:15:48
 * @desc [description]
 */


import React from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, StyleSheet, Image, SafeAreaView } from 'react-native';
import { TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';
import { CommonIcons, ImgOPV, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
import { connect, } from 'react-redux';
import { ChiTietDonHang, } from './../Profile/Actions/Action';
import formatter from './../fm';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height, } = Dimensions.get('window');
class Donhang extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      visible: true,
    },
    topBar: {
      drawBehind: false  ,
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },
      leftButtons: [
        {
          id: 'km_BACK',
          icon: CommonIcons.back2,
          style: {
            width: 60,
            height: 60,
          },

        },
      ],
      title: {
        text: 'Chi Tiết Đơn Hàng',
      },
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
  }
  componentDidMount() {

    if (this.props.donhang) {
      this.props.dispatch(ChiTietDonHang({ userId: this.props.userID, dhId: this.props.donhang.MADH, })).then((data) => {
        if (data[0].RESULT == 1) {
          //alert(JSON.stringify(data[0]) );
          this.setState({ data: data[0], });
        }
      })
        ;
    }
  }
  // shouldComponentUpdate(pr) {
  //   return pr.data != this.state.data;
  // }

  renderItem = (item) => {
    if (item.scheme == '')
      return (
        <View style={styles.item} >
          <View style={styles.viewrow}>
            <View style={{ backgroundColor: '#eeee' }}>
              {item.SOLUONG !== 0 ?
                <Image
                  resizeMode='cover'
                  style={styles.iamge}
                  source={{ uri: item.HinhAnh, }}
                ></Image>
                : <Image source={CommonIcons.gift} style={styles.iamge}></Image>
              }
            </View>
            <View style={styles.rightitem}>
              <TextCmp style={{fontSize:RFValue(12)}} numberOfLines={2}>{item.ten}</TextCmp>
              <TextCmp style={styles.txtsoluong} numberOfLines={1}>Số lượng: {item.SOLUONG} </TextCmp>
              <TextCmp style={styles.txtsoluong} numberOfLines={1}>Tổng tiền: {formatter.format(item.TongTien)}</TextCmp>
            </View>


          </View>
        </View>
      );
  }
  renderItemKM = (item) => {
    return (
      <View style={styles.item} >
        <View style={styles.viewrow}>
          <View style={{ backgroundColor: '#eeee', borderRadius: 10,overflow:'hidden' }}>
            {item.SOLUONG !== 0 ?
              <Image
                resizeMode='cover'
                style={styles.iamge}
                source={{ uri: item.HinhAnh, }}
              ></Image>
              : <Image source={ImgOPV.giftdiscountR} style={styles.iamge}></Image>
            }
          </View>
          <View style={styles.rightitem}>
            {item.SOLUONG !== 0 && <TextCmp style={[styles.txtKM,]} numberOfLines={2}>{item.ten} </TextCmp>}
            {item.scheme && <TextCmp style={[styles.txtKM, styles.txtsoluong, {color: Colors.textOPVRed}]} numberOfLines={2}>KM: {item.scheme}</TextCmp>}
          
            {item.SOLUONG !== 0 && <TextCmp style={[styles.txtKM, styles.txtsoluong,]} numberOfLines={1}>Số Lượng: {item.SOLUONG}</TextCmp>}
            <TextCmp style={[styles.txtKM, styles.txtsoluong,]} numberOfLines={1}>Tổng tiền: {formatter.format(item.TongTien)}</TextCmp>
          </View>


        </View>
      </View>
    );
  }

  render() {
    const { data, } = this.state;
    const contentStyle = [
      styles.content,
      {
        backgroundColor: '#fff',
        width,

      },
    ];
    let listsp = '';
    let listkm = [];
    if (data) {
      listsp = JSON.parse(data.ChiTiet);
      listkm = listsp.filter(item => item.scheme != '');
    }

    const { donhang, dataLogin } = this.props;
    console.log('donhangxx', donhang);
    return (
      <SafeAreaView style={styles.Content} >
        {listsp === '' ?
          <ActivityIndicator size="small" color={Colors.HeaderColor} /> :
          <View style={styles.ContentWrap}>
            <View style={{ backgroundColor: '#ffff', }}>
              {<View >
               <TextCmp style={[styles.Textinfo]}>{donhang.MADH}</TextCmp>
                <TextCmp style={[styles.Textinfo,{fontSize:RFValue(12), fontWeight:'100'}]}>{donhang.NGAYDH}</TextCmp>
                <View style={{ borderBottomWidth: 1, borderBottomColor:Colors.BackgrondLightOPV5, marginBottom: 5 }} />
                <TextCmp style={[styles.TextinfoDD]}>Nhà phân phối: {donhang.tennpp}</TextCmp>
                <TextCmp style={styles.TextinfoDD}>Số điện thoại: {dataLogin.dt_npp}</TextCmp>
                <TextCmp  style={styles.TextinfoDD}>Người đại diện bán hàng: {dataLogin.tenddkd}</TextCmp>
                <TextCmp style={styles.TextinfoDD}>Số điện thoại: {dataLogin.dt_ddkd}</TextCmp>
                <View style={{ borderBottomWidth: 1, borderBottomColor:Colors.BackgrondLightOPV5, marginBottom: 5 }} />
              </View>}

              <ScrollView>
                <View>
                  <TextCmp style={{ fontWeight: 'bold', fontSize: RFValue(12), color: Colors.text0PV, }}>Danh Sách Sản Phẩm </TextCmp>
                  <FlatList
                    style={{ backgroundColor: 'white', }}
                    data={listsp}
                    initialNumToRender={10}
                    extraData={listsp}
                    keyExtractor={(item) => item.pk_seq + ''}
                    renderItem={({ item, index, }) => this.renderItem(item, index)}>
                  </FlatList>
                  <View>
                    {data && <View style={{ borderRadius:5, marginVertical: 10, padding: 10, backgroundColor:Colors.BackgroundLightBlue }}>
                    {/* <TextCmp style={{ margin: 10, fontWeight: 'bold' }}>Thanh toán</TextCmp> */}
                      <TextCmp style={{ fontWeight: 'bold', fontSize: RFValue(12),  color: Colors.textOPVGreen}}> Tổng giá trị: {formatter.format(data.TongGiaTri)}</TextCmp>
                      <TextCmp style={{ fontWeight: 'bold', fontSize: RFValue(12),  color: Colors.textOPVGreen }}> Tổng KM: {formatter.format(data.TongKM)}</TextCmp>
                    </View>}
                  </View>
                  <TextCmp style={{ fontWeight: 'bold', fontSize:RFValue(12) , color: Colors.text0PV}}>Danh Sách Khuyến Mãi Áp Dụng</TextCmp>
                  <FlatList
                    style={{ backgroundColor: 'white', width, }}
                    data={listkm}
                    initialNumToRender={10}
                    extraData={listkm}
                    keyExtractor={(item) => item.pk_seq + ''}
                    renderItem={({ item, index, }) => this.renderItemKM(item, index)}>
                  </FlatList>
                </View>
                </ScrollView>

            </View>
            {/* {data && <View style={{ borderBottomWidth: 0.5, padding: 5, position: 'absolute', bottom: 30, }}>
              <Text>SỐ ĐH: {data.SODONHANG}</Text>
              <Text> NGÀY: {data.NGAYNHAP}</Text>
              <Text>Đơn hàng đã tiếp nhận</Text>
              </View>} */}
        
          </View>
        }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Content: {
    
    flex: 1,
    justifyContent:"center",
    alignItems:'center',
    backgroundColor: Colors.BackgrondLightOPV5

  },
  ContentWrap: {
    
    flex: 1,
    padding:10,
    margin:10,
    borderRadius: 10,
    backgroundColor:'white'

  },
  Textinfo: {
    fontSize: RFValue(16),
    fontWeight:"bold",
    color: Colors.textOPVBlue,
    // textTransform : 'uppercase',
    // backgroundColor:'red',
  },
  TextinfoDD: {
    fontSize: RFValue(12),
    color: Colors.text,
    paddingBottom:5,
  //  textTransform : 'capitalize'
  },
  item: { backgroundColor: Colors.backgroundColor, },
  viewrow: { flexDirection: 'row', width, borderBottomWidth: 1, alignContent: 'center', borderColor: Colors.BackgrondLightOPV5, padding: 5, },
  iamge: { alignContent: 'center', justifyContent: 'center', width: 70, padding: 5, height: 70, borderColor: '#eeee', borderRadius: 5, },
  rightitem: { justifyContent: 'center', marginLeft: 7, },
  txtsoluong: { fontSize: RFValue(12), },
  txtKM: { fontSize: RFValue(12), },
});
export default connect((state) => ({
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
}), (dispatch) => ({ dispatch, }))(Donhang);