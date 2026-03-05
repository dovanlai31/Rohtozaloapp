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
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';
import { IDs, } from '../../..';
import formatter from './../../fm';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, } = Dimensions.get('window');
const margin = 5;
const itemWidth = (width - 2 * margin - 10) / 3;
export default class ViewSPChay extends React.Component{
  shouldComponentUpdate(nextProps){
    return nextProps.SanPhamBanChayList.length!=this.props.SanPhamBanChayList.length;
  }

    _goViewCL=()=>{
     this.props.searchclisk('-All-')
    }
  
    render(){
      const { SanPhamBanChayList, searchclisk,PressViewAll}= this.props;
      return (
        <View style={styles.container}>
          <View style={styles.titleText}>
            <View style={styles.titleGroup}>            
              <View style = {styles.styleO}>
                 <Icon style ={{}}  size={16} color={Colors.textOPVRed} name = 'fire'></Icon>        
              </View>
              <TextCmp style={styles.txtTitle}> Sản phẩm bán chạy </TextCmp>
            </View>

            <TouchableOpacity onPress= {()=>PressViewAll('-All-')}>
            {SanPhamBanChayList.length==0?<DotIndicator style={styles.txtAll} size={2}  color={'#FD693E'}></DotIndicator>:
                         <View style={styles.titleGrouptwo}>            
                         <View style = {styles.styleOtwo}>
                            <Icon style ={{}}  size={16} color={Colors.textOPVCopper} name = 'grip-horizontal'></Icon>        
                         </View>
                         <TextCmp style={styles.txtAll}>Xem thêm</TextCmp>
                       </View>
             
             //<TextCmp style={styles.txtAll}>Xem tất cả</TextCmp>
            }
            </TouchableOpacity>
          </View>
         
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
           <View style={styles.itemContainer}>
              {SanPhamBanChayList && SanPhamBanChayList.map((item, index) => renderItem(item, index,searchclisk))}
            </View>
    
          </ScrollView>
        </View>
      );
    }
}

const renderItem = (item, index,searchclisk) => {
  let color = Colors.colorsRandom[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
  color = Colors.Analogus
  if(index<5)
  return (
    <TouchableOpacity key={item.ten}  onPress={ searchclisk(item) } style = {styles.CardContainer}>
        <View
        style={[styles.itemCL,{backgroundColor:color}]}
        key={item.ten}
  
        >   
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.01)',}}>
        <TextCmp numberOfLines={2} style={{ fontSize: RFValue('12'), fontWeight: '200', padding: 10,width:width/3-5,Height:45, color:Colors.text }}>{item.ten}</TextCmp>
       
        </View>
        <View style={styles.imageContainer}>
        <Image
        resizeMode="cover"
        source={{ uri: item.HinhAnh }}
        style={styles.image}
        />
        </View>

        {/* <Image resizeMode ='contain' source={{uri:item.HinhAnh,}}
        style={{ width: width/3 , height: width/3 , padding: 15,borderRadius: 2,marginTop:10 }} 

        /> */}
        </View>
       <TextCmp style={{  fontWeight: 'bold',fontSize: RFValue('12'), padding: 2 ,color:Colors.textOPVRed,   }}>{ formatter.format(item.dongia) } {<TextCmp style={{  fontWeight: '500', backgroundColor: null,fontSize: RFValue('10'), padding: 5 ,color:Colors.textOPVGreen, borderRadius: 5, }}> VNĐ </TextCmp>}</TextCmp> 
    </TouchableOpacity>


  );
  
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // shadowColor: Colors.mainColor,
    // shadowOffset: { height: 1, width: 0 },
    // elevation: 2,
    borderColor: Colors.Analogus2,
    borderWidth: 1,
    width: width - 20,
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 20,
    justifyContent: 'space-between',
    
  },
  CardContainer :{
    display: 'flex',
    alignItems: 'center',
    width: itemWidth  ,
    
    alignSelf:'flex-start',
    paddingHorizontal: margin ,
    justifyContent: 'space-between'
  },
  titleText: {
    justifyContent:'space-between', flexDirection: 'row',
    alignItems: 'center', width: '100%', 
   
    borderColor: Colors.Analogus2, 
    borderBottomWidth: 0.5,
    backgroundColor: Colors.Analogus, 
    paddingLeft: 5,
  },

  itemCL:{             
    width: itemWidth,   
    alignItems: 'center',
  

   // borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.Analogus2,
    elevation: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.4, 
    shadowRadius: 4, 
    overflow: 'hidden', 
    alignSelf:'center',
    marginBottom: 10,
  },
  txtTitle: { fontWeight: 'bold', color: Colors.text0PV , fontSize: RFValue(14)},
  txtAll: {  textAlign: 'center', color: Colors.textOPVCopper, marginRight: 5,  fontSize: RFValue(12)},
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
    width: itemWidth ,
    height: itemWidth ,
   // borderBottomLeftRadius: 10,
   // borderBottomRightRadius: 10,
    backgroundColor: '#ffffff90',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
});