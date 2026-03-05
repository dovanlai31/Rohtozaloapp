import React from 'react';

import { TouchableOpacity, Text} from 'react-native';
import Icons from '../../../../../assets/Icons';
import { Colors } from '../../../../../theme';


export default function RowCheckbox({
  label,
  value,
  onChangeValue
}){
  return <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5, marginBottom: 5}} onPress={()=>onChangeValue(!value)}>
    <Icons name={value&&'checked'||'nocheck'} color={Colors.HeaderColor} size={20}/>
    <Text style={{fontSize: 16, color: 'rgba(0,0,0,0.9)', marginLeft: 10}}>{label}</Text>
  </TouchableOpacity>
}