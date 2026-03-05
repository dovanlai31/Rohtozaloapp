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

} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Header, SearchData, } from '../../../modules/common';
import Icons from '../../../assets/Icons';
import Panel from '../../../modules/home/presenters/panel';
import Mycolors from '../../../utils/Colors';
import htmlbaocao from '../../../utils/htmlbaocao';
export default function ReportView({
  report,
  time,
  onBack,
  getReport,
  setToTime,
  setFromTime,
  ansearch,
  isan,
  clicktrangthai,
  listtrangthai,
  currenttrangthai,
}) {
  console.log('report', report);
  //alert(isan)
  let content = null;
  let res = htmlbaocao;

  if (report[0].content) {
    res = res.replace('_tabletitle_','');
    res = res.replace('_tablecontent_', report[0].content);
    //console.log('report', report[0].Title);
  }
  else {
    res = res.replace('_tabletitle_', ' ');
    res = res.replace('_tablecontent_', 'không có DL');
  }

  if (isan) {

  } else {
    content = (


      <View style={styles.boloc}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: 5, marginBottom: 30, }}>
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
                dateText: { color: Mycolors.PLight, fontSize: 14, },
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
                dateText: { color: Mycolors.PLight, fontSize: 14, },
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

        <SearchData />

        <TouchableOpacity
          style={styles.dropdownView}
          onPress={clicktrangthai}
        >
          <Text style={{ textAlign: 'center', flex: 1, }}>{currenttrangthai.label}</Text>
          <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
        </TouchableOpacity>
      </View>

    );
  }


  return (
    <View style={styles.container}>
      <Header
        title="Báo Cáo Chi tiết SP"
        isBack={true}
        onBack={onBack}
        renderRight={() => (
          <TouchableOpacity style={styles.save} onPress={getReport}>
            {/* <Text style={styles.saveText}>Xem</Text> */}
            <Icons name="search" size={25} color="#fff" />
          </TouchableOpacity>
        )}
        renderRight2={() => (
          <TouchableOpacity style={styles.save} onPress={ansearch}>
            <Text style={styles.saveText}>{!isan ? 'Ẩn' : 'Hiện'}</Text>

          </TouchableOpacity>
        )}
      />
      <View style={styles.content}>
        {
          content
        }
        <WebView
          style={{ flex: 1, backgroundColor: 'white', marginTop: 5, marginBottom: 5, }}
          source={{ html: res, baseUrl: '', }}

        />
      </View>


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
    marginLeft: 5,
    marginRight: 5,
  },

  searchInput: {
    minHeight: 40,
    height: 'auto',
    paddingVertical: 5,
  },
  boloc: {
    borderColor: Mycolors.Primary,
    borderRadius: 4,
    //borderWidth: 0.5,
    padding: 5,
    marginTop: 15,
    marginBottom: 2,
  },
  saveText: { color: 'white', },
  save: { alignSelf: 'center',width:40,justifyContent:'center',alignItems:'center', },
  row: { flexDirection: 'row', marginTop: 10, paddingTop: 15, width: (Dimensions.get('window').width / 2 - 10), alignItems: 'center', },
  alignText:
	{
	  textAlignVertical: 'center',
	  textAlign: 'center',
	  alignItems: 'center',
	  height: 40, padding: 3,
	  flex: 1,
	  alignSelf: 'center',
	  backgroundColor: Mycolors.Primary,
	  color: 'white',
	  justifyContent: 'center',

	},
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
});
