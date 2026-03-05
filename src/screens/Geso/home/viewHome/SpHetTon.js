import React from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import {
  DotIndicator,
} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';
import { IDs, } from '../../..';
import formatter from './../../fm';
const { width,height } = Dimensions.get('window');

export default class ViewSPChay extends React.Component{
  shouldComponentUpdate(SanPhamBanChayList){
    return SanPhamBanChayList!=this.props.SanPhamBanChayList;
  }
    // _goViewCL=()=>{
    //  this.props.searchclisk('-All-')
    // }
  
    render(){
      const { SanPhamBanChayList, searchclisk,PressViewAll}= this.props;
      return (
        <View style={styles.km}>
          <View style={styles.titleText}>
          <Icon style ={{marginLeft: 10,}}  color={'#FD693E'} name = 'tag'></Icon>
            <TextCmp style={styles.txtTitle}>Sản phẩm hết tồn</TextCmp>
            <TouchableOpacity >
            {SanPhamBanChayList.length==0?<DotIndicator style={styles.txtAll} size={2}  color={'#FD693E'}></DotIndicator>:
              <TextCmp style={styles.txtAll}></TextCmp>}
            </TouchableOpacity>
          </View>
         
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, marginBottom: 1, alignItems: 'flex-start',height:'100%' }}>
              {SanPhamBanChayList && SanPhamBanChayList.map((item, index) => renderItem(item, index,searchclisk))}
            </View>
    
          </ScrollView>
        </View>
      );
    }
}

const renderItem = (item, index,searchclisk) => {
  let color = Colors.colorsRandom[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
  if(index<50 && item.hienhuu==0)
  return (
    <TouchableOpacity
      style={[styles.itemCL,{backgroundColor:color}]}
      key={item.ten}
      onPress={ searchclisk(item) }
    >   
      <View style={{backgroundColor:'rgba(0, 0, 0, 0.01)',}}>
        <TextCmp numberOfLines={2} style={{ fontSize: 13, padding: 2 ,width:width/3-5,minHeight:35}}>{item.ten}</TextCmp>
        <TextCmp style={{ fontSize: 12, padding: 2 ,color:Colors.mainColor,  textAlign: 'left', }}>{ formatter.format(item.dongia) } vnđ</TextCmp>
      </View>
      <Image resizeMode ='contain' source={{uri:item.HinhAnh,}}
        style={{ width: 80, height: 80, padding: 15,borderRadius: 2,marginTop:10 }} />
    </TouchableOpacity>

  );
  
};


const styles = StyleSheet.create({
  km: {
    //height: height / 5,
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal:5,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor: Colors.mainColor,
    shadowOffset: { height: 1, width: 0, },
    //android 
    elevation: 2,
    marginBottom:5,
    zIndex:9
  },
  titleText: {
    justifyContent: 'space-around', flexDirection: 'row',
    alignItems: 'center', width: width - 10, height: 30,
  },
  itemCL:{             
    width: width/3,   
    alignItems:'center',
    //backgroundColor:'#ffff'  ,
    //borderRadius:2,
    borderRightColor:'gray',
    marginLeft:1

  },
  txtTitle:{ width: width / 2 - 10, marginLeft: 12, textAlign: 'left',fontWeight:'bold', },
  txtAll:{ width: width / 2 - 10, marginRight: 10, textAlign: 'right', color: Colors.mainColor, },

});