import  React  from 'react';
import {View,StyleSheet,Platform,TouchableOpacity,FlatList, Image,} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import { Avatar, } from 'react-native-elements';
import { Colors, } from '../../../../theme';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { IDs, } from '../../..';
import { CommonIcons, ImgHotro } from '../../../../assets';
import { Navigation } from 'react-native-navigation';
import { AppNavigation } from '../../../../app-navigation';
import { RFValue } from 'react-native-responsive-fontsize';


export default class ViewKhaoSat extends React.Component{
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      style:  'light',
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
        text: 'Khảo sát',
      },
    },
  };
  constructor(props) {
    super(props);
    this.state = {


    };
    
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  shouldComponentUpdate(datakhaosat){
    return false;
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop();
      AppNavigation.dismissAllModals();
    }
  }

  goTraloiKS=(item)=>()=>{
    const {navigator,}= this.props;
    navigator._push({
      name:  IDs.TraloiKSTT,
      options:{
        topbar:{
          //visible: false,
          background: {
            color: Colors.HeaderColor,
          },
          
        },
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        item: item,
      },
     

    });

  }
  renderItem = ({item, index}) => {
    const backgroundColor = index % 2 === 0 ? 'white' : 'white'; 

    return (
      <TouchableOpacity style={[styles.row, { backgroundColor }]} onPress ={this.goTraloiKS(item)} >
        <View style={styles.viewRow}>
          <View style={{ alignContent: 'center', justifyContent: 'center', width: '15%', padding: 5, }}>
            <Image source={ImgHotro.ListKhaoSat} style={{width: 32, height: 32}}></Image>
        
            {/* <Avatar
              small
              rounded
              title={item.TIEUDE.slice(0, 1)}
              activeOpacity={0.7
              
              }
              // titleStyle={{ color: backgroundAvatar }}
              // containerStyle={{ borderColor: backgroundAvatar, ,borderWidth: 2 }} 
              >
              </Avatar> */}
          </View>
          <View style={styles.viewtxt}>
            <TextCmp style={{  color: Colors.textOPVBlue, fontSize:RFValue(12), textTransform: 'uppercase' }} numberOfLines={2}>{item.TIEUDE}</TextCmp>
            <TextCmp style={{fontSize:RFValue(12)}} numberOfLines={2}>{item.SOCAUHOI} câu hỏi </TextCmp>
            <TextCmp   style={{fontSize:RFValue(12)}}numberOfLines={1}>{item.BOPHAN} </TextCmp>
          </View>    
           
        </View>

      </TouchableOpacity>
    );
  }
  render(){

    return(
      <View style={styles.containt}>
        {
          this.props.datakhaosat ?
            <FlatList
              style={{ backgroundColor:Colors.backgroundL3 }}
              data={this.props.datakhaosat}
              initialNumToRender={10}
              extraData={this.props.datakhaosat}
              keyExtractor={(item) => item.PK_SEQ+''}
              renderItem={({ item, index }) => this.renderItem({item, index})}
              // horizontal={true}
            /> : <TextCmp style={{ justifyContent: 'center', }} >không có khảo sát</TextCmp>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containt:{flex:1, backgroundColor:Colors.backgroundL3},
  row: {
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 5,
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // shadowColor: Colors.BackgrondLightOPV,
    // shadowOffset: { height: 1, width: 0, },
    // //android
    // elevation: 2,
    flexDirection: 'row',
    borderRadius:5
  },
  viewRow:{ flexDirection: 'row', height: 85, alignContent: 'center', padding: 10, },
  viewtxt:{ justifyContent: 'center', width: '85%', },
});