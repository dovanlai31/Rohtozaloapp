import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from '../assets/Icons';
import TextCmp from './TextCmp';
import { Colors } from '../theme';
import { RFValue } from 'react-native-responsive-fontsize';

const DropdownInput = ({ label, text, onPress, hightLight, starCheck = false }) => {
  return (
    <View style={styles.view}>
      <View style={styles.viewInpu3}>
        <TouchableOpacity style={[styles.dropdownView, { borderColor: hightLight ? Colors.textOPVRed : '#928D8D' , borderWidth: hightLight ? 1.5: 0.5}]} onPress={onPress}>
          <TextCmp style={{ flex: 1, fontSize: RFValue(12) }}>{text}</TextCmp>     
          <Icon color='gray' name="down-arrow" size={12} />
        </TouchableOpacity>
      </View>
      <TextCmp style={styles.viewInput2}> {label}<TextCmp style={{  fontSize: RFValue(14) , color:'red' }}>{starCheck?' * ':' '}</TextCmp></TextCmp>
    </View>
  );
};

const styles = {
  view: {  marginTop: 10 ,
	flex:1
},
  dropdownView: {
    height: 50,
    borderWidth: 1,
    borderColor: '#928D8D',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
	fontSize: RFValue(12)
  },
  viewInput2: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '900',
    borderBottomWidth: 0,
    borderColor: '#928D8D',
    marginHorizontal: 30, 
    color: '#928D8D',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
	  fontSize: RFValue(12),
    
 
  },
  viewInpu3: {
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 10,
  },
};

export default DropdownInput;
