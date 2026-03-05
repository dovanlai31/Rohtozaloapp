
import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  AsyncStorage,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import Headersearch from './View/Headersearch';
import Listsp_search from './View/Listsp_search';
import { Logg, } from '../../../utils';
import { Colors, } from '../../../theme';
import { IDs, } from '../..';
import { Navigation, } from 'react-native-navigation';
import { AppNavigation } from '../../../app-navigation';
import { getLitstDanhmucUrbox_cap2, listsGiftUrbox } from '../Quatang/actions';
import { CommonIcons } from '../../../assets';

const keyList = [
  'Tiêu hoá',
  'Tim mạch',

];

class SearchScene extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      visible: true,
    },
  };

  constructor(props) {
    super(props);
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95,
    };
    this._gochitietSP = this._gochitietSP.bind(this);
    this.searchOption = this.searchOption.bind(this);
    this.state = {
      searchText: '',
      searchKeyword: '',
      historyKey: [],
      LitstDanhmucUrbox: [],
      listsGiftUrbox: [],
      LitstDanhmucUrbox_cap2:[]
    };
  }
  // shouldComponentUpdate(searchKeyword){
  //   return searchKeyword !== this.props.ShopControl.searchKeyword;
  // }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    if (this.props.LitstDanhmucUrbox)
      this.setState({ LitstDanhmucUrbox: this.props.LitstDanhmucUrbox })
    if (this.props.item) {
      this.listsGiftUrbox(this.props.item.id)
      this.props.dispatch({ type: 'searchKeyword', searchKeyword: this.props.item.title, });
      this.getLitstDanhmucUrbox_cap2(this.props.item.id)
    }



    return AsyncStorage.getItem('historyKey2')
      .then((req) => JSON.parse(req))
      .then((json) => this.setState({ historyKey: json, }))
      .catch((error) => Logg.error('error! ' + error));

  }

  // componentWillUnmount() {
  //   // Not mandatory
  //   if (this.navigationEventListener) {
  //     this.navigationEventListener.remove();
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.DataSPSearch !== prevProps.DataSPSearch) {
  //     alert(JSON.stringify(this.props.DataSPSearch))
  //   }
  // }
  componentDidAppear() {
    // if (this.props.ShopControl) {
    //   let searchKeyword = this.props.ShopControl.searchKeyword;
    //   //alert(searchKeyword);
    //   this.setState({ searchText: searchKeyword, searchKeyword: searchKeyword, });
    //   //this.props.dispatch({ type: 'searchKeyword', searchKeyword: '', });
    //   return ;
    // }
  }

  // componentDidDisappear() {
  //   this.setState({ searchText: '', searchKeyword: '', });
  // }
  _gochitietSP = (data) => () => {
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
        data: data,
      },


    });
  }
  onChangeText(text) {
    this.setState({ searchText: text, });
    if (text.length === 0) {
      this.setState({ searchKeyword: text, searchText: text, });
      //this.props.dispatch({ type: 'setsDataSearch', searchKeyword: text + '',});
    }
  }
  onSubmitEditing(text) {
    if (text && text.length > 0) {

      this.setState({ searchKeyword: text, });
      this.listsGiftUrbox('', text)
      this.props.dispatch({ type: 'searchKeyword', searchKeyword: text, });
      if (text.length > 0) {
        //alert(JSON.stringify(this.state.historyKey))
        let listOld = []
        listOld = this.state.historyKey;
        if (listOld.length > 0)
          listOld = listOld.filter(x => x != text)

        const someArray = [this.state.searchText,].concat(listOld);

        this.setState({ historyKey: someArray, });

        return AsyncStorage.setItem('historyKey2', JSON.stringify(someArray))
          .then((json) => console.log('success!'))
          .catch((error) => console.log('error!'));
      }

    }


  }
  deleteHistorryKeySearch = () => {
    const someArray = [];
    this.setState({ historyKey: [], });
    return AsyncStorage.setItem('historyKey2', JSON.stringify(someArray))
      .then((json) => console.log('success!'))
      .catch((error) => console.log('error!'));


  }
  onSubmitEditing2 = (text, type) => {
    if (type == 1) {// tìm theo nhan hàng

      this.listsGiftUrbox(text.id)

      this.props.dispatch({ type: 'searchKeyword', searchKeyword: text.title, });


    } else {
      this.setState({ searchKeyword: text, searchText: text, });
      //alert(text)

      this.listsGiftUrbox('', text)
      this.props.dispatch({ type: 'searchKeyword', searchKeyword: text, });
    }


  }

  listsGiftUrbox(cat_id, title) {

    this.setState({ listsGiftUrbox: [] })
    const { per_page, page_no } = this.state
    const payload = {
      userId: this.props.userID, per_page: 300, page_no: 1,
      cat_id: cat_id ? cat_id : '',
      title: title ? title : ''

    };
    this.props.dispatch(listsGiftUrbox(payload)).then((data) => {
      if (data) {
        console.log('listsGiftUrbox', data.data.items)
        this.setState({ listsGiftUrbox: data.data.items.filter(x => x.image.length > 0), loadding: false })
      }
    });
  }
  getLitstDanhmucUrbox_cap2(cat_id){

    const payload = { userId: this.props.userID, id:cat_id };
   // alert(JSON.stringify(payload))
   
    this.props.dispatch( getLitstDanhmucUrbox_cap2(payload)).then((data) => {
      if (data&&data.data&&data.data.length>0) {
  
        this.setState({ LitstDanhmucUrbox_cap2:data.data ,})
        // list dmuc con
       
        //this.listsGiftUrbox(null);
      //alert(JSON.stringify(this.state.LitstDanhmucUrboxAll))
       console.log('getLitstDanhmucUrbox_cap2',this.state.LitstDanhmucUrbox)
      }
    });


  }

  // componentWillMount() {
  //   StatusBar.setBarStyle('light-content', true);
  // }
  searchOption = (loai) => {

    //   let items = [
    //     { key: 'date', label: 'Tên sản phẩm', },
    //     { key: 'month', label: 'Giá từ thấp đến cao', },

    //   ];
    //   Notify.show('Sắp xếp theo', {
    //     items: items,
    //     onPressItem: (item) => {
    //       if (item.Id) {

    //       }
    //     },
    //   });
  }
  backPress = () => {
    this.props.navigator._pop();

    AppNavigation.dismissAllModals();
  }
  render() {
    return (
      <>
      <SafeAreaView style={{ flex:0, backgroundColor: Colors.HeaderColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundL1, }}>
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          {/* {Platform.OS=='ios'&&<View style={{height:22, width:'100%', backgroundColor:Colors.HeaderColor}}></View>} */}
          <Headersearch

            backPress={this.backPress}
            showback={this.props.showback}
            searchText={this.state.searchText}
            onSubmitEditing={(text) => this.onSubmitEditing(text)}
            onChangeText={(text) => this.onChangeText(text)} >
          </Headersearch>

          <Listsp_search
             LitstDanhmucUrbox_cap2={this.state.LitstDanhmucUrbox_cap2}
            LitstDanhmucUrbox={this.state.LitstDanhmucUrbox}
            data={this.state.listsGiftUrbox}
            _gochitietSP={this._gochitietSP}
            searchKeyword={this.props.ShopControl.searchKeyword}//{this.props.searchKeyword}
            keyList={this.state.LitstDanhmucUrbox}
            timkiem={this.onSubmitEditing2}
            historyKey={this.state.historyKey}
            deleteHistorryKeySearch={this.deleteHistorryKeySearch}
            viewabilityConfig={this.viewabilityConfig}
            searchOption={this.searchOption}
         
          >
          </Listsp_search>
        </View>
      </SafeAreaView>
      </>
    );

  }
}

export default connect(
  (state) => ({
    testData: state.test.testData,
    DataAllSP: state.login.DataAllSP,
    DataSPSearch: state.login.DataSPSearch,
    ShopControl: state.ShopControl,
  }),
  (dispatch) => ({ dispatch, }),
)(SearchScene);