import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';

import { Colors, } from '../../../../theme';
import { TextCmp, } from '../../../../common-components';

export const Table = ({ data, }) => {
  if (data.length==0) {
    return (
      <View style={styles.noData}>
        <TextCmp>KHÔNG CÓ DỮ LIỆU PHÙ HỢP</TextCmp>
      </View>
    );
  }
  //alert(JSON.stringify(data));
  return (
    <View style={{margin:5,
      borderLeftWidth:1,
      borderColor:Colors.line,}}>

      {data.map((item) => {
        var keys = Object.keys(item);
        return keys.map((key,index) => {
          return (
            <View key={index}>
              <View style={ item[key]==='' ||index ===0 ?  [styles.rowTable, styles.rowCustomer,{backgroundColor:Colors.line, minHeight: 40,alignItems:'center',},]: [styles.rowTable, styles.rowCustomer,]}>
                <View style={styles.columnRight}>
                  <TextCmp style={{textAlign:'left',textAlignVertical:'center', margin:3,width:'100%',paddingLeft:3,}} >{key}</TextCmp>
                </View>
                <View style={styles.columnRight}>
                  <TextCmp >{item[key]}</TextCmp>
                </View>
              </View>
            </View>
          );
        });
				
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rowTable: {
    flexDirection: 'row',
   
    minHeight: 40,
    height: 'auto',
    

  },

  columnRight: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderTopWidth:1,
    borderColor:Colors.line,
  },

  noData: {
    marginTop: 10,
    // borderWidth: 1,
    backgroundColor: Colors.backgroundL1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    margin:5,
  },

  rowCustomer: { backgroundColor: '#fff', },

});
