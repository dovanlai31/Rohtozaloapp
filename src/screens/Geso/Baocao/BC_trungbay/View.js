import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import Icons from './../../../../assets/Icons';
import SearchData from '../../SearchData/SearchData';
import {WebView} from 'react-native-webview';
import {Colors, Metrics} from '../../../../theme';
import {normalize} from '../../../../theme/FontSize';
import {TextCmp} from '../../../../common-components';
export default class ReportView extends React.Component {
  render() {
    const {
      report,
      time,
      onBack,
      getReport,
      setToTime,
      setFromTime,
      ansearch,
      isan,
      onPressListCttb,
      onPressListkh,
      khachhang,
      cttb,
      loadingcttb,
    } = this.props;
    console.log('report', report);
    // if(report)
    // alert(JSON.stringify( report[0]))
    //alert(isan)
    let content = null;
    //let res = htmlbaocao;

    if (isan) {
    } else {
      content = (
        <View style={styles.boloc}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              marginTop: 5,
              marginBottom: 30,
            }}>
            <View style={styles.row}>
              <TextCmp adjustsFontSizeToFit={true} style={styles.alignText}>
                Từ ngày
              </TextCmp>
              <DatePicker
                style={{flex: 2}}
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
                  dateText: {color: 'black', fontSize: normalize('Small')},
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
              <TextCmp adjustsFontSizeToFit={true} style={styles.alignText}>
                Đến ngày
              </TextCmp>

              <DatePicker
                style={{flex: 2}}
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
                  dateText: {color: 'black', fontSize: normalize('Small')},
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
          <SearchData hidenpp={true} />
          <View style={styles.row2}>
            <TouchableOpacity
              style={styles.dropdownView}
              onPress={onPressListCttb}>
              {loadingcttb && <ActivityIndicator size="small" />}
              <Text
                style={{
                  textAlign: 'left',
                  flex: 1,
                  fontSize: normalize('Small'),
                }}>
                {cttb.name}
              </Text>
              <Icons name="down-arrow" size={15} color="rgba(0,0,0,0.8)" />
            </TouchableOpacity>
            {/* <TouchableOpacity
                            style={styles.dropdownView}
                            onPress={onPressListkh}
                        >
                            <Text style={{ textAlign: 'center', flex: 1 }}>{khachhang.name}</Text>
                            <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
                        </TouchableOpacity> */}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {content}
          <WebView
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginTop: 5,
              marginBottom: 5,
            }}
            source={{html: report[0].MSG, baseUrl: ''}}
            containerStyle={{width: Metrics.appWidth}}
            injectedJavaScript={
              "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
            }
            // scalesPageToFit={true}
            originWhitelist={['*']}

            // injectedJavaScriptBeforeContentLoaded={runFirst}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop: 60,
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
    //flex: 1,
    borderRadius: 4,
    //borderWidth: 0.5,
    padding: 5,
    marginTop: 15,
    marginBottom: 2,
    zIndex: 100,
  },
  saveText: {color: 'white'},
  save: {
    alignSelf: 'center',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2 - 10,
    alignItems: 'center',
  },
  alignText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: 40,
    padding: 3,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: Colors.HeaderColor,
    color: 'white',
    justifyContent: 'center',
  },
  dropdownView: {
    height: 40,
    width: '100%',
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
