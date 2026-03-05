import React from 'react';
import {
  View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator,
  Dimensions, ScrollView, RefreshControl,
  Platform
} from 'react-native';
import { Navigation, } from 'react-native-navigation';
import { KeyboardAwareScrollView, } from 'react-native-keyboard-aware-scroll-view';
import formatter from './../../fm';

import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';
import RowItem from './RowItem';
import TiepTucMuaHang from './TiepTucMuaHang';
import RowItemKm from './RowItemKM';
import ViewGhiChu from './ViewGhichu';
import { RecyclerListView, DataProvider, LayoutProvider, } from 'recyclerlistview';
import { AppNavigation, } from '../../../../app-navigation';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IDs } from '../../..';
import { CommonIcons } from '../../../../assets';
import ScanScreen from '../../ScanQrcode';
import { RFValue } from 'react-native-responsive-fontsize';
import { BarIndicator } from 'react-native-indicators';




const { width, height, } = Dimensions.get('window');


const hieghtBottom = 139;
export default class Viewgiohang extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    //this.navigationEventListener =  Navigation.events().bindComponent(this);
    this.state = {
      //data:this.props.data;
      loading: false,
      dataProvider: new DataProvider((r1, r2) => {
        return r1.soluong !== r2.soluong;
      }).cloneWithRows(this.props.data),

    };
    this._layoutProvider = new LayoutProvider((i) => {
      return this.state.dataProvider.getDataForIndex(i).pk_seq;
    }, (type, dim) => {

      switch (type) {
        default:
          dim.width = width;
          dim.height = 125;

      }
    });
  }
  componentDidMount() {

  }
  shouldComponentUpdate(data, appKm) {
    return data !== this.props.data || appKm !== this.props.appKm;
  }
  componentDidUpdate(prevProps) {
    // only update chart if the data has changed
    if (prevProps.data !== this.props.data) {
      //alert(this.props.data.length);
      let mydata = [];
      mydata = this.props.data;
      let dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(mydata);

      this.setState({ data: mydata, dataProvider: dataProvider, });
    }

  }


  renderItemKM = ({ item, }) => {
    return <RowItemKm item={item}></RowItemKm>;
  };
  xoaspgiohang = (item) => () => {
    //alert(item.ten);
    AppNavigation.changeBage(this.props.data.length - 1);
    this.props.dispatch({ type: 'xoaspgiohang', pk_seq: item.pk_seq, });
    this.props.dispatch({ type: 'tinhtien', });
  }
  ThemSP() {

    this.props.dispatch({ type: 'searchKeyword', searchKeyword: ' ', });
    this.props.dispatch({ type: 'setsDataSearch', searchKeyword: ' ', });
    const { navigator, } = this.props;
    return AppNavigation.showModal({
      name: IDs.SearchScreen,
      options: {
        statusBar: {
          backgroundColor: Colors.statusBar,
          visible: true,


        },
        topBar: {

          visible: false,
          _height: 0,
          drawBehind: false,
          title: {
            text: 'Xem chi tiết khuyết mãi',
          },
          background: {
            color: Colors.HeaderColor,
          },

          rightButtons: [
            {
              id: 'btntop',
              icon: CommonIcons.closeWhite,
            },
          ],
        },
      },
      passProps: {
        showback: true,
      },

    });
  }
  Scanqrcode() {
    AppNavigation.showModal({
      name: IDs.ScanQrcode,
      passProps: {
        dispatch: this.props.dispatch,
        userID: this.props.userID,
        ShopControl: this.props.ShopControl
      },
      options: {
        statusBar: {
          backgroundColor: Colors.statusBar,
          visible: true,


        },
        topBar: {

          visible: false,
          _height: 0,
          drawBehind: true,
          title: {
            text: 'Xem chi tiết khuyết mãi',
          },
          background: {
            color: Colors.HeaderColor,
          },

          rightButtons: [
            {
              id: 'btntop',
              icon: CommonIcons.closeWhite,
            },
          ],
        },
      },
    });
    //  AppNavigation.showCommonDialog(
    //     {renderContent: ()=>   
    //      <View>
    //       <ScanScreen></ScanScreen>

    //      </View>
    //     });

  }
  PressViewAll = (t) => {
    this.ThemSP()
    // if (t) {
    //   this.props.dispatch({ type: 'searchKeyword', searchKeyword: 'Sản phẩm bán chạy', });
    //   this.props.dispatch({ type: 'setsDataSearch', searchKeyword: t + '', });
    // }
    // AppNavigation.changeTab(1);
  }
  renderItem = (t, item, index) => {
    const {
      addsoluong,
      trusoluong,
      onChangeText,

    } = this.props;
    return (
      <RowItem
        key={t}
        item={item}
        xoaspgiohang={this.xoaspgiohang}
        addsoluong={addsoluong}
        trusoluong={trusoluong}
        onChangeText={onChangeText}
      ></RowItem>
    );
  };

  render() {
    const {
      data,
      tongtien,
      AppKMDH,
      onChangeGhichu, datakm, TongTienKM,
      huyupdatedon, Iddonhang, dataLogin,
      Scanqrcode,
      curentNPP,
      pressChonNpp,
      pressChonNvbh,
      curentddkd
    } = this.props;
    const { dataProvider } = this.state
    if (data.length == 0)
      return <TiepTucMuaHang Scanqrcode={() => this.Scanqrcode()} PressViewAll={(t) => this.PressViewAll('-All-')}  ></TiepTucMuaHang>
    return (
      <View style={styles.containt}>
        <View style={styles.header}>
          <TextCmp style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{this.props.appKm ? 'Giỏ Hàng' : 'Xác nhận đơn hàng'}</TextCmp>

          <TouchableOpacity onPress={() => this.ThemSP()} style={styles.btnScan}>
            <FontAwesome5 color='white' size={22} name='cart-plus'></FontAwesome5>
            
          </TouchableOpacity>

        </View>
        {/* {Iddonhang &&
          <View style={{ backgroundColor: 'red', height: 45, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
            <TextCmp style={{ color: 'white', fontWeight: 'bold', }}>Cập nhập đơn hàng {Iddonhang.MADH}</TextCmp>
            <TouchableOpacity onPress={huyupdatedon}>
              <TextCmp style={{ color: 'white', fontWeight: 'bold', }}> Hủy </TextCmp>
            </TouchableOpacity>
          </View>
        } */}
        <KeyboardAwareScrollView style={{}} >
          <TouchableOpacity style={styles.btnChonNpp} onPress={() => pressChonNpp()}>
         
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                
                  backgroundColor: Colors.BackgroundLightWhite,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                 <FontAwesome5 name='store' color={Colors.HeaderColor} size={15}></FontAwesome5>
                </View>
           
           
            <TextCmp style={{ width: '80%' , fontSize: RFValue(13) }}>Nhà phân phối: {curentNPP.ten}</TextCmp>
            <AntDesign name='down'></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnChonNpp} onPress={() => pressChonNvbh()}>  
             <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                
                  backgroundColor: Colors.BackgroundLightWhite,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                 <FontAwesome5 name='user-tag' color={Colors.HeaderColor} size={15}></FontAwesome5>
             </View>
            
            <TextCmp style={{ width: '80%', fontSize: RFValue(13) }}>Nhân viên BH: {curentddkd.label}</TextCmp>
            <AntDesign name='down'></AntDesign>
          </TouchableOpacity>
          {/* {!this.props.appKm && <View style={{ padding: 10, borderBottomColor: '#eeee', borderBottomWidth: 1 }}>
            <TextCmp>Số điện thoại: {dataLogin.dt_npp}</TextCmp>
            <TextCmp>Người đại diện bán hàng: {dataLogin.tenddkd}</TextCmp>
            <TextCmp>Số điện thoại: {dataLogin.dt_ddkd}</TextCmp>
          </View>} */}


          {!this.props.appKm && <View><TextCmp style={{ margin: 10, fontWeight: 'bold', fontSize: RFValue(13), color: Colors.text0PV }}>Danh sách sản phẩm </TextCmp></View>}
          {data &&
            <RecyclerListView style={{
              minWidth: 1, minHeight: 1, height: this.props.appKm ? height * 1.5 : this.props.data.length * 125,
              marginBottom: !this.props.appKm ? 0 : 150
            }}
              rowRenderer={this.renderItem}
              dataProvider={dataProvider}
              layoutProvider={this._layoutProvider}
              scrollEventThrottle={1}
              removeClippedSubviews={true}
              scrollViewProps={{
                scrollEnabled: false,
                refreshControl: (
                  <RefreshControl
                    refreshing={this.state.loading}
                    onRefresh={async () => {
                      this.setState({ loading: true });
                      // analytics.logEvent('Event_Stagg_pull_to_refresh');
                      // await refetchQueue();
                      this.setState({ loading: false });
                    }}
                  />
                )
              }}
            />
          }

          {/* {data &&
            <FlatList  
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
           
            />
          } */}

          {!this.props.appKm && <View style={{ borderBottomWidth: 1, borderBottomColor: '#eeee' }}>
            <TextCmp style={{ margin: 10, fontWeight: 'bold' , color: Colors.text0PV}}>Thanh toán</TextCmp>
            <View style={styles.rowinbottom}>
              <TextCmp style={{ flex: 1 }}>Thành tiền</TextCmp>
              <TextCmp style={{ textAlign: 'right', flex: 1, fontSize: 14 }}>{formatter.format(tongtien)} VNĐ</TextCmp>
            </View>
            <View style={styles.rowinbottom}>
              <TextCmp style={{ flex: 1 }}>Khuyến mãi:</TextCmp>
              <TextCmp style={{ textAlign: 'right', flex: 1, fontSize: 14 }}>{formatter.format(TongTienKM)} VNĐ</TextCmp>
            </View>
            <View style={styles.rowinbottom}>
              <TextCmp style={{ fontWeight: 'bold', flex: 1 , color: Colors.text0PV}}>Tổng tiền TT: </TextCmp>
              <TextCmp style={{ fontWeight: 'bold', textAlign: 'right', flex: 1 , color: Colors.text0PV}}>{formatter.format(tongtien - TongTienKM)} VNĐ</TextCmp>
            </View>
          </View>}
          {!this.props.appKm && <View><TextCmp style={{ margin: 10, fontWeight: 'bold', fontSize: RFValue(14) , color: Colors.text0PV }}>Danh sách khuyến mãi áp dụng </TextCmp></View>}
          {datakm && datakm.length > 0 && !this.props.appKm && <View style={{ padding: 5, marginTop: 1, }}>
            {/* <TextCmp style={{ width: '50%', color: 'red', }}>Khuyến mãi</TextCmp> */}
            <View style={{ fontWeight: 'bold', textAlign: 'right', width: '50%', }}>
              {datakm.map((item) => {
                return (
                  <RowItemKm item={item} key={item.id + ''}></RowItemKm>
                );
              })}
            </View>
          </View>}

          {!this.props.appKm && <View style={{ marginBottom: 35 }}>
            <ViewGhiChu onChangeGhichu={onChangeGhichu}></ViewGhiChu>
          </View>}
        </KeyboardAwareScrollView>


        <View style={styles.bottomView}>

          {this.props.appKm && <View style={styles.bottomVieWTop }>
            <View style={styles.rowinbottom}>
              <TextCmp style={{ flex: 1  ,fontSize: RFValue(13) }}>Thành tiền</TextCmp>
              <TextCmp style={{ textAlign: 'right', flex: 1, fontSize: RFValue(13) }}>{formatter.format(tongtien)} VNĐ</TextCmp>
            </View>
            <View style={styles.rowinbottom}>
              <TextCmp style={{ flex: 1  ,fontSize: RFValue(13) }}>Khuyến mãi</TextCmp>
              <TextCmp style={{ textAlign: 'right', flex: 1, fontSize: RFValue(13) }}>{formatter.format(TongTienKM)} VNĐ</TextCmp>
            </View>
            <View style={styles.rowinbottom}>
              <TextCmp style={{ fontWeight: 'bold', flex: 1 , fontSize: RFValue(13) , color: Colors.text0PV}}>Tổng tiền TT: </TextCmp>
              <TextCmp style={{ fontWeight: 'bold', textAlign: 'right', flex: 1, fontSize: RFValue(13) }}>{formatter.format(tongtien - TongTienKM)} VNĐ</TextCmp>
            </View>
          </View>}

          <TouchableOpacity onPress={AppKMDH} style={styles.btnappdon}>

            <View style={styles.viewbtnapdon}>
              {this.props.Loading ? <BarIndicator size={16}  color="white" /> :
                <TextCmp style={styles.txtapdon}> {this.props.appKm ? 'Tính khuyến mãi' : 'Xác nhận đặt hàng'}  </TextCmp>
              }
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({

  btnChonNpp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f2f5',
 
    
    

  },
  btnScan: {
    flexDirection: 'row', alignItems: 'center', position: 'absolute',
    right: 10, 
    // borderWidth: 1, borderColor: 'white',
  
  },
  txtapdon: { color: 'white', fontSize: RFValue(14), fontWeight: 'bold', },
  containt: { backgroundColor: 'white', flex: 1 },

  bottomView: {
    width, position: 'absolute', bottom: 0,
    marginTop: 5,
    backgroundColor: Colors.backgroundL3,
    elevation: 2,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,

 

    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 5,
    backgroundColor:Colors.BackgroundLightWhite,
    borderTopWidth: 1, borderColor: '#eeee',
    
  },
  bottomVieWTop:{
    minHeight:100,
    paddingVertical:10,
  },
  rowinbottom: { flexDirection: 'row', padding: 5, marginTop: 2, marginHorizontal: 5, },
  btnappdon: { height: 45, width, borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop:5 , },
  viewbtnapdon: { height: 45, width: width - 30, backgroundColor: Colors.textOPVGreen, borderRadius: 3, alignItems: 'center', justifyContent: 'center', },
  header: {
    height: 60, width, backgroundColor: Colors.HeaderColor, justifyContent: 'center', alignContent: 'center',
    alignItems: 'center'
  }
});