import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Header, } from '../../common';
import Icons from '../../../assets/Icons';
import { Input, DropdownInput, CheckBox, } from '../components';

export default function ReportInMonthView({
  onChangeText,
  onPressDropdown,
  saveCustomer,
  data,
  onBack,
  onPressCheckBox,
}) {
  console.log(data);
  return (
    <View style={styles.container}>
      {data.khId.text !== '' ? (
        <Header
          title="CẬP NHẬT KHÁCH HÀNG"
          isBack={true}
          onBack={onBack}
          renderRight={() => (
            <TouchableOpacity style={styles.save} onPress={saveCustomer}>
              <Text style={styles.saveText}>Lưu lại</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Header title="CẬP NHẬT KHÁCH HÀNG" isBack={true} onBack={onBack} />
      )}

      <ScrollView style={styles.content}>
        <DropdownInput
          label={data.khId.label}
          text={data.khId.text !== '' ? data.khId.text : data.khId.title}
          onPress={() => onPressDropdown('khId')}
        />
        {data.khId.text !== '' && (
          <View>
            <Input
              label={data.ten.label}
              value={data.ten.value}
              onChangeText={(text) => onChangeText(text, 'ten')}
            />
            <Input
              label={data.dienthoai.label}
              value={data.dienthoai.value}
              onChangeText={(text) => onChangeText(text, 'dienthoai')}
            />
            <Input
              label={data.diachigiaohang.label}
              value={data.diachigiaohang.value}
              onChangeText={(text) => onChangeText(text, 'diachigiaohang')}
            />
            <DropdownInput
              label={data.tinh.label}
              text={data.tinh.text}
              onPress={() => onPressDropdown('tinh')}
            />
            <DropdownInput
              label={data.quan.label}
              text={data.quan.text}
              onPress={() => onPressDropdown('quan')}
            />
            <Input
              label={data.tennguoidd.label}
              value={data.tennguoidd.value}
              onChangeText={(text) => onChangeText(text, 'tennguoidd')}
            />
            <Input
              label={data.masothue.label}
              value={data.masothue.value}
              onChangeText={(text) => onChangeText(text, 'masothue')}
            />
            <DropdownInput
              label={data.kenhbh.label}
              text={data.kenhbh.text}
              onPress={() => onPressDropdown('kenhbh')}
            />
            <DropdownInput
              label={data.tanso.label}
              text={data.tanso.text}
              onPress={() => onPressDropdown('tanso')}
            />
            <DropdownInput
              label={data.loaikh.label}
              text={data.loaikh.text}
              onPress={() => onPressDropdown('loaikh')}
            />
            <DropdownInput
              label={data.nvgn.label}
              text={data.nvgn.text}
              onPress={() => onPressDropdown('nvgn')}
            />
            <DropdownInput
              label={data.vtkh.label}
              text={data.vtkh.text}
              onPress={() => onPressDropdown('vtkh')}
            />
            <CheckBox
              value={data.trangthai.value}
              label={data.trangthai.label}
              onPress={onPressCheckBox}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
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
  searchInput: {
    minHeight: 40,
    height: 'auto',
    paddingVertical: 5,
  },
  saveText: { color: 'white', },
  save: { alignSelf: 'center', },
  row: { flexDirection: 'row', marginTop: 10, },
  alignText: { flex: 1, alignSelf: 'center', },
});
