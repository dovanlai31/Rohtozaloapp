
import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { TextCmp, } from '../../../common-components';
import Icon from '../../../assets/Icons';
import { Colors, } from '../../../theme';
import { IDs, } from '../..';
import { BottomBarAssets,CommonIcons, } from '../../../assets';

const items= [
  { key: 'date', label: 'Doanh số theo ngày',scene:IDs.BCNGAY, },
  { key: 'month', label: 'Doanh số theo tháng',scene:IDs.BCTHANG, },
  { key: 'orderDetail', label: 'Chi tiết đơn hàng',scene:IDs.BCCHITIETDH, },
  // { key: 'ctsanpham', label: 'Chi tiết sản phẩm', },
  { key: 'dophuSP', label: 'Độ phủ sản phẩm',scene:IDs.BCDOPHUSP, },
  { key: 'reportKPI', label: 'Báo cáo KPI',scene:IDs.BCKPI,  },
  { key: 'reportCustomer', label: 'Khách hàng - Tuyến',scene:IDs.BCKHTUYEN, },
  { key: 'reportKPIEmployee', label: 'Báo cáo KPI NV',scene:IDs.BCKPINV,  },
  { key: 'baocaoscore', label: 'Báo cáo Score Board ',scene:IDs.BCScore, },
  { key: 'baocaochamcong', label: 'Báo cáo chấm công',scene:IDs.BCChamcong, },
  { key: 'chamcong', label: 'Chấm công QL',scene:IDs.BCChamcongQL, },
  // { key: 'reporttarget', label: 'Báo cáo đạt chỉ tiêu', },

];
export default class Menu extends React.Component {
  
  pressitem(item){
    if(item.scene){
      // alert(item.scene);
      this.props.navigator._push({
        name:item.scene , 
        // passProps: {
        //   data:this.state.location,
     
        // },
        options: {         
          topBar: {
            title: {
              text:item.label,
            },
            rightButtons: [
              {
                id: 'btntop',
                icon: CommonIcons.done,           
              },
            ],
          },
          bottomTabs:{
            visible: false,
            ...Platform.select({ android: { drawBehind: true, }, }),
          },
        },
     
      });}
  }
  render(){
    return (
      <View style={styles.content}>
        <ScrollView>
          {items.map((x)=>{
            return(
              <TouchableOpacity style={styles.item} onPress={()=>this.pressitem(x)}>
                <View style={{flexDirection: 'row',alignItems:'center',}}>
                  <Image source={BottomBarAssets.bacao} style={styles.icon}></Image>
                  <TextCmp>{x.label}</TextCmp>
                </View>
                <Icon name="arrow-right" size={16} color={Colors.HeaderColor} />
              </TouchableOpacity>
          
            );
          })}
        </ScrollView>
       
      </View>
    );
  }
}

const styles= StyleSheet.create({

  content:{
    flex:1,
  },
  icon:{width:20,height:20,margin:5,tintColor:Colors.HeaderColor,},
  item:{
    marginHorizontal:10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth:1,
    borderColor:Colors.line,
    alignItems: 'center',
    borderRadius:3,

  },
});
