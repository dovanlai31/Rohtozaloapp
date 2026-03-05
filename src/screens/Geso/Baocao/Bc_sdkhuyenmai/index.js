import React from 'react';
import {connect} from 'react-redux';
import ReportView from './View';
import {report, GetCTKMTuNgay, getListkh_bc} from './Actions';
import moment from 'moment';
import {Alert} from 'react-native';
import {AppNavigation} from '../../../../app-navigation';
import ViewDialog from '../../DialogView/DialogView';
import {Navigation} from 'react-native-navigation';

class Bc_ql_trungbay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'Chọn npp',
      visiblePanel: false,
      searchKeyword: '',
      currentCustomer: '',
      payload: {
        tungay: moment(new Date()).format('YYYY-MM-DD'),
        denngay: moment(new Date()).format('YYYY-MM-DD'),
      },
      report: [],
      ansearch: false,
      listtrangthai: [
        {id: 0, label: 'Chọn trạng thái'},
        {id: 1, label: 'Chưa chốt'},
        {id: 2, label: 'Đã chốt'},
      ],
      currenttrangthai: {id: 0, label: 'Chọn trạng thái'},
      cttb: {name: 'Chọn ctkm', id: ''},
      khachhang: {name: 'Chọn khách hàng', id: ''},
      listcttb: [{name: 'all ctkm', id: ''}],
      listkh: [],
      loadingcttb: false,
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.GetCTKMTuNgay();
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'btntop') {
      this.getReport();
    }
  }

  GetCTKMTuNgay = () => {
    // public string GetCTKMTuNgay(string ddkdId, string tungay, string denngay)
    let params = {
      tungay: this.state.payload.tungay,
      denngay: this.state.payload.denngay,
    };
    this.setState({loadingcttb: true, cttb: {name: 'Tải ctkm', id: ''}});
    this.props.dispatch(GetCTKMTuNgay(params)).then(res => {
      this.setState({loadingcttb: false});
      let listdata = [{label: 'All ctkm', id: ''}];
      res.map(item => {
        item2 = {
          label: item.SCHEME,
          id: item.PK_SEQ,
        };
        listdata.push(item2);
      });
      this.setState({
        listcttb: listdata,
        cttb: {name: 'Chọn ctkm', id: ''},
        loadingcttb: false,
      });
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
    this.setState({report: []});
    let params = {
      tungay: this.state.payload.tungay,
      denngay: this.state.payload.denngay,
      id: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      userId: this.props.listBranch.USERID,
      loai: this.props.listBranch.LOAI,
      ctkmId: this.state.cttb.id,
      nppId:
        this.props.SearchData.NppId == null ? '' : this.props.SearchData.NppId,
    };
    console.log('params BaoCao_SuDungKM ', JSON.stringify(params));
    // if (params.cttb_fk) {
    const {dispatch} = this.props;
    //let { payload } = this.state;
    dispatch(report(params)).then(res => {
      if (res[0].RESULT == '1') {
        //alert(JSON.stringify(res[0].MSG))
        this.setState({report: JSON.parse(res[0].MSG)});
      } else {
        this.setState({report: []});
      }
    });

    // } else {
    // 	Notify.show("Thông báo", "Vui lòng chọn chương trình trưng bày. \nChú ý: chương trình trưng bày sẽ load theo từ ngày- đến ngày bạn chọn")
    // }
  };

  setToTime = date => {
    const {payload} = this.state;
    payload.denngay = date;
    this.setState({payload});
    this.GetCTKMTuNgay();
  };

  setFromTime = date => {
    const {payload} = this.state;
    payload.tungay = date;
    this.setState({payload});
    this.GetCTKMTuNgay();
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
          title={'Chọn CTKM'}
          content={listcttb}
          onPressItem={item => {
            if (item.id != null && item.id != cttb.id) {
              //cttb
              cttb.name = item.label;
              cttb.id = item.id;
              this.setState({listcttb, cttb});
            }
            // this.getListkh_bc ()
            return this.setState({listcttb, cttb});
          }}
        />
      ),
    });
    // Alert.alert('Chọn CTKM', {
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

    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          title={'Chọn khách hàng'}
          content={listkh}
          onPressItem={item => {
            if (item.id != null && item.id != khachhang.id) {
              khachhang.name = item.label;
              khachhang.id = item.id;
            }
            return this.setState({listkh, khachhang});
          }}
        />
      ),
    });
    // Alert.alert('Chọn khách hàng', {
    //   items: listkh,
    //   onPressItem: item => {
    //     if (item.id != null && item.id != khachhang.id) {
    //       //cttb
    //       khachhang.name = item.label;
    //       khachhang.id = item.id;
    //     }

    //     return this.setState({listkh, khachhang});
    //   },
    // });
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
