
import React from 'react';
import {
  View,
  Dimensions,
  Alert, Modal, StyleSheet, Pressable,
} from 'react-native';
import { TextCmp, } from '../../../../../common-components';
import { Colors, } from '../../../../../theme';
import { IDs, } from '../../../..';
import { WebView, } from 'react-native-webview';
import { BarIndicator } from 'react-native-indicators';

const { width, height } = Dimensions.get('window');

export default class ViewQuatanghtml extends React.Component {
  renderLoading = () => (
    <View style={{ position: "absolute", top: height / 2, left: width / 2 }}>
      <BarIndicator color={Colors.HeaderColor} size={20} />
    </View>
  );

  render() {
    const { modalVisible, setModalVisible,linkqua } = this.props;

    return (
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        source={{ uri: linkqua }}
        startInLoadingState={true}
        renderLoading={this.renderLoading}
        scalesPageToFit
      />
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'red'
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    // width,
    // height
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});