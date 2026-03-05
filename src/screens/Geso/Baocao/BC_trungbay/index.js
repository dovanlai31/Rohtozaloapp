import React from 'react';
import {connect} from 'react-redux';
import ReportView from './View';
import {report, getListtrungbay_bc, getListkh_bc} from './Actions';

import moment from 'moment';
import {Alert} from 'react-native';
import {AppNavigation} from '../../../../app-navigation';
import ViewDialog from '../../DialogView/DialogView';
import {Navigation} from 'react-native-navigation';

class Bc_ql_trungbay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'chọn npp',
      visiblePanel: false,
      searchKeyword: '',
      currentCustomer: '',
      payload: {
        tungay: moment(new Date()).format('YYYY-MM-DD'),
        denngay: moment(new Date()).format('YYYY-MM-DD'),
      },
      report: '[]',
      ansearch: false,
      listtrangthai: [
        {id: 0, label: 'Chọn trạng thái'},
        {id: 1, label: 'Chưa chốt'},
        {id: 2, label: 'Đã chốt'},
      ],
      currenttrangthai: {id: 0, label: 'Chọn trạng thái'},
      cttb: {name: 'Chọn cttb', id: ''},
      khachhang: {name: 'Chọn khách hàng', id: ''},
      listcttb: [],
      listkh: [],
      loadingcttb: false,
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.getListtrungbay_bc();
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'btntop') {
      this.getReport();
    }
  }
  getListtrungbay_bc = () => {
    let params = {
      tungay: this.state.payload.tungay,
      denngay: this.state.payload.denngay,
    };
    this.setState({loadingcttb: true, cttb: {name: 'Tải cttb', id: ''}});
    this.props.dispatch(getListtrungbay_bc(params)).then(res => {
      if (res[0].RESULT == '1') {
        let listdata = [];
        JSON.parse(res[0].MSG).map(item => {
          item2 = {
            label: item.SCHEME + ' - ' + item.DIENGIAI,
            id: item.cttbid,
          };
          listdata.push(item2);
        });
        this.setState({
          listcttb: listdata,
          cttb: {name: 'Chọn cttb', id: ''},
          loadingcttb: false,
        });
      } else {
        this.setState({
          listcttb: [],
          cttb: {name: 'Chọn cttb', id: ''},
          loadingcttb: false,
        });
      }
    });
  };
  getListkh_bc = () => {
    let params = {
      cttbid: this.state.cttb.id,
      id: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      ddkdId:
        this.props.SearchData.NvbhId == null
          ? ''
          : this.props.SearchData.NvbhId,
      tungay: this.state.payload.tungay,
      denngay: this.state.payload.denngay,
      loai: this.props.listBranch.LOAI,
    };
    // alert(JSON.stringify(params))
    this.props.dispatch(getListkh_bc(params)).then(res => {
      if (res[0].RESULT == '1') {
        let listdata = [];
        JSON.parse(res[0].MSG).map(item => {
          item2 = {
            label: item.TEN,
            id: item.idkh,
          };
          listdata.push(item2);
        });
        this.setState({
          listkh: listdata,
          khachhang: {name: 'Chọn khách hàng', id: ''},
        });
      } else {
        this.setState({
          listkh: [],
          khachhang: {name: 'Chọn khách hàng', id: ''},
        });
      }
    });
  };
  getReport = () => {
    //(String tungay, String denngay, String id, String userId, String loai, String vungId, String asmId, String kvId, String gsbhId,
    // String nppId, String ddkdId, String cttb_fk, String khId)
    let params = {
      tungay: this.state.payload.tungay,
      denngay: this.state.payload.denngay,
      id: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      userId: this.props.listBranch.USERID,
      loai: this.props.listBranch.LOAI,
      vungId: '',
      asmId: '',
      kvId: '',
      gsbhId: '',
      ddkdId:
        this.props.SearchData.NvbhId == null
          ? ''
          : this.props.SearchData.NvbhId,

      nppId: '',

      cttb_fk: this.state.cttb.id,
      khId: '',
    };
    if (params.cttb_fk) {
      const {dispatch} = this.props;
      //let { payload } = this.state;
      dispatch(report(params)).then(res => {
        if (res && res.length > 0) {
          this.setState({report: res});
        } else {
          this.setState({report: 'Không có dữ liệu.'});
        }
      });
    } else {
      Alert.alert(
        'Thông báo',
        'Vui lòng chọn chương trình trưng bày. \nChú ý: chương trình trưng bày sẽ load theo từ ngày- đến ngày bạn chọn',
      );
    }
  };

  setToTime = date => {
    const {payload} = this.state;
    payload.denngay = date;
    this.setState({payload});
    this.getListtrungbay_bc();
  };

  setFromTime = date => {
    const {payload} = this.state;
    payload.tungay = date;
    this.setState({payload});
    this.getListtrungbay_bc();
  };
  ansearch = () => {
    const a = this.state.ansearch;
    this.setState({ansearch: !a});
  };

  onPressListCttb() {
    let {listcttb, cttb} = this.state;

    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          title={'Chọn cttb'}
          content={listcttb}
          onPressItem={item => {
            if (item.id != null && item.id != cttb.id) {
              cttb.name = item.label;
              cttb.id = item.id;
              this.setState({listcttb, cttb});
            }
          }}
        />
      ),
    });

    // Alert.alert('Chọn cttb', {
    //   items: listcttb,
    //   onPressItem: item => {
    //     if (item.id != null && item.id != cttb.id) {
    //       //cttb
    //       cttb.name = item.label;
    //       cttb.id = item.id;
    //       this.setState({listcttb, cttb});
    //     }
    //     // this.getListkh_bc ()
    //     return this.setState({listcttb, cttb});
    //   },
    // });
  }
  onPressListkh() {
    let {listkh, khachhang} = this.state;
    Alert.alert('Chọn khách hàng', {
      items: listkh,
      onPressItem: item => {
        if (item.id != null && item.id != khachhang.id) {
          //cttb
          khachhang.name = item.label;
          khachhang.id = item.id;
        }

        return this.setState({listkh, khachhang});
      },
    });
  }
  render() {
    return (
      <ReportView
        // onBack={this.props.navigation.state.params.callback}
        setToTime={this.setToTime}
        setFromTime={this.setFromTime}
        getReport={this.getReport}
        time={this.state.payload}
        report={this.state.report}
        ansearch={this.ansearch}
        isan={this.state.ansearch}
        clicktrangthai={() => this.clicktrangthai()}
        listtrangthai={this.state.listtrangthai}
        currenttrangthai={this.state.currenttrangthai}
        cttb={this.state.cttb}
        khachhang={this.state.khachhang}
        //listcttb={this.state.listcttb}
        onPressListCttb={() => this.onPressListCttb()}
        onPressListkh={() => this.onPressListkh()}
        loadingcttb={this.state.loadingcttb}
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
)(Bc_ql_trungbay);
