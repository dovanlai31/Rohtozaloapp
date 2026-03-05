import React, { Component, } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform,
  ScrollView,
} from 'react-native';

import { StackNavigator, } from 'react-navigation';



import {registerKilledListener, registerAppListener,} from './Listeners';
import firebaseClient from  './FirebaseClient';

registerKilledListener();

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      tokenCopyFeedback: '',
    };
  }

  async componentDidMount(){
   
	  
	  // topic example
	  // FCM.subscribeToTopic('sometopic')
	  // FCM.unsubscribeFromTopic('sometopic')
  }

  showLocalNotification() {
    
  }

  scheduleLocalNotification() {
    
  }

  sendRemoteNotification(token) {
    let body;

  }

  sendRemoteData(token) {
    let body = {
    	'to': token,
      'data':{
    		'title': 'Simple FCM Client',
    		'body': 'This is a notification with only DATA.',
    		'sound': 'default',
    	},
    	'priority': 'normal',
    };

  }

  showLocalNotificationWithAction() {
   
  }

  render() {
    let { token, tokenCopyFeedback, } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{paddingHorizontal: 20,}}>
          <Text style={styles.welcome}>
          Welcome to Simple Fcm Client!
          </Text>

          <Text style={styles.feedback}>
            {this.state.tokenCopyFeedback}
          </Text>

          <Text style={styles.feedback}>
          Remote notif won't be available to iOS emulators
          </Text>
          <TouchableOpacity onPress={() => this.sendRemoteNotification(token)} style={styles.button}>
            <Text style={styles.buttonText}>Send Remote Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.sendRemoteData(token)} style={styles.button}>
            <Text style={styles.buttonText}>Send Remote Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.showLocalNotification()} style={styles.button}>
            <Text style={styles.buttonText}>Show Local Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.showLocalNotificationWithAction(token)} style={styles.button}>
            <Text style={styles.buttonText}>Show Local Notification with Action</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.scheduleLocalNotification()} style={styles.button}>
            <Text style={styles.buttonText}>Schedule Notification in 5s</Text>
          </TouchableOpacity>
          <Text style={styles.instructions}>
          Init notif:
          </Text>
          <Text>
            {JSON.stringify(this.state.initNotif)}
          </Text>
          <Text style={styles.instructions}>
          Token:
          </Text>
          <Text selectable={true} onPress={() => this.setClipboardContent(this.state.token)}>
            {this.state.token}
          </Text>
        </ScrollView>
      </View>
    );
  }
  setClipboardContent(text) {
    Clipboard.setString(text);
    this.setState({tokenCopyFeedback: 'Token copied to clipboard.',});
    setTimeout(() => {this.clearTokenCopyFeedback();}, 2000);
  }
  clearTokenCopyFeedback() {
    this.setState({tokenCopyFeedback: '',});
  }
}
class DetailPage extends Component {
  render(){
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text>Detail page</Text>
    </View>;
  }
}
export default StackNavigator({
  Main: {
    screen: MainPage,
  },
  Detail: {
    screen: DetailPage,
  },
}, {
  initialRouteName: 'Main',
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 2,
  },
  feedback: {
    textAlign: 'center',
    color: '#996633',
    marginBottom: 3,
  },
  button: {
    backgroundColor: 'teal',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});