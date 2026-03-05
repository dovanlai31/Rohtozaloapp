
import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import { Colors, } from '../../../../../theme';
import formatter from '../../../fm';
import { TextCmp, } from '../../../../../common-components';

import ViewListSp from '../../../home/viewHome/ViewListSp';
import ViewSPLQ from './ViewSpLq';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
const { height, width, } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;


export default class RenderScrollViewContent extends React.Component {
  // shouldComponentUpdate(data) {
  //   return data !== this.props.data;
  // }
  _keyExtractor = (item) => {
    return item.pk_seq + '';
  };
  renderItem = (item) => {
    return (

      <TouchableOpacity
        style={styles.rowkm}
        onPress={() => this.props.onSelectKM(item)}
      >
          <View style={{backgroundColor:Colors.BackgroundLightWhite, padding:5}}>
        <Image resizeMode='contain' source={{ uri: item.HinhAnh, }}
          style={{ width: width / 3 - 8, height: width / 4 - 8, padding: 8, borderRadius: 2,marginTop:50,  }} />
        </View>
         <View style={{ backgroundColor: Colors.grayMain, padding: 5, position: 'absolute', top: 0,minHeight:50 }}>
         <TextCmp style={styles.titleText2}>{item.diengiai}</TextCmp>                 
          {/* <Text style={{ fontSize: 10, padding:2, color: 'white',width:width/3-5 }}>từ:2018-01-01</Text> */}
        </View>



     </TouchableOpacity>

    );
  };
  render() {
    const { data, onChangeSoluong, soluong, Listsplq, listkm, navigator, } = this.props;

    return (
      <View style={styles.scrollViewContent}>
        <View style={{   backgroundColor: 'white', marginTop: Platform.OS === 'ios' ? 50 : 50,  }}>
          <TextCmp style={styles.textTittle}>{data.ten}</TextCmp>
          <TextCmp style={{ paddingLeft: 10, fontSize: RFValue(13), fontWeight:'bold', color: Colors.text0PV }}>{formatter.format(data.dongia)} VNĐ <TextCmp style={{ paddingLeft: 10, fontSize: RFValue(13), color: Colors.text0PV }}>/ {data.donvi}</TextCmp>  </TextCmp>

          {/* <View style={styles.rownhapsl}>
            <TextCmp style={{ padding: 10, paddingLeft: 10, }}>Nhập số lượng({data.donvi}): </TextCmp>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ margin: 5, padding: 5 }} onPress={() => {
                if (soluong > 0)
                  onChangeSoluong(soluong - 1)
              }
              }>
                <IconAntDesign name='minuscircleo' size={20}></IconAntDesign>
              </TouchableOpacity>
              <TextInput

                style={styles.input}
                value={soluong + ''}
                defaultValue={'1'}
                keyboardType={'numeric'}
                // underlineColorAndroid="transparent"
                onChangeText={(text) => onChangeSoluong(text)}
              ></TextInput>
              <TouchableOpacity onPress={() => onChangeSoluong(soluong + 1)} style={{ margin: 5, padding: 5 }}>
                <IconAntDesign name='pluscircleo' size={20}></IconAntDesign>
              </TouchableOpacity>
            </View>

          </View> */}

          {/* <TextCmp style={{ marginBottom: 10, paddingLeft: 10, fontSize: 16, color: 'green' }}>Thành tiền: {formatter.format(data.dongia * soluong)} vnđ </TextCmp> */}
        </View>


        <View style={''}>
          <View style={styles.titleText}>
            <TextCmp style={styles.textrow}>Chi tiết sản phẩm </TextCmp>
          </View>
          <View style={{ alignContent: 'center', backgroundColor: 'white', }}>
            <View style={styles.rowinfo}>
              <TextCmp style={[styles.txtrowinfo, {  },]}>SKU </TextCmp>
              <TextCmp style={styles.txtrowinfo}>{data.ma}</TextCmp>
            </View>
            <View style={styles.rowinfo}>
              <TextCmp style={[styles.txtrowinfo, { },]}>Nhãn hàng </TextCmp>
              <TextCmp style={styles.txtrowinfo}>{data.nhTen}</TextCmp>
            </View>
            <View style={styles.rowinfo}>
              <TextCmp style={[styles.txtrowinfo, { },]}>Quy cách </TextCmp>
              <TextCmp style={styles.txtrowinfo}>1 thùng = {data.qcThung} {data.donvi}</TextCmp>
            </View>
          </View>

        </View>
        {data.hoatchat !='' &&   <View style={''}>
          <View style={styles.titleText}>
            <TextCmp style={styles.textrow}>Thành phần </TextCmp>
          </View>
          <View style={{ alignContent: 'center', backgroundColor: 'white', }}>
            <View style={styles.rowinfoCustom}>            
              <TextCmp style={styles.txtrowinfoCustom}>{data.hoatchat}</TextCmp>
            </View>

        </View>
        

        </View>
        }
        {
      data.chidinhdieutri !='' && <View style={''}>
          <View style={styles.titleText}>
            <TextCmp style={styles.textrow}>Chỉ định điều trị </TextCmp>
          </View>
          <View style={{ alignContent: 'center', backgroundColor: 'white', }}>
            <View style={styles.rowinfoCustom}>            
              <TextCmp style={styles.txtrowinfoCustom}>{data.chidinhdieutri}</TextCmp>
            </View>

        </View>
        

        </View>
        }
          <View>
            {listkm && <View style={''}>

              <View style={[styles.titleText,]}>

                <TextCmp style={styles.textrow}>Khuyến mãi </TextCmp>
                <TouchableOpacity>
                  {/* <TextCmp style={{ width: width / 2 - 10, marginRight: 10, textAlign: 'right', color: Colors.mainColor,  }}>Xem tất cả</TextCmp> */}
                </TouchableOpacity>
              </View>

              <View style={{ alignContent: 'center', backgroundColor: 'white', justifyContent:'center'}}>
                <FlatList
                
   
                  data={listkm}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item, }) => (this.renderItem(item))
                  }
                />
              </View>
            </View>
            }
          </View>





        {Listsplq &&
          <ViewSPLQ
            Listsplq={Listsplq}
            navigator={navigator}
            refeshData={this.props.refeshData}
          ></ViewSPLQ>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtrowinfo: { width: width / 2 - 10, marginRight: 10, textAlign: 'left', marginLeft: 10, fontSize: RFValue(13), },
  rowinfo: { flexDirection: 'row', height: 30, alignItems: 'center',  },
  rowinfoCustom: { flexDirection: 'row', alignItems: 'center', },
  txtrowinfoCustom: { width: '100%', 
   textAlign: 'left', padding:10, fontSize: RFValue(13),  lineHeight:18,},
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
    height: 'auto',
    backgroundColor: 'white',
    paddingBottom: 200,

  },

  titleText: {
    justifyContent: 'space-around', flexDirection: 'row', backgroundColor: Colors.BackgrondLightOPV5,
    alignItems: 'center', width: width, height: 40,
  },
  titleText2: {
    justifyContent: 'space-around', flexDirection: 'row', 
    alignItems: 'center', width: width/3, height: 45,
    fontSize: RFValue(13),
    color: Colors.text0PV
  },
  textTittle: { fontSize: RFValue(14), fontWeight: 'bold', padding: 10, paddingLeft: 10, color: Colors.textOPVGreen, },
  rownhapsl: { flexDirection: 'row', alignItems: 'center' },
  input: {
    borderColor: Colors.backgroundL1, borderWidth: 1, minWidth: 55, justifyContent: 'center',
    alignItems: 'center', textAlign: 'center', color: 'black'
  },
  rowkm: {
    width: width / 3,
    alignItems: 'center',
    backgroundColor: '#ffff',

    height: width / 3 +30,
    borderRightWidth:0.5, borderColor:'white', marginRight:1
  },
  textrow: { fontSize:RFValue(13),width: width / 1 - 10, marginLeft: 10, textAlign: 'left',color:Colors.text0PV, fontWeight:'bold' },
});