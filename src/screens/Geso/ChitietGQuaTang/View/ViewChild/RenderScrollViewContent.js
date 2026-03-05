
import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { WebView } from "react-native-webview"
import { Colors, } from '../../../../../theme';
import formatter from '../../../fm';
import { TextCmp, } from '../../../../../common-components';
import RenderHtml from 'react-native-render-html';
import ViewListSp from '../../../home/viewHome/ViewListSp';
import ViewSPLQ from './ViewSpLq';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppValue from '../../../../../values/AppValue';
import { RFValue } from 'react-native-responsive-fontsize';
const { height, width, } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;


export default class RenderScrollViewContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0

    };

  }
  // shouldComponentUpdate(data) {
  //   return data !== this.props.data || dataChitiet !== this.props.dataChitiet;
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
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: 6, height: 6, marginLeft: 25, borderRadius: 3, backgroundColor: Colors.HeaderColor, }}></View>
          <TextCmp style={{ fontSize: 18, padding: 2, marginLeft: 10, color: Colors.HeaderColor, width: width - 38, }}>{item.diengiai}</TextCmp>
        </View>

      </TouchableOpacity>

    );
  };
  settab(t) {
    this.setState({ tab: t })
  }
  render() {

    const { data, onChangeSoluong, soluong, Listsplq, listkm, navigator, dataChitiet } = this.props;
   // alert(JSON.stringify(dataChitiet.content))
    let a = (parseInt(data.type))
    let typeGift = ""
    try {
      let vt = AppValue.ListTypeGift.findIndex(re => re.id == a);
      if (vt != -1) {
        typeGift = AppValue.ListTypeGift[vt].label
      }
      //alert(JSON.stringify(AppValue.ListTypeGift[0]) )

    } catch (e) {
      console.log(e)
    }

    const { tab } = this.state
    //tránh split null out app
    const htmlContent = dataChitiet.content ? dataChitiet.content.split("&lt;").join("<").split("&gt;").join(">") : "";

    return (
      <View style={styles.scrollViewContent}>
        <View style={{width:'100%',height: 150,}}>
          <View style={styles.contentTop}>
            <View style={styles.contentWrap}>
              <TextCmp style={styles.textTittle}>{data.title.replace(/\[(.*?Urbox.*?)\]/gi, "").replace("&amp;", "&").trim()}</TextCmp>
              <View style={styles.line}></View>
               <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',padding:20}}>               
               <View style={styles.IconWWrap}>
                  <Icon name="barcode"  color={Colors.textOPVGreen} size={20}/>
                 <View style={{alignItems:'center'}}>
                 <TextCmp style={[styles.IconName, {color: Colors.textOPVGray, fontWeight:'0'}]}> {'Mã'}</TextCmp> 
                  <TextCmp style={styles.IconName}> {data.id}</TextCmp> 
                  </View>       
                </View>
                <View style={styles.IconWWrap}>
                  <Icon name="star"  color={'gold'} size={20}/>
                  <View style={{alignItems:'center'}}>
                  <TextCmp style={[styles.IconName, {color: Colors.textOPVGray, fontWeight:'0'}]}> {'Lượt đổi'}</TextCmp> 
                  <TextCmp style={styles.IconName}> {data.quantity}</TextCmp> 
                  </View>       
                </View>
                <View style={styles.IconWWrap}>
                  <Icon name="ribbon"  color={Colors.textOPVBlue}  size={20}/>
                  <View style={{alignItems:'center'}}>
                  <TextCmp style={[styles.IconName, {color: Colors.textOPVGray, fontWeight:'0'}]}> {'Hình thức'}</TextCmp> 
                  <TextCmp style={styles.IconName}> {typeGift}</TextCmp> 
                  </View>       
                </View>
                <View style={styles.IconWWrap}>
                  <Icon name="shape-plus" color={Colors.textOPVRed}  size={20}/>
                  <View style={{alignItems:'center'}}>
                  <TextCmp style={[styles.IconName,  {color: Colors.textOPVGray, fontWeight:'0'}]}> {'Tình trạng'}</TextCmp> 
                  <TextCmp style={styles.IconName}> {data.stock > 0 ? 'còn hàng' : 'hết hàng'}</TextCmp> 
                  </View>       
                </View>
               </View>

             
            </View>
        </View>
        </View>

          <View style={styles.viewThongtin}>
            <View style={styles.tabView}>

              <TouchableOpacity onPress={() => this.settab(0)} style={[styles.btntap, ]}><TextCmp style={[{ textAlign: 'center', fontWeight: 'bold', fontSize: RFValue(12) }, { color: tab == 0 ? Colors.text0PV : Colors.textOPVGray, }]}>Điều kiện sử dụng</TextCmp></TouchableOpacity>
              <TouchableOpacity onPress={() => this.settab(1)} style={[styles.btntap, ]}><TextCmp style={[{ textAlign: 'center', fontWeight: 'bold', fontSize: RFValue(12) },{ color: tab == 1 ? Colors.text0PV : Colors.textOPVGray, }]}>Địa chỉ cửa hàng</TextCmp></TouchableOpacity>
              <TouchableOpacity onPress={() => this.settab(2)} style={[styles.btntap, ]}><TextCmp style={[{ textAlign: 'center', fontWeight: 'bold', fontSize: RFValue(12)},{ color: tab == 2 ? Colors.text0PV : Colors.textOPVGray, }]}>Thông tin </TextCmp></TouchableOpacity>
            </View>

            {tab == 1 && dataChitiet && dataChitiet.office ? <View>
              {dataChitiet.office.map((d, index) => {
                return <View style={styles.rowkm}>
                  <View style={{ width: 50, height: 50, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}><IconAntDesign size={16} color={Colors.HeaderColor} name='find'></IconAntDesign></View>
                  {d.address && <TextCmp style={{ paddingLeft: 10, fontSize: 12, width: '80%' }} key={index + ''}> {d.address}</TextCmp>}
                </View>
              })}
            </View> : <></>}

            {tab == 0 && <View  >
              {dataChitiet.note&&<RenderHtml style={{ paddingLeft: 10, fontSize: 12, color: Colors.BackgrondLightOPVGreen }} source={{html:`${dataChitiet.note.split("&lt;").join("<").split("&gt;").join("/>") }`  }}  ></RenderHtml>}
              </View>
            }
            {tab == 2 && <View >
              <RenderHtml style={{ paddingLeft: 10, fontSize: 12, }}  source={{html:htmlContent   }}   ></RenderHtml>
            </View>}
          </View>




          {/* <View style={styles.viewThongtin}>
            <TextCmp style={{}}>Thông tin thương hiệu </TextCmp>
            <TextCmp style={{ paddingLeft: 10, fontSize: 12, }}>{data.content}</TextCmp>
          </View> */}


          {/* <TextCmp style={{ paddingLeft: 10, fontSize: 16, }}>Đơn giá {formatter.format(data.price)} vnđ </TextCmp>

          <View style={styles.rownhapsl}>
            <TextCmp style={{ padding: 10, paddingLeft: 10, }}>số lượng: </TextCmp>
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



          {/* <TextCmp style={{ marginBottom: 10, paddingLeft: 10, fontSize: 16, color: 'green' }}>Giá trị: {formatter.format(data.price * soluong)} vnđ </TextCmp> */}
      



      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtrowinfo: {
    width: width / 2 - 10,
    marginRight: 10,
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 13,
  },
  rowinfo: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.backgroundL1,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT + 50,
    //height: height,

    marginBottom: 150,
  },
  contentTop: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    flex: 1,
    width: '100%',
  },
  contentWrap: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'column',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  IconWWrap: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  IconName: {
    color: Colors.text0PV,
    fontSize: RFValue(10),
    fontWeight: 'bold',
  },
  btntap: {
    width: '32%',
    padding: 15,
    padding: 7,
    justifyContent: 'center',
    height: 55,
    color: Colors.text0PV,
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  ViewLine: {
    height: 45,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E65E20',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  textTittle: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    margin: 10,
    padding:10,
    color: Colors.text0PV,
    alignSelf: 'center',
  },
  rownhapsl: {flexDirection: 'row', alignItems: 'center'},
  input: {
    borderColor: Colors.backgroundL1,
    borderWidth: 1,
    minWidth: 55,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
  },
  line: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BackgrondLightOPV5,
    marginHorizontal: 30,
  },
  rowkm: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 2,
    // borderColor: Colors.HeaderColor,
    // borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.00,

    // elevation: 1,
    marginBottom: 4,
  },
  textrow: {width: width / 1 - 10, marginLeft: 10, textAlign: 'left'},
  viewThongtin: {
    minHeight: 120,
    margin: 10,

    backgroundColor: Colors.grayMain,
    padding: 10,
    borderRadius: 10,

    //height:500
  },
});