import React from 'react';
import { connect, } from 'react-redux';
import ViewChitietSP from './View/ViewChitietSP';
import {
  View,
  Animated,
  Alert,
  SafeAreaView

} from 'react-native';
import { SanPham_Info, cartPayVoucher, SanPham_Info_giftUrbox, getDiaChiKH,sendOTPZMS_API, xacnhanOTP} from './Action/ChitietSp.action';
import { Colors, } from '../../../theme';
import { SnackBar, } from '../../../utils';
import { AppNavigation, } from '../../../app-navigation';
import { IDs } from '../..';
import { CommonIcons } from '../../../assets';
import ViewQuatanghtml from './View/ViewChild/ViewQuatanghtml';
import DialogOTP from '../../../common-components/DialogOTP';


class ChitetSP extends React.Component {

  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      visible: true,

    },
  };
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      SanPham_Info: [],
      listkm: [],
      DanhGiaList: [],
      RatingCountGroupBy: [],
      RatingCount: null,
      Listsplq: [],
      RatingAVG: null,
      modalVisible: false,
      soluong: 1,
      data: props.data,
      dataChitiet: '',
      loadding: false,
      linkqua: '',
      code_display_type: '',
      misAddress: 0,
      OTP: "",
      ShowModalOTP: '',
      cur_sp:null
    };
    this.SanPham_Info = this.SanPham_Info.bind(this);
  }
  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible, });
  }
  componentDidMount() {
    //alert(JSON.stringify(this.props.data));
    // this.getsplq();
    this.SanPham_Info();
    this._getDiaChiKH();
    // this.setState({data:this.props.data,}); 
  }
  SanPham_Info() {
    const params = {
      userId: this.props.userID,
      id: this.props.data.id

    };
    this.props.dispatch(SanPham_Info_giftUrbox(params)).then((res) => {
      console.log('SanPham_Info_giftUrbox', res)
      if (res) {
        if (res.done == 1) {
          this.setState({ dataChitiet: res.data })

        } //else Alert.alert("Thông báo", res.msg)
      }

    });
    return;

  }
  getsplq() {
    //alert(this.props.data.chungloaiId);
    //alert(JSON.stringify(this.props.DataAllSP));
    const Listsplq = this.state.Listsplq;
    this.props.DataAllSP.map((item) => {
      if (this.props.data.chungloaiId === item.chungloaiId) {
        Listsplq.push(item);
      }
    });

    this.setState({ Listsplq, });
  }
  _Danhgia(data) {
    //   this.props.dispatch(
    //     push({
    //       routeName: RouteKey.DanhgiaSP,
    //       params: { data: data, callback: () => this.SanPham_Info(), },
    //     })
    //   );
  }
  _getDiaChiKH() {

    const params = {
      khId: this.props.userID,
    };
    this.props.dispatch(getDiaChiKH(params)).then((res) => {
      console.log('getDiaChiKH', res[0])
      if (res) {
        const { tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, quan_pk, xa_pk,diachihd } = res[0]
        this.setState({ tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, quan_pk, xa_pk, diachihd })
        if (tentinh == 0 || idquan == 0 || idxa == 0) {
          this.setState({ misAddress: 1 })
          // Alert.alert("Thông báo", "Thông tin địa chỉ của bạn còn thiếu, vui lòng cập nhật địa chỉ để hệ thống có thể gởi quà đúng theo địa chỉ đã đăng ký với hệ thống ", [
          //   {
          //     text: 'Để sau',
          //     onPress: () => { },
          //   },
          //   {
          //     text: 'Cập nhật ',
          //     onPress: () => this.UpdateAddress(),
          //     style: 'cancel',
          //   },
          // ])
        } else {
          this.setState({ misAddress: 0 })
        }


      }

    });
  }


  UpdateAddress() {

    const { navigator, } = this.props;

    const { tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, quan_pk, xa_pk, } = this.state

    navigator._push({
      name: IDs.UpdateAddressCus,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
        topBar: {
          visible: true,
          drawBehind: false,
          background: {
            color: Colors.HeaderColor,
          },

          title: {
            text: 'Cập nhật địa chỉ khách hàng',
            color: 'white'
          },
        },
      },
      passProps: {

        userId: this.props.userID,
        dispatch: this.props.dispatch,
        tenxa, tenquan, tentinh, idtinh, idquan, idxa,
        tinh_pk, quan_pk, xa_pk,
        refreshdata: () => this._getDiaChiKH()
      },


    });





  }
  themspgiohang(sp) {
    console.log("themspgiohang ", sp)
    this.setState({cur_sp:sp})
    // return this.setModalVisible()
    //đổi điểm <8 là evoucher
    if((sp.price*this.state.soluong)>this.props.ShopControl.DiemTLKH)
    return Alert.alert("Thông báo", "Điểm tích lũy của bạn không đủ")


    //return alert((sp.price*this.state.soluong)+' '+this.props.ShopControl.DiemTLKH)
    //public string cartPayVoucher( string quantity,string priceId,string user_id,string point)
    //return alert(sp.code_display_type)

    if (this.state.misAddress == 1 && sp.code_display_type == 3) {
      Alert.alert("Thông báo", "Thông tin địa chỉ của bạn còn thiếu, vui lòng cập nhật địa chỉ để hệ thống có thể gửi quà đúng theo địa chỉ đã đăng ký với hệ thống ", [
        {
          text: 'Để sau',
          onPress: () => { this.setState({ misAddress: 1 }) },
        },
        {
          text: 'Cập nhật ',
          onPress: () => this.UpdateAddress(),
          style: 'cancel',
        },
      ])
      return

    }

    const { OTP } = this.state
    if (OTP == "") {
      // show dialog opv
      this.sendOTP_API();


      return;


    }




    this.setState({ loadding: true, code_display_type: sp.code_display_type })
    const params = {
      quantity: this.state.soluong,
      priceId: sp.id,
      user_id: this.props.userID,
      point: sp.price,
      title: sp.title,
      shipping_info_available: sp.code_display_type == 3 ? 2 : "" //shipping_info_available=2 là mình gởi địa chỉ hco bên lia
      ,OTP:this.state.OTP

    };
    this.props.dispatch(cartPayVoucher(params)).then((res) => {
      console.log('api_doiqua', res)
      if (res) {
        this.setState({ loadding: false, })
        if (res.done == 1) {
          // if (sp.code_display_type == 3)// qua vật lý
          //   this.setState({ linkqua: res.data.linkShippingInfo, loadding: false, })
          // else
          this.setState({ linkqua: this.state.soluong > 1 ? res.data.linkCart : res.data.cart.link_gift[0], loadding: false, })


          SnackBar.showSuccess('Đổi quà thành công');
          //Toast.show('Thêm sp vào giỏ hàng thành công', Toast.POSITION.TOP, Toast.LENGTH.SHORT);
          this.setModalVisible();

        } else Alert.alert("Thông báo", res.msg)
      }

    });





  }
  
  onChangeSoluong(soluong) {
    if (!isNaN(soluong)) {
      let a = Math.round(soluong)
      this.setState({ soluong: a, });
    }
  }

  showOTP = () => {
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <DialogOTP
          type='success'
          message='xxxx'
          xacnhanOTP={() => this.xacnhanOTP()}
          onChangeTextOtp={(t) => this.setState({ OTP: t })}
        />

      ),
    });
    // alert('tich diem test')

  };
  sendOTP_API() {
    const params = {
      user_id: this.props.userID,
      type:1
    };
    this.setState({loadding:true})
    this.props.dispatch(sendOTPZMS_API(params)).then((res) => {
      console.log('sendOTPZMS_API', res)
      this.setState({loadding:false})
      if (res) {
        this.setState({ loadding: false, })
        if (res == 1) {
          this.showOTP();
          return
        } else Alert.alert("Thông báo", res)
      }

    });
  }
  xacnhanOTP = () => {
    const { OTP ,cur_sp} = this.state
    if (OTP.length < 6) {
      return Alert.alert("Thông báo ", "OTP không hợp lệ")
    }

    const params = {
      user_id: this.props.userID,
      OTP:OTP,
      type:'1'  /// dổi qa
    };
    this.props.dispatch(xacnhanOTP(params)).then((res) => {
      console.log('xacnhanOTP', res)
      if (res) {
        this.setState({ loadding: false, })
        if (res == 1) {
          AppNavigation.dismissOverlay('1');
          this.themspgiohang(cur_sp) 

          return
        } else Alert.alert("Thông báo", res)
      }

    });

  }


  refeshData = (item) => () => {
    this.setState({ data: item, });
    const params = {
      userId: this.props.userID,
      spId: this.props.data.id ? this.props.data.id : this.props.data.pk_seq,
    };
    this.props.dispatch(SanPham_Info(params)).then((data) => {
      if (data) { this.setState({ SanPham_Info: data[0], listkm: JSON.parse(data[0].CtkmList), RatingCount: data[0].RatingCount, DanhGiaList: JSON.parse(data[0].DanhGiaList), RatingAVG: data[0].RatingAVG, }); }
    });
    return;
  }
  onSelectKM(item) {

    AppNavigation.showModal({
      name: IDs.ViewDetailPromotion,
      passProps: {
        item: item,
        dispatch: this.props.dispatch,
        userId: this.props.userId
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
            text: 'Xem chi tiết',
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
  }


  render() {
    const { dataChitiet, modalVisible, linkqua, loadding } = this.state
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.HeaderColor }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

          {!modalVisible ? <ViewChitietSP
            data={this.state.data}
            scrollY={this.state.scrollY}
            listkm={this.state.listkm}
            DanhGiaList={this.state.DanhGiaList}
            RatingCount={this.state.RatingCount}
            DanhgiaSP={(data) => this._Danhgia(data)}
            onBack={() => this.props.navigator._pop()}
            RatingCountGroupBy={this.state.RatingCountGroupBy}
            RatingAVG={this.state.RatingAVG}
            Listsplq={this.state.Listsplq}
            themspgiohang={(sp) => this.themspgiohang(sp)}
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
            onChangeSoluong={(sl) => this.onChangeSoluong(sl)}
            soluong={this.state.soluong}
            refeshData={this.refeshData}
            onSelectKM={(item) => this.onSelectKM(item)}
            dataChitiet={dataChitiet}
            loadding={loadding}
          ></ViewChitietSP> :
            <ViewQuatanghtml
              linkqua={linkqua}
              modalVisible={modalVisible}
              setModalVisible={this.setModalVisible}>
            </ViewQuatanghtml>}
        </SafeAreaView>
      </>
    );

  }
}


export default connect((state) => ({
  userID: state.login.userID,
  ShopControl: state.ShopControl,
  DataAllSP: state.login.DataAllSP,
  dataLogin: state.login.dataLogin,
}), (dispatch) => ({ dispatch, }))(ChitetSP);