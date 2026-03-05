/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2019-01-24 15:15:48
 * @modify date 2019-01-24 15:15:48
 * @desc [description]
 */


import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { DropdownInput, ErrorMessage, TextCmp, TxtInput, } from '../../../common-components';
import { Colors, } from '../../../theme';
import { CommonIcons, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
import { AppNavigation } from '../../../app-navigation';
import { IDs } from '../..';

import { luuphuongxa, getListXaPhuong,getListQuan } from './Actions'
import { connect, } from 'react-redux';
import formatter from '../fm';
import ViewDialog from '../DialogView/DialogView';
import { showSuccess } from '../../../utils/SnackBar';

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
        text: 'Lịch sử điểm',
        color: 'white'
      },
    },
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      cart_list_urbox: [],
      currentXa: { id: '', label: 'Chọn phường/xã' },
      currentQH: { id: '', label: 'Chọn Quận/huyện' },
      currentDC: '',
    }
  }

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
  }
  componentDidMount() {
    const { tenxa, tenquan, tentinh, idtinh, idquan, idxa,xa_pk } = this.props
    if(idquan==0){
      this.getListQuan();
    }
    else if (idxa == 0)
      this.getListXaPhuong(this.props.quan_pk);
    else
    this.setState({currentXa:{id:xa_pk,label:tenxa}})
    //this.getListTB()
    //alert(JSON.stringify(this.props.dataLogin))
  }
  getListXaPhuong(quan_pk) {
    // public string cart_getlist_urbox(string site_user_id, string startDate, string endDate)
    const { tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, xa_pk, } = this.props
    const payload = { userId: this.props.userID, idquan: quan_pk, idtinh: tinh_pk };
    this.props.dispatch(getListXaPhuong(payload)).then((data) => {
      this.setState({ loadding: false })
      if (data) {
        // alert(JSON.stringify(data))
        this.setState({ ListXaPhuong: data })
      }
    });
  }
  getListQuan() {
    // public string cart_getlist_urbox(string site_user_id, string startDate, string endDate)
    const { tenxa, tenquan, tentinh, idtinh, idquan, idxa, tinh_pk, quan_pk, xa_pk, } = this.props
    const payload = { userId: this.props.userID, idquan: quan_pk, idtinh: tinh_pk };
    this.props.dispatch(getListQuan(payload)).then((data) => {
      this.setState({ loadding: false })
      if (data) {
        // alert(JSON.stringify(data))
        this.setState({ listQH: data }) 
      }
    });
  }
  // shouldComponentUpdate(listkm) {
  //   return listkm != this.props.listkm;
  // }
  SelectPhuongXa = () => {
    const { ListXaPhuong, currentXa } = this.state
   // return alert(JSON.stringify(ListXaPhuong))
    AppNavigation.showCommonDialog({
      renderContent: () =>
        <ViewDialog title={'Chọn Phường xã'}
          content={ListXaPhuong}
          onPressItem={(item) => {
            if (item.id && item.id != currentXa.id) {
              this.setState({ currentXa: item, });
            }


          }
          }
        />

    });

  }
  SelectQuan= () => {
    const { listQH, currentQH } = this.state
   // return alert(JSON.stringify(ListXaPhuong))
    AppNavigation.showCommonDialog({
      renderContent: () =>
        <ViewDialog title={'Chọn '}
          content={listQH}
          onPressItem={(item) => {
            if (item.id && item.id != currentQH.id) {
              this.setState({ currentQH: item, });
              this.getListXaPhuong(item.id)
            }


          }
          }
        />

    });

  }
  onChangeTextx = (text) => {
    console.log('logtext',text);
    this.setState({currentDC:text});
  };
  luuphuongxa(){
    const { currentXa,currentQH, currentDC} = this.state
    if(currentXa.id=='')
    return Alert.alert("Thông báo ","Vui lòng chọn phường/xã")
    const {  idquan,  } = this.props




    const payload = { userId: this.props.userID, xa_pk: currentXa.id, diachihd: currentDC};
    if(idquan==0){
      if(currentQH.id=="")
      return Alert.alert("Thông báo ","Vui lòng chọn quận/huyện")
      payload.quanhuyen_Fk=currentQH.id
    }


    this.props.dispatch(luuphuongxa(payload)).then((data) => {
      this.setState({ loadding: false })
      if (data&&data>0) {
         showSuccess("Lưu thành công")
         
         this.props.refreshdata()
         this.props.navigator._pop(); 
      }else
      Alert.alert("Thông báo","Lưu thất bại")
    });

  }
  render() {
    const { tenxa, tenquan, tentinh, idtinh, idquan, idxa,diachihd } = this.props
    console.log('locxxyy dataLogin ', this.props.dataLogin);

    return (
      <View style={styles.content}>
        <ErrorMessage color={Colors.textOPVGreen} message={'Thông tin của bạn sẽ được dùng để giao hàng, vui lòng nhập chính xác thông tin '}/>
        <ScrollView>
          <View style={styles.body}>
            <TxtInput offeditable={true} text={this.props.dataLogin.ten} label='Họ và tên'></TxtInput>
            <TxtInput offeditable={true} text={this.props.dataLogin.dienthoai+''} label='Số điện thoại'></TxtInput>
            <TxtInput offeditable={true} label='Tình/Thành phố' text={tentinh}></TxtInput>
          {idquan==0? <DropdownInput onPress={this.SelectQuan} hightLight={true} label='Quận/Huyện'
             text={this.state.currentQH.label}   ></DropdownInput>:
              <TxtInput offeditable={true} label='Quận/Huyện' text={tenquan}></TxtInput>} 

            <DropdownInput onPress={this.SelectPhuongXa} hightLight={true} label='Phường/Xã'
             text={this.state.currentXa.label}   ></DropdownInput>
            {diachihd&&diachihd.length <=0 || diachihd ==undefined?  <TxtInput hightLight={true}  
             onChange={text => this.onChangeTextx(text)}  
             label='Địa chỉ' text={this.state.currentDC}></TxtInput> : 
             <TxtInput hightLight={false} offeditable={true} label='Địa chỉ' text={diachihd}></TxtInput> 
            }
             
          </View>

          <TouchableOpacity onPress={()=>this.luuphuongxa()} style={styles.btnSave}>
            <TextCmp style={{color:'white', fontWeight:'bold'}}>{'Lưu Địa Chỉ'.toLocaleUpperCase()}</TextCmp>
          </TouchableOpacity>
        </ScrollView>





      </View>
    );

  }
}
export default connect(
  (state) => ({
    testData: state.test.testData,
    userID: state.login.userID,
    dataLogin: state.login.dataLogin,
  }),
  (dispatch) => ({ dispatch, }),
)(ViewAllKm);
const styles = StyleSheet.create({
  content: {
    //marginTop: 60,
    flex: 1,
    backgroundColor: 'white'
  },
  btnSave:{height:45, width:'90%', margin:20, justifyContent:'center',alignItems:'center',backgroundColor:Colors.HeaderColor, borderRadius:5},
  body: { margin: 15 },
  textbold: { fontWeight: 'bold', fontSize: 14 },
  title: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginVertical: 4,
    alignItems: 'center'

  },
  title2: { minHeight: 45, marginHorizontal: 5, alignItems: 'center', borderBottomWidth: 0.5, backgroundColor: '#eeee', marginHorizontal: 14, borderRadius: 4 },
  item: {
    width: '40%', margin: 2
  },
  txtkm: { fontSize: 14 },
  btntap: {
    width: '50%', borderBottomWidth: 2, padding: 15,
    padding: 7, borderColor: '#9E100C', justifyContent: 'center'
  }
  , img: { width: 100, height: 100 }
});