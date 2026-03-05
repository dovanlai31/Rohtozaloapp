import {
  Modal, View, TouchableOpacity, Text, StyleSheet
  , Dimensions, FlatList,
  Platform,
} from 'react-native';
import React, { Component, } from 'react';
import { Icon,Avatar,Rating, } from 'react-native-elements';
import { Colors, } from '../../../../theme';

const { height, width, } = Dimensions.get('window');

const _renderItemService = (item) => (
  <View
    style={{
      width: width,
      alignItems: 'center',
      backgroundColor: '#ffff',
      borderRadius: 2,
      borderRightColor: Colors.selectedIconColor,

      justifyContent: 'center',
    }}

  >

    <View style={{ backgroundColor: 'white', padding: 5, borderBottomWidth: 0.5, width: '100%', borderBottomColor: '#D7D4F0', }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <Avatar
          small
          rounded
          icon={{ name: 'user', type: 'font-awesome', }}

          activeOpacity={0.7}>
        </Avatar>
        <Text numberOfLines={1} style={{ fontSize: 14, paddingHorizontal: 10, width: width - 90, color: 'black', }}>{item.tieude}</Text>

      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <Text style={{ fontSize: 13, padding: 2, width: width / 3 - 5, color: 'gray', }}>{item.userTen}</Text>
        <Rating
          imageSize={10}
          readonly
          startingValue={parseInt(item.StarNumber)}
          style={{ padding: 10, paddingHorizontal: 20, }}
        />
        {item.damuahang === 1 && <Icon name='heartbeat' type='font-awesome' color={Colors.HeaderColor} size={15}></Icon>}
        {item.damuahang === 1 && <Text style={{ color: Colors.HeaderColor, fontSize: 10, }} > Đã mua hàng</Text>}
      </View>
      <View>
        <Text numberOfLines={4} style={{ fontSize: 11, padding: 2, width: width / 3 - 5, color: 'gray', }}>{item.noidung}</Text>
      </View>


    </View>

  </View>



);


export default function ViewData({
  modalVisible,
  setModalVisible,
  listdanhgia,

}) {
  let title = 'Đánh giá';
  let data = listdanhgia;

  return (<Modal
    animationType="slide"
    //transparent={true}
    visible={modalVisible}
    onRequestClose={
      setModalVisible
    }>
    <View style={{ alignItems: 'center', marginBottom: 100, }}>

      <View style={[styles.header, { backgroundColor: Colors.HeaderColor, },]}>
        <View style={{ paddingLeft: 10, justifyContent: 'center', flex: 1, }}>
        </View>
        <View style={{ flex: 4, alignItems: 'center', }}>
          <Text style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 16,
          }}>
            {title}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 10, }}>
          <TouchableOpacity style={{ padding: 5, justifyContent: 'center', borderRadius: 3, }} onPress={ setModalVisible}>
            <Icon color='white' name='close'></Icon>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 5, }}>
        <FlatList
          data={data}

          keyExtractor={(item) => { return item.pk_seq; }}
          renderItem={({ item, }) => _renderItemService(item)}
        />

      </View>




    </View>
  </Modal>);
}

const styles = StyleSheet.create({
 
  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: Platform.OS === 'ios' ? 15 : 5,
  },
});