import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  Dimensions, Alert,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from 'react-native';
import Viewgiohang from './View/Giohang.view';
import { ApKhuyenMaiDonHang, createDonHang, gettichluy, createDonHangQrcode, } from './Actions/Giohang.actions';
import { AppNavigation, } from '../../../app-navigation';
import { Colors, } from '../../../theme';
import { SnackBar, } from '../../../utils';
import { Navigation, } from 'react-native-navigation';
import { TextCmp } from '../../../common-components';
import { IDs } from '../..';
import { CommonIcons } from '../../../assets';
const { height, } = Dimensions.get('window');

class Giohang extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      visible: true,
    },
    topBar: {
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },
      leftButtons: [
        {
          id: 'km_BACK',
          icon: CommonIcons.back2,
        },
      ],
      rightButtons: [
        {
          id: 'save',
          icon: CommonIcons.done,
        },
      ],
      title: {
        text: 'Scan QRcode',
      },
    },
  };


  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      datakm: [],
      dataTL: [],
      datatltheodon: [],
      ghichu: '',
      TongTienKM: 0,
      Listdata: []
    };
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK'){ this.props.navigator._pop(); }
    if (buttonId === 'save'){ this.save() }
  }
  save() {
    let params="";
    const { Listdata } = this.state
  
    if (Listdata.length == 0)
      return Alert.alert("Thông báo", "Chưa có sản phẩm")


    this.setState({ Loading: true, });
    let listsp = [];
    let khuyenmai = [];
    Listdata.map((s) => {
      listsp.push({ 'spId': s.pk_seq, 'soluong': s.soluong, 'thung': 1, });
    });

    let dataLogin = this.props.dataLogin;
     params = { dienthoai:dataLogin.dienthoai ,userId: this.props.userID, sanpham: JSON.stringify(listsp), khuyenmai: JSON.stringify(khuyenmai), SanPhamSuDung: '', ghichu: this.state.ghichu, };

    let method = 'createDonHangQrcode';

    //return alert(JSON.stringify(params))

    this.props.dispatch(createDonHangQrcode(params, method)).then((data) => {
      if (data[0].RESULT != '1') {
        AppNavigation.showCommonDialog({
          title: 'Thông báo',
          desc: '' + data[0].MSG,
        });
      } else {

        this.setState({ Listdata: [], });
        Alert.alert('Thông báo ', '' + data[0].MSG);
        // SnackBar.showSuccess('Lưu đơn hàng thành công ');

      }

      this.setState({ Loading: false, });
    });


  }





  AppKMDH = () => {

    let { Listgiohang, appKm, } = this.props.ShopControl;

    let params;// ={ userId: this.props.userID, sanpham: sp, dieuchinh: '1', ctkmSort }


    if (appKm) {
      let listsp = [];
      let listsort = [];

      let flag = true;
      Listgiohang.map((s) => {
        listsp.push({ 'spId': s.pk_seq, 'soluong': s.soluong * s.qcThung, 'thung': 0, });
        if (s.soluong > 0) {
          flag = false
        }
      });
      // if(sphetton.length>0)
      // {return Notify.show('Thông báo','Sản phẩm '+ sphetton+' \nkhông đủ tồn kho ');}
      if (flag) { return Alert.alert('Thông báo', 'Vui lòng nhập số lượng sản phẩm'); }
      this.setState({ Loading: true, datakm: [] });
      params = { userId: this.props.userID, sanpham: JSON.stringify(listsp), dieuchinh: '0', ctkmSort: JSON.stringify(listsort), };

      let khuyenmai = [];
      let tienkm = 0
      this.props.dispatch(ApKhuyenMaiDonHang(params)).then((data) => {
        if (data[0].RESULT == '1') {

          JSON.parse(data[0].DATA).map((s) => {
            if (s.Loai === '3') {//trả sp
              if (s.HinhThuc === '2') {
                if (JSON.parse(s.spTen)[0].AVAILABLE > 0)
                  khuyenmai.push({ 'Scheme': s.Scheme, 'DienGiai': s.DienGiai, 'id': s.id, 'tkmId': s.TraKhuyenMai, 'sosuat': s.sosuat, 'TongGiaTri': 0, 'spId': JSON.parse(s.spTen)[0].spId, 'soluong': (parseFloat(s.TongLuong) * parseFloat(s.sosuat)), 'HinhAnh': JSON.parse(s.spTen)[0].HinhAnh, 'TEN': JSON.parse(s.spTen)[0].TEN, });
              } else { khuyenmai.push({ 'Scheme': s.Scheme, 'DienGiai': s.DienGiai, 'id': s.id, 'tkmId': s.TraKhuyenMai, 'sosuat': s.sosuat, 'TongGiaTri': 0, 'spId': JSON.parse(s.spTen)[0].spId, 'soluong': JSON.parse(s.spTen)[0].SOLUONG, 'HinhAnh': JSON.parse(s.spTen)[0].HinhAnh, 'TEN': JSON.parse(s.spTen)[0].TEN, }); }
            } else {// trả tien or cl
              tienkm += parseFloat(s.TongTien)
              khuyenmai.push({ 'Scheme': s.Scheme, 'DienGiai': s.DienGiai, 'id': s.id, 'tkmId': s.TraKhuyenMai, 'sosuat': s.sosuat, 'TongGiaTri': s.TongTien, 'spId': 0, 'soluong': 0, 'HinhAnh': '', 'TEN': '', });
            }

          });
          this.setState({ datakm: data[0].DATA, ListKM: khuyenmai, Loading: false, TongTienKM: tienkm });

          this.props.dispatch({ type: 'AppKMDH', });
        } else if (data[0].RESULT == '0') {
          SnackBar.showError(data[0].MSG);
          this.setState({ Loading: false, });
        }

      });


    } else {

      this.setState({ Loading: true, });
      let listsp = [];
      let khuyenmai = [];
      Listgiohang.map((s) => {
        listsp.push({ 'spId': s.pk_seq, 'soluong': s.soluong, 'thung': 1, });
      });
      {/* [{"id":"100099","SanPhamSuDung":"100246","Scheme":"2019.GAC.THANG2","DienGiai":"2019.GAC.THANG2","sosuat":"2","Loai":"3","HinhThuc":"2","spTen":"[{\\"spId\\":100104,\\"TEN\\":\\"PHARHAMAXE G2\\",\\"HinhAnh\\":\\"http://210.245.21.162:2222/AnhChupPDA/AnhChupAppShop/sanpham/01NM0905.jpg\\",\\"SOLUONG\\":0}]","TongLuong":"1","TongTien":"0","ChonSanPham":"0","DungSanPham":"0","TraKhuyenMai":"100099"}]' } ]    */ }

      if (this.state.datakm.length > 10) {
        // alert(JSON.stringify(this.state.datakm));
        JSON.parse(this.state.datakm).map((s) => {
          if (s.Loai === '3') {
            if (s.HinhThuc === '2') {
              if (JSON.parse(s.spTen)[0].AVAILABLE > 0)
                khuyenmai.push({ 'id': s.Scheme, 'tkmId': s.TraKhuyenMai, 'sosuat': s.soXuat || s.sosuat, 'TongGiaTri': 0, 'spId': JSON.parse(s.spTen)[0].spId, 'soluong': (parseFloat(s.TongLuong) * parseFloat(s.sosuat)), });

            } else { khuyenmai.push({ 'id': s.Scheme, 'tkmId': s.TraKhuyenMai, 'sosuat': s.soXuat || s.sosuat, 'TongGiaTri': 0, 'spId': JSON.parse(s.spTen)[0].spId, 'soluong': JSON.parse(s.spTen)[0].SOLUONG, }); }

          } else { khuyenmai.push({ 'id': s.Scheme, 'tkmId': s.TraKhuyenMai, 'sosuat': s.soXuat || s.sosuat, 'TongGiaTri': s.TongTien, 'spId': 0, 'soluong': 0, }); }

        });
      }

      params = { userId: this.props.userID, sanpham: JSON.stringify(listsp), khuyenmai: JSON.stringify(khuyenmai), SanPhamSuDung: '', ghichu: this.state.ghichu, };

      let method = 'createDonHang';
      if (this.props.ShopControl.Iddonhang) {
        method = 'updateDonHang';
        params.dhId = this.props.ShopControl.Iddonhang.MADH;

      }


      this.props.dispatch(createDonHang(params, method)).then((data) => {
        if (data[0].RESULT != '1') {
          AppNavigation.showCommonDialog({
            title: 'Thông báo',
            desc: '' + data[0].MSG,
          });
        } else {
          this.props.dispatch({ type: 'Createdonhang', });
          AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length);
          this.setState({ datakm: [], });
          Alert.alert('Thông báo ', '' + data[0].MSG);
          // SnackBar.showSuccess('Lưu đơn hàng thành công ');

        }

        this.setState({ Loading: false, });
      });
    }
  }
  onChangeText(pk_seq, soluong) {
    //soluong= Math.round(soluong)
    if (!isNaN(soluong)) {
      soluong = Math.round(soluong)

      this.props.dispatch({ type: 'addsoluonginput', pk_seq, soluong, });
      this.props.dispatch({ type: 'tinhtien', });
    }


  }
  onChangeGhichu(ghichu) {
    this.setState({ ghichu, });
  }
  huyupdatedon = () => {
    this.props.dispatch({ type: 'HuyUpdateDonhang', });
    AppNavigation.changeBage(0);
  }


  ThemSp(sp) {
    //alert(JSON.stringify(data));
    let arr = this.state.Listdata
    let a=this.state.Listdata.filter(t=>t.pk_seq==sp.pk_seq);
    if (sp&&a.length==0) {
      const sanpham = { pk_seq: sp.pk_seq, ten: sp.ten, dongia: sp.dongia, donvi: sp.donvi, HinhAnh: sp.HinhAnh, soluong: sp.soluong, ma: sp.ma, hienhuu: sp.hienhuu, qcThung: sp.qcThung };
      arr.push(sanpham)
      this.setState({ Listdata: arr })


    }

  }
  deleterow(index) {
    let items = this.state.Listdata
    let arr2 = [
      ...items.slice(0, index),
      ...items.slice(index + 1)
    ]
    this.setState({ Listdata: arr2 })


  }

  render() {
    return (

      <SafeAreaView style={{ backgroundColor: Colors.backgroundL1, flex: 1 }}>
        <Viewgiohang
          data={this.state.Listdata}
          xoaspgiohang={this.xoaspgiohang}
          addsoluong={this.addsoluong}
          trusoluong={this.trusoluong}
          tongtien={this.props.ShopControl.tongtien}
          AppKMDH={this.AppKMDH}
          appKm={this.props.ShopControl.appKm}
          dataTL={this.state.dataTL}
          datatltheodon={this.state.datatltheodon}
          onChangeText={(pk_seq, text) => this.onChangeText(pk_seq, text)}
          onChangeGhichu={(t) => this.onChangeGhichu(t)}
          datakm={this.state.ListKM}
          Loading={this.state.Loading}
          dispatch={this.props.dispatch}
          TongTienKM={this.state.TongTienKM}
          Iddonhang={this.props.ShopControl.Iddonhang}
          huyupdatedon={this.huyupdatedon}
          dataLogin={this.props.dataLogin}
          Scanqrcode={this.Scanqrcode}
          navigator={this.props.navigator}
          userID={this.props.userID}
          ShopControl={this.props.ShopControl}
          ThemSp={(data) => this.ThemSp(data)}
          deleterow={(index) => this.deleterow(index)}
        >

        </Viewgiohang>

      </SafeAreaView>

    );
  }
}

export default connect((state) => ({
  ShopControl: state.ShopControl,
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
}),
  (dispatch,) => ({ dispatch }))
  (Giohang);