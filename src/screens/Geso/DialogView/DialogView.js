/**
 * @author vanlai
 * @email [vanlai@mail.com]
 * @create date 2019-04-12 13:46:05
 * @modify date 2019-04-12 13:46:05
 * @desc [description]
 */



import React from 'react';
import { StyleSheet, View, TouchableOpacity,ScrollView,Dimensions,TextInput, } from 'react-native';
import { AppNavigation, } from '../../../app-navigation';
import { Colors, } from '../../../theme';
import { TextCmp ,} from '../../../common-components';
import Icons from '../../../assets/Icons';
import { RFValue } from 'react-native-responsive-fontsize';
const {height,}=Dimensions.get('window');

export default class ViewDialog extends React.Component {

  constructor(props){
    super(props);
    this.state={
      content:[],
    };

  }
  onChangeTextSearch(text) {
    let content = this.props.content;
    console.log('textxxxx', content);
    content = content&&content.filter(
      cus => (cus.label + '').toLowerCase().indexOf(text.toLowerCase()) > -1,
     
    );
    console.log('contentxx',content)
    this.setState({content});
  }
  componentDidMount(){

    this.setState({content:this.props.content,})
  }
  render() {
    const {
      title,
      input,
      onChangeText,
      mutidata,
      onPressItem,
      showSearch,
    } = this.props;
    const {content} = this.state;
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topView}>
          {/* <TextCmp style={styles.title}>{title}</TextCmp> */}
        </View>
        {showSearch && (
          <View
            style={{
              height: 40,
              width: '90%',
              backgroundColor: '#eeeeee',
              borderRadius: 20,
              paddingHorizontal: 20,
            }}>
            <TextInput
              placeholder={'Tìm kiếm'}
              onChangeText={text => this.onChangeTextSearch(text)}
              style={{height: '100%'}}
            />
          </View>
        )}
        {input&&
          <TextInput
            style={{
              textAlign: 'center',
              color: 'rgba(0,0,0,0.9)',
              width:200,
            }}
            onChangeText={(text) => onChangeText(text)}
          >
            {/* {content} */}
          </TextInput>
        }
        {content&&< ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10, marginTop: 10, marginHorizontal: 20, }}
        >
          {!input&& mutidata && this.state.content.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.row}
              onPress={() => {

                let tam=[];
                this.state.content.map((x)=>{
									
                  let t = x;
                  if(item.label==x.label)
                  {t.isselect=!item.isselect;}
                  tam.push(t);
                });
                let datatam= this.state.content;
                datatam=tam;
                this.setState({ content:datatam,} );
                onPressItem(item, index);
                //Notify.hide();
              }}
            >
              {/* <View style={item.isselect?styles.viewrow2:styles.viewrow}></View> */}
             
              <Icons 
                name={item.isselect ? 'checked' : 'nocheck'}
                size={16}
                color={item.isselect ? Colors.HeaderColor : null}
              />

              <TextCmp style={styles.txtrow} >
                { item.name?item.name:item.ten?item.ten:item.label}
              </TextCmp>
            </TouchableOpacity>
          ))}

          {!mutidata && content&& content.map((item, index) => {
            return(
              <TouchableOpacity
                key={index}
                style={styles.row}
                onPress={() => {
                  this._onSubmit(item);
                }}
              >
                <View style={styles.viewrow}></View>
                <TextCmp  numberOfLines={3} style={styles.txtrow} >
                  { item.name?item.name:item.ten?item.ten:item.label}
                </TextCmp>
              </TouchableOpacity>
            );})}
        </ScrollView>
        }
        <View style={styles.bottomView}>
          {input&& <TouchableOpacity style={styles.activeButton} onPress={this._close}>
            <TextCmp style={[styles.btnSubmitText,{color:'gray',},]} >Thoát</TextCmp>
          </TouchableOpacity>}
          {!mutidata&&<TouchableOpacity style={styles.activeButton} onPress={this._onSubmit}>
            <TextCmp style={styles.btnSubmitText}>{input?'Lưu ghi chú':'Thoát'}</TextCmp>
          </TouchableOpacity>}
          {mutidata&&<TouchableOpacity style={styles.activeButton} onPress={this._onSubmit}>
            <TextCmp style={styles.btnSubmitText}>Lưu</TextCmp>
          </TouchableOpacity>}
        </View>
      </View>
    );
  }

  _close = () => {

    AppNavigation.dismissOverlay('1');

  };

  _onSubmit = (item) => {
    AppNavigation.dismissOverlay('1');
    const { onPressItem, } = this.props;
    if(onPressItem ){
      onPressItem(item);
     
    }
  }


}

const styles = StyleSheet.create({

  contentContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    maxHeight:height-180,
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    // shadowOffset: { width: 0, height: 13, },
    // shadowOpacity: 0.5,
    // shadowRadius: 6,
    //android
    elevation: 1,
  },
  activeButton:{height:'100%',width:100,alignItems:'center',justifyContent:'center',},
  viewrow:{
    width: 14,
    minHeight: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginRight: 7,

  },

  txtrow:{
    marginHorizontal:10,
    width: '80%',
    fontSize: RFValue(12)
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#517F94',
    width:'100%',
    textAlign:'center',
  },
  row:{ minHeight:45,flexDirection: 'row', paddingVertical: 5,    width:'100%', justifyContent: 'flex-start', alignItems: 'center', },
  topView:{
    // backgroundColor: Colors.HeaderColor,
    height:20,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

  },
  bottomView:{
    borderTopWidth:1,
    borderColor:Colors.backgroundL2,
    width:'100%',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',

  },
  btnSubmitText:{
    fontWeight: 'bold',
    marginTop: 5,
    color:Colors.textOPVGreen,
  },
  
});
