/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2019-01-24 15:15:48
 * @modify date 2019-01-24 15:15:48
 * @desc [description]
 */


import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { ErrorMessage, LoadingView, TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';
import { CommonIcons, ImgOPV, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
import { AppNavigation } from '../../../app-navigation';
import { IDs } from '../..';
import { IndicatorViewPager, PagerTitleIndicator } from '@shankarmorwal/rn-viewpager';
import { cart_getlist_urbox, getListDonQuTangOPV } from './Actions'
import { connect, } from 'react-redux';
import formatter from '../fm';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window')
class ViewAllKm extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      visible: true,
    },
    topBar: {
      visible: true,
      drawBehind: false,
      background: {
        color: Colors.HeaderColor,
      },
      leftButtons: [
        {
          id: 'km_BACK',
          icon: CommonIcons.back2,
        },
      ],
      title: {
        text: 'Quà của tôi',
      },
    },
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      ListTL: [],
      ListCTTB: [],
      tab: 0,
      cart_list_urbox: [],
      cart_list_urbox_conhang: [],
      cart_list_urbox_conhang_chuadung: [],
      loading: false,
      valueLoading: 1,
      listquaOPV:[],
      

    }
  }

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
  }
  componentDidMount() {
    this._getListDonQuTangOPV()
    this.cart_getlist_urbox();

  }
  cart_getlist_urbox() {
    // public string cart_getlist_urbox(string site_user_id, string startDate, string endDate)
    const payload = { site_user_id: this.props.userID, startDate: '01/01/2024', endDate: '01/11/2024' };
    this.props.dispatch(cart_getlist_urbox(payload)).then((data) => {
      this.setState({ loading: false })
      if (data&&data.done) {
        let cart_list_urbox_conhang = data.data.filter(x => x.detail[0].usage_status == 1)
        let cart_list_urbox_conhang_chuadung = data.data.filter(x => x.detail[0].usage_status != 1)
        this.setState({ cart_list_urbox: data.data, cart_list_urbox_conhang, cart_list_urbox_conhang_chuadung, })



      }
    });
  }
  _getListDonQuTangOPV() {
    // public string cart_getlist_urbox(string site_user_id, string startDate, string endDate)
    this.setState({ loading: true, })
    const payload = { khId: this.props.userID, startDate: '01/01/2024', endDate: '01/11/2024' };
    this.props.dispatch(getListDonQuTangOPV(payload)).then((data) => {
      this.setState({ valueLoading :100})
      setTimeout(() => {
        this.setState({ loading :false})
      }, 500);
      if (data) {
        this.setState({ listquaOPV: JSON.parse(data[0].MSG) })
      }
    });
  }
  // shouldComponentUpdate(listkm) {
  //   return listkm != this.props.listkm;
  // }


  onSelect(item) {
    AppNavigation.showModal({
      name: IDs.ViewDetailGift,
      passProps: {
        item: item,
        dispatch: this.props.dispatch,
      },
      options: {

        statusBar: {
          backgroundColor: Colors.statusBar,
          visible: true,

        },
        topBar: {
          visible: false,
          _height: 0,
          drawBehind: true,
          title: {
            text: 'Xem chi tiết ',
          },
          background: {
            color: Colors.HeaderColor,
          },

          rightButtons: [
            {
              id: 'btntop',
              icon: CommonIcons.closeWhite,
            },
          ],
        },
      },
    });
  }


  renderItem = (item, index) => {
    //console.log('itemx', item);
    if (item)
      return (

        <TouchableOpacity
          onPress={() => this.onSelect(item)}
        >
            <View style={[styles.title, styles.title2,{backgroundColor:index%2==0? Colors.BackgroundLightWhite:'white',}]}>
              <View style={{ flexDirection: 'row', 
              borderRadius:5,
              width: '30%',justifyContent:'center' ,alignItems:'center' , 
              backgroundColor: Colors.Analogus,  }} >
              <Image style={styles.img} resizeMode="cover"  source={{ uri: item.detail[0].image, }}></Image>
           </View>

            <View style={{ width: '70%', paddingHorizontal:20, }}>
      
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
                <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold, {fontSize:RFValue(13), fontWeight:'bold', color:Colors.textOPVGreen}]}>{item.id}</TextCmp> </TextCmp>
                {/* <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold,{ color:Colors.textOPVRed,  fontWeight:'bold' }]}>{item.detail[0].usage_status}</TextCmp> </TextCmp> */}
               

                </View>
                <View style={{width:'100%', borderRadius:5, height:1, backgroundColor:Colors.grayMain , marginVertical: 2,}}></View>
                <TextCmp style={styles.txtkm}>Ngày tạo: <TextCmp style={[styles.textbold, {fontSize: RFValue(12)}]}>{item.created}</TextCmp>  </TextCmp>
                <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold, {fontSize: RFValue(12)}]}>{item.detail[0].gift_title} </TextCmp>  </TextCmp>
                <TextCmp style={[styles.textbold, { color: Colors.textOPVGray, fontSize:RFValue(12)}]}>{item.detail[0].brandTitle}</TextCmp> 
                <View style={{width:'100%',  borderRadius:5,height:1, backgroundColor:Colors.grayMain , marginVertical: 2,}}></View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
                 
                <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold, {color:Colors.textOPVRed, fontWeight:'bold',}]}>{formatter.format(item.detail[0].price)} VNĐ </TextCmp> <TextCmp style={{color:Colors.textOPVGreen, fontWeight:'bold', fontSize:RFValue(12)}}>x{item.item_quantity} </TextCmp></TextCmp>
                 
                </View>
                {/* <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold, {color:Colors.textOPVCopper3,}]}>{formatter.format(item.detail[0].price)} VNĐ </TextCmp> <TextCmp style={{color:Colors.textOPVRed}}> x {item.item_quantity}</TextCmp></TextCmp> */}
                
              {/* <TextCmp style={styles.txtkm}> {item.detail[0].using_time?item.detail[0].using_time: 'Vô hạn'}</TextCmp> */}
               
           

            </View>


            {/* <View style={{ width: '5%' }} ><TextCmp style={[styles.txtkm, { color: 'red' }]}>Xem</TextCmp></View> */}
          </View>
        </TouchableOpacity>
      );
  }
  renderItem2= (item, index) => {
    if (item)
      return (

        <TouchableOpacity
          // onPress={() => this.onSelect(item)}
        >


          <View style={[styles.title, styles.title2,{backgroundColor:index%2==0? Colors.BackgroundLightWhite:'white',}]}>
              <View style={{ flexDirection: 'row', 
              borderRadius:5,
              width: '30%',justifyContent:'center' ,alignItems:'center' , 
                }} >
               <View style={{width: 60, height: 60, borderRadius:25, 
                  backgroundColor: Colors.BackgroundLightBlue,
                 justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={ImgOPV.giftB}></Image>
               </View>
      
           </View>


            <View style={{ width: '70%' }}>
              <View>
              <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold, {fontSize:RFValue(13), fontWeight:'bold', color:Colors.textOPVGreen}]}>{item.id}</TextCmp> </TextCmp>
              <View style={{width:'100%', height:1, backgroundColor:Colors.grayMain , marginVertical: 2, borderRadius:5}}></View>
                <TextCmp style={styles.txtkm}>Ngày tạo: <TextCmp style={styles.textbold}>{item.NGAYTAO}</TextCmp>  </TextCmp>
                <TextCmp style={styles.txtkm}>Điểm: <TextCmp style={[styles.textbold,]}>{item.TONGDIEM}  </TextCmp></TextCmp>
                <View style={{width:'100%', height:1, backgroundColor:Colors.grayMain , marginVertical: 2, borderRadius:5}}></View>
                <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold,{ color: Colors.textOPVRed, fontWeight:'bold' }]}>{item.TRANGTHAI==1?"Đã chốt":(item.TRANGTHAI==2?'Đã hủy':'Chưa chốt')}</TextCmp> </TextCmp>
                
              </View>
            </View>


            {/* <View style={{ width: '5%' }} ><TextCmp style={[styles.txtkm, { color: 'red' }]}>Xem</TextCmp></View> */}
          </View>
        </TouchableOpacity>
      );
  }
  settab(t) {
    this.setState({ tab: t })

    
  }
   FooterComponent = ()=>(
    <View style={{width, height:100}}></View>
  )
  render() {
    const { listkm } = this.props;
    const { cart_list_urbox, tab, cart_list_urbox_conhang, cart_list_urbox_conhang_chuadung,listquaOPV } = this.state;
    let tab1cart_list_urbox = cart_list_urbox.filter(x => (x.detail[0].usage_status == 'Chưa sử dụng'&&x.detail[0].code_display_type!=3))
    if (tab == 1) tab1cart_list_urbox = tab1cart_list_urbox.filter(x => x.detail[0].usage_status != 'Chưa sử dụng')
    //tab 2
    let tab2cart_list_urbox = cart_list_urbox.filter(x => (x.detail[0].usage_status == 'Chưa sử dụng'&&x.detail[0].code_display_type==3))
    if (tab == 3) tab2cart_list_urbox = tab2cart_list_urbox.filter(x => x.detail[0].usage_status != 'Chưa sử dụng')
    //tab 3
    //1 đã chốt //  2 hủy 0 chưa chốt
    let listquaOPVx = listquaOPV.filter(x=>x.TRANGTHAI == '1' )
    if (tab == 5)  listquaOPVx =  listquaOPV.filter(x=>x.TRANGTHAI != '1' )
    console.log('xyyx', listquaOPVx);
    const _renderTitleIndicator = () => {
      return (
        <PagerTitleIndicator selectedBorderStyle={{ backgroundColor: Colors.textOPVGreen, 
        height:4, borderRadius:5 , fontSize:RFValue(12), }} selectedItemTextStyle={{ color: Colors.textOPVGreen, fontSize:RFValue(12),  fontWeight: 'bold' }} itemTextStyle={{ color: Colors.textOPVGray, fontSize: RFValue(12),  }} 
        style={{   
        position:'absolute',      
        backgroundColor: Colors.BackgrondLightOPV5,
        height: 50,
        width,
        borderBottomWidth: 0.5,
        borderColor: Colors.HeaderColor,
        }}   titles={['QUÀ E-VOUCHER', 'QUÀ HIỆN VẬT','QUÀ OPV']} /> );
    }

    return (
      <View style={styles.content}>
        <IndicatorViewPager
          style={{ flex: 1, paddingTop: 20, backgroundColor: Colors.BackgrondLightOPV5 }}
          indicator={_renderTitleIndicator()}
          onPageSelected={e => {
            //console.log("Current page index", e.position)
            if (e.position == 0) {
              this.setState({ tab: 0 })
            } else if(e.position == 1){
              this.setState({ tab: 2 })
            } else {
              this.setState({ tab: 4 })
            }
          }}
        >
          <View style={{ flex: 1,    }}>
          <View style={styles.WrapContent}>

              <View style={[styles.title, styles.title2, { backgroundColor: 'white', padding:5 , margin:5 },]}>
              <TouchableOpacity onPress={() => this.settab(0)} style={[styles.btntap, ]}><TextCmp style={[{ color: tab == 0 ? Colors.textOPVGray2 : Colors.textOPVGray, fontWeight:'bold',  fontSize:RFValue(13) },{ textAlign: 'center',  }]}>Chưa sử dụng</TextCmp></TouchableOpacity>
            
              <TouchableOpacity onPress={() => this.settab(1)} style={[styles.btntap,]}><TextCmp style={[{ color: tab == 1 ? Colors.textOPVGray2: Colors.textOPVGray,  fontWeight:'bold',  fontSize:RFValue(13) },{ textAlign: 'center', }]}>Đã sử dụng/hết hạn</TextCmp></TouchableOpacity>

              </View>
              {this.state.loading ? ( 
              <LoadingView isVisible={this.state.loading} valueLoading={this.state.valueLoading}/>
            ) :
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={tab1cart_list_urbox}
              ListFooterComponent={this.FooterComponent()}
              initialNumToRender={10}
              keyExtractor={(item) => item.id + ''}
              renderItem={({ item, index, }) => this.renderItem(item, index,)}>
            </FlatList>
            }
         </View>
          </View>
          <View style={{ flex: 1, }}>
          <View style={styles.WrapContent}>
             <View style={[styles.title, styles.title2, { backgroundColor: 'white', padding:5 , margin:5 },]}>
              <TouchableOpacity onPress={() => this.settab(2)} style={[styles.btntap, ]}><TextCmp style={[{ color: tab == 2 ? Colors.textOPVGray2 : Colors.textOPVGray, fontWeight:'bold',  fontSize:RFValue(13) },{ textAlign: 'center',  }]}>Chưa sử dụng</TextCmp></TouchableOpacity>
             
              <TouchableOpacity onPress={() => this.settab(3)} style={[styles.btntap,]}><TextCmp style={[{ color: tab == 3? Colors.textOPVGray2: Colors.textOPVGray,  fontWeight:'bold',  fontSize:RFValue(13) },{ textAlign: 'center', }]}>Đã sử dụng/hết hạn</TextCmp></TouchableOpacity>

          
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={tab2cart_list_urbox}
              initialNumToRender={10}
              keyExtractor={(item) => item.id + ''}
              ListFooterComponent={this.FooterComponent()}
              renderItem={({ item, index, }) => this.renderItem(item, index)}>
              ListEmptyComponent={<ErrorMessage message={'Không có dữ liệu lịch sử điểm'}/>}  
            </FlatList>
            </View>
          </View>
          <View style={{ flex: 1, }}>
          <View style={styles.WrapContent}>

              <View style={[styles.title, styles.title2, { backgroundColor: 'white', padding:5 , margin:5 },]}>
              <TouchableOpacity onPress={() => this.settab(4)} style={[styles.btntap, ]}><TextCmp style={[{ color: tab == 4 ? Colors.textOPVGray2 : Colors.textOPVGray, fontWeight:'bold',  fontSize:RFValue(13) },{ textAlign: 'center',  }]}>Đã chốt</TextCmp></TouchableOpacity>
            
              <TouchableOpacity onPress={() => this.settab(5)} style={[styles.btntap,]}><TextCmp style={[{ color: tab == 5 ? Colors.textOPVGray2: Colors.textOPVGray,  fontWeight:'bold',  fontSize:RFValue(13) },{ textAlign: 'center', }]}>Chưa chốt/hủy</TextCmp></TouchableOpacity>
              </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={listquaOPVx}
              initialNumToRender={10}
              keyExtractor={(item) => item.id + ''}
              ListFooterComponent={this.FooterComponent()}
              ListEmptyComponent={<ErrorMessage message={'Không có dữ liệu lịch sử điểm'}/>} 
              renderItem={({ item, index, }) => this.renderItem2(item, index)}>
            </FlatList>
            </View>
  
          </View>
          {/* <View style={{ flex: 1, }}>
            <View style={[styles.title, { backgroundColor: Colors.backgroundL1, margin: 5, marginTop: 25 },]}>

              <View style={{ width: '10%' }}><TextCmp >STT</TextCmp></View>
              <View style={{ width: '50%' }}><TextCmp >CT TB</TextCmp></View>
              <View style={{ width: '30%' }} ><TextCmp >Thời gian</TextCmp></View>
              <View style={{ width: '15%' }} ><TextCmp >CT</TextCmp></View>
            </View>
            <FlatList
              data={ListCTTB}
              initialNumToRender={10}
              keyExtractor={(item) => item.PK_SEQ + ''}
              renderItem={({ item, index, }) => this.renderItem3(item, index)}>
            </FlatList>
          </View> */}


        </IndicatorViewPager>



      </View>
    );

  }
}
export default connect(
  (state) => ({
    testData: state.test.testData,
    userID: state.login.userID,
  }),
  (dispatch) => ({ dispatch, }),
)(ViewAllKm);
const styles = StyleSheet.create({
  content: {
    //marginTop: 60,
    flex: 1,
    backgroundColor:  Colors.BackgrondLightOPV5,
  },

  WrapContent: {
    backgroundColor: Colors.BackgrondLightOPV5,
    marginTop: 30,
    margin:5,
    padding:5,
    borderRadius: 10,
  },
  textbold: { fontSize: RFValue(12) , marginVertical: 2,},
  title: {
    flexDirection: 'row',
    justifyContent: 'center',

    //borderBottomWidth: 0.5,
    // borderColor: 'gray',
    marginVertical: 4,
    alignItems: 'center',
   
  },
  title2: { minHeight: 70, marginHorizontal: 5, alignItems: 'center', padding:10, borderRadius: 10 },
  
  titleTop:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 45, marginHorizontal: 5, alignItems: 'center', 
    marginHorizontal:14 ,borderRadius:4,
  },

  item: {
    width: '40%', margin:2
  },
  txtkm: {fontSize: RFValue(12) },
  btntap: {
    width: '40%',  padding: 15,
    padding: 7, justifyContent: 'center', fontWeight:'bold',

    
  }
  ,
   img: { width: 100, height: 100 }
});