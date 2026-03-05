/**
 * @author: Lai.do
 * @date: 2018-12-12 20:39:35 
 *  
 * 
 */
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import R from 'ramda';

import { Colors, } from '../../../theme';
import { TextCmp, } from '../../../common-components';

const inputFields = [
  {
    key: 'firstName',
    label: 'First Name',
    keyboardType: 'default',
    autoFocus: true,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    keyboardType: 'default',
  },
  {
    key: 'email',
    label: 'Email',
    keyboardType: 'email-address',
    
  },
  {
    key: 'password',
    label: 'Password',
    keyboardType: 'default',
    isPass: true,
  },
  {
    key: 'referralCode',
    label: 'Referral ID (optional)',
    keyboardType: 'default',
  },
];

export default class RegisterInput extends React.Component {
  static options = {
    topBar: {
      title: {
        text: 'Register',
      },
    },
  }
  static propTypes = {
    registerInput: PropTypes.object,
  }

  state = {
    dataFocus: [true, false, false,],
  };

  shouldComponentUpdate({registerInput,}){
    return (registerInput !== this.props.registerInput);
  }

  _onFocus = (index) => {
    const { dataFocus, } = this.state;
    dataFocus[index] = true;
    this.setState(dataFocus);
  };

  _onBlur = (index) => {
    const { dataFocus, } = this.state;
    dataFocus[index] = false;
    this.setState(dataFocus);
  }

  _renderInputField = (field, index) => {
    const { registerInput, onChangeRegisterInput, } = this.props;

    const borderColor = this.state.dataFocus[index]
      ? Colors.selectedColor
      : 'rgba(255,255,255, 0.4)';

    const { key, label, keyboardType, autoFocus, isPass, } = field;
    const value = R.pathOr('', [key,], registerInput);

    return (
      <View style={styles.inputView} key={index}>
        <TextCmp style={styles.label}>{label}</TextCmp>
        <TextInput
          style={[styles.input, { borderColor, },]}
          value={value}
          autoFocus={!!autoFocus}
          autoCapitalize="none"
          keyboardType={keyboardType}
          onFocus={() => this._onFocus(index)}
          onBlur={()=>this._onBlur(index)}
          secureTextEntry={!!isPass}
          onChangeText={(value) => onChangeRegisterInput(key, value)}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  };

  render(){
    return <View style={styles.container}>
      {inputFields.map(this._renderInputField)}
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  inputView: {
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: Colors.backgroundL1,
    color: '#fff',
    fontSize: 16,
  },
});