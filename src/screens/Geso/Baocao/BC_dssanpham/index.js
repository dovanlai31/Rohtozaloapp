/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {DoanhsoBanhang, LayDanhSachKh} from './Bc_ql_dophuso_action';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';
import htmlloading from '../../../../common-components/htmlLoading';
import ViewWebBC from '../ViewWebBC';
import {AppNavigation} from '../../../../app-navigation';
import ViewDialog from './../../DialogView/DialogView';

class Baocao_ql_dssp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'Chọn NPP',
      visiblePanel: false,
      searchKeyword: '',
      currentCustomer: '',
      payload: {
        tungay: moment(new Date()).format('YYYY-MM-DD'),
        denngay: moment(new Date()).format('YYYY-MM-DD'),
      },
      report: '',
      ansearch: false,
      currentdataCustom: {id: '', ten: 'Chọn khách hàng'},
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    // this.getReport();
  }
  navigationButtonPressed({buttonId}) {
    if (buttonId === 'btntop') {
      this.getReport();
    }
  }
  getReport = () => {
    //(string nvId, string ddkdId, string tungay, string denngay, string idnhom, string loainv,
    //  string vung_fk, string kv_fk, string asm_fk, string gsbh_fk, string npp_fk, string chontheo)
    const {currentdataCustom} = this.state;
    let params = {
      khId:
        currentdataCustom && currentdataCustom.id ? currentdataCustom.id : '',
      userId: this.props.listBranch.USERID,
      nvId: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      id: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      ddkdId:
        this.props.SearchData.NvbhId == null
          ? ''
          : this.props.SearchData.NvbhId,
      tungay: this.state.payload.tungay,
      denngay: this.state.payload.denngay,
      npp_fk:
        this.props.SearchData.NppId == null ? '' : this.props.SearchData.NppId,
      trangthaidh: '',
      chontheo: '', // this.props.SearchData.NppId ==null?'':this.props.SearchData.NppId,
      idnhom: '',
      loainv: this.props.listBranch.LOAI,
      vung_fk:
        this.props.SearchData.VungId == null
          ? ''
          : this.props.SearchData.VungId,
      kv_fk:
        this.props.SearchData.KhuvucId == null
          ? ''
          : this.props.SearchData.KhuvucId,
      asm_fk:
        this.props.SearchData.AsmId == null ? '' : this.props.SearchData.AsmId,
      gsbh_fk:
        this.props.SearchData.GsbhId == null
          ? ''
          : this.props.SearchData.GsbhId,
      sanpham_fk: '',
      trangthaitrave: '',
      Vat: this.props.SearchData.Vat,
    };

    const {dispatch} = this.props;
    this.setState({report: htmlloading});
    dispatch(DoanhsoBanhang(params)).then(res => {
      //alert(JSON.stringify(res));
      if (res && res[0].RESULT == '1') {
        this.setState({report: res[0].MSG});
      } else {
        this.setState({report: '<h1>Không có dữ liệu</h1>'});
      }
    });
  };

  setToTime = date => {
    const {payload} = this.state;
    payload.denngay = date;
    this.setState({payload});
  };

  setFromTime = date => {
    const {payload} = this.state;
    payload.tungay = date;
    this.setState({payload});
  };
  ansearch = () => {
    const a = this.state.ansearch;
    this.setState({ansearch: !a});
  };
  componentDidUpdate(nextProps) {
    if (nextProps.SearchData.NvbhId != this.props.SearchData.NvbhId) {
      this.LayDanhSachKh();
    }
  }
  LayDanhSachKh() {
    // public string getKhachHangList(string ddkdId, string tbhId, string nppId, string isSinhNhat)
    let params = {
      nppId:
        this.props.SearchData.NppId == null ? '' : this.props.SearchData.NppId,
      ddkdId:
        this.props.SearchData.NvbhId == null
          ? ''
          : this.props.SearchData.NvbhId,
      tbhId: '',
      isSinhNhat: '',
    };
    this.props.dispatch(LayDanhSachKh(params)).then(res => {
      if (res) {
        this.setState({
          listnhom: res,
          currentdataCustom: {id: '', ten: 'Chọn khách hàng'},
        });
      } else {
        this.setState({listnhom: []});
      }
    });
  }
  onPressListCustom = () => {
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          showSearch={true}
          //title={'Chọn nhóm sản phẩm'}
          content={this.state.listnhom}
          onPressItem={item => {
            if (item && item.ten) {
              this.setState({currentdataCustom: item});
            }
          }}
        />
      ),
    });
  };
  render() {
    return (
      <ViewWebBC
        setToTime={this.setToTime}
        setFromTime={this.setFromTime}
        getReport={this.getReport}
        time={this.state.payload}
        report={this.state.report}
        ansearch={this.ansearch}
        isan={this.state.ansearch}
        currentdataCustom={this.state.currentdataCustom}
        onPressListCustom={this.onPressListCustom}
        ShowVat={true}
      />
    );
  }
}

export default connect(
  state => ({
    listBranch: state.app.listBranch,
    SearchData: state.SearchData,
  }),
  dispatch => ({dispatch}),
)(Baocao_ql_dssp);
