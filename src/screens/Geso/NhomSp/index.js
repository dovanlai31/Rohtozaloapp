/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2019-01-24 15:15:48
 * @modify date 2019-01-24 15:15:48
 * @desc [description]
 */


import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';
import { CommonIcons, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
import { AppNavigation } from '../../../app-navigation';
import { IDs } from '../..';
import RowItem from './View/Item';
import { Alert } from 'react-native';
import ImageView from './View/ImageView';
import { themspgiohang } from '../ChitietSP/Action/ChitietSp.action';

const yourItemHeight = 45;

class Nhomsp extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      //drawBehind: true,
      visible: true,
    },
    topBar: {
      visible: true,
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
        text: 'Nhóm Sản Phẩm',
      },
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      modalVisible: false,
      datahinh: []
    }
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.onChangeText = this.onChangeText.bind(this)
  }

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
  }

  shouldComponentUpdate(listkm) {
    return listkm != this.props.listkm;
  }
  addsoluong = (pk_seq, index, sl) => () => {
    // let a = this.state.dataList;
    // a[index].soluong = sl;
    // this.setState({ dataList: a })
    //this.props.dispatch({ type: 'addsoluong', pk_seq, });
    //this.props.dispatch({ type: 'tinhtien', });
    //this.setState({ datakm: [], });
  }
  trusoluong = (pk_seq) => () => {
    // this.props.dispatch({ type: 'trusoluong', pk_seq, });
    // this.props.dispatch({ type: 'tinhtien', });
    // this.setState({ datakm: [], });
  }
  onChangeText(pk_seq, soluong, index) {
    //this.props.dispatch({ type: 'addsoluonginput', pk_seq, soluong, });
    //this.props.dispatch({ type: 'tinhtien', });
    let a = this.state.dataList;
    a[index].soluong = soluong;
    this.setState({ dataList: a })
  }
  gogo() {
    let spgiohang = [];
    this.state.dataList.map(item => {
      if (item.soluong > 0) {
        if (item.dacbiet == 1 && this.props.dataLogin.mua_dacbiet == 0) {
          return Alert.alert('Thông báo', 'sản phẩm "' + item.ten + '" là sản phẩm đặc biệt không áp dụng cho khách hàng')
        }
        else if (item.hethang == 1) {
          return Alert.alert('Thông báo', 'sản phẩm "' + item.ten + '" đã hết hàng không thể tạo đơn có sp này')
        }
        else {
          spgiohang.push(item)
        }
      }
    })
    //return alert(JSON.stringify(spgiohang))

    if (spgiohang.length > 0) {
      AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length + 1);
      spgiohang.map(sp => {
        this.props.dispatch(themspgiohang(sp));
      })
      AppNavigation.changeTab(2)
      // SnackBar.showSuccess('Thêm vào giỏ hàng thành công');
      this.props.navigator._pop();
    }


  }
  pressItem(item) {
    this.setState({ datahinh: [item.HinhAnh] })
    this.setModalVisible(!this.state.modalVisible);
  }
  renderItem = (item, index) => {
    if (item) {
      return (
        <RowItem
          pressItem={(item) => this.pressItem(item)}
          addsoluong={this.addsoluong}
          trusoluong={this.trusoluong}
          onChangeText={(pk_seq, text, i) => this.onChangeText(pk_seq, text, i)}
          item={item} index={index}></RowItem>
      );
    }

  }

  componentDidMount() {

    let data = this.props.DataAllSP;
    let x = [];
    //  = data.filter(
    //   (sp) => (sp.tennhomhang + '').toLowerCase().indexOf(this.props.nhomsp.ten.toLowerCase()) > -1
    // )
    data.map(item => {
      if (item.clTen == this.props.nhomsp.ten) {
       
        let a = item;
        a.soluong = 0;
        x.push(a);
      }
    })

    this.setState({ dataList: x })
    // alert(JSON.stringify(x))
  }
  setModalVisible(modalVisible) {
    this.setState({ modalVisible })
  }

  render() {
    const { nhomsp, } = this.props;
    const { dataList, modalVisible } = this.state;
    //alert(JSON.stringify(listkm))
    return (

      <View style={styles.content}>
        <View style={styles.ViewTT}>
          <TextCmp>Nhóm: {nhomsp.ten}</TextCmp>
        </View>
        <ScrollView marginBottom={40} >
          <FlatList
            key={(item) => item.pk_seq}
            //style={{ backgroundColor: '#ffff', width }}
            //viewabilityConfig={VIEWABILITY_CONFIG}
            data={dataList}
            initialNumToRender={10}
            extraData={dataList}
            keyExtractor={(item) => item.pk_seq + ''}
            onEndThreshold={100}
            windowSize={10}
            removeClippedSubviews={false}
            renderItem={({ item, index, }) => this.renderItem(item, index)}>

          </FlatList>
        </ScrollView>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity onPress={() => this.gogo()} style={styles.btnbotom}>
            <TextCmp style={{ color: 'white' }}>Tiếp theo </TextCmp>
            <Icon color='white' name={'angle-right'}></Icon>
          </TouchableOpacity>

        </View>
        {modalVisible &&
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}

          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* <TextCmp style={styles.modalText}>Thông tin chi tiết </TextCmp> */}
                <View style={{ height: Dimensions.get('window').height - 200 }}>
                  <ImageView datahinh={this.state.datahinh} ></ImageView>
                </View>

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center', }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <TextCmp style={styles.textStyle}> Đóng </TextCmp>
                  <Icon color="white" name={'close'}></Icon>


                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        }
        {/* <View style={{ flex: 1 }}>
          <ViewCalendar></ViewCalendar>
        </View> */}

      </View>


    );

  }
}

export default connect(
  (state) => ({
    DataAllSP: state.login.DataAllSP,
    ShopControl: state.ShopControl,
    dataLogin: state.login.dataLogin,
  }),
  (dispatch) => ({ dispatch, }),
)(Nhomsp);
const styles = StyleSheet.create({
  content: {
   // marginTop: 60,
    flex: 1,
    backgroundColor:'white'
  },
  btnbotom: {
    position: 'absolute',
    width: '80%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.HeaderColor,
    borderWidth: 1,
    bottom: 3,
    borderRadius: 5,
    backgroundColor: Colors.HeaderColor,
    flexDirection: 'row'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginVertical: 4,

  },
  title2: { height: 50, marginHorizontal: 5, alignItems: 'center' },
  item: {
    width: '40%',
  },
  txtkm: { fontSize: 14 },
  ViewTT: {
    width: '80%',
    borderBottomColor: Colors.yellow,
    borderBottomWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,

  },
  modalView: {
    marginTop: 78,
    width: '98%',
    height: Dimensions.get('window').height - 78,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});