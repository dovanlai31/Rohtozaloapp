/**
 * @author vanlai
 * @email [vanlai@mail.com]
 * @create date 2019-04-12 13:46:05
 * @modify date 2019-04-12 13:46:05
 * @desc [description]
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import {AppNavigation} from '../../app-navigation';
import {Colors} from '../../theme';
import {TextCmp} from '../../common-components';
//import Icons from '../../assets/Icons';
import {normalize} from '../../theme/FontSize';
const {height} = Dimensions.get('window');

export default class ViewDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }
  componentDidMount() {
    // if (this.props.mutidata) {
    this.setState({content: this.props.content});
    // }
  }

  onChangeTextSearch(text) {

    let content = this.props.content;
    content = content.filter(
      cus => (cus.label+ '').toLowerCase().indexOf(text.toLowerCase()) > -1,
    );

    this.setState({content})
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
          <TextCmp style={styles.title}>{title}</TextCmp>
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

        {input && (
          <TextInput
            style={{
              textAlign: 'center',
              color: 'rgba(0,0,0,0.9)',
              width: 200,
            }}
            onChangeText={text => onChangeText(text)}>
            {/* {content} */}
          </TextInput>
        )}
        {content && (
          <>
        
            {!input &&
              mutidata &&
              this.state.content.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.row}
                  onPress={() => {
                    let tam = [];
                    this.state.content.map(x => {
                      let t = x;
                      if (item.label == x.label) {
                        t.isselect = !item.isselect;
                      }
                      tam.push(t);
                    });
                    let datatam = this.state.content;
                    datatam = tam;
                    this.setState({content: datatam});
                    onPressItem(item, index);
                    //Notify.hide();
                  }}>
                  {/* <View style={item.isselect?styles.viewrow2:styles.viewrow}></View> */}

                  {/* <Icons
                    name={item.isselect ? 'checked' : 'nocheck'}
                    size={16}
                    color={item.isselect ? Colors.HeaderColor : null}
                  /> */}

                  <TextCmp style={styles.txtrow}>
         
                    {item.Ten ? item.Ten : item.Ten }
                  </TextCmp>
                </TouchableOpacity>
              ))}

            {!mutidata && content && (
              <FlatList
                // ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
                //   <View style={[style.separator, highlighted && {marginLeft: 0}]} />
                // )}
                keyExtractor={(item, index) => index.toString()}
                data={content}
                renderItem={({item, index, separators}) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.row}
                    onPress={() => {
                      this._onSubmit(item);
                    }}>
                    <View style={styles.viewrow} />
          
                    <TextCmp style={styles.txtrow}>
                    {item.label ? item.label : item.label }
               
                    </TextCmp>
                  </TouchableOpacity>
                )}
              />
            )}
          </>
        )}
        <View style={styles.bottomView}>
          {input && (
            <TouchableOpacity style={styles.activeButton} onPress={this._close}>
              <TextCmp style={[styles.btnSubmitText, {color: 'gray'}]}>
                Thoát
              </TextCmp>
            </TouchableOpacity>
          )}
          {!mutidata && (
            <TouchableOpacity
              style={styles.activeButton}
              onPress={this._onSubmit}>
              <TextCmp style={styles.btnSubmitText}>
                {input ? 'Lưu' : 'Thoát'}
              </TextCmp>
            </TouchableOpacity>
          )}
          {mutidata && (
            <TouchableOpacity
              style={styles.activeButton}
              onPress={this._onSubmit}>
              <TextCmp style={styles.btnSubmitText}>Lưu</TextCmp>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  _close = () => {
    AppNavigation.dismissOverlay('1');
  };

  _onSubmit = item => {
    AppNavigation.dismissOverlay('1');
    const {onPressItem} = this.props;
    if (onPressItem) {
      onPressItem(item);
    }
  };
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    maxHeight: height - 140,
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    //android
    elevation: 1,
  },
  activeButton: {
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewrow: {
    width: 14,
    minHeight: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginRight: 7,
  },

  txtrow: {
    marginHorizontal: 10,
    width: '80%',
    fontSize: normalize('16'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    margin: 5,
    // color: '#517F94',
    width: '100%',
    textAlign: 'center',
  },
  row: {
    minHeight: 45,
    flexDirection: 'row',
    paddingVertical: 5,
    width: '100%',
    justifyContent: 'flex-start',

    alignItems: 'center',
  },
  topView: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bottomView: {
    borderTopWidth: 1,
    borderColor: Colors.backgroundL2,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor: '#E3E7EA',
  },
  btnSubmitText: {
    fontWeight: 'bold',
    marginTop: 5,
    color: Colors.downColor,
  },
});
