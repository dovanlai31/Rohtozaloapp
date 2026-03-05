/**
 * @author: Lai.do
 * @date: 2018-12-12 21:17:35 
 *  
 * 
 */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors, } from '../../../theme';
import { TextCmp, } from '../../../common-components';

export default class LoginSubmitButton extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate({isLoading,}){
    return (this.props.isLoading !== isLoading);
  }

  render(){
    const {register, isLoading, } = this.props;
    return <TouchableOpacity style={styles.container} onPress={register}>
      {!isLoading && <TextCmp style={styles.text}>
        Register
      </TextCmp> || <ActivityIndicator color={Colors.selectedColor} />}
    </TouchableOpacity>;
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