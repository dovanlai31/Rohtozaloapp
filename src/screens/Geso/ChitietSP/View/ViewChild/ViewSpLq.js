
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,FlatList,Platform,
  Image
} from 'react-native';
import { TextCmp, } from '../../../../../common-components';
import { Colors, } from '../../../../../theme';
import { IDs, } from '../../../..';
import { RFValue } from 'react-native-responsive-fontsize';
const {width,}= Dimensions.get('window');

export default class ViewSPLQ extends React.Component {
  shouldComponentUpdate(){
    return false;
  }

  renderItem2 = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.row}
        key={index}
        onPress={this.props.refeshData(item)}
        activeOpacity={0.8}
      >
        <View style={{backgroundColor:Colors.BackgroundLightWhite, padding:5}}>
        <Image resizeMode='contain' source={{ uri: item.HinhAnh, }}
          style={{ width: width / 3 - 8, height: width / 4 - 8, padding: 8, borderRadius: 2,marginTop:50,  }} />
        </View>
       
        <View style={{ backgroundColor: Colors.grayMain, padding: 5, position: 'absolute', top: 0,minHeight:50 }}>
          <TextCmp numberOfLines ={2} style={{ fontSize: RFValue(12), padding: 2, width: width / 3 - 5,  }}>{item.ten}</TextCmp>                  
          {/* <Text style={{ fontSize: 10, padding:2, color: 'white',width:width/3-5 }}>từ:2018-01-01</Text> */}
        </View>
    
      </TouchableOpacity>
    
    );
  };
  render(){
    const {Listsplq,}= this.props;
    return (
      <View style={''}>
        <View style={[styles.titleText,]}>
          <TextCmp style={styles.textrow}>Sản phẩm liên quan </TextCmp>


        </View>
        <View style={{ alignContent: 'center', backgroundColor: 'white', }}>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Listsplq}
            keyExtractor={_keyExtractor}
            renderItem={({ item, }) => (this.renderItem2(item))}
          />

        </View>
      </View>
    );
  }
}

const _keyExtractor = (item) => {
  return item.pk_seq+'';
};

const styles = StyleSheet.create({
  titleText: {
    justifyContent: 'space-around', flexDirection: 'row', backgroundColor: Colors.grayMain,
    alignItems: 'center', width: width, height: 30,
  },

  row:{
    width: width / 3,
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 2,
    borderRightColor: Colors.backgroundL1,
    height: width / 2,
    borderRightWidth:1, borderColor:'white', marginRight:1
  },
  textrow: { fontWeight:'bold', fontSize:RFValue(13), width: width / 1 - 10, marginLeft: 10, textAlign: 'left',color:Colors.text0PV },
});