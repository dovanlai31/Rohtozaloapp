
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { TextCmp, } from '../../../../common-components';
const { width, height, } = Dimensions.get('window');
import { Colors, } from '../../../../theme';
import formatter from './../../fm';
import { Icon, } from 'react-native-elements';
import AppValue from '../../../../values/AppValue';
import { ImgICon, ImgOPV } from '../../../../assets';
import { RFValue } from 'react-native-responsive-fontsize';

export default class RowItem extends React.Component {

  constructor(props) {
    super();
    this.state = {
      item: null,
    };
  }
  componentDidMount() {
    this.setState({ item: this.props.item })

  }
  componentDidUpdate(prevProps) {
    //only update chart if the data has changed
    if (prevProps.item.ten !== this.props.item.ten) {
      this.setState({
        item: this.props.item,
      });
    }
  }
  // shouldComponentUpdate(item) {
  //   return item !== this.state.item;
  // }

  Themsl = () => {
    let item = this.state.item;
    item.soluong = parseInt(item.soluong) + 1;
    this.setState({ item: item, });
    this.props.onChangeText(item.pk_seq, item.soluong);

  }
  Trusl = () => {
    let item = this.state.item;
    item.soluong = parseInt(item.soluong) - 1;
    if (parseInt(item.soluong + '') <= 1) { item.soluong = 1; }
    this.setState({ item: item, });
    this.props.onChangeText(item.pk_seq, item.soluong);
  }
  // xoaspgiohang(item){
  //   this.setState({item:null});
  //   xoaspgiohang(item)
  // }
  render() {
    //alert('xxx');
    const { xoaspgiohang, onChangeText, } = this.props;
    const { item, } = this.state;
    if (item)
      return (
        <View style={styles.item}>

          <View style={styles.viewImage}>
            {item.HinhAnh == AppValue.NoImagUrl2 ?
              <Image resizeMode={'contain'} source={ImgOPV.noImage} style={styles.image}></Image> :
              <Image resizeMode={'contain'} source={{ uri: item.HinhAnh, }} style={styles.image}></Image>}
          </View>

          <View style={styles.viewRow}>
            {/* <TextCmp>{item.HinhAnh}</TextCmp> */}
            <TextCmp numberOfLines={2} style={styles.textname}>{item.ten}</TextCmp>
            <TextCmp style={styles.textdongia}>Đơn giá: {formatter.format(item.dongia)}</TextCmp>
            <View style={styles.inrowadd}>

              <View style={styles.viewdonvi}>
                <TextCmp > {item.donvi}</TextCmp>
                {/* <TextCmp >Thùng</TextCmp> */}
              </View>
              <TouchableOpacity onPress={this.Trusl} style={styles.bnt}>
                <TextCmp style={{ color: 'black', }}>-</TextCmp>
              </TouchableOpacity>
              <View style={{ width: "60%" }}>
                <TextInput keyboardType='number-pad' style={styles.inputtextview}
                  onChangeText={(text) => onChangeText(item.pk_seq, text)} value={String(this.state.item.soluong) + ''} />
              </View>
              <TouchableOpacity onPress={this.Themsl} style={styles.bnt}>
                <TextCmp style={{ color: 'black', }}>+</TextCmp>
              </TouchableOpacity>

            </View>
          </View>

          <TouchableOpacity onPress={xoaspgiohang(item)} style={{ width: 35, height: 35, position: 'absolute', right: 5, top: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              name='close'
              color='gray'
              size={18}
            ></Icon>
          </TouchableOpacity>
        </View>

      );
    return <></>
  }
}

const styles = StyleSheet.create({
  inputtextview: {
    height: 33, borderRadius: 2, alignItems: 'center', padding: 5, margin: 5, backgroundColor: '#F6F8FA',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 2.84,

    // elevation: 2,
    // width: '80%', textAlign: 'center',
    // color:'gray'
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    width: '80%', textAlign: 'center'

  },
  textdonvi: {
    alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'
  },

  bnt: {
    //android
    // elevation: 1,
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    //shadowColor: 'red',
    // shadowOffset: { height: 1, width: 0, },
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    height: 32, backgroundColor: '#F6F8FA', borderRadius: 16, alignItems: 'center', padding: 5, margin: 5, width: 32,
  },

  item: {
    flexDirection: 'row', backgroundColor: '#fafafa',
    borderBottomWidth: 0.5, borderBottomColor: '#EEEEEE',
    padding: 5,
    minHeight: 125,
    borderBottomColor: 'white', borderBottomWidth: 1,
  },
  viewImage: { width: 80, margin: 5, justifyContent: 'center', alignItems: 'center', },

  viewRow: { marginTop: 5, width: '100%', },
  image: { width: 70, height: 70, backgroundColor: '#F0F2F5', borderRadius: 10 },
  textname: { marginTop: 5, width: '55%',  fontSize: RFValue(12) },
  textdongia: { marginTop: 5, color: Colors.textOPVGreen, fontSize: RFValue(12), },
  inrowadd: { flexDirection: 'row', justifyContent: 'space-between', width: width / 2, alignItems: 'center' },
  viewdonvi: { height: 33, borderRadius: 2, alignItems: 'center', minWidth: 60, justifyContent: 'center' },
});