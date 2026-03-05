import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  TextComponent,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {AppNavigation} from '../app-navigation';
import Icons from '../assets/Icons';
import TextCmp from './TextCmp';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../theme';
const {height} = Dimensions.get('window');

export default class DialogGif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    this.setState({content: this.props.content});
  }
  render() {
    const {
      type = 'success',
      title = 'Thành công !',
      message = 'Bạn đã thực hiện thao tác thành công ',
    } = this.props;
    const {content} = this.state;
    const containerStyle =
      type === 'success' ? styles.successContainer : styles.failureContainer;
    const titleStyle =
      type === 'success' ? styles.successTitle : styles.failureTitle;

    return (
      <View style={[styles.container]}>
        <View style={styles.TopButton}>
          <View style={[styles.TopButtonIcon, containerStyle]}>
            <FontAwesome5
              name={type == 'success' ? 'check' : 'umbrella-beach'}
              size={32}
              color="#fff"
            />
          </View>
        </View>

        <View style={styles.topView}>
          <TextCmp style={[styles.title, titleStyle]}>{title}</TextCmp>
        </View>

        <TextCmp style={styles.message}>{message}</TextCmp>
        <TouchableOpacity
          style={[styles.activeButton, containerStyle]}
          onPress={this._close}>
          <TextCmp style={styles.btntCloseText}>{'Đóng'}</TextCmp>
        </TouchableOpacity>
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
  container: {
    backgroundColor: 'rgba(255,255,255,1.0)',
    width: '70%',
    alignItems: 'center',
    borderRadius: 10,
    maxHeight: height - 180,
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    // shadowOffset: { width: 0, height: 13, },
    // shadowOpacity: 0.5,
    // shadowRadius: 6,
    //android
    elevation: 1,
  },
  TopButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopButtonIcon: {
    position: 'absolute',
    top: -30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.textOPVGreen,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  successContainer: {
    backgroundColor: Colors.textOPVGreen,
  },
  failureContainer: {
    backgroundColor: Colors.textOPVRed,
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successTitle: {
    color: Colors.textOPVGreen,
  },
  failureTitle: {
    color: Colors.textOPVRed,
  },
  activeButton: {
    backgroundColor: Colors.textOPVGreen,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 30,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  btntCloseText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    fontSize: RFValue(14),
    marginBottom: 20,
    marginHorizontal: 20,
    color: Colors.textOPVGray,
  },

  topView: {
    // backgroundColor: Colors.HeaderColor,

    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
