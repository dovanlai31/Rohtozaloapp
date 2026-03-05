

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
import { getListKHChot,DuyetKhQL, } from './actions';
import { Colors, } from '../../../theme';
import {connect,} from 'react-redux';
import { ListItem, } from 'react-native-elements';
import Icons from '../../../assets/Icons';

class Duyettraituyen extends React.Component {
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
      nvId:this.props.listBranch.ID==null?'':this.props.listBranch.ID,
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
    //(string nvId, string pk_seq, string loai)
    const params ={
        nvId: this.props.listBranch.USERID,
        pk_seq:item.PK_SEQ,
        loai:1
    };
    this.props.dispatch(DuyetKhQL(params)).then((res)=>{
      Alert.alert(
        'Thông báo',
        res,
        [
         
          {text: 'ok ', onPress: () => this.getdata(),},
        ],
       
      );

    });
  }
  pressitem(item){

    Alert.alert(
      'Duyệt bán trái tuyến',
      'Bạn có chắc chắn muốn duyệt bán trái tuyết nvbh: "'+item.TEN+'" ',
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
              title={'Nhân viên bán hàng: '+l.TEN }
              subtitle={l.TRANGTHAI1 =="0" ?'Trạng thái: Chưa duyệt':'Trạng thái:Đã duyệt' }
              rightIcon={()=>( <Icons
                name={ 'checked' }
                size={18}
                color={ l.TRANGTHAI1==1?'green': 'gray' }
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
)(Duyettraituyen);