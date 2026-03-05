/**
 * @author: thai.nguyen
 * @date: 2018-12-12 10:40:37
 *
 *
 */
import React from 'react';
import { View, StyleSheet, TextInput, } from 'react-native';
import PropTypes from 'prop-types';
import R from 'ramda';

import { TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';

const inputFields = [
  {
    key: 'email',
    label: 'Email',
    keyboardType: 'email-address',
    autoFocus: true,
  },
  {
    key: 'pass',
    label: 'Password',
    keyboardType: 'default',
    isPass: true,
  },
];

export default class LoginInput extends React.Component {
  static propTypes = {
    loginInput: PropTypes.object,
  };

  state = {
    dataFocus: [true, false,],
  };

  shouldComponentUpdate({loginInput,}){
    return (loginInput !== this.props.loginInput);
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
    const { loginInput, onChangeLoginInput, } = this.props;

    const borderColor = this.state.dataFocus[index]
      ? Colors.selectedColor
      : 'rgba(255,255,255, 0.4)';

    const { key, label, keyboardType, autoFocus, isPass, } = field;
    const value = R.pathOr('', [key,], loginInput);

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
          onChangeText={(value) => onChangeLoginInput(key, value)}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  };

  render() {
    return <View>{inputFields.map(this._renderInputField)}</View>;
  }
}

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  inputView: {
    marginTop: 25,
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
