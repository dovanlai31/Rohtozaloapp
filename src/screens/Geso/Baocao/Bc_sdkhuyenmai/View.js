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
  ActivityIndicator,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import Item from './Item';
import {TextCmp} from '../../../../common-components';
import Icons from './../../../../assets/Icons';
import SearchData from '../../SearchData/SearchData';
import {Colors} from '../../../../theme';
import {normalize} from '../../../../theme/FontSize';

export default class ReportView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(report) {
    return report !== this.props.report;
  }
  render() {
    // alert('xxxx')
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
    //console.log('report', report);
    let content = null;
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
          <SearchData annvbh={true} />
          <View style={styles.row2}>
            <TouchableOpacity
              style={styles.dropdownView}
              onPress={onPressListCttb}>
              {loadingcttb && <ActivityIndicator size="small" />}
              <TextCmp style={{textAlign: 'center', flex: 1}}>
                {cttb.name}
              </TextCmp>
              <Icons name="down-arrow" size={15} color="rgba(0,0,0,0.8)" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {content}
          <View style={styles.viewbaocao}>
            <View style={styles.headerreport}>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport}>CHƯƠNG TRÌNH</TextCmp>
              </View>
              <View style={[styles.viewheaderreport, {flex: 2}]}>
                <TextCmp style={styles.txtheaderreport}>DIỄN GIẢI</TextCmp>
              </View>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport}>NGÂN SÁCH</TextCmp>
              </View>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport}>ĐÃ DÙNG</TextCmp>
              </View>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport}>CÒN LẠI</TextCmp>
              </View>
            </View>

            <FlatList
              data={report}
              extraData={[report]}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <Item item={item} listtdata={report || []} />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    //borderColor: Mycolors.Primary,
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
    backgroundColor: Colors.HeaderColor, // Mycolors.Primary,
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
  },
  viewbaocao: {flex: 1},
  headerreport: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#eeeeee',
  },
  txtheaderreport: {
    textAlign: 'center',
    fontSize: normalize('Small'),
    fontWeight: 'bold',
    width: '100%',
  },
  viewheaderreport: {
    borderLeftWidth: 1,
    borderColor: '#eeeeee',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
