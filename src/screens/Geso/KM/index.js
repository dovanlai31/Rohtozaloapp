/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2019-01-24 15:15:48
 * @modify date 2019-01-24 15:15:48
 * @desc [description]
 */


import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';
import { CommonIcons, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
import { AppNavigation } from '../../../app-navigation';
import { IDs } from '../..';
import { IndicatorViewPager, PagerTitleIndicator } from '@shankarmorwal/rn-viewpager';
import { _getLsitTL, getCTTBay } from './Actions'
import { connect, } from 'react-redux';
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
        text: 'Tất Cả Chương Trình',
       color: 'white'
      },
    },
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      ListTL: [],
      ListCTTB: []
    }
  }

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
  }
  componentDidMount() {
    this.getLsitTL();
    this.getListTB()
  }
  getLsitTL() {
    const payload = { userId: this.props.userID, };
    this.props.dispatch(_getLsitTL(payload)).then((data) => {
      if (data) {
        this.setState({ ListTL: JSON.parse(data[0].MSG) })
      }
    });
  }
  getListTB() {

    const payload = { khId: this.props.userID, };
    this.props.dispatch(getCTTBay(payload)).then((data) => {
      if (data) {
        this.setState({ ListCTTB: data })
      }
    });
  }

  shouldComponentUpdate(listkm) {
    return listkm != this.props.listkm;
  }
  // km
  renderItem = (item, index) => {
    if (item)
    console.log("CtkmList ",item)
      return (
        <TouchableOpacity onPress={() => this.onSelect(item)}  style={[styles.title, styles.title2, { backgroundColor: index % 2 == 0 ? Colors.BackgroundLightWhite : 'white', }]}>

          <View style={{ flexDirection: 'row', width: '30%',justifyContent:'center' ,alignItems:'center' }} >
            <Image style={styles.img} resizeMode="cover" source={{ uri: item.HinhAnh, }}></Image>
          </View>
          <View style={{ width: '70%' }}>
            <View>
              <TextCmp style={styles.txtkm}><TextCmp style={styles.textTitle}>{item.scheme}</TextCmp> </TextCmp>
              <TextCmp style={styles.txtkm}>Diễn giải: <TextCmp style={styles.textbold}>{item.diengiai}</TextCmp>  </TextCmp>
              <TextCmp style={styles.txtkm}>Từ:<TextCmp style={[styles.textbold, ]}> {item.TUNGAY}</TextCmp> </TextCmp>
              <TextCmp style={styles.txtkm}>Đến: <TextCmp style={styles.textbold}>{item.DENNGAY}  </TextCmp></TextCmp>
            </View>
          </View>


          {/* <View style={{ width: '5%' }} ><TextCmp style={[styles.txtkm, { color: 'red' }]}>Xem</TextCmp></View> */}
        </TouchableOpacity>
        // <View>
        //   <View style={[styles.title, styles.title2,]}>
        //     <View style={{ flexDirection: 'row', width: '10%' }} >
        //       <TextCmp style={styles.txtkm}>  {index + 1}</TextCmp>
        //     </View>
        //     <View style={{ width: '50%' }}>
        //       <View>
        //         <TextCmp style={styles.txtkm}>{item.diengiai}</TextCmp>
        //       </View>
        //       {item.filename && item.filename.length > 4 && item.filename.indexOf('.pdf') > 5 && <Icon name='pdffile1'></Icon>}
        //       {item.filename && item.filename.length > 4 && item.filename.indexOf('.pdf') == -1 && <Icon name='jpgfile1'></Icon>}
        //     </View>
        //     <View style={{ width: '30%' }} ><TextCmp style={styles.txtkm}>{item.TUNGAY} - {item.DENNGAY}</TextCmp></View>
        //     <TouchableOpacity onPress={() => this.onSelect(item)} style={{ width: '15%' }} ><TextCmp style={[styles.txtkm, { color: 'red' }]}>>>></TextCmp></TouchableOpacity>
        //   </View>
        // </View>
      );
  }

  onSelect(item) {
    AppNavigation.showModal({
      name: IDs.ViewDetailPromotion,
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
            text: 'Xem chi tiết khuyết mãi',
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
  onSelectTL(item) {
    AppNavigation.showModal({
      name: IDs.ViewDetailTL,
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
            text: 'Xem chi tiết tích lũy',
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
  onSelectTB(item) {
    AppNavigation.showModal({
      name: IDs.ViewDetailTB,
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
          drawBehind: false,
          title: {
            text: 'Xem chi tiết trưng bày',
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
  renderItem2 = (item, index) => {
    if (item)
      return (

        <TouchableOpacity
        onPress={() => this.onSelectTL(item)}
        style={[
          styles.title,
          styles.title2,
          {backgroundColor: index % 2 == 0 ? Colors.BackgroundLightWhite : 'white'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Icon size={18} color={Colors.HeaderColor} name='tag'></Icon> */}
          <TextCmp style={[styles.txtkm, {fontWeight:'bold', color: Colors.textOPVGray2}]}> {index + 1}</TextCmp>
        </View>
        <View style={{width: '50%',
         justifyContent: 'center',
            alignItems: 'flex-start',}}>
          <View>
            <TextCmp
              style={[
                styles.txtkm,
                {fontWeight: 'bold', color: Colors.textOPVGray2},
              ]}>
              {item.DIENGIAI}
            </TextCmp>
          </View>
        </View>

        <View style={{width: '30%'}}>
          <TextCmp style={styles.txtkm}>
            {item.TUNGAY} - {item.DENNGAY}
          </TextCmp>
        </View>
        <View style={{width: '20%'}}>
      
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              backgroundColor: Colors.BackgroundLightBlue,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="arrowright" size={15} color={Colors.textOPVBlue} />
          </View>
        </View>
      </TouchableOpacity>

      );
  }
  renderItem3 = (item, index) => {
    if (item)
      return (
        <TouchableOpacity
          onPress={() => this.onSelectTB(item)}
          style={[
            styles.title,
            styles.title2,
            {backgroundColor: index % 2 == 0 ? Colors.BackgroundLightWhite : 'white'},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Icon size={18} color={Colors.HeaderColor} name='tag'></Icon> */}
            <TextCmp style={[styles.txtkm, {fontWeight:'bold', color: Colors.textOPVGray2}]}> {index + 1}</TextCmp>
          </View>
          <View style={{width: '50%',
           justifyContent: 'center',
              alignItems: 'flex-start',}}>
            <View>
              <TextCmp
                style={[
                  styles.txtkm,
                  {fontWeight: 'bold', color: Colors.textOPVGray2},
                ]}>
                {item.DIENGIAI}
              </TextCmp>
            </View>
          </View>

          <View style={{width: '30%'}}>
            <TextCmp style={styles.txtkm}>
              {item.TUNGAY} - {item.DENNGAY}
            </TextCmp>
          </View>
          <View style={{width: '20%'}}>
        
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                backgroundColor: Colors.BackgroundLightBlue,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="arrowright" size={15} color={Colors.textOPVGreen} />
            </View>
          </View>
        </TouchableOpacity>
      );
  }
  render() {
    const { listkm, } = this.props;
    const { ListTL, ListCTTB } = this.state;
    //alert(JSON.stringify(listkm))
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
        }} titles={['CT Khuyến Mãi', 'CT Tích Lũy', 'CT Trưng Bày']} /> );
    }
    return (
      <View style={styles.content}>
        <IndicatorViewPager
          style={{ flex: 1, paddingTop: 0, backgroundColor: Colors.BackgrondLightOPV5 , }}
          indicator={_renderTitleIndicator()}
        >
          <View style={{ flex: 1,  }}>
            <View style={styles.WrapContent}>

         
            {/* <View style={[styles.title, { backgroundColor: Colors.BackgrondLightOPV5, padding:5 , margin:5 },]}>

               <View style={{ width: '10%' }}><TextCmp >STT</TextCmp></View>
              <View style={{ width: '50%' }}><TextCmp >CT Khuyến Mãi</TextCmp></View>
              <View style={{ width: '30%' }} ><TextCmp >Thời gian</TextCmp></View>
              <View style={{ width: '15%' }} ><TextCmp >CT</TextCmp></View> 
            </View> */}
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={listkm}
              initialNumToRender={10}
              keyExtractor={(item) => item.pk_seq + ''}
              renderItem={({ item, index, }) => this.renderItem(item, index)}>
            </FlatList>
            </View>
          </View>
          <View style={{ flex: 1, }}>
          <View style={styles.WrapContent}>


            <View style={[styles.title, styles.title2, { backgroundColor: 'white', padding:10 , margin:10 },]}>
               <View   style={{
              flexDirection: 'row',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
              <View style={{ width: '50%', }}><TextCmp style={styles.titleTL} >CT Tích lũy</TextCmp></View>
              <View style={{ width: '30%', }} ><TextCmp style={styles.titleTL} >Thời gian</TextCmp></View>
              <View style={{ width: '20%' ,}} ><TextCmp  style={styles.titleTL}>CT</TextCmp></View> 
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={ListTL}
              initialNumToRender={10}
              keyExtractor={(item) => item.pk_seq + ''}
              renderItem={({ item, index, }) => this.renderItem2(item, index)}>
            </FlatList>
            </View> 
          </View>
          <View style={{ flex: 1, }}>
          <View style={styles.WrapContent}>
              <View style={[styles.title, styles.title2, { backgroundColor: 'white', padding:10 , margin:10 },]}>
               <View   style={{
              flexDirection: 'row',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
              <View style={{ width: '50%',  }}><TextCmp style={styles.titleTB} >CT Trưng bày</TextCmp></View>
              <View style={{ width: '30%', }} ><TextCmp style={styles.titleTB} >Thời gian</TextCmp></View>
              <View style={{ width: '20%' , }} ><TextCmp  style={styles.titleTB}>CT</TextCmp></View> 
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={ListCTTB}
              initialNumToRender={10}
              keyExtractor={(item) => item.PK_SEQ + ''}
              renderItem={({ item, index, }) => this.renderItem3(item, index)}>
            
            </FlatList>
            </View> 
          </View>


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
    backgroundColor:Colors.BackgroundLightBlue

   
  },
  textTitle: {
    fontSize: RFValue(12),
    fontWeight:'bold',
    color: Colors.textOPVGray2,
    textTransform:'uppercase'

  },
  textbold: {
    fontSize: RFValue(12),
  },
  WrapContent: {
    backgroundColor:Colors.BackgrondLightOPV5,
    marginTop: 55,
    margin:5,
    padding:5,
    borderRadius: 10,
  },
  img:{height:77, width:77},
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    
    //borderBottomWidth: 0.5,
    // borderColor: 'gray',
    marginVertical: 4,
    alignItems: 'center',
   
  },
  title2: { minHeight: 70, marginHorizontal: 5, alignItems: 'center', padding:10, borderRadius: 10 },
  titleTB: {
    fontSize:RFValue(12),
    fontWeight:'bold',
    color:Colors.textOPVGreen
  },
  titleTL: {
    fontSize:RFValue(12),
    fontWeight:'bold',
    color:Colors.textOPVGreen
  },
  item: {
    width: '40%',
  },
  txtkm: { fontSize: RFValue(12), marginVertical: 3, }
});