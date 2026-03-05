import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,

} from 'react-native';
import DatePicker from 'react-native-datepicker';
import SearchData from '../../SearchData/SearchData';
import { Colors, } from '../../../../theme';
import { WebView, } from 'react-native-webview';
export default   class  ReportView extends React.Component {

  render(){
    const {
      report,
      time,
      getReport,
      setToTime,
      setFromTime,
      ansearch,
	  isan,
    }= this.props;

    return (
      <View style={styles.container}>

        <View style={styles.boloc}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: 5, marginBottom: 30,justifyContent:'space-between', }}>
            <View style={styles.row}>
              <Text adjustsFontSizeToFit={true} style={styles.alignText}>Từ ngày</Text>
              <DatePicker
                androidMode='spinner'
                style={{ flex: 2, }}
                date={time.tungay}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: 'none',
                  },
                  dateText: { color: 'black', fontSize: 14, },
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
            <View style={styles.row}>
              <Text adjustsFontSizeToFit={true} style={styles.alignText}>Đến ngày</Text>
		
              <DatePicker
                androidMode='spinner'
                style={{ flex: 2, }}
                date={time.denngay}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: 'none',
                  },
                  dateText: { color: 'black', fontSize: 14, },
                  dateInput: {
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderTopWidth: 0,
                    borderBottomWidth: 0.5,
                  },
                }}
                onDateChange={setToTime}
              />
            </View>
          </View>
		
          <SearchData></SearchData>
        </View>
        <View  style={{ flex:1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5, }}>
          <WebView
            originWhitelist={['*',]}
            source={{ html: report, baseUrl: '', }}
            scalesPageToFit
          />
        </View>
      </View>
    );
  }

  
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },



  boloc: {
   
    borderRadius: 4,
    //borderWidth: 0.5,
    padding: 5,
    marginTop: 15,
    marginBottom: 2,
  },

  row: { flexDirection: 'row', marginTop: 10,  width: (Dimensions.get('window').width / 2 - 10), alignItems: 'center', },
  alignText:{
    textAlignVertical: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: 40, padding: 3,
    flex: 1,
    alignSelf: 'center',
    backgroundColor:Colors.HeaderColor,
    color: 'white',
    justifyContent: 'center',

  },
});
