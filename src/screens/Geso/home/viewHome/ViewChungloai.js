import React from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';

import { IDs, } from '../../..';
const { width, } = Dimensions.get('window');
const margin = 5;
const itemWidth = (width - 2 * margin - 40) / 4;
import {
  DotIndicator,
} from 'react-native-indicators';
export default class ViewChungloai extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.listChungloai.length !== this.props.listChungloai.length
     
  }
  _goViewCL = () => {
    const { listChungloai, navigator, } = this.props;
    navigator._push({

      name: IDs.Allnhom,
      options: {

        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
              topBar: {
        title: {
          text: 'Danh mục sản phẩm',
          color: 'white' // Màu chữ cho tiêu đề
        }
      }
      },
      passProps: {
        listChungloai: listChungloai,
      },


    });
  }
  renderItem = (item, index, searchclisk) => {
    let color = Colors.colorsRandom2[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    color= Colors.textOPVGreen
    return (
      <View key={index.toString()} style={{justifyContent:'center'}}>
       <TouchableOpacity
          style={[styles.itemCL, { backgroundColor: color }]}
          key={item.ten}
          onPress={searchclisk(item)}
        >
          <View style={{ padding: 5, }}>
            <TextCmp textAlign='center' numberOfLines={1} style={{textAlign:'center' , fontSize: RFValue(10), fontWeight: '200', padding: 2, width: width / 5, color: 'white', }}>{item.ten}</TextCmp>
          </View>
          <View style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                source={{ uri: item.HinhAnh }}
                style={styles.image}
              />
           </View>
        </TouchableOpacity>

      </View>


    )
   
  };
  render() {
    const { listChungloai, searchclisk, } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleText}>
          
          <View style={styles.titleGroup}>            
              <View style = {styles.styleO}>
                 <Icon style ={{}}  size={16} color={Colors.textOPVRed} name = 'cart-plus'></Icon>        
              </View>
              <TextCmp style={styles.txtTitle}> Danh mục sản phẩm </TextCmp>
           </View>
 
          <TouchableOpacity onPress={this._goViewCL}>

            {listChungloai.length == 0 ? <DotIndicator style={styles.txtAll} size={2} color={'#FD693E'}></DotIndicator> :
                         <View style={styles.titleGrouptwo}>            
                         <View style = {styles.styleOtwo}>
                            <Icon style ={{}}  size={16} color={Colors.textOPVCopper} name = 'grip-horizontal'></Icon>        
                         </View>
                         <TextCmp style={styles.txtAll}>Xem thêm</TextCmp>
                       </View>
            }
          </TouchableOpacity>

        </View>

        {/* <FlatList
        numRows={2}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={listChungloai}
          renderItem={item =>this.renderItem(item, 0, searchclisk)} 
          keyExtractor={item => item.ten}
        ></FlatList> */}
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.itemContainer}>
            {listChungloai && listChungloai.slice(0, 8).map((item, index) => this.renderItem(item, index, searchclisk))}
          </View>

        </ScrollView>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // shadowColor: Colors.mainColor,
    // shadowOffset: { height: 1, width: 0 },
    // elevation: 2,
    borderColor: Colors.Analogus2,
    borderWidth: 0.5,
    width: width - 20,
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: margin,
  },
  titleText: {
    justifyContent:'space-between', flexDirection: 'row',
    alignItems: 'center', width: '100%', 
    borderColor: Colors.Analogus2, 
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    backgroundColor: Colors.Analogus, 
  },

  itemCL: {
    width: itemWidth,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    marginBottom: 10,
    overflow: 'hidden', 
  },
  txtTitle: { fontWeight: 'bold', color: Colors.text0PV, fontSize: RFValue(14) },
  txtAll: {  textAlign: 'center', color: Colors.textOPVCopper, marginRight: 5, fontSize: RFValue(12) },
  titleGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleGrouptwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  styleO: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: Colors.mainColor,
    backgroundColor: Colors.Analogus,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
 

  styleOtwo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: Colors.Analogus,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    width: itemWidth,
    height: itemWidth,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#FFFFFF40',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },

});