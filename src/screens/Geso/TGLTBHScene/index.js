import React from 'react';
import {View, StyleSheet, Dimensions, FlatList, Alert} from 'react-native';
import {TextCmp} from '../../../common-components';
import DatePicker from 'react-native-datepicker';
import {Colors} from '../../../theme';
import moment from 'moment';
import SearchData from '../SearchData/SearchData';
import {CommonIcons} from '../../../assets';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {getdataLoTrinh} from './actions';
import ViewLoading from '../../../common-components/ViewLoading';
import Item from './Item';
import {AppNavigation} from '../../../app-navigation';
import ViewDetai from './ViewDetai';
import {IDs} from '../..';

const {width} = Dimensions.get('window');

class MainScenen extends React.Component {
  static options = {
    topBar: {
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },

      rightButtons: [
        {
          id: 'btntopmenu',
          // text: "Button",
          icon: CommonIcons.done,
        },
      ],
    },
  };

  state = {
    payload: {
      tungay: moment(new Date()).format('YYYY-MM-DD'),
      loading: false,
      dataList: [],
    },
  };

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({buttonId}) {
    if (buttonId === 'btntopmenu') {
      this.getReport();
    }
  }
  getReport() {
    // public string LoTrinhBanHang(string nhanvien_fk, string thoidiem,string nppId, string ddkdfk, string loainv)

    if (this.props.SearchData.NvbhId == null)
      return Alert.alert('Thông báo', 'Vui lòng chọn trình dược viên');
    let params = {
      nhanvien_fk: this.props.listBranch.USERID,
      id: this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
      ddkdfk:
        this.props.SearchData.NvbhId == null
          ? ''
          : this.props.SearchData.NvbhId,
      thoidiem: this.state.payload.tungay,
      nppId:
        this.props.SearchData.NppId == null ? '' : this.props.SearchData.NppId,
    };
    this.setState({loading: true});
    this.props.dispatch(getdataLoTrinh(params)).then(res => {
      this.setState({loading: false, dataList: res});
    });
  }
  setFromTime = date => {
    const {payload} = this.state;
    payload.tungay = date;
    this.setState({payload});
  };
  onSelect(item) {
    //alert(JSON.stringify(item))
    AppNavigation.showModal({
      name: IDs.ViewDetaiLTBH,
      passProps: {
        item: item,
        nhanvien_fk: this.props.listBranch.USERID,
        ddkdfk:
          this.props.SearchData.NvbhId == null
            ? ''
            : this.props.SearchData.NvbhId,
        thoidiem: this.state.payload.tungay,
        dispatch: this.props.dispatch,
      },
      options: {
        topBar: {
          title: {
            text: 'Xem chi tiết',
          },
        },
      },
    });
  }
  render() {
    const {payload, loading, dataList} = this.state;

    return (
      <View style={styles.containt}>
        <View style={styles.row}>
          <View style={styles.viewTn}>
            <TextCmp adjustsFontSizeToFit={true} style={styles.alignText}>
              Chọn ngày
            </TextCmp>
          </View>
          <View style={styles.boloc}>
            <DatePicker
              androidMode="spinner"
              style={{width: width / 1.7}}
              date={payload.tungay}
              mode="date"
              placeholder=""
              format={'YYYY-MM-DD'}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                dateText: {color: 'black', fontSize: 14},
                dateInput: {
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  borderBottomWidth: 0.5,
                },
              }}
              onDateChange={this.setFromTime}
            />
          </View>
        </View>

        <SearchData />

        <FlatList
          data={dataList}
          renderItem={({item}) => (
            <Item item={item} onSelect={item => this.onSelect(item)} />
          )}
          keyExtractor={item => item.id}
          extraData={(item, index) => index}
        />
        {loading == true && <ViewLoading />}
      </View>
    );
  }
}
export default connect(
  state => ({
    listBranch: state.app.listBranch,
    SearchData: state.SearchData,
  }),
  dispatch => ({dispatch}),
)(MainScenen);
const styles = StyleSheet.create({
  containt: {
    flex: 1,
    //justifyContent:'center',
    //alignContent:'flex-start'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom:3
  },
  viewTn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    width: '40%',
    backgroundColor: Colors.HeaderColor,
  },
  tungaydenngayview: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  boloc: {
    borderRadius: 4,
    //borderWidth: 0.5,
    padding: 5,
    //marginTop: 15,
    marginBottom: 2,
  },
});
