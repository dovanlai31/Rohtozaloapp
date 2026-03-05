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
import { ImagesIcons, } from '../../../../assets';
import SearchData from '../../SearchData/SearchData';
import { Colors, } from '../../../../theme';
export default function MapViewltbh({
  report,
  time,

  setFromTime,
  gotoCurrentLocation,
  gocus,

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
            <Text adjustsFontSizeToFit={true} style={styles.alignText}>Chọn tháng</Text>
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
                
                dateText: { color: 'gray', fontSize: 14, },
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
            //ref="SearchData"
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

          {report != '[]' ? JSON.parse(report.DanhSachKhachHang).map((item) => (
            item.lat != null && item.lat + ''.length > 3 &&
							<MapView.Marker
							  key={item.khId}
							  coordinate={{
							    latitude: parseFloat(item.lat),
							    longitude: parseFloat(item.lon),
							  }}
							  title={'' + item.khTen}
							  image= {item.codoanhso == '1'? ImagesIcons.cods: 
							    item.daviengtham == '1' ? ImagesIcons.davt: 
							     ImagesIcons.khach }
							>
							



							</MapView.Marker>


          )) : null}
          {report != '[]' && gocus && gotoCurrentLocation(parseFloat(JSON.parse(report.DanhSachKhachHang)[0].lat), parseFloat(JSON.parse(report.DanhSachKhachHang)[0].lon), this.map)}
        </MapView>
    
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    flexDirection: 'row', marginTop: 10, 
  },
  alignText:{
		  textAlignVertical: 'center',
		  textAlign: 'center',
		  alignItems: 'center',
		  height: 40, padding: 3,
		  flex: 1,
		  alignSelf: 'center',
		  color: 'white',
		  justifyContent: 'center',
		  backgroundColor:Colors.HeaderColor,
  },
  boloc: {
    borderColor: 'gray',
    borderRadius: 4,
    //borderWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 2,
    //backgroundColor:Colors.HeaderColor,
  },
});
