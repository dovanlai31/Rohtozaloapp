
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  Image
} from 'react-native';

import { TextCmp, } from '../../../../common-components';
const { width, height, } = Dimensions.get('window');
import { Colors, } from '../../../../theme';
import formatter from './../../fm';
import { Icon, } from 'react-native-elements';

export default class RowItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: { ...this.props.item, soluong: 0 }, 
    };
  }
  // componentDidUpdate(prevProps) {
   
  //   // only update chart if the data has changed
  //   if (prevProps.item.soluong !== this.props.item.soluong) {
  //     this.setState({
  //       item: this.props.item,
  //     });
  //   }
  // }
  shouldComponentUpdate(item) { 
    return item !== this.state.item;
  }

  Themsl = () => {
    let item = this.state.item;
    item.soluong = parseInt(item.soluong) + 1;
    this.setState({ item: item, });
    this.props.onChangeText(item.pk_seq, item.soluong,this.props.index);

  }
  Trusl = () => {
    let item = this.state.item;
    item.soluong = parseInt(item.soluong) - 1;
    if (parseInt(item.soluong + '') < 1) { item.soluong = 0; }
    this.setState({ item: item, });
    this.props.onChangeText(item.pk_seq, item.soluong,this.props.index);
  }
  onChangeText(pk,text){

    let item = this.state.item;   
    item.soluong =isNaN(parseInt(text))?0:parseInt(text) ;
    this.setState({ item: item, });
    this.props.onChangeText(item.pk_seq, item.soluong,this.props.index);
  }
  render() {
    //alert('xxx');
    const { xoaspgiohang, onChangeText,pressItem } = this.props;
    const { item, } = this.state;
    return (
      <View style={styles.item}>

        <TouchableOpacity onPress={()=>pressItem(item)} style={styles.viewRow}>
          <TextCmp style={[styles.textname,{width:'90%'}]}>{item.ten}</TextCmp>
          {item.hethang==1&&<TextCmp style={styles.textdongia}>Hết hàng</TextCmp>}          
          {/* <View style={styles.inrowadd}>
            <View style={styles.viewdonvi}>
              <TextCmp style={styles.textdonvi}> {item.donvi}</TextCmp>
            </View>
          </View> */}
        </TouchableOpacity>
        <View style={{width:'20%'}}><TextCmp style={styles.textdongia}>{formatter.format(item.dongia)}đ</TextCmp></View>
        <View style ={{width:'40%', flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={this.Trusl} style={styles.bnt}>
            <TextCmp style={{ color: 'black', }}>-</TextCmp>
          </TouchableOpacity>
          <View >
            <TextInput keyboardType="numeric" style={styles.inputtextview}
              onChangeText={(text) => this.onChangeText(item.pk_seq, text)} value={String(this.state.item.soluong) + ''} />
          </View>
          <TouchableOpacity onPress={this.Themsl} style={styles.bnt}>
            <TextCmp style={{ color: 'black', }}>+</TextCmp>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={()=>pressItem(item)} style={{width:25,height:25,marginHorizontal:2}}>
            <Icon size={25} name ='photo' color='gray'></Icon>
          </TouchableOpacity> */}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputtextview: { height: 33, borderRadius: 2, alignItems: 'center', padding: 5, },
  textdonvi: { alignItems: 'center', justifyContent: 'center', height: '100%', },

  bnt: {
    //android
    justifyContent:'center',
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    //shadowColor: 'red',
    shadowOffset: { height: 1, width: 0, },
    height: 32, backgroundColor: '#F6F8FA', borderRadius: 16, alignItems: 'center', padding: 5, margin: 5, width: 32,
  },

  item: { flexDirection: 'row', backgroundColor: 'white', 
  borderBottomWidth: 0.5, borderBottomColor: '#EEEEEE', padding: 5,
  alignItems:'center',

 },
  viewImage: { width: 80, margin: 5, justifyContent: 'center', alignItems: 'center', },

  viewRow: { marginTop: 5, width: '40%', },
  image: { width: 70, height: 70, },
  textname: { marginTop: 5, width: width - 95, },
  textdongia: { marginTop: 5, 
    //color: Colors.HeaderColor, 
    //fontSize: 12,
   },
  inrowadd: { flexDirection: 'row', justifyContent: 'space-between', width: width / 2, },
  viewdonvi: { height: 33, backgroundColor: '#F6F8FA', borderRadius: 2, alignItems: 'center', padding: 5, margin: 5, },
});