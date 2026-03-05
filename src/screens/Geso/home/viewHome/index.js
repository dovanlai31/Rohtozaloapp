import React from 'react';
import { connect, } from 'react-redux';
import { RefreshControl, Animated, StyleSheet, View, ScrollView, StatusBar, Platform, TouchableOpacity, SafeAreaView, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderOne from './HeaderOne';
import Banner from './Banner';
import ViewKM from './ViewKM';
// import ViewTb from './View/Trungbay';
// import ViewTL from './View/TichLuy';
import ViewChungloai from './ViewChungloai';
import ViewListSp from './ViewListSp';
import ViewListSpHET from './SpHetTon';

import { Colors, } from '../../../../theme';
import { CommonIcons, } from '../../../../assets';
import { IDs, } from '../../..';
import { AppNavigation, } from '../../../../app-navigation';
import ViewSPChay from './ViewSpBanChay';



const NAVBAR_HEIGHT = Platform.OS == 'android' ? 105 : 105;
const STATUS_BAR_HEIGHT = Platform.OS == 'android' ? 0 : 0;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class TabHome extends React.Component {

  constructor(props) {
    super(props);
    this.handlePressBanner.bind(this)
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    this.state = {
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
      modalVisible: true,
      index: 0,
      refreshing: false,
      showScrollToBottomIcon: false,
      visibleBanner: false,
      index: 0,

    };
  }
  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;
  _onRefresh = () => {
    this.setState({ refreshing: true, });
    //fetchData().then(() => {
    this.setState({ refreshing: false, });
    //});
  }

  _gochitietSP = (data) => () => {

    const { navigator, } = this.props;
    navigator._push({
      name: IDs.ChitietSP,
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
        data: data,
      },


    });

  }
  PressViewAll = (t) => {
    if (t) {
      this.props.dispatch({ type: 'searchKeyword', searchKeyword: 'Sản phẩm bán chạy', });
      this.props.dispatch({ type: 'setsDataSearch', searchKeyword: t + '', });

      const { navigator, } = this.props;
      return navigator._push({
         name: IDs.SearchScreen,
         options: {
           topbar: {
             statusBar: {
               backgroundColor: Colors.statusBar,
               //drawBehind: true,
               visible: true,
             },
             background: {
               color: Colors.HeaderColor,
             },
             leftButtons: [
               {
                 id: 'btntop',
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
           showback: true,
         },
   
       });



    }
    //AppNavigation.changeTab(1);
  }
  searchclisk = (t) => () => {
   // alert(JSON.stringify(t))   
    if (t) {
      this.props.dispatch({ type: 'searchKeyword', searchKeyword: t.ten + '', });
      this.props.dispatch({ type: 'setsDataSearch', searchKeyword: t.ten + '', });
      const { navigator, } = this.props;
      return navigator._push({
         name: IDs.SearchScreen,
         options: {
           topbar: {
             statusBar: {
               backgroundColor: Colors.statusBar,
               //drawBehind: true,
               visible: true,
             },
             background: {
               color: Colors.HeaderColor,
             },
             leftButtons: [
               {
                 id: 'btntop',
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
           showback: true,
         },
   
       });


    }
    //AppNavigation.changeTab(1);
  }
  setModalVisible = (tt) => () => {
    this.setState({ modalVisible: tt, });
  }
  componentDidMount() {
    this.props.dispatch({ type: 'searchKeyword', searchKeyword: '', });
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
  handleScrollEnd = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 100;
    this.setState({ showScrollToBottomIcon: layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom });
  };
  _onScrollEndDrag = (event) => {
    this.handleScrollEnd(event)

    ////
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


  shouldComponentUpdate(prev, prstate) {
    return prev.SanPhamList != this.props.SanPhamList||prev.visibleBanner!=this.state.visibleBanner;
  }
  handlePressBanner = (index) => {
    this.setState({ index, visibleBanner: true });
    //check  api kt ctkm điểm khi nhấn vào panner
    this.props.checkTLPanner()


  };


  onCloseImageViewer = () => {

    this.setState({ visibleBanner: false });
  };
  scrollToTop = () => {
    this.scrollViewRef.getNode().scrollTo({ x: 0, y: 0, animated: true });
    this.setState({showScrollToBottomIcon:false})
  };

  render() {

    const { clampedScroll,  showScrollToBottomIcon } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT),],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,],
      outputRange: [1, 0,],
      extrapolate: 'clamp',
    });

    return (
      <>
      <SafeAreaView style={{ flex:0, backgroundColor: 'white' }} />
      <SafeAreaView style={{ flex:1, backgroundColor: 'white' }} >
        <StatusBar backgroundColor={Colors.statusBar} barStyle= {  Platform.OS === 'android'?'light-content':'dark-content'} />
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
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View
            style={{ marginTop: 105, backgroundColor: 'white', width: '100%', }}
          >
            <Banner onCloseImageViewer= {this.onCloseImageViewer}  handlePressBanner = {this.handlePressBanner} listBanner={this.props.BannerList} indexImage={this.state.index} visibleBanner ={this.state.visibleBanner} ></Banner>
           
            {/* {listTb.length>0&&<ViewTb listTB={listTb}></ViewTb>}
              {listTL.length>0&& <ViewTL listTL={listTL}></ViewTL>} */}

            <ViewSPChay
              SanPhamBanChayList={this.props.DataAllSP}
              searchclisk={this._gochitietSP}
              navigator={this.props.navigator}
              PressViewAll={this.PressViewAll}
            ></ViewSPChay>
            {this.props.CtkmList.length >0 ?
              <ViewKM userId={this.props.userId} 
              listKM={this.props.CtkmList} navigator={this.props.navigator} 
              dispatch={this.props.dispatch}></ViewKM>  : null
            }

            <ViewChungloai
              listChungloai={this.props.ChungLoaiList}
              searchclisk={this.searchclisk}
              navigator={this.props.navigator}
            >
            </ViewChungloai>

            <ViewListSp
              listSP={this.props.SanPhamList}
              _gochitietSP={this._gochitietSP}
              searchclisk={this.searchclisk}
            ></ViewListSp>

            {/* <ViewListSp2
              listSP={this.props.DataAllSP}
              _gochitietSP={this._gochitietSP}
              searchclisk={this.searchclisk}

            ></ViewListSp2> */}
            {/* <ViewListSpHET
              SanPhamBanChayList={this.props.DataAllSP}
              searchclisk={this._gochitietSP}
              navigator={this.props.navigator}
              PressViewAll={this.PressViewAll}
            ></ViewListSpHET> */}


          </View>
        </AnimatedScrollView >
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate, },], },]}>

          <Animated.View style={{ opacity: navbarOpacity,  width: '100%' }}>
            <HeaderOne
            listKM={this.props.CtkmList}
             searchclisk={this.searchclisk}
              dispatch={this.props.dispatch}
              navigator={this.props.navigator}
              dataLogin= {this.props.dataLogin}
              
            >
            </HeaderOne>
          </Animated.View>

        </Animated.View>
        {showScrollToBottomIcon && (
              <TouchableOpacity onPress={this.scrollToTop} style={styles.scrollToTopButton}>
              <Icon name="arrow-up" size={18} color="#858385" /> 
            </TouchableOpacity>) }
      </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  fill: {
    flex: 1,

  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  
    backgroundColor: '#ffff',
    //borderBottomColor: '#dedede',
    //borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,

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
export default connect((state) => ({
  ShopControl: state.ShopControl,
  DataSPSearch: state.login.DataSPSearch,
  dataLogin: state.login.dataLogin,
}), (dispatch) => ({ dispatch, }))(TabHome);

