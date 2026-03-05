import React from 'react';
import { connect, } from 'react-redux';
import ViewChitietSP from './View/ViewChitietSP';
import {
  View,
  Animated,
  Alert,
  SafeAreaView
} from 'react-native';
import { SanPham_Info ,themspgiohang, } from './Action/ChitietSp.action';
import { Colors, } from '../../../theme';
import { SnackBar, } from '../../../utils';
import { AppNavigation, } from '../../../app-navigation';
import { IDs } from '../..';
import { CommonIcons } from '../../../assets';

class ChitetSP extends React.Component {

  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      visible: true,
    },
  }; 
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      SanPham_Info: [],
      listkm: [],
      DanhGiaList:[],
      RatingCountGroupBy:[],
      RatingCount: null,
      Listsplq:[],
      ListHinhSp:[],
      RatingAVG:null,
      modalVisible:false,
      soluong:1,
      data:props.data,
    };
    this.SanPham_Info=this.SanPham_Info.bind(this);
  }
    setModalVisible=()=> {
      this.setState({  modalVisible: !this.state.modalVisible, });
    }
    componentDidMount() {
    // alert(JSON.stringify(this.props.data));
    console.log('xxxyyy', this.props);
    this.getsplq();
    this.SanPham_Info();
     // this.setState({data:this.props.data,}); 
    }
    SanPham_Info() {
      const params = {
        userId: this.props.userID,
        spId: this.props.data.id?this.props.data.id:this.props.data.pk_seq,
      };
      this.props.dispatch(SanPham_Info(params)).then((data) => {
        if(data){
   
          this.setState({ SanPham_Info: data[0], ListHinhSp:  JSON.parse(data[0].ImageList),  listkm: JSON.parse(data[0].CtkmList), RatingCount: data[0].RatingCount,DanhGiaList: JSON.parse( data[0].DanhGiaList),RatingAVG:data[0].RatingAVG, });}
      });
      return;

    }
    getsplq(){
      //alert(this.props.data.chungloaiId);
      //alert(JSON.stringify(this.props.DataAllSP));
      const Listsplq= this.state.Listsplq;
      this.props.DataAllSP.map((item) => {
        if (this.props.data.chungloaiId === item.chungloaiId) {
          Listsplq.push(item);
        }
      });

      this.setState({Listsplq,});
    }
    _Danhgia(data) {
    //   this.props.dispatch(
    //     push({
    //       routeName: RouteKey.DanhgiaSP,
    //       params: { data: data, callback: () => this.SanPham_Info(), },
    //     })
    //   );
    }


    themspgiohang(sp){ 
     
      // if(sp.dacbiet==1&&this.props.dataLogin.mua_dacbiet==0){
      //  return Alert.alert('Thông báo', 'sản phẩm "'+sp.ten+ '" là sản phẩm đặc biệt không áp dụng cho khách hàng ' )
      // }
      // else if (sp.hethang == 1) {
      //   return Alert.alert('Thông báo', 'sản phẩm "' + sp.ten + '" đã hết hàng không thể tạo đơn có sp này')
      // }
      AppNavigation.changeBage(this.props.ShopControl.Listgiohang.length + 1); 
      sp.soluong=this.state.soluong;
      this.props.dispatch( themspgiohang(sp) );
       SnackBar.showSuccess('Thêm vào giỏ hàng thành công'); 
      //Toast.show('Thêm sp vào giỏ hàng thành công', Toast.POSITION.TOP, Toast.LENGTH.SHORT);
      this.props.navigator._pop();

    }
    onChangeSoluong(soluong){
      if(!isNaN(soluong)){
        let a= Math.round(soluong)
        this.setState({soluong:a,});
      }

        
    }
    refeshData=(item)=>()=>{
      //alert(JSON.stringify(item))
    
      this.setState({data:item,}); 
      const params = {
        userId: this.props.userID,
        spId: item.pk_seq,
      };
      this.props.dispatch(SanPham_Info(params)).then((data) => {
        if(data) {
          this.setState({ SanPham_Info: data[0],  ListHinhSp:  JSON.parse(data[0].ImageList),listkm: JSON.parse(data[0].CtkmList), RatingCount: data[0].RatingCount,DanhGiaList: JSON.parse( data[0].DanhGiaList),RatingAVG:data[0].RatingAVG, });}
      });
      return;
    }
    onSelectKM(item) {
    
      AppNavigation.showModal({
        name: IDs.ViewDetailPromotion,
        passProps: {
          item: item,
          dispatch: this.props.dispatch,
          userId: this.props.userId
        },
        options: {
          statusBar: {
            backgroundColor: Colors.statusBar,
            visible: true,
          },
          topBar: { 
           
            visible: false,
            _height: 0,
            drawBehind: true,
            title: {
              text: 'Xem chi tiết khuyết mãi',
            },
            background: {
              color: Colors.HeaderColor,
            },
          
            rightButtons: [
              {
                id: 'btntop',
                icon:CommonIcons.closeWhite,
              },
            ],
          },
        },
      });
    }


    render() {
      return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>

          <ViewChitietSP
            data={this.state.data}
            scrollY={this.state.scrollY}
            listkm={this.state.listkm}
            DanhGiaList={this.state.DanhGiaList}
            RatingCount={this.state.RatingCount}
            DanhgiaSP={(data)=>this._Danhgia(data)}
            onBack={()=>this.props.navigator._pop()}
            RatingCountGroupBy={this.state.RatingCountGroupBy}
            RatingAVG={this.state.RatingAVG}
            Listsplq={this.state.Listsplq}
            themspgiohang={(sp)=>this.themspgiohang(sp)}
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
            onChangeSoluong={(sl)=>this.onChangeSoluong(sl)}
            soluong={this.state.soluong}
            refeshData={this.refeshData}
            onSelectKM={(item)=>this.onSelectKM(item)}
            ListHinhSp={this.state.ListHinhSp}
          ></ViewChitietSP>
        </SafeAreaView>

      );

    }
}


export default connect((state) => ({
  userID: state.login.userID,
  ShopControl: state.ShopControl,
  DataAllSP:state.login.DataAllSP,
  dataLogin: state.login.dataLogin,
}), (dispatch) => ({ dispatch, }))(ChitetSP);