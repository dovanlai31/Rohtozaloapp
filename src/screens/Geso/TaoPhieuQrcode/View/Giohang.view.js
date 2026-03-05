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
import { IDs } from '../../..';
import { CommonIcons } from '../../../../assets';
import ScanScreen from '../../ScanQrcode';




const { width, height, } = Dimensions.get('window');


const hieghtBottom = 139;
export default class Viewgiohang extends React.Component {

  constructor(props) {
    super(props);


  }
  componentDidMount() {
    this.Scanqrcode();
  }

  componentDidUpdate(prevProps) {
    // only update chart if the data has changed

  }


  Scanqrcode() {
    AppNavigation.showModal({
      name: IDs.ScanQrcode,
      passProps: {
        dispatch: this.props.dispatch,
        userID: this.props.userID,
        ShopControl: this.props.ShopControl,
        ThemSp: (data) => this.props.ThemSp(data)
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
      deleterow
    } = this.props;

    if (data.length == 0)
      return <TiepTucMuaHang Scanqrcode={() => this.Scanqrcode()}  ></TiepTucMuaHang>
    return (
      <View style={styles.containt}>
        <ScrollView>
          <View style ={{marginTop:55}}>
          {data && data.map((sp, index) => {
            return <RowItem
              key={index}
              item={sp}
              xoaspgiohang={() => deleterow(index)}
              addsoluong={() => { }}
              trusoluong={() => { }}
              onChangeText={() => { }}
            ></RowItem>
          })}
          </View>
         

        </ScrollView>


        <TouchableOpacity onPress={()=>this.Scanqrcode()} style={styles.bottomViewScan} >
          <AntDesign color='white' size={25} name='qrcode'></AntDesign>
        </TouchableOpacity>

      </View>
    );
  }

}


const styles = StyleSheet.create({

  bottomViewScan:{
    position:'absolute', bottom:20,right:20,
    width:50, height:50, borderRadius:25,
    justifyContent:'center',alignItems:'center'
    ,backgroundColor:Colors.HeaderColor
  },
  btnScan: {
    flexDirection: 'row', alignItems: 'center', position: 'absolute',
    right: 10, borderWidth: 1, borderColor: 'white'
  },
  txtapdon: { color: 'white', fontSize: 14, fontWeight: 'bold', },
  containt: { backgroundColor: 'white',flex:1 },

  bottomView: {
    width, position: 'absolute', bottom: 0,
    marginTop: 5,
    backgroundColor: Colors.backgroundL3,
    elevation: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 5,

  },
  rowinbottom: { flexDirection: 'row', padding: 5, marginTop: 2, marginHorizontal: 10, },
  btnappdon: { height: 35, width, borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginBottom: 5, },
  viewbtnapdon: { height: 35, width: width - 30, backgroundColor: Colors.HeaderColor, borderRadius: 3, alignItems: 'center', justifyContent: 'center', },
  header: {
    height: 60, width, backgroundColor: Colors.HeaderColor, justifyContent: 'center', alignContent: 'center',
    alignItems: 'center'
  }
});