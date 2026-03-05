import {
  ActivityIndicator, View, TouchableOpacity, StyleSheet,
  Dimensions, FlatList,
  Platform, Alert,
} from 'react-native';

import React from 'react';
import { connect, } from 'react-redux';

import { Colors, } from '../../../theme';
import { CommonIcons, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
const { height, width, } = Dimensions.get('window');
import { ThongTinDonHang, xoadonhang, } from '../Profile/Actions/Action';
import { ErrorMessage, TextCmp, LoadingModal } from '../../../common-components';
import { IDs, } from '../..';
import { SnackBar, } from '../../../utils';
import { showSuccess } from '../../../utils/SnackBar';
import { AppNavigation, } from '../../../app-navigation';
import { SanPhamListDH } from './actions';
import ViewLoadding from '../Loadding';
import { ChiTietDonHang } from './../Profile/Actions/Action';
import { themspgiohang } from '../ChitietSP/Action/ChitietSp.action';
import RowItem from './RowItem';
class ViewData extends React.Component {

  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      visible: true,
    },
    topBar: {
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },
      leftButtons: [
        {
          id: 'Listdon_BACK',
          icon: CommonIcons.back2,
        },
      ],
      title: {
        text: 'Đơn Hàng',
      },
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: [],
      loading: false,
      showErrorMessage: false,
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted

  }


  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'Listdon_BACK') {
      //alert('')
      this.props.navigator._pop();
    }
  }

  goctdonhang(donhang) {
    const { navigator, } = this.props;
    navigator._push({
      name: IDs.DonhangChitiet,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: false, }, }),
        },
      },
      passProps: {
        donhang: donhang,
      },
    });

  }
  xoadh(dhid) {

    this.props.dispatch(xoadonhang({ dhId: dhid, userId: this.props.userID, })).then((data) => {
      if (data) {
        // alert(JSON.stringify(data))
        if (data[0].RESULT == '1') {
          //  const listdonhang = this.state.listdonhang.filter((w) => w.MADH !== item);
          //  this.setState({ listdonhang: listdonhang, });
          this.props.navigator._pop();
          showSuccess('' + data[0].MSG)
        } else {
          Alert.alert('Lỗi xóa đơn', data[0].MSG);
        }


      }
    });
  }
  updatedonhang = (item) => {

    // AppNavigation.showCommonDialog({
    //   renderContent: () => < ViewLoadding />,
    // });
    this.props.dispatch(ChiTietDonHang({ userId: this.props.userID, dhId: item.MADH, })).then((data) => {

      // AppNavigation.dismissOverlay('1')

      if (data) {
        if (data[0].RESULT == 1) {
          //alert(JSON.stringify(data[0].ChiTiet))
          res = [];
          res = JSON.parse(data[0].ChiTiet);
          res.map(async (item) => {
            item.soluong = item.SOLUONG;
            //item.qcThung=1;
            if (item.scheme == '')

              await this.props.dispatch(themspgiohang(item))
          });

          //pk_seq: sp.pk_seq, ten: sp.ten, dongia: sp.dongia, donvi: sp.donvi, HinhAnh: sp.HinhAnh, soluong: sp.soluong,ma:sp.ma,hienhuu:sp.hienhuu, 

          this.props.dispatch({ type: 'addIddonhang', Iddonhang: item, });
          //SnackBar.showError('Cập nhật đơn hàng ' +item.MADH);
          this.props.navigator._pop();
          AppNavigation.changeTab(2);
          this.setState({ loading: false })
        }
      }
    });
  }
  componentDidMount() {
    const { index, userId, } = this.props;


    this.ThongTinDonHangx(index, userId);
    this.setState({ index, });
  }

  ThongTinDonHangx(trangthai, userId) {

    this.props.dispatch(ThongTinDonHang({ userId: userId, trangthai: trangthai, })).then((data) => {
      //nhanh quá bị lag
      setTimeout(() => {
      if (!data || data.length == 0) {
        this.setState({ showErrorMessage: true });
      } else {
        this.setState({ data: data });
      }
    }, 500);

    });
  }
  _renderItemService = (item, index) => (
    <RowItem item={item} index={index}
      xoadh={(dhid) => this.xoadh(dhid)}
      goctdonhang={(item) => this.goctdonhang(item)}
      updatedonhang={(item) => this.updatedonhang(item)}
    ></RowItem>

  );

  // shouldComponentUpdate(data) {
  //   return data !== this.state.data||loading;
  // }
  render() {
    const { index, data, showErrorMessage} = this.state;

    return (
      <View style={styles.containt}>
        {/* <View style= {styles.title}>
              <View><TextCmp>{title}</TextCmp></View>             
            </View> */}
          <View style={{ marginTop: 5, }}>
              {showErrorMessage ? (
              <ErrorMessage message='Chưa có thông tin đơn hàng, vui lòng thử lại sau' />
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => item.MADH.toString()}
                renderItem={({ item, index }) => this._renderItemService(item, index)}
              />
            )}

          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containt: { alignItems: 'center', flex: 1, marginTop: Platform.OS == 'android' ? 0 : 0, backgroundColor:Colors.backgroundL1 },
  row: {
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#d3d3d3',
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  item: {

  },

});

export default connect((state) => ({
  userID: state.login.userID,
}), (dispatch) => ({ dispatch, }))(ViewData);