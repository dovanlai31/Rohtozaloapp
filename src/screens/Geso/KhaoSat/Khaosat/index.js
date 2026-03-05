import  React  from 'react';
import {View,StyleSheet,Platform,TouchableOpacity,FlatList,} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import { Avatar, } from 'react-native-elements';
import { Colors, } from '../../../../theme';
import { IDs, } from '../../..';


export default class Khaosat  extends React.Component{


  shouldComponentUpdate(datakhaosat){
    return false;
  }
  goTraloiKS=(item)=>()=>{
    const {navigator,}= this.props;
    navigator._push({
      name:  IDs.TraloiKS,
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
      backButton: {
        color: '#fff',
      },

    });

  }
  renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.row} onPress ={this.goTraloiKS(item)} >
        <View style={styles.viewRow}>
          <View style={{ alignContent: 'center', justifyContent: 'center', width: '15%', margin: 5, }}>
            <Avatar
              small
              rounded
              title={item.TIEUDE.slice(0, 1)}
              activeOpacity={0.7}></Avatar>
          </View>
          <View style={styles.viewtxt}>
            <TextCmp style={{ fontWeight: 'bold',fontSize:12, }} numberOfLines={2}>{item.TIEUDE}</TextCmp>
            <TextCmp numberOfLines={2}>{item.SOCAUHOI} câu hỏi </TextCmp>
            <TextCmp numberOfLines={1} style={{ fontSize: 12, }}>{item.BOPHAN} </TextCmp>
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
              style={{ backgroundColor: '#ffff', }}
              data={this.props.datakhaosat}
              initialNumToRender={10}
              extraData={this.props.datakhaosat}
              keyExtractor={(item) => item.PK_SEQ+''}
              renderItem={({ item, }) => this.renderItem(item)}
              // horizontal={true}
            /> : <TextCmp style={{ justifyContent: 'center', }} >không có khảo sát</TextCmp>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containt:{flex:1,},
  row:{ backgroundColor: Colors.backgroundColor,  },
  viewRow:{ flexDirection: 'row', height: 85, borderBottomWidth: 0.5, alignContent: 'center', borderColor: Colors.backgroundL1, padding: 5, },
  viewtxt:{ justifyContent: 'center', width: '80%', },
});