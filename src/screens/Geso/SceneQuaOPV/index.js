
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import { Navigation, } from 'react-native-navigation';
import ViewSceneQuaOPV from './ViewSceneQuaOPV';
import ViewDialog from '../DialogView/DialogView';
import { AppNavigation } from '../../../app-navigation';
import { showSuccess } from '../../../utils/SnackBar';
import { getListTraThuong, getListTraThuong_SanPham, saveDonDoiQa } from './actions';
import { sendOTPZMS_API, xacnhanOTP } from '../ChitietGQuaTang/Action/ChitietSp.action';
import DialogOTP from '../../../common-components/DialogOTP';

class SceneQuaOPV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ListTraThuong: [],
      curentCt: { id: '', label: "Chọn chương trình" },
      List_SanPham: [],
      curentNPP: { ten: '', id: '' },
      showViewAddProduct: false,
      List_SanPham_Chon: [],
      errorMessage: '',
      OTP:''
    };
  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this._getListTraThuong()
  }

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'btntop_save') {

      
      this.saveDonDoiQa()

    }
    if (buttonId === 'btntop_add') {
      this.setState({ showViewAddProduct: true })
    }

  }
  _getListTraThuong() {
    const params = {
      khId: this.props.userID,
    };

    this.props.dispatch(getListTraThuong(params)).then((data) => {
      if (data) {
        if (data[0].RESULT == 1) {
          this.setState({ ListTraThuong: JSON.parse(data[0].MSG) })
          // setTimeout(() => {
          //   this.showSelectThuong() 
          // }, 200);



        } else 
        this.setState({ errorMessage: 'Khách hàng chưa có chương trình trả thưởng nào' })
       // Alert.alert("Thông báo", "Khách hàng chưa có chương trình trả thưởng nào ")

      } else alert("lỗi ")
    });
    return;
  }
  saveDonDoiQa() {



    const { List_SanPham_Chon, curentCt, curentNPP } = this.state


    
    if (List_SanPham_Chon.length == 0)
      return Alert.alert("Thông báo", "Vui lòng chọn sản phẩm quà tặng")
    if (curentCt.id == "")
      return Alert.alert("Thông báo", "Vui lòng chọn chương trình quà tặng")
    if (curentNPP.id == "")
      return Alert.alert("Thông báo", "Vui lòng nhà phân phối")


    let listSP = "";
    let tongdiem = 0
    List_SanPham_Chon.map(r => {
      if(r.soluong>0){
        listSP += r.masp + "#" + r.Diem + "#" + r.soluong + ";"
        tongdiem += (r.soluong * r.Diem)
      }

    })

    if (this.props.ShopControl.DiemTLKH - tongdiem < 0) {
      return Alert.alert("Thông báo", "Điểm trong đơn vượt điểm đang có của bạn vui lòng kiểm tra lại")
    }


    const { OTP } = this.state
    if (OTP == "") {
      // show dialog opv
      this.sendOTP_API();
      return;


    }



    const params = {
      khId: this.props.userID,
      nppId: curentNPP.id,
      ctquatangId: curentCt.id,
      listSP: listSP.substring(0, listSP.length - 1),
      tongdiem:tongdiem,
      OTP
    };

    this.props.dispatch(saveDonDoiQa(params)).then((data) => {
      if (data) {
        if (data[0].RESULT == 1) {
          showSuccess("Tạo đơn thành công")
          this.props.navigator._pop();

        } else Alert.alert("Thông báo", " " + data[0].MSG)

      } else alert("lỗi ")
    });
    return;

  }
  sendOTP_API() {
    const params = {
      user_id: this.props.userID,
      type:1
    };
    this.setState({loadding:true})
    this.showOTP();
    this.props.dispatch( sendOTPZMS_API(params)).then((res) => {
      console.log('sendOTPZMS_API', res)
      this.setState({loadding:false})
      if (res) {
        this.setState({ loadding: false, })
        if (res == 1) {
         // this.showOTP();
          return
        } else{
          Alert.alert("Thông báo", res)
          AppNavigation.dismissOverlay('1');
        }
      }

    });
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
    this.props.dispatch( xacnhanOTP(params)).then((res) => {
      console.log('xacnhanOTP', res)
      if (res) {
        this.setState({ loadding: false, })
        if (res == 1) {
          AppNavigation.dismissOverlay('1');
          this.saveDonDoiQa() 

          return
        } else Alert.alert("Thông báo", res)
      }

    });

  }


  showSelectThuong() {


    AppNavigation.showCommonDialog({
      renderContent: () =>
        <ViewDialog title={''}
          content={this.state.ListTraThuong}
          onPressItem={(item) => {
            if (item && item.id) {
              this.setState({ curentCt: item, });
              this._getListTraThuong_SanPham(item)
            }

          }}
        />,
    });
  }
  _getListTraThuong_SanPham(item) {
    const params = {
      TraThuongId: item.id,
    };

    this.props.dispatch(getListTraThuong_SanPham(params)).then((data) => {
      if (data) {
        if (data[0].RESULT == 1) {
          this.setState({ List_SanPham: JSON.parse(data[0].MSG) })


        } else Alert.alert("Thông báo", " chưa có thông tin quà tặng theo chương trình, vui lòng chọn chương trình khác ")

      } else alert("lỗi ")
    });
    return;
  }
  setISChose(i) {
    const { List_SanPham } = this.state;
    List_SanPham[i].ischose = List_SanPham[i].ischose ? false : true
    this.setState({ List_SanPham })


  }
  pressChonNpp = () => {
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          //showSearch={true}
          //title={'Chọn nhóm sản phẩm'}
          content={this.props.ListNpp}
          onPressItem={item => {
            if (item && item.ten) {
              this.setState({ curentNPP: item });
            }
          }}
        />
      ),
    });



  }
  setModalVisible(t) {
    this.setState({ showViewAddProduct: t })
    if (!t) {
      let arr = []
      this.state.List_SanPham.map(s => {
        let ss = s;
        if (s.ischose) {
          ss.soluong = "1";
          arr.push(ss);
        }

      })

      this.setState({ List_SanPham_Chon: arr })
    }
  }
  onChangeTextSL(i, v) {
    const { List_SanPham_Chon } = this.state
    // if (v && v >= 0)
      List_SanPham_Chon[i].soluong = v

    this.setState({ List_SanPham_Chon })

  }
  deleteItem(item) {
    const { List_SanPham_Chon } = this.state
    let arr = List_SanPham_Chon.filter(x => x.masp != item.masp)
    this.setState({ List_SanPham_Chon: arr })
  }
  onPress1() {
    
    this.setState({ errorMessage: '' });
  }
  render() {
    const { curentCt, List_SanPham, curentNPP, showViewAddProduct, List_SanPham_Chon } = this.state

    return (
      <ViewSceneQuaOPV
        curentCt={curentCt}
        errorMessage= {this.state.errorMessage}
        presschonCT={() => this.showSelectThuong()}
        List_SanPham={List_SanPham}
        setISChose={(i) => this.setISChose(i)}
        pressChonNpp={this.pressChonNpp}
        curentNPP={curentNPP}
        dataLogin={this.props.dataLogin}
        DiemTLKH={this.props.ShopControl.DiemTLKH}
        showViewAddProduct={showViewAddProduct}
        setModalVisible={(t) => this.setModalVisible(t)}
        List_SanPham_Chon={List_SanPham_Chon}
        onChangeTextSL={(i, v) => this.onChangeTextSL(i, v)}
        deleteItem={(t) => this.deleteItem(t)}
        onPress1={()=>this.onPress1()}
      />


    );
  }
}
export default connect((state) => ({
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
  ShopControl: state.ShopControl,
  ListNpp: state.login.ListNpp
}), (dispatch) => ({ dispatch, }))(SceneQuaOPV);