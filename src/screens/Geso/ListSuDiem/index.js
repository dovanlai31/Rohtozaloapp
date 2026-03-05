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
import { TextCmp, LoadingView, ErrorMessage} from '../../../common-components';
import { Colors, } from '../../../theme';
import { CommonIcons, } from '../../../assets';
import { Navigation, } from 'react-native-navigation';
import { AppNavigation } from '../../../app-navigation';
import { IDs } from '../..';

import { cart_getlist_urbox, getLichSuDiemTL } from './Actions'
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
        text: 'Lịch sử điểm',
        color:'white'
      },
    },
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      cart_list_urbox: [],
      loading: false,
      valueLoading: 1,
    }
  }

  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop(); }
  }
  componentDidMount() {

      this.getLichSuDiemTL();

  }
  getLichSuDiemTL = () => {
    // public string cart_getlist_urbox(string site_user_id, string startDate, string endDate)
    const payload = { userId: this.props.userID, startDate: '01/01/2024', endDate: '01/11/2024' };
    this.setState({ loading: true, })
    this.props.dispatch(getLichSuDiemTL(payload)).then((data) => { 
      this.setState({ valueLoading :100})
      //nha quá không nhìn thấy loading
      setTimeout(() => {
        this.setState({ loading :false})
      }, 500);
    
      if (data) {
       // alert(JSON.stringify(data))
        
        this.setState({ cart_list_urbox:JSON.parse(data[0].MSG)  })
      }
    });
  }

  // shouldComponentUpdate(listkm) {
  //   return listkm != this.props.listkm;
  // }



  renderItem = (item, index) => {

    return (

      <TouchableOpacity
        // onPress={() => this.onSelect(item)}
      >
        <View style={[styles.title, styles.title2,]}>
        <View style={{paddingHorizontal: 10}}>
          <View style={{
          width: 36,
          height: 36,
          borderRadius: 18, 
          backgroundColor: Colors.BackgrondLightOPV5, 
          justifyContent: 'center',
          alignItems: 'center',
  
          }}>
            <Icon size={18} color={'gold'} name='star' />
          </View>
        </View>

          <View style={{ width: '90%' }}>
            <View>
          
              <TextCmp style={styles.txtkm}>Điểm: <TextCmp style={[styles.textbold,{color:item.TONGDIEM<0?Colors.textOPVRed: Colors.textOPVGreen }]}>{formatter.format(item.TONGDIEM)}  </TextCmp></TextCmp>
              <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold,]}>{item.DIENGIAINGHIEPVU}</TextCmp> </TextCmp>
              <TextCmp style={styles.txtkm}><TextCmp style={[styles.textbold, {fontWeight: '100', fontSize:RFValue(10)}]}>{item.THOIDIEM}</TextCmp>  </TextCmp>

              {/* {item.detail[0].using_time && <TextCmp style={styles.txtkm}>Thời hạng dùng: {item.detail[0].using_time}</TextCmp>} */}
            </View>
          </View>


          {/* <View style={{ width: '5%' }} ><TextCmp style={[styles.txtkm, { color: 'red' }]}>Xem</TextCmp></View> */}
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    const { listkm } = this.props;LoadingView
    const { cart_list_urbox, } = this.state;
    let tab1cart_list_urbox = cart_list_urbox



    return (
      <View style={styles.content}>
            {this.state.loading ? ( 
              <LoadingView isVisible={this.state.loading} valueLoading={this.state.valueLoading}/>
            ) : (
              <FlatList
                data={tab1cart_list_urbox}
                initialNumToRender={10}
                keyExtractor={(item) => item.pk_seq + ''}
                renderItem={({ item, index }) => this.renderItem(item, index)}
                ListEmptyComponent={<ErrorMessage message={'Không có dữ liệu lịch sử điểm'}/>}
              />
            )}
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
    backgroundColor:Colors.BackgrondLightOPV5
  },
  textbold: { fontWeight: 'bold', fontSize:  RFValue(12) , color: Colors.text0PV },
  title: {

    flexDirection: 'row',
    justifyContent: 'space-between',
   // borderColor: Colors.Analogus2,
    marginVertical: 4,
    alignItems: 'center',
    padding: 15,

  },
  title2: { minHeight: 45, marginHorizontal: 5, alignItems: 'center', backgroundColor: 'white', marginHorizontal: 14, borderRadius: 5 },
  item: {
    width: '40%', margin: 2
  },
  txtkm: { fontSize: RFValue(12) },
  btntap: {
    width: '50%', borderBottomWidth: 2, padding: 15,
    padding: 7, borderColor: '#9E100C', justifyContent: 'center'
  }
  , img: { width: 100, height: 100 }
});