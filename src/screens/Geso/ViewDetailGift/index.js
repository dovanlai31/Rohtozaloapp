
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Navigation } from 'react-native-navigation';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { AppNavigation } from '../../../app-navigation';
import { TextCmp } from '../../../common-components';
import { Colors } from '../../../theme';
import { getInforPromotion, getspkmtra, getspkmmua } from './actions';
import formatter from '../fm';
import { themspgiohang } from '../ChitietSP/Action/ChitietSp.action';
import ViewQuatanghtml from '../ChitietGQuaTang/View/ViewChild/ViewQuatanghtml';


const { width, height } = Dimensions.get('window')
class ViewDetailGift extends React.Component {
  constructor() {
    super();
    this.state = {
      linkqua: 'https://urbox.dev/nhan-qua/2d06d84050d82f4b9fb2eeb6985b610f.html'
    }

  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);



  }
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'btntop') {
      AppNavigation.dismissAllModals();
    }
  }
  onPressClose = () => {
    AppNavigation.dismissAllModals();
  }

  setModalVisible = () => {

  }
  render() {
    const { linkqua } = this.state;
    const { item } = this.props;
    return (
      // <View style={{ alignItems: 'center', height: '100%' , backgroundColor:'white' }}>

      <ViewQuatanghtml
        linkqua={item.item_quantity==1?  item.detail[0].link: item.linkCart}
        modalVisible={true}
        setModalVisible={this.setModalVisible}>
      </ViewQuatanghtml>

      // </View>
    );
  }




}

export default connect((state) => ({
  userID: state.login.userID,
  ShopControl: state.ShopControl,
  DataAllSP: state.login.DataAllSP,
  dataLogin: state.login.dataLogin,
}), (dispatch) => ({ dispatch, }))(ViewDetailGift);


const styles = StyleSheet.create({
  image: {
    height: height / 3.2,
    width: width
  },
  tieude: {
    position: 'absolute',
    top: height / 3 - 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center', borderRadius: 8,
    width: '90%',
    backgroundColor: '#eeee',
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  texttieude: {
    color: Colors.HeaderColor,
    fontSize: 18,
    textAlign: 'center'
  },
  textday: {
    color: 'green',
    fontSize: 14, margin: 5
  },
  btnClose: {
    position: 'absolute', top: 5,
    left: 5, height: 55, justifyContent: 'center', alignContent: 'center'
  },
  contentView: {
    backgroundColor: '#eeee',
    marginTop: 80, padding: 5, width, flex: 1
  },
  btnBuy: {
    // position: 'absolute',
    // bottom: 5,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.HeaderColor,
    width: '80%', margin: 10

  },
  Row: {
    padding: 7,
    borderColor: 'white',
    borderTopWidth: 1,
    justifyContent: 'center',
    zIndex: 3
  }
})
