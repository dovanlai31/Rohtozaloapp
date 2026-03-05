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
import { ApKhuyenMaiDonHang, createDonHang, gettichluy, gettichluy_Theodon, } from './Actions/Giohang.actions';
import { AppNavigation, } from '../../../app-navigation';
import { Colors, } from '../../../theme';
import { SnackBar, } from '../../../utils';
import { Navigation, } from 'react-native-navigation';
import { TextCmp } from '../../../common-components';
import { IDs } from '../..';
import { CommonIcons } from '../../../assets';
import ViewDialog from '../DialogView/DialogView';
const { height, } = Dimensions.get('window');

class Giohang extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      //drawBehind: true,
      visible: true,
    },

  };


  constructor() {
    super();
    this.state = {
      datakm: [],
      dataTL: [],
      datatltheodon: [],
      ghichu: '',
      TongTienKM: 0,
      curentNPP: { ten: '', id: '' },
      curentddkd: { ten: '', id: '' }
    };
  }
  xoaspgiohang = (item) => () => {

    this.props.dispatch({ type: 'xoaspgiohang', pk_seq: item.pk_seq, });
    this.props.dispatch({ type: 'tinhtien', });


  }
  addsoluong = (pk_seq) => () => {

    this.props.dispatch({ type: 'addsoluong', pk_seq, });
    this.props.dispatch({ type: 'tinhtien', });
    this.setState({ datakm: [], });
  }
  trusoluong = (pk_seq) => () => {
    this.props.dispatch({ type: 'trusoluong', pk_seq, });
    this.props.dispatch({ type: 'tinhtien', });
    this.setState({ datakm: [], });
  }


  componentDidAppear() {
    if (this.props.ShopControl.Listgiohang) { AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length); }
    //console.log("dsgfhdshfhfsdhgfh1",this.props.ShopControl.Listgiohang.length);
    this.props.dispatch({ type: 'tinhtien', });
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    if (this.props.ShopControl.Listgiohang) { AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length); }
    //console.log("dsgfhdshfhfsdhgfh2",this.props.ShopControl.Listgiohang.length);
    // this.props.dispatch(gettichluy({ userId: this.props.userID, })).then((data) => {
    //   if (data[0].RESULT == '1') {
    //     this.setState({ dataTL: JSON.parse(data[0].MSG), });
    //     // alert(data[0].MSG)
    //   }
    // });

    //alert(JSON.stringify(this.props.ListNpp))

    if(this.props.ListDdkd){
      this.setState({    curentddkd:this.props.ListDdkd[0] })

    }



  }

  //     DK Tra:
  // có 3 loai: bang trakm
  // loại 1: tổng tiền , cột tông tiền có giá tri
  // loai 2: chiết khấu, cột chietkhau co gia tri
  // loai 3: san pham , có 2 hình thức
  // hinh thức 1: bắt buộc nhập soluong (3 côt kia ko gia tri)
  // hình thức 2: bất kì trong (tổng lượng có gia tri)
  // phép toán 2 or, 1 là and
  AppKMDH = () => {
    const { curentNPP,curentddkd } = this.state
    if (curentNPP.id == '')
      return Alert.alert("Thông báo", "Vui lòng chọn nhà phân phối")

    let dataLogin = this.props.dataLogin;
    let { Listgiohang, appKm, } = this.props.ShopControl;

    let params;// ={ userId: this.props.userID, sanpham: sp, dieuchinh: '1', ctkmSort }


    if (appKm) {
      let listsp = [];
      let listsort = [];
      let flag = true;
      Listgiohang.map((s) => {
        // listsp.push({ 'spId': s.pk_seq, 'soluong': s.soluong*s.qcThung, 'thung': 0, });
        listsp.push({ 'spId': s.pk_seq, 'soluong': s.soluong, 'thung': 0, });
        if (s.soluong > 0) {
          flag = false
        }
      });
      // if(sphetton.length>0)
      // {return Notify.show('Thông báo','Sản phẩm '+ sphetton+' \nkhông đủ tồn kho ');}
      if (flag) { return Alert.alert('Thông báo', 'Vui lòng nhập số lượng sản phẩm'); }
      this.setState({ Loading: true, datakm: [] });
      params = {
        dienthoai: dataLogin.dienthoai, userId: this.props.userID,
        sanpham: JSON.stringify(listsp), dieuchinh: '0',
        ctkmSort: JSON.stringify(listsort),
        nppId: curentNPP.id,
        ddkdId: curentddkd.id
      };

      let khuyenmai = [];
      let tienkm = 0
      this.props.dispatch(ApKhuyenMaiDonHang(params)).then((data) => {
        if (data[0].RESULT == '1') {

          JSON.parse(data[0].DATA).map((s) => {
            if (s.Loai === '3') {//trả sp
              if (s.HinhThuc === '2') {
                if (JSON.parse(s.spTen)[0].AVAILABLE > 0)
                  khuyenmai.push({ 'Scheme': s.Scheme, 'DienGiai': s.DienGiai, 'id': s.id, 'tkmId': s.TraKhuyenMai, 'sosuat': s.sosuat, 'TongGiaTri': "0", 'spId': JSON.parse(s.spTen)[0].spId, 'soluong': (parseFloat(s.TongLuong) * parseFloat(s.sosuat)), 'HinhAnh': JSON.parse(s.spTen)[0].HinhAnh, 'TEN': JSON.parse(s.spTen)[0].TEN, });
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
      if (parseFloat(this.props.ShopControl.tongtien) - parseFloat(this.state.TongTienKM) < 0) {
        return Alert.alert("Thông báo ", "Tổng tiền trong đơn đang nhỏ hơn tiền được hưởng khuyến mãi ")
      }
      this.setState({ Loading: true, });
      let listsp = [];
      let khuyenmai = [];
      Listgiohang.map((s) => {
        listsp.push({ 'spId': s.pk_seq, 'soluong': s.soluong, 'thung': 0, });
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

      params = {
        dienthoai: dataLogin.dienthoai,
        userId: this.props.userID,
        sanpham: JSON.stringify(listsp),
        khuyenmai: JSON.stringify(khuyenmai),
        SanPhamSuDung: '',
        ghichu: this.state.ghichu,
        nppId: curentNPP.id,
        ddkdId: curentddkd.id
      };

      let method = 'createDonHang';
      // if (this.props.ShopControl.Iddonhang) {
      //   method = 'updateDonHang';
      //   params.dhId = this.props.ShopControl.Iddonhang.MADH;
      // }


      this.props.dispatch(createDonHang(params, method)).then((data) => {
        if (data[0].RESULT != '1') {


          Alert.alert('Thông báo',
            '' + data[0].MSG,)
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
      this.setState({ datakm: [], ListKM: [], TongTienKM: 0 });

    }


  }
  onChangeGhichu(ghichu) {
    this.setState({ ghichu, });
  }
  huyupdatedon = () => {
    this.props.dispatch({ type: 'HuyUpdateDonhang', });
    AppNavigation.changeBage(0);
  }

  Scanqrcode() {

    this.props.navigator._push({
      name: IDs.ScanQrcode,
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
  ThemSP() {

    this.props.dispatch({ type: 'searchKeyword', searchKeyword: ' ', });
    this.props.dispatch({ type: 'setsDataSearch', searchKeyword: ' ', });
    //alert('xx')
    const { navigator, } = this.props;
    //  return navigator._push({
    //     name: IDs.SearchScreen,
    //     options: {
    //       topbar: {
    //         statusBar: {
    //           backgroundColor: Colors.statusBar,
    //           //drawBehind: true,
    //           visible: true,
    //         },
    //         background: {
    //           color: Colors.HeaderColor,
    //         },
    //         leftButtons: [
    //           {
    //             id: 'btntop',
    //             icon: CommonIcons.back,
    //           },
    //         ],
    //       },
    //       bottomTabs: {
    //         visible: false,
    //         ...Platform.select({ android: { drawBehind: true, }, }),
    //       },
    //     },
    //     passProps: {
    //       showback: true,
    //     },

    //   });
  }
  pressChonNpp() {
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          //showSearch={true}
          //title={'Chọn nhóm sản phẩm'}
          content={this.props.ListNpp}
          onPressItem={item => {
            if (item && item.ten) {
              this.setState({ curentNPP: item, curentddkd: { ten: '', id: '' } });
            }
          }}
        />
      ),
    });
  }


  pressChonNvbh() {
    const { curentNPP } = this.state
    let arr = []
    arr = this.props.ListDdkd.filter(a => a.NPP_FK == curentNPP.id)
    if (curentNPP.id == '')
      return Alert.alert("Thông báo", "Vui lòng chọn nhà phân phối trước")
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          content={arr}
          onPressItem={item => {
            if (item && item.id) {
              this.setState({ curentddkd: item });
            }
          }}
        />
      ),
    });
  }

  render() {
    const { curentNPP, curentddkd } = this.state
    return (

      <SafeAreaView style={{ backgroundColor: Colors.backgroundL1, flex: 1 }}>
        <Viewgiohang
          data={this.props.ShopControl.Listgiohang}
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
          curentNPP={curentNPP}
          pressChonNpp={() => this.pressChonNpp()}
          pressChonNvbh={() => this.pressChonNvbh()}
          curentddkd={curentddkd}
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
  ListNpp: state.login.ListNpp,
  ListDdkd: state.login.ListDdkd
}),
  (dispatch,) => ({ dispatch }))
  (Giohang);