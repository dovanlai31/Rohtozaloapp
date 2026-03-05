import React from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {report} from './action';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';
import htmlloading from '../../../../common-components/htmlLoading';
import ViewWebBC from '../ViewWebBC';
import {AppNavigation} from '../../../../app-navigation';
import ViewDialog from '../../DialogView/DialogView';

const year = moment(new Date(), 'YYYY-MM-DD').format('YYYY');

const listQuarters = [{label: 1}, {label: 2}, {label: 3}, {label: 4}];

const listYear = [
  {label: year - 1},
  {label: year},
  {label: parseInt(year) + 1},
];
class Baocao_ql_quy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'Chọn NPP',
      visiblePanel: false,
      searchKeyword: '',
      currentCustomer: '',
      nam: year,
      quy: moment().quarter(),
      payload: {
        tungay: moment(new Date()).format('YYYY-MM'),
        denngay: moment(new Date()).format('YYYY-MM'),
      },
      report: '',
      ansearch: false,
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
    const {nam, quy} = this.state;
    let tungay1 = '';
    let denngay1 = '';
    switch (quy) {
      case 1:
        tungay1 = nam + '-01-01';
        denngay1 = nam + '-03-31';
        break;
      case 2:
        tungay1 = nam + '-04-01';
        denngay1 = nam + '-06-31';
        break;
      case 3:
        tungay1 = nam + '-07-01';
        denngay1 = nam + '-09-31';
        break;
      case 4:
        tungay1 = nam + '-10-01';
        denngay1 = nam + '-12-31';
        break;
      default:
        tungay1 = nam + '-01-01';
        denngay1 = nam + '-03-31';
    }

    let params = {
      userId: this.props.listBranch.USERID,
      nvId: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      id: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      ddkdId:
        this.props.SearchData.NvbhId == null
          ? ''
          : this.props.SearchData.NvbhId,
      thangnam: '-1',
      tungay: tungay1,
      denngay: denngay1,
      nppId:
        this.props.SearchData.NppId == null ? '' : this.props.SearchData.NppId,
      trangthaidh:
        this.state.currentBranch.id == null ? '' : this.state.currentBranch.id,
      idnhom: '',
      loai: this.props.listBranch.LOAI,
      vungId:
        this.props.SearchData.VungId == null
          ? ''
          : this.props.SearchData.VungId,
      kvId:
        this.props.SearchData.KhuvucId == null
          ? ''
          : this.props.SearchData.KhuvucId,
      asmId:
        this.props.SearchData.AsmId == null ? '' : this.props.SearchData.AsmId,
      gsbhId:
        this.props.SearchData.GsbhId == null
          ? ''
          : this.props.SearchData.GsbhId,
      trangthaitrave:
        this.props.SearchData.trangthaidh == null
          ? ''
          : this.props.SearchData.trangthaidh,
    };

    const {dispatch} = this.props;
    this.setState({report: htmlloading});
    dispatch(report(params)).then(res => {
      if (res[0].RESULT == '1') {
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
  setYear = () => {
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          title={''}
          content={listYear}
          onPressItem={item => {
            if (item && item.label) {
              this.setState({nam: item.label});
            }
          }}
        />
      ),
    });
  };

  setQuarters = () => {
    AppNavigation.showCommonDialog({
      renderContent: () => (
        <ViewDialog
          title={''}
          content={listQuarters}
          onPressItem={item => {
            if (item && item.label) {
              this.setState({quy: item.label});
            }
          }}
        />
      ),
    });
    // Notify.show('Chọn quý', {
    //   items: listQuarters,
    //   onPressItem: item => this.setState({quy: item.label}),
    // });
  };
  render() {
    return (
      <ViewWebBC
        // annvbh={true}
        setToTime={this.setToTime}
        setFromTime={this.setFromTime}
        getReport={this.getReport}
        time={this.state.payload}
        report={this.state.report}
        ansearch={this.ansearch}
        isan={this.state.ansearch}
        antungaydenngay={true}
        bcquy={true}
        hientrangthai={false}
        setQuarters={this.setQuarters}
        setYear={this.setYear}
        nam={this.state.nam}
        quy={this.state.quy}
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
)(Baocao_ql_quy);
