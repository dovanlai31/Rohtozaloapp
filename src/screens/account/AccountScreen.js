/**
 * @author: Lai.do
 * @date: 2018-11-29 17:22:52 
 *  
 * 
 */
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class AccountScreen extends React.Component {
  
  render(){
    console.log(this.props);
    return (
      <View>
        <Text>Account screen</Text>
      </View>
    );
  }
}