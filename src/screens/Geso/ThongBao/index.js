import  React  from 'react';
import { connect, } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform,FlatList, Image, ScrollView, } from 'react-native';
import { ErrorMessage, LoadingView, TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';

import { CommonIcons, ImgBanner, ImgOPV, } from '../../../assets';
import { Avatar, } from 'react-native-elements';

import { Navigation } from 'react-native-navigation';
import { thongbao_getlist } from '../TTHoTro/Actions/Action'; // lấy từ chat 
import { IDs } from '../..';
import { AppNavigation } from '../../../app-navigation';
import { RFValue } from 'react-native-responsive-fontsize';



class ViewThongBao extends React.Component{
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
       drawBehind: false,
      style:  'light',
      visible: true,
    },
    topBar: {
      drawBehind: false, 
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
        text: 'Thông báo',
      },
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      datathongbao: null,
      loading: false,
      valueLoading: 1,
    };
    
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop();
      AppNavigation.dismissAllModals();
    }
  }
  componentDidMount() {
  
    this.thongbao_getlist();

  }

  thongbao_getlist(){
    this.setState({loading:true})
    this.props.dispatch( thongbao_getlist({ userId: this.props.userID, })).then((data) => {
      this.setState({ valueLoading :100})
      //nhah quá không nhìn thấy loading
      setTimeout(() => {
        this.setState({ loading :false})
      }, 500);
    
      if(data) {
        this.setState({ datathongbao: data})
      } 

    }); 
  }
    gokm=()=>{
      const {CtkmList,navigator,}= this.props;
      //return 
      navigator._push({
        name:  IDs.KmScreen,
        options:{
          topbar:{

            background: {
              color: Colors.HeaderColor,
            },
            leftButtons: [
              {
                id: 'CHITIETSP_BACK',
                icon: CommonIcons.back,
              },
            ],
           
          },
          bottomTabs: {
            visible: false,
            ...Platform.select({ android: { drawBehind: true, }, }),
          },
        },
        passProps: {
          listkm: CtkmList,
        },
         
      });
    }
    goThongBao(item){
      const {navigator,}= this.props;
      navigator._push({
        name: IDs.XemThongbao,  //.Register,
        passProps: {
          data:item,
        },
        options:{
          topbar:{
            background: {
              color: Colors.HeaderColor,
            },
            leftButtons: [
              {
                id: 'CHITIETSP_BACK',
                icon: CommonIcons.back,
              },
            ],
          },
          bottomTabs: {
            visible: false,
            ...Platform.select({ android: { drawBehind: true, }, }),
          },
        },
      
         
      });
    }
    onSelect(item) {

      AppNavigation.showModal({
        name: IDs.ViewDetailPromotion,
        passProps: {
          item: item,
          dispatch: this.props.dispatch,
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
                icon: CommonIcons.closeWhite,
              },
            ],
          },
        },
      });
    }



    renderItem = (item) => {
      return (
        <View style={styles.MainContent}>
     
        <TouchableOpacity onPress={()=>this.goThongBao(item)}  style={styles.GroupContent} >
        <TextCmp numberOfLines={1} style={{ fontSize: RFValue(10), color:Colors.textOPVGray }}>{item.NGAYBATDAU} - {item.NGAYKETTHUC}</TextCmp>
          <View style={{ flexDirection: 'row',  alignContent: 'center', borderColor: Colors.backgroundL1, padding: 5, }}>
            <View style={{ alignContent: 'center', justifyContent: 'center', width: '20%', padding: 5,  }}>
                <Image resizeMode='cover'  style={styles.image} source={ImgOPV.Notification}></Image>
            </View>
            <View style={{ justifyContent: 'center', width: '80%', }}>
              <TextCmp style={{ fontWeight: 'bold', fontSize: RFValue(12), paddingVertical: 5, color: Colors.textOPVGray2 }} numberOfLines={1}>{item.TIEUDE}</TextCmp>
              <TextCmp  style={{  color: Colors.textOPVGray2, fontSize: RFValue(12) }} numberOfLines={4}>{item.NOIDUNG} </TextCmp>
             </View>
          </View>
  
        </TouchableOpacity>
      
         </View>
      );
    }

    render(){
      return(
        <View style={styles.containt}>
          {this.state.loading ? ( 
              <LoadingView isVisible={this.state.loading} valueLoading={this.state.valueLoading}/>
            ) :
          <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
          {
              this.state.datathongbao ?
                <FlatList
                  style={{ backgroundColor: '#ffff', marginTop: 30, }}
                  data={this.state.datathongbao}
                  initialNumToRender={10}
                  extraData={this.state.datathongbao}
                  keyExtractor={(item) => item.PK_SEQ+''}
                  renderItem={({ item, }) => this.renderItem(item, this.props.setModalVisible)}
                  // horizontal={true}
                /> : <ErrorMessage icon='codepen' message={" Không có thông báo nào "} color={Colors.BackgrondLightOPVGreen2} />
            }
        
        
        </ScrollView>
        }
       
        </View>
      );
    }
}
const styles = StyleSheet.create({
  MainContent: {
    flex:1, alignItems: 'center',backgroundColor:Colors.BackgrondLightOPV5,
  },
  containt:{flex:1, alignItems: 'center',backgroundColor:Colors.BackgrondLightOPV5,},
  GroupContent: {
    backgroundColor:'white',
    minHeight: 150,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10,
    marginHorizontal: 10,
    borderRadius:10,
  },
  btnkm:{alignItems:'center',height:40, backgroundColor:Colors.HeaderColor, justifyContent: 'center',margin:5,},
  txtkm:{color:'white', margin:10,},
  image: {
    width: 50,
    height: 50,
    alignSelf:'center'
  }
});

export default  connect(
  (state) => ({
    CtkmList: state.ShopControl.CtkmList,
    userID: state.login.userID,
  }),
  (dispatch) => ({ dispatch, }),
)(ViewThongBao);