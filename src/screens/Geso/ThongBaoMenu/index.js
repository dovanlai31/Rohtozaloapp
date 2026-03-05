
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {connect,}from'react-redux';
import { getListNotify, } from './actions';
import { TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';
import Icons from '../../../assets/Icons';
import { HomeICon, } from './../../../assets/index';
import { IDs, } from '../..';
const {width,}= Dimensions.get('window');
class ThongBaoMenu extends React.Component {
  constructor(){
    super();
    this.state={
      listdata:null,
    };
  }
  componentDidMount(){
    this.getdata();
  }
  getdata(){
    let a=[];
    this.props.dispatch(getListNotify({ manhanvien: this.props.ddkdId, }))
      .then((data) => {
        if (data[0].RESULT =='1') {
          let count = 0;
          JSON.parse(data[0].MSG).map((item) => {
            if (item.TRANGTHAI == '0') {
              count += 1;
              a.push( item);
            }
          });
         
          this.setState({listdata:a,});
         
        }
        else
        {this.setState({listdata:null,});}
      });
  }
  goscenefile(item){
    this.props.navigator._push({
      name: IDs.ThongBaoMenu,  //.Register,
      passProps: {
        data:item,
      },
      options: {         
        topBar: {
          title: {
            text:'Xem Thông Báo',
          },
        
        },
        bottomTabs:{
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
     
    });
  }
  onpresitem=(item)=>()=>{
    // Alert.alert(item.TIEUDE,item.NOIDUNG,
    //   [
    //     {text: 'Xem File', onPress: () => this.goscenefile(item),},
       
    //     {text: 'OK', onPress: () => null,},
    //   ],
    // );
    // alert(JSON.stringify(item));
    this.props.navigator._push({
      name: IDs.XemThongbao,  //.Register,
      passProps: {
        data:item,
      },
      options: {         
        topBar: {
          title: {
            text:'Xem Thông Báo',
          },
        
        },
        bottomTabs:{
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
     
    });



  }
  renderItem(item){
   
    return(
      <TouchableOpacity style={styles.row} onPress={this.onpresitem(item.item)}>
        <View style={styles.avata}>
          <TextCmp style ={{color:'white',fontWeight:'bold',}}>{item.item.TIEUDE.slice(0,1)}</TextCmp>
        </View>
        <View style ={styles.textstle}>
          <TextCmp  numberOfLines ={1} style={{  fontWeight: '400',}}>{item.item.TIEUDE }</TextCmp>
          <TextCmp numberOfLines ={2}style={{  fontSize: 14,}} >{item.item.NOIDUNG}</TextCmp>
          {/* <Text numberOfLines></Text> */}
          {item.item.filename!='0'&&
            <Image source={HomeICon.filepdfbox} style={styles.img} ></Image>
          }
        </View>
        
      </TouchableOpacity>
    );
  }
  render(){
    // if(this.state.listdata)
    // {alert(JSON.stringify(this.state.listdata));}
    return (
      <View style={styles.content}>
        {!this.state.listdata? <ActivityIndicator size="small" color={Colors.HeaderColor} />:
          <FlatList
            data={this.state.listdata}
            //extraData={data}
            keyExtractor={(item) => item.PK_SEQ+''}
            renderItem={(item)=>this.renderItem(item)}
          />
        }
      </View>
    );
  }
}
export default connect(
  (state) => ({
    ddkdId: state.app.listBranch.USERID,
  }),
  (dispatch) => ({ dispatch, }),
)(ThongBaoMenu);


const styles= StyleSheet.create({
  content:{flex:1,},
  row:{
    width,
    height:80,
    flex:1,
    justifyContent:'space-between',
    flexDirection: 'row',
    marginHorizontal:5,
    alignItems:'center',
  },
  avata:{
    backgroundColor:'red',
    width:40,
    height:40,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',

  },
  textstle:{
    flex:1,
    margin:10,
  },
  img:{width:10,height:10,tintColor:Colors.HeaderColor,},
});
