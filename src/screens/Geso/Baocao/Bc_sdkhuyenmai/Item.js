import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {formatCurrency} from './../../../../utils/Helper';
import {TextCmp} from '../../../../common-components';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subitemdata: [],
      show: false,
      sumngansach: 0,
      dadung: 0,
    };
  }
  componentDidMount() {
    //alert('x')
    const {listtdata, item} = this.props;
    let listadd = [];
    let sumngansach = 0;
    let dadung = 0;
    if (listtdata.length > 0) {
      listtdata.map(subitem => {
        if (subitem.KMID == item.KMID && subitem.NPP_FK == item.NPP_FK) {
          listadd.push(subitem);
          sumngansach = subitem.NGANSACH;
          dadung += subitem.DADUNG;
        }
      });
      this.setState({subitemdata: listadd, sumngansach, dadung});
    }
  }
  shouldComponentUpdate(item) {
    return item.DADUNG !== this.props.item.DADUNG;
  }
  presNpp(item) {
    this.setState({show: !this.state.show});
  }
  render() {
    const {item} = this.props;
    const {subitemdata, show, sumngansach, dadung} = this.state;
    if (item.STTNPP == 1) {
      return (
        <View>
          {item.STT == 1 && (
            <View style={styles.headerreport}>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport}>{item.SCHEME}</TextCmp>
              </View>
              <View style={[styles.viewheaderreport, {flex: 2}]}>
                <TextCmp style={styles.txtheaderreport}>
                  {item.DIENGIAI}
                </TextCmp>
              </View>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport} />
              </View>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport} />
              </View>
              <View style={styles.viewheaderreport}>
                <TextCmp style={styles.txtheaderreport} />
              </View>
            </View>
          )}
          {item.STTNPP == 1 && (
            <TouchableOpacity
              onPress={() => this.presNpp(item)}
              style={[
                styles.headerreport,
                {backgroundColor: show ? '#b2dfdb' : '#e0f2f1'},
              ]}>
              {/* <View style={styles.viewheaderreportnpp}>
                        <Text style={styles.txtheaderreport}>{}</Text>
                    </View> */}
              <View style={[styles.viewheaderreportnpp, {flex: 3}]}>
                <TextCmp style={styles.txtheaderreport}>{item.TEN}</TextCmp>
              </View>
              <View style={styles.viewheaderreportnpp}>
                <TextCmp style={styles.txtheaderreport}>
                  {formatCurrency(sumngansach, true)}
                </TextCmp>
              </View>
              <View style={styles.viewheaderreportnpp}>
                <TextCmp style={styles.txtheaderreport}>
                  {formatCurrency(dadung, true)}
                </TextCmp>
              </View>
              <View style={styles.viewheaderreportnpp}>
                <TextCmp style={styles.txtheaderreport}>
                  {formatCurrency(sumngansach - dadung, true)}
                </TextCmp>
              </View>
            </TouchableOpacity>
          )}
          {subitemdata &&
            show &&
            subitemdata.map(item => {
              return (
                <View
                  key={item.DADUNG}
                  style={[styles.headerreport, {backgroundColor: 'white'}]}>
                  <View style={styles.viewheaderreportnpp}>
                    <TextCmp style={styles.txtheaderreport}>{}</TextCmp>
                  </View>
                  <View style={[styles.viewheaderreportnpp, {flex: 2}]}>
                    <TextCmp style={styles.txtheaderreport}>
                      {item.DDKD}
                    </TextCmp>
                  </View>
                  <View style={styles.viewheaderreportnpp}>
                    <TextCmp style={styles.txtheaderreport} />
                  </View>
                  <View style={styles.viewheaderreportnpp}>
                    <TextCmp style={styles.txtheaderreport}>
                      {formatCurrency(item.DADUNG, true)}
                    </TextCmp>
                  </View>
                  <View style={styles.viewheaderreportnpp}>
                    <TextCmp style={styles.txtheaderreport}>{}</TextCmp>
                  </View>
                </View>
              );
            })}
        </View>
      );
    }

    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  viewbaocao: {},
  headerreport: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: '#babdbe',
  },
  txtheaderreport: {fontSize: 12},
  viewheaderreport: {
    borderLeftWidth: 1,
    borderColor: '#eeeeee',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewheaderreportnpp: {
    borderLeftWidth: 1,
    borderColor: '#eeeeee',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
