import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import SearchData from '../SearchData/SearchData';
import { Colors, } from '../../../theme';
import { WebView, } from 'react-native-webview';
import { TextCmp, } from '../../../common-components';
import Icons from '../../../assets/Icons';
import { Table, } from './BaocaoKPINhanvien/table';
export default   class  ViewWebBC extends React.Component {

  render(){
    const {
      report,
      time,
      setToTime,
      setFromTime,
      ansearch,
      isan,
      bcthang,
      antungaydenngay,
      listtuyen,
      onPressListtuyen,
      currentTuyen,
      datatable,
      chonngay,
      anboloc,
    }= this.props;

    return (
      <View style={styles.container}>

        <View style={styles.boloc}>

          {listtuyen&&
           <TouchableOpacity
             style={styles.dropdownView}
             onPress={onPressListtuyen}
           >
             <TextCmp style={{ textAlign: 'center', flex: 1, }}>{currentTuyen.ten}</TextCmp>
             <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
           </TouchableOpacity>
          }
          {!antungaydenngay&&
          <View style={styles.tungaydenngayview}>
            <View style={styles.row}>
              <Text adjustsFontSizeToFit={true} style={styles.alignText}>{bcthang?'Chọn tháng':'Từ ngày'}</Text>
              <DatePicker
              
                androidMode='spinner'
                style={{ flex: 2, }}
                date={time.tungay}
                mode="date"
                placeholder="select date"
                format=	{bcthang?'YYYY-MM':'YYYY-MM-DD'}
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
            {!bcthang&&  <View style={styles.row}>
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
            </View>}
             
          </View>
          }
          { chonngay&&
           <View style={styles.tungaydenngayview}>
             <View style={styles.row}>
               <Text adjustsFontSizeToFit={true} style={styles.alignText}>{'Chọn ngày'}</Text>
               <DatePicker
              
                 androidMode='spinner'
                 style={{ flex: 2, }}
                 date={time.tungay}
                 mode="date"
                 placeholder="select date"
                 format=	{'YYYY-MM-DD'}
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
           </View>

          }

          {!anboloc&& <SearchData></SearchData> } 
        </View>
        {!datatable?<View  style={{ flex:1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5, }}>
          <WebView
            originWhitelist={['*',]}
            source={{ html: report, baseUrl: '', }}
            scalesPageToFit
          />
        </View>:
         	<ScrollView>
            <Table data={report} />
          </ScrollView>
        }
      </View>
    );
  }

  
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  tungaydenngayview:{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: 5, marginBottom: 30,justifyContent:'space-between', },
  dropdownView: {
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
    //marginLeft: 10,
    // marginRight: 10,
  },

  boloc: {
   
    borderRadius: 4,
    //borderWidth: 0.5,
    padding: 5,
    marginTop: 15,
    marginBottom: 2,
  },

  row: { flexDirection: 'row', marginTop: 10, flex:1, alignItems: 'center', },
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
