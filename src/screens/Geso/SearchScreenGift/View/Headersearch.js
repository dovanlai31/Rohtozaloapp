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
      onSubmitEditing,backPress, showback ,LitstDanhmucUrbox} = this.props;
    return (
      <View style={styles.header}>
        {showback && <TouchableOpacity style={{ marginHorizontal:5}} onPress={backPress}><Icon size={20} color='white' name='back'></Icon></TouchableOpacity>}
        <View style={styles.seachheader}>
          <Search
           
            backgroundColor={Colors.HeaderColor}
            tintColorSearch={'red'}
            searchIconCollapsedMargin={width/2 - 40}
            searchIconExpandedMargin={width/2 - 40}
            placeholderCollapsedMargin={width/2 - 50}
            placeholderExpandedMargin= {width/2 - 50}
        
            onChangeText={(text) => onChangeText(text)}
            afterSearch={onSubmitEditing}
            defaultValue={searchText}
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
    height: 50,
    padding:10,
    backgroundColor: Colors.HeaderColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  seachheader: {
    height: 37,
    width: width - 50, 
    //marginRight:35,
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