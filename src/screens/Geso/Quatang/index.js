/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2019-01-24 15:15:48
 * @modify date 2019-01-24 15:15:48
 * @desc [description]
 */


import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'

import { Colors, } from '../../../theme';
import { CommonIcons, ImgBanner, ImgICon, ImgOPV } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
import { AppNavigation } from '../../../app-navigation';

import { getLitstDanhmucUrbox, listsGiftUrbox, getDiemTlKh, getDiaChiKH, PanelListQT, getLitstDanhmucUrbox_cap2, listsDanhmucUrbox_v2 } from './actions'
import { connect, } from 'react-redux';
import Viewhead from './view/viewhead';
import ViewDanhmucUrbox from './view/viewDanhmucUrbox';
import ViewListGif from './view/viewListGif';
import { IDs } from '../..';
import { Animated } from 'react-native';
import RowUserGift from './view/RowUserGift';
import { ErrorMessage, TextCmp } from '../../../common-components';

import { Input } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import formatter from '../fm';
import { Alert } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window')
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const NAVBAR_HEIGHT = Platform.OS == 'android' ? 105 : 105;
const STATUS_BAR_HEIGHT = Platform.OS == 'android' ? 0 : 0;

class Quatang extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      visible: true,

    },
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      LitstDanhmucUrbox: [],
      listsGiftUrbox: [],
      per_page: 40,
      page_no: 0,
      loadding: true,
      dataSectionList: [],
      HeaderModalVisible: false,
      ErrorMessage: '',
      BannerList: [],
      LitstDanhmucUrboxAll:[],
      selectedDanhMuc: "",
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1,],
            outputRange: [0, 1,],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      ),
      showScrollToBottomIcon: false,
    }
    this.scrollViewRef = React.createRef();
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
  }
  
  componentDidMount() {
    this._getBanner()
    this.getLitstDanhmucUrbox();
    this.getLitstDanhmucUrboxdongbod();
    this.state.scrollAnim.addListener(({ value, }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value, }) => {
      this._offsetValue = value;
    }); 
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  componentDidAppear() {
    const payload = { khId: this.props.userID, };
    this.props.dispatch(getDiemTlKh(payload)).then((data) => {
      if (data) {

        this.props.dispatch({ type: 'setDiemTLKH', DiemTLKH: data, });
      }
    });
    this._getDiaChiKH()
    //this.props.dispatch({ type: 'tinhtien', });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  // componentDidUpdate(prevProps, prevState,  snapshot) {
  //   if(Number(prevState.page_no) != Number(this.state.page_no)) {
  //     console.log("prev state page no: ", prevState.page_no, "this state page no: ", this.state.page_no)
  //     // this.listsGiftUrbox(null, true)
  //   }
  // }

  handleScrollEnd = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 100;

    console.log("contentSize: ", contentSize)
    console.log("contentOffset: ", contentOffset)

    if(Number(contentSize.height) - Number(paddingToBottom) - Number(contentOffset.y) < 1000) {
      console.log("currentPage: ",this.state.page_no)
      this.listsGiftUrbox(null, true, this.state.page_no + 1)
      this.setState({page_no: this.state.page_no + 1})
    }

    this.setState({ showScrollToBottomIcon: layoutMeasurement.height + (contentOffset.y * 5) >= contentSize.height - paddingToBottom });
  };

  _onScrollEndDrag = (event) => {
    this.handleScrollEnd(event)

    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _getBanner() {
    const payload = {
      userId: this.props.userID,
    };
    this.props.dispatch(
      PanelListQT(payload)
    ).then((data) => {
      if (data) {
        this.setState({ BannerList: data, });
      }

      //console.log("this.state._getBanner " + this.state.BannerList)
    });


  }

  _getDiaChiKH = () => {

    const params = {
      khId: this.props.userID,
    };
    this.props.dispatch(getDiaChiKH(params)).then((res) => {
      console.log('getDiaChiKH', res[0])
      if (res) {
        const { tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, quan_pk, xa_pk, diachihd } = res[0]
        this.setState({ tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, quan_pk, xa_pk, diachihd })
        if (tentinh == 0 || idquan == 0 || idxa == 0 || diachihd.length == 0) {

          this.setState({ ErrorMessage: 'Thông tin địa chỉ của bạn còn thiếu, vui lòng cập nhật địa chỉ để hệ thống gửi quà đúng theo địa chỉ khách hàng đăng ký' })

        } else {
          this.setState({ ErrorMessage: '' })
        }


      }

    });
  }

  getLitstDanhmucUrbox() {
    const payload = { userId: this.props.userID, };
    this.props.dispatch(getLitstDanhmucUrbox(payload)).then((data) => {
      if (data) {
       // alert(JSON.stringify(data))
        //{"id": "5", 
        // "images": "https://632466.sgp1.digitaloceanspaces.com/_img_server/2019/05/14/640/1557805297_5cda38f1a4242.png", 
        // "title": "Sức khoẻ - Làm đẹp"}
        this.setState({ LitstDanhmucUrbox: data })
        // list dmuc con
        // data.data.map(item => {
        //   if (item) {
        //     this.getLitstDanhmucUrbox_cap2(item);
        //   }
        // }
        //)


        this.listsGiftUrbox(null);
        

      }
    });
  }
  getLitstDanhmucUrboxdongbod() {
    const payload = { userId: this.props.userID, };
    this.props.dispatch(listsDanhmucUrbox_v2(payload)).then((data) => {
      if (data) {
      

      }
    });
  }

  getLitstDanhmucUrbox_cap2(danhmuc){
    let LitstDanhmucUrbox= this.state.LitstDanhmucUrbox;
    const payload = { userId: this.props.userID, id:danhmuc.id };
   // alert(JSON.stringify(payload))
   
    this.props.dispatch(getLitstDanhmucUrbox_cap2(payload)).then((data) => {
      if (data&&data.data&&data.data.length>0) {
       
        this.setState({ LitstDanhmucUrbox:this.state.LitstDanhmucUrbox.concat(data.data) ,})
        // list dmuc con
       
        //this.listsGiftUrbox(null);
      //alert(JSON.stringify(this.state.LitstDanhmucUrboxAll))
      //  console.log('getLitstDanhmucUrbox_cap2',this.state.LitstDanhmucUrbox)
      }
    });


  }

  listsGiftUrbox(cat, isLoadMore = false, page = 0) {

    const { per_page, page_no, LitstDanhmucUrbox, } = this.state

    const payload = { userId: this.props.userID, per_page: per_page, page_no: isLoadMore ? page : page_no, cat_id: cat ? cat.id : '', };
    this.props.dispatch(listsGiftUrbox(payload)).then((data) => {
      if (data) {
        // let dataSectionList_ = this.state.dataSectionList
        // let listsGiftUrbox = data.data.items.filter(x => x.image.length > 0)

        // console.log("data list gifts", data.data.items.length)

        if(isLoadMore) {
          this.setState({ listsGiftUrbox: [...this.state.listsGiftUrbox, ...data.data.items], loadding: false })
        } else {
          this.setState({ listsGiftUrbox: data.data.items, loadding: false })
        }
        // console.log("page", per_page, page_no)
        // let a = {
        //   title: cat.title,
        //   id: cat.id,
        //   data: listsGiftUrbox //['Pizza', 'Burger', 'Risotto'],
        // }
        // dataSectionList_.push(a)



        //dataSectionList_ = dataSectionList_.filter(x => x.data.length > 0)
        //alert(JSON.stringify(dataSectionList))

        //  this.setState({ dataSectionList:dataSectionList_ })
      }
    });
  }

  searchclisk(t, type) {

    if (type == 0) {// chi tết quà
      const { navigator, } = this.props;

      navigator._push({
        name: IDs.ChitietGQuaTang,
        options: {
          topbar: {
            leftButtons: [
              {
                id: 'CHITIETSP_BACK',
                icon: CommonIcons.back,
              },
            ],
          },
          bottomTabs: {
            visible: false,
            ...Platform.select({ android: { drawBehind: true, }, }),
          },
        },
        passProps: {
          data: t,
        },


      });


    } else {//go to serch scene
      // this.props.dispatch({ type: 'searchKeyword', searchKeyword: '', });
      const { navigator, } = this.props;

      // console.log("t#####", t)

      const item = t?.hasOwnProperty("id") ? t : {}
      
      this.listsGiftUrbox(item)
      this.props.dispatch({ type: 'searchKeyword', searchKeyword: item.title, });
      this.setState({ selectedDanhMuc: item.id })

      // return navigator._push({
      //   name: IDs.SearchScreenGift,
      //   options: {
      //     topbar: {
      //       statusBar: {
      //         backgroundColor: Colors.statusBar,
      //         //drawBehind: true,
      //         visible: true,
      //       },
      //       background: {
      //         color: Colors.HeaderColor,
      //       },
      //       leftButtons: [
      //         {
      //           id: 'btntop',
      //           icon: CommonIcons.back,
      //         },
      //       ],
      //     },
      //     bottomTabs: {
      //       visible: false,
      //       ...Platform.select({ android: { drawBehind: true, }, }),
      //     },
      //   },
      //   passProps: {
      //     showback: true,
      //     item: t,
      //     LitstDanhmucUrbox: this.state.LitstDanhmucUrbox
      //   },
      // });

    }

  }

  GoMyGiftScreen = (type) => {
    const { navigator, } = this.props;

    if (type == 2) {

      navigator._push({
        name: IDs.ListSuDiem,
        options: {
          bottomTabs: {
            visible: false,
            ...Platform.select({ android: { drawBehind: true, }, }),
          },
          topBar: {
            visible: true,
            drawBehind: false,
            background: {
              color: Colors.HeaderColor,
            },

            title: {
              text: 'Lịch sử điểm',
              color: 'white'
            },
          },
        },
        passProps: {

          userId: this.props.userID,
          dispatch: this.props.dispatch,
        },


      });
      return;
    }
    navigator._push({
      name: IDs.MyGift,
      options: {
        topbar: {
          leftButtons: [
            {
              id: 'CHITIETSP_BACK',
              icon: CommonIcons.back,
            },
          ],
        },
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {

      },


    });
  }

  onPress1 = () => {

    this.setState({ ErrorMessage: '' });
  }

  onPress2 = () => {


    const { navigator, } = this.props;

    const { tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, quan_pk, xa_pk, diachihd } = this.state

    navigator._push({
      name: IDs.UpdateAddressCus,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
        topBar: {
          visible: true,
          drawBehind: false,
          background: {
            color: Colors.HeaderColor,
          },

          title: {
            text: 'Cập nhật địa chỉ khách hàng',
            color: 'white'
          },
        },
      },
      passProps: {

        userId: this.props.userID,
        dispatch: this.props.dispatch,
        tenxa, tenquan, tentinh, idtinh, idquan, idxa, diachihd,
        tinh_pk, quan_pk, xa_pk,
        refreshdata: () => this._getDiaChiKH()
      },


    });
  }


  scrollToTop = () => {
    this.scrollViewRef.getNode().scrollTo({ x: 0, y: 0, animated: true });
    this.setState({showScrollToBottomIcon:false})
  };

  render() {
    const { loadding, listsGiftUrbox, LitstDanhmucUrbox, dataSectionList, BannerList, clampedScroll,  showScrollToBottomIcon, selectedDanhMuc } = this.state;
    let images = BannerList.map((image) => ({ uri: image.HinhAnh }))

    const bannerAnimation = {
      transform: [
        {
          scale: this.animatedValue.interpolate({
            inputRange: [-200, 0],
            outputRange: [2, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    const searchInputContainerAnimation = {
      opacity: this.animatedValue.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this.animatedValue.interpolate({
            inputRange: [0, 1, 40],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    };


    return (
      <>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: Colors.HeaderColor }}
        />
        <SafeAreaView
          style={{ backgroundColor: Colors.Analogus, flex: 1 }}>
          <View style={styles.content}>
            <SafeAreaView style={{ backgroundColor: Colors.HeaderColor }} />
            {/* <Viewhead DiemTLKH={ this.props.ShopControl.DiemTLKH} GoMyGiftScreen={this.GoMyGiftScreen} searchclisk={(item, t) => this.searchclisk(item, t)}></Viewhead> */}

            <Animated.View
              style={[
                styles.HeaderContainer,
                searchInputContainerAnimation,
              ]}>
              <SafeAreaView style={{ backgroundColor: Colors.HeaderColor }} />
              <View style={styles.upperRow}>
                <Viewhead
                  DiemTLKH={this.props.ShopControl.DiemTLKH}
                  GoMyGiftScreen={() => this.GoMyGiftScreen()}
                  searchclisk={(item, t) => this.searchclisk(item, t)}
                />

                <TouchableOpacity>
                  {/* <Image
              source={require('../assets/images/more.png')}
              style={[styles.moreIcon]}
            /> */}
                </TouchableOpacity>
              </View>
            </Animated.View>

            <Animated.View
              style={[styles.bannerContainer, bannerAnimation]}>
              <Image
                resizeMode="stretch"
                style={styles.banner}
                // source={ImgBanner.BannerGift}
                source={{ uri: BannerList && BannerList.length > 0 ? BannerList[0].HinhAnh : '' }}
              />
            </Animated.View>
            <AnimatedScrollView
              removeClippedSubviews={true}
              ref={(ref) => (this.scrollViewRef = ref)}
              
              scrollEventThrottle={1}
              onMomentumScrollBegin={this._onMomentumScrollBegin}
              onMomentumScrollEnd={this._onMomentumScrollEnd}
              onScrollEndDrag={this._onScrollEndDrag}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim, }, }, },],
                { useNativeDriver: true, },
              )}>
              <View style={styles.paddingForBanner} />
              <View style={styles.wrappCard}>
                <View style={styles.UserDetailsCard}>
                  <RowUserGift>
                    {/* <View style={styles.dot} /> */}
                    <View
                      style={{
                        flexWrap: 'wrap',
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <TextCmp
                        numberOfLines={1}
                        style={styles.TextHearderCard}>
                        {this.props.dataLogin.ten}{' '}
                      </TextCmp>
                      <TextCmp style={styles.TextHearderCard2}>
                        {' '}
                        Gifts{' '}
                      </TextCmp>
                    </View>
                  </RowUserGift>

                  <RowUserGift
                    onPress={() => this.GoMyGiftScreen(2)}
                    showRight={true}
                    leftIcon={ImgOPV.reward}>
                    <TextCmp style={styles.regularTextPoint}>
                      {formatter.format(this.props.ShopControl.DiemTLKH)}
                    </TextCmp>
                    {/* <TextCmp style={styles.greyText}> {'(Điểm)'}</TextCmp> */}

                    <TextCmp style={styles.regularText}> điểm </TextCmp>
                  </RowUserGift>
                  <RowUserGift
                    leftIcon={ImgOPV.voucher}
                    hideBorder
                    onPress={this.GoMyGiftScreen}
                    showRight={true}>
                    <View>
                      <View style={[styles.row, { marginBottom: 8 }]}>
                        <TextCmp style={styles.boldText}>
                          Quà của tôi
                        </TextCmp>
                      </View>
                      <View style={styles.row}>
                        <TextCmp style={styles.regularText}>
                          Xem chi tiết quà tặng
                        </TextCmp>
                      </View>
                    </View>
                  </RowUserGift>
                </View>
              </View>


              <View style={styles.scrollViewContent}>
                {/* <ViewDanhmucUrbox searchclisk={(t)=>this.searchclisk(t)}  LitstDanhmucUrbox={this.state.LitstDanhmucUrbox}></ViewDanhmucUrbox> */}
                <ViewListGif
                  ErrorMessageText={this.state.ErrorMessage}
                  onPress1={this.onPress1}
                  onPress2={this.onPress2}
                  dataSectionList={dataSectionList}
                  searchclisk={(item, t) => this.searchclisk(item, t)}
                  LitstDanhmucUrbox={LitstDanhmucUrbox}
                  listsGiftUrbox={listsGiftUrbox}
                  selectedDanhMuc={selectedDanhMuc}
                />
                {loadding && <BarIndicator size={20} color={Colors.Analogus2} />}
              </View>
            </AnimatedScrollView>
            {showScrollToBottomIcon && (
            <TouchableOpacity onPress={this.scrollToTop} style={styles.scrollToTopButton}>
              <Icon1 name="arrow-up" size={18} color="#858385" /> 
            </TouchableOpacity>) }
          </View>
        </SafeAreaView>
      </>
    );

  }
}
export default connect(
  (state) => ({
    testData: state.test.testData,
    userID: state.login.userID,
    ShopControl: state.ShopControl,
    dataLogin: state.login.dataLogin,
  }),
  (dispatch) => ({ dispatch, }),
)(Quatang);
const HEADER_HEIGHT = 80;

const BannerWidth = width;
const BannerHeight = width / 3 + 40;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    // marginTop: 60,
    flex: 1,
    // height: '100%'
    position: 'relative'


  },
  title: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginVertical: 4,
    alignItems: 'center'

  },
  title2: { minHeight: 50, marginHorizontal: 5, alignItems: 'center' },
  item: {
    width: '40%',
  },

  txtkm: { fontSize: 14, },

  HeaderContainer: {
    zIndex: 100,
    position: 'absolute',
    width: '100%',

    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },


  bannerContainer: {
    position: 'absolute',
    height: BannerHeight,
    backgroundColor: 'white',
    alignItems: 'center',

    //backgroundColor:'red'
  },
  banner: {

    width: BannerWidth,
    height: BannerHeight,
    backgroundColor: Colors.backgroundL1
  },
  paddingForBanner: {
    height: BannerHeight,
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    top: 48,
    width: 100,
    height: 100,
    zIndex: 100,
    // backgroundColor:'yellow'
  },
  boldText: {
    fontSize: RFValue(14),

    color: '#222222',
  },
  greyText: {
    fontSize: RFValue(12),
    color: '#607d8b',
    marginLeft: 4,
  },
  regularTextPoint: {
    fontSize: RFValue(16),
    marginLeft: 4,
  },
  regularText: {
    fontSize: RFValue(12),
    color: Colors.text,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#222222',
    marginHorizontal: 8,
  },
  TextHearderCard: {
    fontSize: RFValue(16),
    fontWeight: '400',
    color: Colors.textOPVGreen,


  },

  TextHearderCard2: {
    fontSize: RFValue(14),

    color: Colors.textOPVRed,
    borderWidth: 0.3,
    borderColor: Colors.textOPVCopper2,
    backgroundColor: Colors.Analogus,
    borderRadius: 5,
    overflow: 'hidden'

  },
  wrappCard: {
    backgroundColor: '#fff',
    zIndex: 100,
  },
  UserDetailsCard: {
    zIndex: 90,
    width: width - 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -60,
    marginBottom: 32,
    borderRadius: 14,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#d3d3d3',
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },

  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue', 
    borderRadius: 20,
    padding: 10, 
    borderRadius: 28, 
    backgroundColor: '#e8e5e8', 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.4, 
    shadowRadius: 4, 
  },
});