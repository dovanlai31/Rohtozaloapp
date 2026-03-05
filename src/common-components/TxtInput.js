import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import Icon from '../assets/Icons';
import TextCmp from './TextCmp';
import {Colors} from '../theme';
import { RFValue } from 'react-native-responsive-fontsize';
export default (TxtInput = ({
  label,
  text,
  offeditable,
  onChange,
  hightLight,
  secureTextEntry,
  keyboardType,
  starCheck = false ,
}) => {
  return (
    <View style={styles.view}>
      <View style={styles.viewInpu3}>
        <TextInput
          multiline={true} 
          editable={!offeditable}
          keyboardType={keyboardType}
          value={text}
          style={[
            styles.dropdownView,
            {borderColor: hightLight ? Colors.textOPVRed : '#928D8D', borderWidth: hightLight ? 1.5 : 0.5},
          ]}
		      onChangeText={onChange}
          secureTextEntry={secureTextEntry}>

          {/* <Icon color='gray' name="down-arrow" size={18} /> */}
        </TextInput>
      </View>
      <TextCmp style={styles.viewInput2}>{label}<TextCmp style={{  fontSize: RFValue(14) , color:'red' }}>{starCheck?' * ':' '}</TextCmp> </TextCmp>
    </View>
  );
});

const styles = {
  view: {marginTop: 10, flex: 1},
  row: {flexDirection: 'row'},
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  dropdownView: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#928D8D',
	fontSize: RFValue(12),
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
    color: 'black',
  },
  viewInput2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderColor: '#928D8D',
    // marginBottom: 10,
    marginHorizontal: 30,
	  fontSize:RFValue(12),
    // width: width - 50,
    color: '#928D8D',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    fontWeight: '900',
  },
  viewInpu3: {
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 10,
  },
};
