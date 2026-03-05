import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Colors, } from '../../../theme';

export default class ViewLoadding extends React.Component {
  
  render(){
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.HeaderColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        
    backgroundColor: 'transparent',
    justifyContent:'center',
    position: 'absolute',
    height:40,

  },
});