import React from 'react';
import {
  View,
  BackHandler,
  SafeAreaView,
  Platform
} from 'react-native';
import { PanelList, ChungLoaiList, CtkmList, SanPhamList,NhanhangList ,checkTLPanner} from './homeAction';
import { Logg, } from '../../../utils';
import TabHome from './viewHome';
import { Colors, } from '../../../theme';
import { AppNavigation, } from '../../../app-navigation';
import { Navigation } from 'react-native-navigation';

import { savetokentosever } from './../TTHoTro//Hotro/LChat/action/chat.action';
import { getDiemTlKh } from '../Quatang/actions';
import { showSuccess } from '../../../utils/SnackBar';

let navComponent = null
export default class AccountScreen extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      visible: true,
    },

  };
  constructor() {
    super();
    this.state = {
      page: '',
      BannerList: [],
      showWait: 0,
      ChungLoaiList: [],
      CtkmList: [],
      SanPhamList: [],
      SanPhamBanChayList: [],
      DataAllSP: [],
      searchKeyword: '',
    };
    this._getBanner = this._getBanner.bind(this);
    this._getChungloai = this._getChungloai.bind(this);
    this._getCTKMList = this._getCTKMList.bind(this);
  }

  componentDidMount() {

    Navigation.events().registerComponentDidAppearListener(event => navComponent = event)
    if (this.props.SanPhamList) {
      // alert(JSON.stringify(this.props.SanPhamList))
      this.setState({ SanPhamList: this.props.SanPhamList })
    }

    this._getBanner();
    this._getChungloai();
    this._getCTKMList();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.initFirebase()
  }
  componentWillUnmount() {

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    //this.props.navigation.goBack(null);
    console.log('routes handleBackButtonClick ', navComponent)

    if (navComponent && navComponent.componentName == 'screen.Home')
      return true;

  }

  async initFirebase() {

  }
  savetokentosever(token) {
    //(string userId, string imei, string token, string isAndroid)
    this.props.dispatch(
      savetokentosever({ userId: this.props.userID, imei: token, token, isAndroid: Platform.OS == 'android' ? 1 : 0, }, (dt) => {
        if (dt) {
          //let data = dt.find(item=>item.TRANGTHAI[0] === '0');
          Logg.info(dt);
        }
      }));

  }
  
  _getSPList(ChungLoaiList) {
    const spl = [];
    const payload = {
      userId: this.props.userID,
      nccId:this.props.NhaCCid
    };
    this.props.dispatch(
      SanPhamList(payload)
    ).then((data) => {
      if (data) {
        console.log('_getSPList 2',data)
        // let SanPhamBanChayList=[];
        this.setState({ DataAllSP: data, });
        this.setsStore(data);
        // if(index<50){
        //   SanPhamBanChayList.push(item)
        // }
        ChungLoaiList.map((cl) => {
          //console.log('ChungLoaiList 2',cl)
          let a = {
            ten: cl.ten,
            id: cl.pk_seq,
            sp: [],
          };
          data.map((item, index) => {
            
            if (cl.pk_seq === item.nhanhang_fk) {
           // if (cl.pk_seq === item.chungloaiId) {
              // if (cl.pk_seq === item.NhomHang_FK) {
              console.log('ChungLoaiList 2', item)
              let x = {
                pk_seq: item.pk_seq,
                HinhAnh: item.HinhAnh,
                ten: item.ten,
                dongia: Math.round(item.dongia),
                dongiaThung: item.dongiaThung,
                RatingCount: item.RatingCount,
                ma: item.ma,
                nhTen: item.nhTen,
                donvi: item.donvi,
                chungloaiId: item.chungloaiId,
                qcThung: item.qcThung,
                NhomHang_FK: item.NhomHang_FK,
                tennhomhang: item.tennhomhang,
                dacbiet: item.dacbiet,
                hienhuu: item.hienhuu,
                hoatchat: item.hoatchat,
                chidinhdieutri: item.chidinhdieutri,

              };
              a.sp.push(x);
            }

          });
          spl.push(a);

        });
      }

      this.setState({ SanPhamList: spl, showWait: (this.state.showWait + 1), });
      this.setsSpStore(spl)
      // Logg.info('this.state.SanPhamList ' + spl);
    });
  }
  setsStore(data) {
    this.props.dispatch({
      type: 'setsStore',
      DataAllSP: data,

    });
  }
  setsSpStore(data) {
    this.props.dispatch({
      type: 'SanPhamList',
      SanPhamList: data,
    });
  }
  _getCTKMList() {
    const payload = {
      userId: this.props.userID,
      spId: '',
    };
    this.props.dispatch(
      CtkmList(payload)
    ).then((data) => {
      if (data) {    
        this.setState({ CtkmList: data, showWait: (this.state.showWait + 1), });
        this.props.dispatch({
          type: 'addKMToStore',
          CtkmList: data,
        });

      }

      //console.log("this.state.CtkmList " + this.state.CtkmList)
    });
  }
  _getBanner() {
    const payload = {
      userId: this.props.userID,
    };
    this.props.dispatch(
      PanelList(payload)
    ).then((data) => {
      if (data) {
        this.setState({ BannerList: data, showWait: (this.state.showWait + 1), });
      }

      //console.log("this.state._getBanner " + this.state.BannerList)
    });
    this._getDiemTlKH()

  }
  _getDiemTlKH(){

    ///


    const payload2 = { khId: this.props.userID, };
    this.props.dispatch(getDiemTlKh(payload2)).then((data) => {
      if (data) {
        //alert(data)
        this.props.dispatch({ type: 'setDiemTLKH', DiemTLKH: data, });
      }else this.props.dispatch({ type: 'setDiemTLKH', DiemTLKH: "0", });
    });

  }
  _getChungloai() {
    const payload = {
      userId: this.props.userID,
    };
    this.props.dispatch(
      NhanhangList(payload)
    ).then((data) => {
      if (data) {
        this.setState({ ChungLoaiList: data, showWait: (this.state.showWait + 1), });
      }
      console.log('_getSPList', payload)
      this._getSPList(data);
    });
  }
  checkTLPanner(){
    const payload = {
      userId: this.props.userID,
    };
    this.props.dispatch(
      checkTLPanner(payload)
    ).then((data) => {
      if (data[0]) {
        showSuccess("Tích điểm thành công ")
        this._getDiemTlKH()
      }

    });

  }
  render() {
    return (
      // <SafeAreaView style={{ flex: 1, }}>

        <TabHome
          BannerList={this.state.BannerList}
          showWait={this.state.showWait}
          ChungLoaiList={this.state.ChungLoaiList}
          CtkmList={this.state.CtkmList}
          SanPhamList={this.state.SanPhamList}
          navigator={this.props.navigator}
          SanPhamBanChayList={this.state.SanPhamBanChayList}
          DataAllSP={this.state.DataAllSP}
          userId={this.props.userID}
          checkTLPanner={()=>this.checkTLPanner()}

        >
        </TabHome>
      // </SafeAreaView>
    );
  }
}
