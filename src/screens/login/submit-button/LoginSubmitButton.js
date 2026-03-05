/**
 * @author: thai.nguyen
 * @date: 2018-12-12 10:51:16
 *
 *
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, } from '../../../theme';
import { TextCmp, } from '../../../common-components';

export default class LoginSubmitButton extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate({ isLoading, }) {
    return isLoading !== this.props.isLoading;
  }

  render() {
    const { login, isLoading, } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={login}>
        {(isLoading && <ActivityIndicator color={Colors.selectedColor} />) || (
          <TextCmp style={styles.text}>Login</TextCmp>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderWidth: 1,
    borderColor: Colors.selectedColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
