import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TextCmp} from '../../../common-components';
import {NhanVien_LayThongTinDonHang_SanPham} from './actions';
import {Colors} from '../../../theme';
import {WebView} from 'react-native-webview';
import htmlloading from '../../../common-components/htmlLoading';
import ViewLoadding from '../Loadding';
const {width} = Dimensions.get('window');
export default class ViewDetaiLTBH extends Component {
  state = {
    html: '',
    loadding: true,
  };
  componentDidMount() {
    this.getdataDetail();
  }
  getdataDetail() {
    // public string NhanVien_LayThongTinDonHang_SanPham(string nvId, string ddkdId, string khachhangId, string thoidiem)

    let params = {
      khachhangId: this.props.item.khId,
      nvId: this.props.nhanvien_fk,
      ddkdId: this.props.ddkdfk,
      thoidiem: this.props.thoidiem,
    };
    this.props
      .dispatch(NhanVien_LayThongTinDonHang_SanPham(params))
      .then(res => {
        if (res && res[0].RESULT == 1) {
          this.setState({html: res[0].MSG});
        } else {
          this.setState({html: '<h1>không có dữ liệu</h1>'});
        }

        //alert(JSON.stringify(res));
      });
  }
  render() {
    const {item} = this.props;
    return (
      <View style={styles.contant}>
        <View style={styles.viewTop}>
          <TextCmp>Khách hàng: {item.khTen}</TextCmp>
          <TextCmp>Địa chỉ: {item.diachi}</TextCmp>
          <TextCmp>Điện thoại: {item.sodienthoai}</TextCmp>
        </View>
        <WebView
          onLoadEnd={() => {
            this.setState({loadding: false});
          }}
          containerStyle={{width}}
          injectedJavaScript={
            "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
          }
          // scalesPageToFit={true}
          originWhitelist={['*']}
          source={{html: this.state.html, baseUrl: ''}}
        />
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          {this.state.loadding === true && <ViewLoadding />}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contant: {
    flex: 1,
  },
  viewTop: {
    borderColor: Colors.line,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
});
