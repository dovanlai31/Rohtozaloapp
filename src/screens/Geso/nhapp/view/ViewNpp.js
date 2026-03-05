
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  NativeModules,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
import { Dropdown, } from 'react-native-material-dropdown';
import { FloatingAction, } from 'react-native-floating-action';
import { Colors, } from '../../../../theme';
import ModalImage from './modalImage';
import {TextCmp,}from '../../../../common-components';

export default class ViewNpp extends React.Component {

  componentDidUpdate(){
    if(this.props.latitude !== 10.801306){ 
      this._gotoCurrentLocation(this.props.latitude,this.props.longitude);
    }
  }


  _gotoCurrentLocation = (latitude, longitude) => {
    this.mapView.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }
  render(){
    const {
      latitude, 
      longitude,
      chinhanh,
      review,
      actions,
      visiblePanel,
      hidepanner,
      img,
      ChuphinhNPP,
      updateLocaitionNPP,
      visitNPP,
      takePicture,
      exitNPP,
      showListReview,
      showListchinhanh,
      isloading,
    }=this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude + 0.000266,
            longitude: longitude + 0.000218,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref = {(ref)=>this.mapView=ref}
        >
          {this.props.location && (
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              }}
            >
              <Icons name='pin' color='#e74c3c' size={25} />
            </MapView.Marker>
          )}
        </MapView>
        <View style={styles.npp}>
          {/* <Dropdown
            containerStyle={{width:'90%',}}
            label='Favorite Fruit'
            data={datanpp}
          /> */}
          <TouchableOpacity
            onPress={showListReview}
            style={styles.dropdownView}
          >
            <TextCmp
              style={styles.text1}
            >
              {review.action}
            </TextCmp>
            <Icons name='down-arrow' size={18} color='rgba(0,0,0,0.8)' />
          </TouchableOpacity>
        </View>
        <View style={styles.chinhanh}>
          <TouchableOpacity
            onPress={showListchinhanh}
            style={styles.dropdownView}
          >
            <TextCmp
              style={styles.text1}
            >
              {chinhanh.action}
            </TextCmp>
            <Icons name='down-arrow' size={18} color='rgba(0,0,0,0.8)' />
          </TouchableOpacity>
        </View>
  
  
  
        <ModalImage 
          visiblePanel={visiblePanel}
          dataImgs={img}
          hidepanner={hidepanner}
          luuanh= {ChuphinhNPP}
          isloading={isloading}
        />
  
        {!this.props.location && (
          <View style={styles.bottom}>
            <ActivityIndicator size='small' color='#00ff00' />
            <TextCmp>Đang lấy tộ độ, vui lòng đợi...</TextCmp>
          </View>
        )}
        {this.props.location && (
          <FloatingAction
            color={Colors.HeaderColor}
            actions={actions}
            onPressItem={(name) => {
              // console.log(`selected button: ${name}`);
              switch (name) {
                case 'bt_xdtd':
                  updateLocaitionNPP();
                  break;
                case 'bt_vt':
                  visitNPP();
                  break;
                case 'bt_ch':
                  takePicture();
                  break;
                case 'bt_rd':
                  exitNPP();
                  break;
              }
            }}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  npp: {
    width: '90%',
    margin: 5,
    marginLeft: '5%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    //top: 65,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderColor: '#d6d7da',
  },
  chinhanh: {
    width: '90%',
    margin: 5,
    marginLeft: '5%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    top: 50,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderColor: '#d6d7da',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    margin: 5,
    height: '10%',

    alignItems: 'center',
    position: 'absolute',
    // backgroundColor: 'blue',
    bottom: 5,
    // alignItems: 'center',

  },
  dropdownView: {
    height: 40,
    width: '95%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    margin: 20,
    // backgroundColor: '#f5f5f5',
  },
  text1:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});