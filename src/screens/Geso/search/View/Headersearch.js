import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { width, } = Dimensions.get('window');
import Search from 'react-native-search-box';
import { Colors, } from '../../../../theme';
import Icon from 'react-native-vector-icons/AntDesign';


export default class headersearch extends React.Component {
  // shouldComponentUpdate(){
  //   return false;
  // }
  render() {
    const {
      searchText,
      onChangeText,
      onSubmitEditing,backPress, showback } = this.props;
    return (
      <View style={styles.header}>
        {showback && <TouchableOpacity style={{padding:10}} onPress={backPress}><Icon size={20} color='white' name='back'></Icon></TouchableOpacity>}

        <View style={styles.seachheader}>
          <Search
           
            tintColorSearch={'red'}
            searchIconCollapsedMargin={width/2 - 40}
            searchIconExpandedMargin={width/2 - 40}
            placeholderCollapsedMargin={width/2 - 50}
            placeholderExpandedMargin= {width/2 - 50}
            backgroundColor={Colors.HeaderColor}
            onChangeText={(text) => onChangeText(text)}
            afterSearch={onSubmitEditing}
            defaultValue={searchText}
            cancelTitle={'helllo'}
            //placeholder={searchText}
            onCancel={() => onChangeText('')}
          // afterDelete={afterDelete}
          />
        </View>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
  
    width: '100%',
    height: 50,
    flexWrap:'wrap',
    backgroundColor: Colors.HeaderColor,

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  seachheader: {
    height: 37,
    width: width - 50,
    backgroundColor : 'red',
    // position: 'absolute',
    bottom: 5,
    backgroundColor: Colors.HeaderColor,
    // borderRadius: 2,
    //paddingLeft: 35,
    //paddingRight: 40,
    //  fontSize: 12
    //flex: 1

  },

});