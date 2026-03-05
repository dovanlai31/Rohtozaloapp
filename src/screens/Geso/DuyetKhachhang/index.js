

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  RefreshControl, 
} from 'react-native';
import { getListKHChot,DuyetKhQL, } from './action';
import { Colors, } from '../../../theme';
import {connect,} from 'react-redux';
import { ListItem, } from 'react-native-elements';
import Icons from '../../../assets/Icons';

class ChotScreen extends React.Component {
  constructor(){
    super();
    this.state={
      ListDataKH:null,
      refreshing: false,
    };
  }
  componentDidMount(){
    this.getdata();
  }
  _onRefresh = () => {
    this.setState({refreshing: true,});
    this.getdata();
  }

  getdata(){
    let param = {
      userId: this.props.listBranch.USERID,
	    id:this.props.listBranch.ID==null?'':this.props.listBranch.ID,
      loai:this.props.listBranch.LOAI,
    };
    this.props.dispatch(getListKHChot(param)).then((res)=>{
      this.setState({refreshing: false,});
      if(res[0].RESULT == '1'){
        //alert(JSON.stringify(res[0].MSG));
        this.setState({ListDataKH:JSON.parse( res[0].MSG),});
      }
      else{
        this.setState({ListDataKH:[],});
      }
    });
  }

  duyetkh(item){
    //alert(item.ten);
    const params ={
      userId: this.props.listBranch.USERID,
      khid:item.SMARTID,
      
    };
    this.props.dispatch(DuyetKhQL(params)).then((res)=>{
      Alert.alert(
        'Thông báo',
        res[0].MSG,
        [
         
          {text: 'ok ', onPress: () => this.getdata(),},
        ],
       
      );

    });
  }
  pressitem(item){

    Alert.alert(
      'Duyệt khách hàng',
      'Bạn có chắc chắn muốn duyệt khách hàng: "'+item.ten+'" - mã: '+item.SMARTID,
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Duyệt ', onPress: () => this.duyetkh(item),},
      ],
     
    );

  }

  render(){
    const {ListDataKH,}= this.state;
   
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        
        {!ListDataKH&&<ActivityIndicator size={'small'} color={Colors.HeaderColor} />}
        {ListDataKH&&
          ListDataKH.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: `${l.ANHCUAHANG}`  }, }}
              title={l.ten}
              subtitle={'Địa chỉ: '+l.DIACHI +'\nNgười tạo: '+l.ddkdtao}
              rightIcon={()=>( <Icons
                name={ 'checked' }
                size={18}
                color={ null }
              />)}
              onPress={()=>this.pressitem(l)}
              containerStyle={{marginBottom:1,}}
            />
          ))
        }

        
      </ScrollView>
    );
  }
}
export default connect(
  (state) => ({
    listBranch: state.app.listBranch,
    SearchData: state.SearchData,
  }),
  (dispatch) => ({ dispatch, }),
)(ChotScreen);