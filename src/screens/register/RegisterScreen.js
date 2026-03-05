/**
 * @author: thai.nguyen
 * @date: 2018-12-12 15:20:03
 *
 *
 */
import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, } from 'react-native';

import { Colors, } from '../../theme';
import { TextCmp, } from '../../common-components';
import RegisterInput from './register-input';
import RegisterSubmit from './register-submit';

export default class RegisterScreen extends React.Component {
  static options = {
    topBar: {
      title: {
        text: 'Register',
      },
    },
  };
  render() {
    const { goBack, navigator, onSuccess, } = this.props;
    const ViewContainer = Platform.select({
      ios: KeyboardAvoidingView,
      android: View,
    });
    return (
      <ViewContainer style={styles.container} behavior={'padding'} >
        <ScrollView>
          <TextCmp style={styles.appName}>FINTEGRIX</TextCmp>
          <RegisterInput />
          <RegisterSubmit navigator={navigator} onSuccess={onSuccess} />
          <TextCmp onPress={goBack} style={styles.textRow}>
            Already Registered?
            <TextCmp style={styles.loginText}> Login</TextCmp>
          </TextCmp>
        </ScrollView>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '8%',
  },
  appName: {
    color: Colors.selectedColor,
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    marginVertical: 20,
  },
  textRow: {
    color: '#fff',
    textAlign: 'center',
  },
  loginText: {
    color: Colors.selectedColor,
    fontWeight: '500',
  },
});
