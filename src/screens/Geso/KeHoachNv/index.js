import React from "react";
import {Alert } from "react-native";
import ViewKhnv from "./ViewKhnv";
import { Fonts } from "../../../theme";
import { CommonIcons } from "../../../assets";
import { Navigation } from "react-native-navigation";
import moment from 'moment';
import { AppNavigation } from "../../../app-navigation";
import ViewDialog from "../DialogView/DialogView";
import { GetKeHoachNV,updateKeHoachNhanVienChot } from './actions';
import {connect } from 'react-redux'
const listLoainv = [
 // { ten: 'Loại Nhân Viên ', key: '', },
  { ten: 'RSM', key: '1', },
  { ten: 'ASM', key: '2', },
  { ten: 'GSSBH', key: '3', },
];
 class KHNV extends React.Component {
  static options = {
    topBar: {
      title: {
        text: "Kế hoạch nv",
        color: "#fff",
        fontFamily: Fonts.Default.bold
      },
      rightButtons: [
        {
          id: 'btntop',
          icon: CommonIcons.done,           
        },
      ],
     
    }
  };
  constructor(props) {
	  super(props);
	  this.state = {
      payload: {
  
        tungay: moment(new Date()).format('YYYY-MM-DD'),
        //denngay: moment(new Date()).format('YYYY-MM-DD'),
  
      },
      data:null,
      currentLoainv:  { ten: 'Loại Nhân Viên ', key: '', }
	  };
  }
  
  componentDidMount() {
	  this.navigationEventListener =   Navigation.events().bindComponent(this);
	   this.GetKeHoachNV();
  }
  GetKeHoachNV(){
    let  search=this.state.currentLoainv.key+"#"+this.state.payload.tungay.slice(5,7)+"#"+this.state.payload.tungay.slice(0,4)+"#"+"#";//+"#"+searchData.vungId+"#"+ searchData.khuvucId;
    let parms={
      nhanvienId: this.props.listBranch.USERID,
      search:search
    }
    this.props.dispatch(GetKeHoachNV(parms)).then(res=>{
      //alert(JSON.stringify(res))
      if(res){
        this.setState({data:res})
      }
      else
      this.setState({data:[]})

    })
  }
  setFromTime = (date) => {
    const { payload, } = this.state;
    payload.tungay = date;
    this.setState({ payload, });
  };
  onPressBtn=()=>{
        
    AppNavigation.showCommonDialog({renderContent: ()=> 
      <ViewDialog  title={'Loại Nhân Viên'} 
        content={listLoainv} 
        onPressItem ={(item)=>{
          if(item.ten&&item.ten.length>1)
          this.setState({currentLoainv:item,});
        }}
      />,});
      
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'btntop') {
      this.GetKeHoachNV();
    }
  }
  pressItem=(item)=>{
   // alert(JSON.stringify(item))
    let tt=''
    if(item.trangthai==0){
     tt='Bạn có muốn chốt'
     trangthai=1
    }
    else{
      tt='Bạn có muốn mở chốt';
    }
    
    Alert.alert(
      'Thông báo',
      ''+tt,
      [
       
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.updateKeHoachNhanVienChot(item)},
      ],
      {cancelable: false},
    );
  }
  updateKeHoachNhanVienChot(item){

    let parms={
      nhanvienId: this.props.listBranch.USERID,
      nppId:"",//search
      pk_seq:item.pk_seq,
      trangthai:item.trangthai==0?1:0,
    }
    this.props.dispatch(updateKeHoachNhanVienChot(parms)).then(res=>{
      //alert(JSON.stringify(res))
      if(res){
        Alert.alert('Thông Báo', res[0].MSG)
      }
    })
  }
  render() {
    return <ViewKhnv 
      time ={this.state.payload}
      setFromTime={this.setFromTime}
      data={this.state.data}
      onPressBtn={this.onPressBtn}
      listLoainv={listLoainv}
      currentLoainv={this.state.currentLoainv}
      pressItem={this.pressItem}
     />;
  }
}
export default connect(
  (state) => ({
    listBranch: state.app.listBranch,
    SearchData: state.SearchData,
  }),
  (dispatch) => ({ dispatch, }),
)(KHNV);