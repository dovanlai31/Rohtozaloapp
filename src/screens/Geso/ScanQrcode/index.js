
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,View
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { AppNavigation } from '../../../app-navigation';
import { dismissModal } from '../../../app-navigation/AppNavigation';
import { SanPhamList } from '../home/homeAction';
import { Alert } from 'react-native';
import { themspgiohang } from '../ChitietSP/Action/ChitietSp.action';
import { SnackBar } from '../../../utils';
import  Icon  from 'react-native-vector-icons/AntDesign';
let a=1;
export default class ScanScreen extends Component {
  state = {
    barcodes: null,
    barcodeType: '',
    barcodeValue: '',
    isBarcodeRead: false // default to false

  }
  componentDidMount(){
     a=1;
    // test
    // setTimeout(() => {
    //   this.barcodeRecognized({data:'125272'})
    // }, 2000);
  }
  onSuccess = e => {
    // alert(e.data)
    if (e && e.data) {
      const payload = {
        userId: this.props.userID,
        barcode: e.data
      };
      this.props.dispatch(
        SanPhamList(payload)
      ).then((data) => {
        if (data.length < 1) {
          return Alert.alert("Thông báo ", "Không có sản phẩm này " + e.data)
        }
      
        this.themspgiohang(data[0])

      });

    }

  };
  themspgiohang(sp) {

   // AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length + 1);
    sp.soluong = 1
    //this.props.dispatch(themspgiohang(sp));
    SnackBar.showSuccess('Thêm sản phẩm  thành công');
    //Toast.show('Thêm sp vào giỏ hàng thành công', Toast.POSITION.TOP, Toast.LENGTH.SHORT);
    //this.props.navigator._pop();
    this.props.ThemSp(sp)
    AppNavigation.dismissAllModals();
    a=1

  }
  barcodeRecognized = (barcodes ) => {
    //alert(JSON.stringify( barcodes.data))
    const {isBarcodeRead}=this.state

    if(barcodes&&barcodes.data&&a==1){
     // this.setState({isBarcodeRead})
      a=2
      SnackBar.showSuccess('Scan thành công ');
      AppNavigation.dismissAllModals();
      //this.setState({})
      //alert(JSON.stringify( barcodes.data))
      if (barcodes && barcodes.data) {
        const payload = {
          userId: this.props.userID,
          barcode: barcodes.data
        };
        this.props.dispatch(
  
          SanPhamList(payload)
        ).then((data) => {
          if (data.length < 1) {
            return Alert.alert("Thông báo ", "Không có sản phẩm này " + barcodes.data)
          }
        
          this.themspgiohang(data[0])
  
        });
  
      }
      
    }
   

  };

  renderBarcode = ({ bounds, data }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 10,
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        }}
      >
        <Text style={{
          color: '#F00',
          flex: 1,
          position: 'absolute',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}>{data}</Text>
      </View>
    </React.Fragment>
  );
  renderBarcodes = () => (
    <View>
      {this.state.barcodes&&this.renderBarcode(this.state.barcodes)}
    </View>
  );
  render() {
    // return (
    //   <QRCodeScanner
    //     showMarker={true}
    //     onRead={this.onSuccess}
    //     flashMode={RNCamera.Constants.FlashMode.torch}
    //     // topContent={
    //     //   <Text style={styles.centerText}>
    //     //     Go to{' '}
    //     //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
    //     //     your computer and scan the QR code.
    //     //   </Text>
    //     // }
    //     bottomContent={
    //       <TouchableOpacity onPress={() => AppNavigation.dismissAllModals()} style={styles.buttonTouchable}>
    //         <Text style={styles.buttonText}>Đóng</Text>
    //       </TouchableOpacity>
    //     }
    //   />
    // );
  
    return (
      <View style={styles.container}>
        
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
          }}


          defaultTouchToFocus
          // flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.barcodeRecognized.bind(this)}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          
        >

        </RNCamera>
        <BarcodeMask />

        <TouchableOpacity 
        onPress={() => AppNavigation.dismissAllModals()}
         style={{ width:44, borderRadius:22,height:44,position:'absolute', top:10,right:10, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
            <Icon name = 'close'></Icon>
        </TouchableOpacity>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    
  },
  container: {
    flex: 1
  },

  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
