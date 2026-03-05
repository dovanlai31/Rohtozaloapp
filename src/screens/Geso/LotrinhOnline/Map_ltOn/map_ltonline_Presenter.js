import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  WebView,
  ScrollView,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import MapView from 'react-native-maps';
import { Colors, } from '../../../../theme';
import SearchData from '../../SearchData/SearchData';

export default function MapViewltbh({
  report,
  time,
  setFromTime,
  gotoCurrentLocation,
  gocus,
  coordinates,
	
}) {

  const latitude = 10.801306;
  const longitude = 106.662978;
  return (
    <View style={styles.container}>
    
      <ScrollView
        ref={(scroll) => this.scroll = scroll}
        style={{ flex: 1, }}>
        <View style={styles.boloc}>
          <View style={styles.row}>
            <Text adjustsFontSizeToFit={true} style={styles.alignText}>Chọn Ngày </Text>
            <DatePicker
              androidMode='spinner'
              style={{ flex: 3, }}
              date={time}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                 
                dateText: { color:'gray', fontSize: 14, },
                dateInput: {
                  borderLeftWidth: 0.5,
                  borderRightWidth: 0.5,
                  borderTopWidth: 0,
                  borderBottomWidth: 0.5,
                },
              }}
              onDateChange={setFromTime}
            />
          </View>

          <SearchData
  
          />
        </View>
        <MapView
          style={{ flex: 1, height: (Dimensions.get('window').height - 70), backgroundColor: 'white', marginTop: 5, marginBottom: 5, borderColor: 'gray', borderRadius: 5, }}
          initialRegion={{
            latitude: latitude + 0.000266,
            longitude: longitude + 0.000218,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={(map) => this.map = map}
        >

          {report != '[]' ? JSON.parse(report.DanhSachKhachHang).map((item, index) => (
            item.lat != null && item.lat + ''.length > 3 &&  
			<MapView.Marker
			  key={index}
			  coordinate={{
			    latitude: parseFloat(item.lat),
			    longitude: parseFloat(item.long),
			  }}
			>
			  {index == 0 && <Text 	key={item.khId} >Start</Text>}
			  {index == 0 &&  <View 	key={item.khId} style={{width:14,height:14, borderRadius:7,backgroundColor:'green',alignItems:'center',justifyContent:'center',}}><Text style={{color:'white',fontSize:7, }}> {index}</Text></View>}
			  {index > 0 && index == (JSON.parse(report.DanhSachKhachHang).length - 1) &&<View 	key={item.khId} style={{width:14,height:14, borderRadius:7,backgroundColor:'gray',alignItems:'center',justifyContent:'center',}}><Text style={{color:'white',fontSize:7, }}> {index}</Text></View>}
			  {index > 0 && index == (JSON.parse(report.DanhSachKhachHang).length - 1) && <Text 	key={item.khId}>End</Text>}

			  {index > 0 && index < (JSON.parse(report.DanhSachKhachHang).length - 1) && <View 	key={item.khId} style={{width:12,height:12, borderRadius:6,backgroundColor:'red',alignItems:'center',justifyContent:'center',}}><Text style={{color:'white',fontSize:7, }}> {index}</Text></View>}
			</MapView.Marker>


          )) : null}
          {report != '[]' && gocus && gotoCurrentLocation(parseFloat(JSON.parse(report.DanhSachKhachHang)[0].lat), parseFloat(JSON.parse(report.DanhSachKhachHang)[0].long), this.map)}
          <MapView.Polyline
            key={coordinates.key}
            coordinates={coordinates}
            strokeWidth={0.9}
            strokeColor="red" />
        </MapView>

 
      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

   
  },
  content: {
    flex: 1,
  },

  searchInput: {
    minHeight: 40,
    height: 'auto',
    paddingVertical: 5,
  },
  saveText: { color: 'white', },
  save: { alignSelf: 'center', },
  row: {
    flexDirection: 'row', 

    alignItems:'center',justifyContent:'center',
  },
  alignText:{
    textAlignVertical: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: 40, padding: 3,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: Colors.HeaderColor,
    color: 'white',
    justifyContent: 'center',

  },
  boloc: {
    borderColor: Colors.HeaderColor,
    borderRadius: 4,
    //borderWidth: 0.5,
    margin: 5,
    //marginTop: 15,
    marginBottom: 2,
    //backgroundColor:Mycolors.gray,
  },
});
