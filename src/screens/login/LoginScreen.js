/**
 * @author: thai.nguyen
 * @date: 2018-12-07 23:19:41
 *
 *
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { TextCmp, } from '../../common-components';
import { Logg, } from '../../utils';
import { Colors, } from '../../theme';
import { CommonIcons, } from '../../assets';
import LoginInput from './login-input';
import LoginSubmitButton from './submit-button';
const logg = Logg.create('login UI');

export default class LoginScreen extends React.Component {
  render() {
    const { close, openRegister, onSuccess, componentId,} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnClose} onPress={close}>
          <Image source={CommonIcons.close} style={styles.iconClose} />
        </TouchableOpacity>
        <View style={styles.content}>
          <TextCmp style={styles.appName}>FINTEGRIX</TextCmp>
          <LoginInput />
          <LoginSubmitButton onSuccess={onSuccess} componentId={componentId} />
          <TextCmp style={styles.forgotLink}>Forgot your pasword</TextCmp>
          <TextCmp style={styles.registerRow} onPress={openRegister}>
            Don't have an account yet?
            <TextCmp style={styles.registerLink} >
              {' '}
              Register?
            </TextCmp>
          </TextCmp>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundL3,
    paddingTop: 10,
  },
  btnClose: {
    padding: 20,
  },
  iconClose: {
    tintColor: '#fff',
    width: 20,
    height: 20,
  },
  appName: {
    color: Colors.selectedColor,
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    flex: 1,
    marginHorizontal: '8%',
  },
  forgotLink: {
    color: Colors.selectedColor,
    textAlign: 'center',
  },
  registerRow: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  registerLink: {
    color: Colors.selectedColor,
  },
});
