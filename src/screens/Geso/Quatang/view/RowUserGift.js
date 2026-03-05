import React from 'react';
import { View, StyleSheet, Image , TouchableOpacity } from 'react-native';
import { HomeICon, ImgOPV } from '../../../../assets';
import { Colors } from '../../../../theme';


export default ({
  leftIcon,
  children,
  hideBorder,
  showRight,
  onPress
}) => {
  return (
    <TouchableOpacity   onPress={onPress}  style={[styles.container, !hideBorder && styles.border]}>
      {!!leftIcon &&  <Image source={leftIcon} style={styles.leftIcon} />}
      <View style={styles.content}>{children}</View>
      {!!showRight &&<Image
        source={ImgOPV.backR}
        style={styles.arrowRight}
      />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.backgroundL1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  leftIcon: {
    width: 24,
    height:24,
    marginRight: 6,
  },
  arrowRight: {
    width: 14,
    height: 14,
    alignSelf: 'center',
   
  },
});
