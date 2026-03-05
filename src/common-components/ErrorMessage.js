import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../theme';
import TextCmp from './TextCmp';
import {RFValue} from 'react-native-responsive-fontsize';

const ErrorMessage = ({
  color= Colors.textOPVCopper3,
  icon ="infocirlceo",
  Title="Thông báo",
  message,
  onPress1,
  onPress2,
  onPress3,
  action1Label,
  action2Label,
  action3Label,
}) => {
  return (
    <View tyle={styles.content}>
      <View style={[styles.errorMessageContainer, { borderLeftColor: color,}]}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <AntDesign
            style={{width: '10%'}}
            name= {icon}
            size={25}
            color={color}
          />
          <View style={styles.errorMessageText}>
            <TextCmp style={[styles.errorThongbao, {color}]}>{Title}</TextCmp>
            <TextCmp style={styles.errorThongbaoContent}>{message}</TextCmp>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {onPress3 && (
            <TouchableOpacity onPress={onPress3} style={styles.actionButton}>
              <TextCmp
                style={[styles.actionButtonText, {color: Colors.textOPVBlue}]}>
                {action3Label}{' '}
              </TextCmp>
              <AntDesign name="right" size={16} color={Colors.textOPVBlue} />
            </TouchableOpacity>
          )}
          {onPress2 && (
            <TouchableOpacity onPress={onPress2} style={styles.actionButton}>
              <TextCmp
                style={[styles.actionButtonText, {color: Colors.textOPVGreen}]}>
                {action2Label}{' '}
              </TextCmp>
              <AntDesign name="right" size={16} color={Colors.textOPVGreen} />
            </TouchableOpacity>
          )}
          {onPress1 && (
            <TouchableOpacity onPress={onPress1} style={styles.actionButton}>
              <TextCmp style={[styles.actionButtonText, {color: color}]}>{action1Label} </TextCmp>
              <AntDesign name="right" size={16} color={color} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  errorMessageContainer: {
    //backgroundColor: '#fff7f4',
    backgroundColor: '#fff7f4',
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 10,
    margin: 10,
    minHeight: 60,
    marginBottom: 0,
  },
  errorThongbao: {

    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  errorThongbaoContent: {
    color: Colors.text,
    fontSize: RFValue(12),
  },
  errorMessageText: {
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: RFValue(10),
    alignSelf: 'center',

  },
  closeButton: {
    marginLeft: 10,
  },
});

export default ErrorMessage;
