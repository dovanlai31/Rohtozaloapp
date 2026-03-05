import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors, } from '../../../theme';
import { TextCmp, } from '../../../common-components';
import { WebView } from 'react-native-webview';
export default class SceneQuyenloi extends React.Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      visible: true,
    },
    topBar: {
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },
    
      title: {
        text: '',
      },
      backButton: {
        color: '#fff',
      },
    },
  };

  render(){
    let abc= `https://docs.google.com/gview?embedded=true&url=${this.props.data}`
    console.log('xxxyy', abc);
    return (
      <View style={{flex:1,}}>     
        <WebView
          source={{
            uri: `https://docs.google.com/gview?embedded=true&url=${this.props.data}`,
          }}
        />        
      </View>
    );
  }
}
