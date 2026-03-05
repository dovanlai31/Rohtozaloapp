import  React  from 'react';
import {View,StyleSheet,Dimensions,} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import ChatView from './LChat/containers/ChatView';
import { Colors, } from '../../../../theme';
import { CommonIcons } from '../../../../assets';
import { Navigation } from 'react-native-navigation';
import { AppNavigation } from '../../../../app-navigation';
const {height,}= Dimensions.get('window');
export default class ViewHoTro extends React.Component{
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      style:  'light',
      visible: true,
    },
    topBar: {
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },
      leftButtons: [
        {
          id: 'km_BACK',
          icon: CommonIcons.back2,
        },
      ],
      title: {
        text: 'Chat',
      },
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {


    };
    
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'km_BACK') { this.props.navigator._pop();
      AppNavigation.dismissAllModals();
    }
  }

  render(){
    return(
      <View style={styles.containt}>
        <ChatView></ChatView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containt:{flex:1,
    // marginBottom:40,
    //height:height-40,
  },
});
