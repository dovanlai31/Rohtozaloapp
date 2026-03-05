import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Viewnpp from './viewchild/ViewNPP';
import ViewNVBH from './viewchild/ViewNVBH';
import ViewTT from './viewchild/ViewTT';
import { Colors, } from '../../../theme';
import { TextCmp, } from '../../../common-components';

export default class ReportView extends React.Component {
  render(){
    const{
      tabindex,
      Clicktab,
      data,
      Vtnpp,
      Rdnpp,
      visiblePanel,
      dataImgs,
      takePicture,
      hidepanner,
      luuanh,
      datanvbh,
      VtKhNv,
      KeHoach_ChuphinhKhachhang,
      KeHoach_RoikhoiKhachhang,
      datatt,
      Vttt,
      state,
      KeHoach_ChuphinhTT,
      ghichu,
      isloading,
    }=this.props;
    
    return (
      <View style={styles.container}>
  
        <View style={styles.content}>
  
          <View style={styles.tab}>
            <TouchableOpacity style={tabindex == 0 ? [styles.intab, styles.borderB,] : styles.intab} onPress={() => Clicktab(0)}>
              <View  >
                <TextCmp style={styles.stytext} > ĐI CÙNG NPP</TextCmp>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity style={tabindex == 1 ? [styles.intab, styles.borderB,] : styles.intab} onPress={() => Clicktab(1)}  >
              <View >
                <TextCmp style={styles.stytext} > ĐI CÙNG NVBH</TextCmp>
              </View>
            </TouchableOpacity >
  
            <TouchableOpacity style={tabindex == 2 ? [styles.intab, styles.borderB,] : styles.intab} onPress={() => Clicktab(2)}>
              <View >
                <TextCmp style={styles.stytext} > ĐI CÙNG TT</TextCmp>
              </View>
            </TouchableOpacity>
  
  
          </View>
  
  
  
  
        </View>
  
        <View style={styles.body}>
  
          {tabindex == 0 && <Viewnpp
            data={data}
            Vtnpp={Vtnpp}
            Rdnpp={Rdnpp}
            visiblePanel={visiblePanel}
            dataImgs={dataImgs}
            takePicture={takePicture}
            hidepanner={hidepanner}
            luuanh={luuanh}
            isloading={isloading}
          >
          </Viewnpp>}
  
          {tabindex == 1 && <ViewNVBH
            data={datanvbh}
            VtKhNv={VtKhNv}
            Rdnpp={KeHoach_RoikhoiKhachhang}
            visiblePanel={visiblePanel}
            dataImgs={dataImgs}
            takePicture={takePicture}
            hidepanner={hidepanner}
            luuanh={KeHoach_ChuphinhKhachhang}
            isloading={isloading}
          >
          </ViewNVBH>}
          {tabindex == 2&& <ViewTT
            data={datatt}
            VtKhNv={Vttt}
            Rdnpp={KeHoach_RoikhoiKhachhang}
            visiblePanel={visiblePanel}
            dataImgs={dataImgs}
            takePicture={takePicture}
            hidepanner={hidepanner}
            luuanh={KeHoach_ChuphinhKhachhang}
            state = {state}
            KeHoach_ChuphinhTT={KeHoach_ChuphinhTT}
            ghichu={ghichu}
            isloading={isloading}
          >
          </ViewTT>}
        </View>
  
  
      </View>
    );

  }
}


 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    height: 50,
    backgroundColor: Colors.HeaderColor,
    flexDirection: 'row',
    justifyContent: 'center',

  },

  intab: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    marginTop: 5, width: '33%',
    //backgroundColor: '#fff',
    height: 45,
    padding: 5,
    justifyContent: 'center',
    borderColor: 'white',
    //borderRightWidth: 0.5
  },
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',

  },
  borderB: {
    borderColor: 'white',
    borderBottomWidth: 3,
  },
  stytext: {
    fontWeight: 'bold'
    , color: 'white'
    , fontSize: 12,
  },


});
