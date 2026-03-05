
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

const keyList = [
  // 'Tiêu hoá',
  // 'Tim mạch',

];

class SearchScene extends React.Component {


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
    };
  }
  // shouldComponentUpdate(searchKeyword){
  //   return searchKeyword !== this.props.ShopControl.searchKeyword;
  // }
  async componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);

    try {
        const req = await AsyncStorage.getItem('historyKey');

        const json = JSON.parse(req);
  
        this.setState({ historyKey: json });


    } catch (error) {
        return console.error('errorxxx!', error);
    }
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
      name: IDs.ChitietSP,
      statusBar: {
        backgroundColor: Colors.statusBar,
        // drawBehind: true,
        style:  'dark',
        visible: true,
      },
      options: {
        topBar: {

          visible: false,
          _height: 0,
          drawBehind: false,
 
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
      this.props.dispatch({ type: 'setsDataSearch', searchKeyword: text + '', });
      this.props.dispatch({ type: 'searchKeyword', searchKeyword: text, });
      if (this.state.searchText.length > 0) {
        const someArray = [this.state.searchText,].concat(this.state.historyKey);
        this.setState({ historyKey: someArray, });
        return AsyncStorage.setItem('historyKey', JSON.stringify(someArray))
          .then((json) => console.log('success!'))
          .catch((error) => console.log('error!'));
      }
    }


  }
  deleteHistorryKeySearch = () => {
    const someArray = [];
    this.setState({ historyKey: [], });
    return AsyncStorage.setItem('historyKey', JSON.stringify(someArray))
      .then((json) => console.log('success!'))
      .catch((error) => console.log('error!'));


  }
  onSubmitEditing2 = (text) => {
    this.setState({ searchKeyword: text, searchText: text, });
    //alert(text)
    this.props.dispatch({ type: 'setsDataSearch', searchKeyword: text + '', });
    this.props.dispatch({ type: 'searchKeyword', searchKeyword: text, });

  }
  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true);
  }
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
    console.log('historyKeyx',this.state.historyKey);
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
            data={this.props.DataSPSearch}
            _gochitietSP={this._gochitietSP}
            searchKeyword={this.props.ShopControl.searchKeyword}//{this.props.searchKeyword}
            keyList={keyList}
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