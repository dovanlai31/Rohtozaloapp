import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet, Text} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {Colors} from '../theme';
const LoadingView = ({isVisible, valueLoading}) => {
  return (
      
    isVisible   ?  <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
      
          <ProgressBarAnimated
          width={200}
          height={3}
          value={valueLoading}
          backgroundColor={Colors.Analogus2}
          backgroundColorOnComplete={Colors.Analogus}
          borderWidth={0}
          borColor={0}
          borderRadius={0}
        />
        </View>
      </View> :null
      
   
  );
};


  const styles = StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent', // Set background color to transparent
      zIndex: 9999, // Set z-index high to overlay other components
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: Colors.BackgrondLightOPV5, // Set background color for the container
      borderRadius: 10, // Add border radius to make it look better
    },
  });

export default LoadingView;
