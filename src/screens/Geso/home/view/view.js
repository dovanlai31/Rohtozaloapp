
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';

import Icons from '../../../../assets/Icons';
import Colors from '../../../../theme/Colors';
import { TextCmp, } from '../../../../common-components';

//menu  gridMenus QL
const gridMenus = [
  { key: 'Nhaphanphoiql', label: 'Nhà Phân Phối', icon: 'radar',  },
  { key: 'LtBanhang', label: 'LT Bán Hàng', icon: 'feedback',  },
  { key: 'noti', label: 'Thông báo', icon: 'bell', },
  { key: 'LtOnline', label: 'LT Online', icon: 'setlocation',  },//target
  { key: 'review', label: 'Khảo Sát', icon: 'target',  },
  { key: 'customer', label: 'Khách hàng', icon: 'customer',  },
];

export default class HomePresenter extends React.Component  {

  componentDidMount(){
    //StatusBar.setHidden(false);
  }
  shouldComponentUpdate(){
    return false;
  }
  // press=()=>{
  //   alert('xxx');
  // }
  render(){
    const{
      chooseGridMenu,
    }=this.props;
    return (
      <View style={styles.container}>
     
        <View style={styles.fill}>
          {gridMenus.map((menu) => {
            return (
              <TouchableOpacity
                style={styles.items}
                key={menu.key}
                onPress={()=>chooseGridMenu(menu)}
              >
                <Icons name={menu.icon} color={ Colors.HeaderColor} size={50} />
                <TextCmp
                  style={styles.text}
                >
                  {menu.label}
                </TextCmp>
              </TouchableOpacity>
            );
          })}
 
        </View>

       
      </View>
    );

    
  }
  
}
var { height, width, } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'center',
    flex: 1,
    backgroundColor:Colors.backgroundL3,
    width,
    
  },
  text:{
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  //fontFamily: "Panettone",
  },
  fill:{ marginTop:15, flexDirection: 'row', flexWrap: 'wrap',  alignItems: 'center',justifyContent:'center', width,   flex: 1,},
  items: {

    width: width/2-15,
    height: height/4-10,
    margin:6,
    justifyContent:'center',
    alignItems:'center',
    // ios
    borderRadius: 5,
    backgroundColor: Colors.backgroundL1,
    
    shadowOffset: { width: 0, height: 13, },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  

    // android (Android +5.0)
    elevation: 3,
    // borderWidth: Platform.OS==='android'?1:0   ,
    borderColor:Colors.HeaderColor,
  },

});
