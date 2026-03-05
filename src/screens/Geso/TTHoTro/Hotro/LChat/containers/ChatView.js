import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  Platform,
  Dimensions,
  ActivityIndicator,
  StyleSheet, Image, TouchableOpacity,
  Linking
} from 'react-native';

import { GiftedChat, Send, } from 'react-native-gifted-chat';
import { submitChat, setnotify, savetokentosever, MessageList, SetisScrenchatactive, } from '../action/chat.action';
import { registerKilledListener, registerAppListener, } from '../TestFibase/Listeners';
import firebaseClient from '../TestFibase/FirebaseClient';

import { Logg, SnackBar, } from '../../../../../../utils';
import { Colors, } from '../../../../../../theme';
import { CommonIcons, } from '../../../../../../assets';
import { TextCmp, } from '../../../../../../common-components';
import { Navigation, } from 'react-native-navigation';
import { Icon } from 'react-native-vector-icons/FontAwesome5/';


const { height, } = Dimensions.get('window');
class ChatView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      payload: {
        khId: this.props.userID,
      },
      messages: [],
      loading: false,
      // androidAutoCorrectFix: true,
    };
    this.renderSend = this.renderSend.bind(this);
    this.renderChatFooter = this.renderChatFooter.bind(this);
  }


  componentWillUnmount() {
    // this.props.dispatch(setnotify(false));
    // this.props.dispatch(SetisScrenchatactive(false));
  }

  MessageList() {
    //(string token, string userId, string imei, string id, string lastId, string newestId)
    
    const { messages, } = this.props.datachat;
    const { dispatch, } = this.props;

    const payload = { userId: this.props.userID, id: '', lastId: '', newestId: '', };
    //alert(JSON.stringify(payload));
   // if (messages.length==0 || this.props.datachat.isnewnotify) {
      //alert(JSON.stringify(payload));
      dispatch(MessageList(payload)).then((res) => {
        this.setState({ loading: true, });
      });
    //}

  }
  takePhoto = () => {
    alert('takePhoto');
  }
  renderSend(props) {
    return (
      <View>
        <Send {...props}>
          <View style={{ marginRight: 10, marginBottom: 5, }}>
            <Image source={CommonIcons.Send} resizeMode={'center'} style={{ width: 35, height: 35, tintColor: Colors.statusBar, }} />
          </View>
        </Send>
      </View>

    );
  }
  renderChatFooter = () => {
    return (
      <View >
        <TouchableOpacity onPress={this.takePhoto}>
          <Image source={CommonIcons.Photo} style={{ width: 25, height: 25, tintColor: 'gray', margin: 3, }} ></Image>
        </TouchableOpacity>

      </View>
    );
  }

  ChatHaha() {
    const { messages, } = this.props.datachat;
    Logg.info('messages  xxxx' + JSON.stringify(messages));

    if (1 == 2) {
      return (<View style={{ height, alignItems: 'center', justifyContent: 'center', }}>
        <ActivityIndicator size="small" color={Colors.HeaderColor} ></ActivityIndicator>
      </View>);
    }
    else {
      return (
        <GiftedChat
          //showUserAvatar={true}
          //forceGetKeyboardHeight= {true}
          messages={messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: '' + this.state.payload.khId,
            avatar: 'http://118.69.168.124:8089/AnhChupPDA/VifonShop/lg.png',
            name:''+ this.state.payload.khId,
          }}
          renderSend={this.renderSend}
        // renderChatFooter={this.renderChatFooter}
        />);
    }
  }
  onSend(messages = []) {
    const { dispatch, } = this.props;
    //return alert(JSON.stringify(messages))

    //public void SendMessage(string token, string imei, string userFrom, string message, string type, string userTo)
    let payload = { token: '',userId: this.props.userID, nhanvienId:this.props.userID, imei: '', newestId: '', message: messages[0].text, type: '0', userType: '0', };
    let x = GiftedChat.append(this.props.datachat.messages, messages);
 
    dispatch(submitChat(x, payload)).then((res) => {
      // [WebMethod]
      // public String SendMessage(string token, string imei, string userId, String message, string type, string userType, string nhanvienId, string newestId)//đánh giá số sao
      this.setState(
        (previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
          androidAutoCorrectFix: Platform.OS !== 'android',
        }),
        //Platform.OS === 'android' && (() => this.setState({androidAutoCorrectFix: true}))

      );
      if (!res) {
        SnackBar.showError('gởi tin nhắn thất bại');
      }
    });
  }



  TatLoadDing() {
    //const { dispatch, } = this.props;
    //dispatch(appActions.showLoading(false));
  }
  MoLoadDing() {
    //const { dispatch, } = this.props;
    //dispatch(appActions.showLoading(true));
  }
  savetokentosever(token) {
    //(string userId, string imei, string token, string isAndroid)
    this.props.dispatch(
      savetokentosever({ userId: this.props.userID, imei: token, token, isAndroid: Platform.OS == 'android' ? 1 : 0, }, (dt) => {
        if (dt) {
          //let data = dt.find(item=>item.TRANGTHAI[0] === '0');
          Logg.info(dt);
        }
      }));

  }
  async componentDidMount() {
    const { dispatch, } = this.props;
    this.MessageList();
    this.props.dispatch(SetisScrenchatactive(true));
    registerAppListener(this.props.navigation, dispatch);
    FCM.getInitialNotification().then((notif) => {
      this.setState({
        initNotif: notif,
      });
      if (notif && notif.targetScreen === 'detail') {
        setTimeout(() => {
          this.props.navigation.navigate('Detail');
        }, 500);
      }
    });

    try {
      let result = await FCM.requestPermissions({ badge: false, sound: true, alert: true, });
    } catch (e) {
      // console.error(e);
    }

    FCM.getFCMToken().then((token) => {
      Logg.info('TOKEN (getFCMToken)', token);
      if(token&&token.length>0)
      this.savetokentosever(token);
      //this.setState({ token: token || "" })
    });

    if (Platform.OS === 'ios') {
      FCM.getAPNSToken().then((token) => {
        Logg.info('APNS TOKEN (getFCMToken)', token);
      });
    }

    // topic example
    // FCM.subscribeToTopic('sometopic')
    // FCM.unsubscribeFromTopic('sometopic')


    
  }

  showLocalNotification() {
    FCM.presentLocalNotification({
      id: new Date().valueOf().toString(),                // (optional for instant notification)
      title: 'Test Notification with action',             // as FCM payload
      body: 'Force touch to reply',                       // as FCM payload (required)
      sound: 'bell.mp3',                                  // "default" or filename
      priority: 'high',                                   // as FCM payload
      click_action: 'com.myapp.MyCategory',               // as FCM payload - this is used as category identifier on iOS.
      badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
      number: 10,                                         // Android only
      ticker: 'My Notification Ticker',                   // Android only
      auto_cancel: true,                                  // Android only (default true)
      large_icon: 'https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg',                           // Android only
      icon: 'ic_launcher',                                // as FCM payload, you can relace this with custom icon you put in mipmap
      big_text: 'Show when notification is expanded',     // Android only
      sub_text: 'This is a subText',                      // Android only
      color: 'red',                                       // Android only
      vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
      wake_screen: true,                                  // Android only, wake up screen when notification arrives
      group: 'group',                                     // Android only
      picture: 'https://google.png',                      // Android only bigPicture style
      ongoing: true,                                      // Android only
      my_custom_data: 'my_custom_field_value',             // extra data you want to throw
      lights: true,                                       // Android only, LED blinking (default false)
      show_in_foreground: true,                           // notification when app is in foreground (local & remote)
    });
  }

  scheduleLocalNotification() {
    FCM.scheduleLocalNotification({
      id: 'testnotif',
      fire_date: new Date().getTime() + 5000,
      vibrate: 500,
      title: 'Hello',
      body: 'Test Scheduled Notification',
      sub_text: 'sub text',
      priority: 'high',
      large_icon: 'https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg',
      show_in_foreground: true,
      picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
      wake_screen: true,
      extra1: { a: 1, },
      extra2: 1,
    });
  }

  sendRemoteNotification(token) {
    let body;

    if (Platform.OS === 'android') {
      body = {
        'to': token,
        'data': {
          'custom_notification': {
            'title': 'Simple FCM Client',
            'body': 'Click me to go to detail',
            'sound': 'default',
            'priority': 'high',
            'show_in_foreground': true,
            targetScreen: 'detail',
          },
        },
        'priority': 10,
      };
    } else {
      body = {
        'to': token,
        'notification': {
          'title': 'Simple FCM Client',
          'body': 'Click me to go to detail',
          'sound': 'default',
        },
        data: {
          targetScreen: 'detail',
        },
        'priority': 10,
      };
    }

    firebaseClient.send(JSON.stringify(body), 'notification');
  }

  sendRemoteData(token) {
    let body = {
      'to': token,
      'data': {
        'title': 'Simple FCM Client',
        'body': 'This is a notification with only DATA.',
        'sound': 'default',
      },
      'priority': 'normal',
    };

    firebaseClient.send(JSON.stringify(body), 'data');
  }

  showLocalNotificationWithAction() {
    FCM.presentLocalNotification({
      title: 'Test Notification with action',
      body: 'Force touch to reply',
      priority: 'high',
      show_in_foreground: true,
      click_action: 'com.myidentifi.fcm.text', // for ios
      android_actions: JSON.stringify([{
        id: 'view',
        title: 'view',
      }, {
        id: 'dismiss',
        title: 'dismiss',
      },]), // for android, take syntax similar to ios's. only buttons are supported
    });
  }


  render() {
    // const { test, } = this.props.datachat;
    // alert(test);
    return (
      <View style={styles.containt} >
        {/* <TouchableOpacity onPress={() => {
          Linking.openURL(`tel:${this.props.dataLogin.sdt_gsbh}`)
        }} style={styles.phone}>
          <Image source={CommonIcons.Phone} style={styles.image}></Image>
          <TextCmp>GSBH: {this.props.dataLogin.sdt_gsbh}</TextCmp>
          
        </TouchableOpacity> */}
        {this.ChatHaha()}
      </View>

    );
  }
}
const styles = StyleSheet.create({
  containt: { flex: 1, },
  phone: {
    height: 40,
    backgroundColor: Colors.backgroundL1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 30, height: 30, tintColor: Colors.HeaderColor, },
});
export default connect((state) => ({
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
  datachat: state.datachat,
}),
  (dispatch) => ({ dispatch, }))(ChatView);

