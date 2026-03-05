/**
 * @author: Lai.do
 * @date: 2018-12-07 22:28:51 
 *  
 * 
 */
import React from 'react';
import { Text, StyleSheet, } from 'react-native';
import { Colors, Fonts, } from '../theme';
export default (props = {}) => {
  return (
    <Text   {...props} style={[styles.text, props.style,]}>
      {props.children}
      
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.colorOpacity(9),
    fontFamily: Fonts.Default.regular,
    fontSize: 16,
    
  },
});
