
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import { Colors, } from '../../../../theme';
import { BottomBarAssets, CommonIcons, HomeICon } from '../../../../assets';
const { width, } = Dimensions.get('window');
export default class Viewhead extends React.Component {

  render() {
    const { searchclisk, GoMyGiftScreen,DiemTLKH } = this.props;
    return (



      <View style={styles.content}>
        

        <View style={styles.seachheader}>

        <TouchableOpacity onPress={() => searchclisk(null, 1)} style={styles.textsearch}>
          <Image style={styles.iconsearch} source={BottomBarAssets.search}></Image>
          <TextCmp style={{ color: 'gray', fontSize: 12, width: '85%', marginTop: 10 }}>  Tìm kiếm ...</TextCmp>
        </TouchableOpacity>
       </View>

      </View>
   
    );
  }
}

const styles = StyleSheet.create({

  content: {
    //height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.HeaderColor,
    flex: 1,
    
  },
  viewinfo: {
  
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',

  },

  textsearch: {

  
    height: 35,
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'row',
    

  },
  seachheader: {
    height: 35,
    width: width - 80,
    //marginTop: Platform.OS == 'ios' ? 18 : 15,
    marginVertical: 15,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,

    backgroundColor:Colors.backgroundL2,
    opacity: 0.9,
    

  },
  iconsearch: {
    position: 'absolute',
    bottom: 7,
    left: 4,
    width: 20,
    height: 20,
    tintColor: 'gray',

  },

});
