import React from 'react';
import { TextInput, View, Text, TouchableOpacity, Image, } from 'react-native';
import DatePicker from 'react-native-datepicker';

import Icon from '../../../../assets/Icons';
import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';

export const Input = ({ label, onChangeText, value, }) => {
  return (
    <View style={styles.view}>
      <TextCmp>{label}</TextCmp>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const DateInput = ({ label, date, onChangeDate, }) => {
  return (
    <View style={styles.view}>
      <TextCmp>{label}</TextCmp>
      <DatePicker
        androidMode='spinner'
        style={[styles.input, { width: '100%', },]}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            borderWidth: 0,
          },
        }}
        onDateChange={onChangeDate}
      />
    </View>
  );
};

export const DropdownInput = ({ label, text, onPress, }) => {
  return (
    <View style={styles.view}>
      <TextCmp>{label}</TextCmp>
      <TouchableOpacity style={styles.dropdownView} onPress={onPress}>
        <Text style={{ textAlign: 'center', flex: 1, }}>{text}</Text>
        <Icons name="down-arrow" size={20} color={Colors.HeaderColor} />
      </TouchableOpacity>
    </View>
  );
};

export const CheckBox = ({ value, onPress, label, }) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <Icon
          name={value ? 'checked' : 'nocheck'}
          size={18}
          color={value ? Colors.HeaderColor : null}
        />
        <TextCmp style={styles.text}>{label}</TextCmp>
      </TouchableOpacity>
    </View>
  );
};

export const TakePictureAndCoordinates = ({
  takePicture,
  source,
  pressXDTD,
}) => {
  return (
    <View style={styles.view}>
      <TextCmp>Xác định tọa độ và chụp ảnh đại diện(*)</TextCmp>
      <View style={styles.row}>
        <View style={styles.viewIcon}>
          <TouchableOpacity onPress={takePicture}>
            {!source ? (
              <Icon name="camera" size={70} />
            ) : (
              <Image style={styles.imgPicture} source={source} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewIcon}>
          <TouchableOpacity onPress={pressXDTD}>
            <Icon name="setlocation" size={70} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  view: { marginTop: 10, },
  row: { flexDirection: 'row', },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  dropdownView: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  text: { marginLeft: 10, },
  viewIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  imgPicture: {
    width: 150,
    height: 150,
    borderRadius:5,
  },
};
