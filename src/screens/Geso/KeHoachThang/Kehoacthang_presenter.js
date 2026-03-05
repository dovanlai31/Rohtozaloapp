import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Colors} from '../../../theme';
import {TextCmp} from '../../../common-components';

export default class ReportView extends React.Component {
  shouldComponentUpdate(Listngaychitiet) {
    return Listngaychitiet != this.props.Listngaychitiet;
  }
  render() {
    const {
      time,

      setFromTime,
      Listngay,
      clickitem,
      Listngaychitiet,
      index,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.boloc}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                marginTop: 12,
                marginBottom: 30,
              }}>
              <View style={styles.row}>
                <View style={styles.viewM}>
                  <TextCmp adjustsFontSizeToFit={true} style={styles.alignText}>
                    Chọn Tháng
                  </TextCmp>
                </View>

                <DatePicker
                  androidMode="spinner"
                  style={{flex: 2}}
                  date={time.tungay}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      display: 'none',
                    },
                    dateInput: {
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderColor: Colors.line,
                      //borderTopWidth: 0,
                      //borderBottomWidth: 0,
                    },
                  }}
                  onDateChange={setFromTime}
                  androidMode="spinner"
                />
              </View>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
            <View style={styles.viewleft}>
              <ScrollView>
                {Listngay.map((item, index) => {
                  item;
                  return (
                    <TouchableOpacity
                      onPress={() => clickitem(item, index)}
                      key={item}
                      style={
                        index == this.props.index
                          ? {
                              width: '100%',
                              padding: 2,
                              marginVertical: 10,
                              backgroundColor: '#E1E2E1',
                            }
                          : {width: '100%', padding: 2, marginVertical: 10}
                      }>
                      <TextCmp>Ngày {item}</TextCmp>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.lineV} />
            <View style={styles.viewright}>
              <ScrollView>
                {Listngaychitiet.map((item, index) => {
                  return (
                    <TouchableOpacity
                      //onPress={()=>clickitem(item)}
                      key={index}>
                      <View
                        style={{
                          width: '100%',
                          padding: 10,
                          borderBottomColor: '#F2F2F2',
                          borderBottomWidth: 1,
                        }}>
                        <TextCmp style={{fontSize: 14}}>{item}</TextCmp>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
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

  boloc: {
    // borderColor: ,
    borderRadius: 4,
    //borderWidth: 0.5,
    //padding: 5,
    marginTop: 10,
    marginBottom: 2,
  },

  row: {
    flexDirection: 'row',
    marginTop: 10,
    width: Dimensions.get('window').width / 1 - 10,
    alignItems: 'center',
  },
  alignText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize:14,
    padding: 3,

    //color: 'white',
    justifyContent: 'center',
  },
  viewleft: {
    //backgroundColor: 'blue',
    width: '22%',
    height: '100%',
  },
  viewM: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#E1E2E1',
  },
  lineV: {
    backgroundColor: 'gray',
    width: 0.5,
    height: '100%',
  },
  viewright: {
    //backgroundColor: 'green',
    width: '77%',
    height: '100%',
  },
});
