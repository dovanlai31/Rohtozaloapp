import React from 'react';
import {connect} from 'react-redux';
import ReportView from './Kehoacthang_presenter';
import {report} from './KeHoachThang_action';
import moment from 'moment';
import {Fonts} from '../../../theme';

class Kehoachthang extends React.Component {
  static options = {
    statusBar: {
      visible: true,
    },
    topBar: {
      title: {
        text: 'Kế Hoạch Tháng',
        color: '#fff',
        fontFamily: Fonts.Default.bold,
      },
      visible: true,
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'Tất cả đối tác/chi nhánh',
      visiblePanel: false,
      searchKeyword: '',
      currentCustomer: '',
      payload: {
        tungay: moment(new Date()).format('YYYY-MM'),
        denngay: moment(new Date()).format('YYYY-MM-DD'),
      },
      data: null,
      Listngay: [],
      Listngaychitiet: [],
      index: -1,
    };
  }

  componentDidMount() {
    this.getReport();
  }

  getReport = () => {
    let params = {
      nhanvienId: this.props.listBranch.USERID,
      thang: this.state.payload.tungay.split('-')[1],
      nam: this.state.payload.tungay.split('-')[0],
      //denngay: this.state.payload.denngay,
      // nppId: this.props.SearchData.NppId,
      loai: this.props.listBranch.LOAI,
      vungId: '',
      khuvucId: '',
      Idnv: '',
    };
    //if (params.ddkdfk) {
    const {dispatch} = this.props;
    let Listngay = [];
    dispatch(report(params)).then(res => {
      if (res && res.length > 0) {
        let t = '';
        res = JSON.parse(res);
        res.map((item, index) => {
          if (t != item.NGAY) {
            Listngay.push(item.NGAY);
          }
          t = item.NGAY;
        });

        this.setState({Listngay, data: res, Listngaychitiet: [], index: -1});

        setTimeout(() => {
          Listngay.map((item, i) => {
            if (item == moment(new Date()).format('DD')) {
              this.clickitem(moment(new Date()).format('DD'),i);
            }
          });
         
        }, 2000);
      } else {
        this.setState({
          data: 'Không có dữ liệu.',
          Listngay: [],
          Listngaychitiet: [],
        });
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
    this.getReport();
  };
  clickitem(x, index) {
    let Listngaychitiet = [];
    if (index != this.state.index) {
      //this.setState({ Listngaychitiet, });
      this.state.data.map((item, i) => {
        if (item.NGAY == x) {

          //index = i;
          if (item.LOAI == 1) {
            Listngaychitiet.push(
              'NPP: ' +
                item.NPPTEN +
                '\nGhi chú: ' +
                item.GHICHU +
                '\nGhi chú 2: ' +
                item.GHICHU2,
            );
          }
          if (item.LOAI == 3) {
            Listngaychitiet.push(
              'TBH: ' +
                item.NPPTEN +
                '\nGhi chú: ' +
                item.GHICHU +
                ' ' +
                '\nGhi chú 2: ' +
                item.GHICHU2,
            );
          }
          if (item.LOAI == 2) {
            Listngaychitiet.push(
              'Tỉnh Thành: ' +
                item.TINHTEN +
                ' - quân huyện: ' +
                item.QUANHUYENTEN +
                '\nGhi chú: ' +
                item.GHICHU +
                '\nGhi chú 2: ' +
                item.GHICHU2,
            );
          }
        }
      });
      this.setState({Listngaychitiet, index});
    }

    //alert(Listngaychitiet)
  }
  render() {
    return (
      <ReportView
        setToTime={this.setToTime}
        setFromTime={this.setFromTime}
        getReport={this.getReport}
        time={this.state.payload}
        report={this.state.report}
        Listngay={this.state.Listngay}
        clickitem={(item, index) => this.clickitem(item, index)}
        Listngaychitiet={this.state.Listngaychitiet}
        index={this.state.index}
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
)(Kehoachthang);
