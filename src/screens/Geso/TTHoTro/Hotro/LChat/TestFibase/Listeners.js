import { Platform, AsyncStorage, AppState,  Alert } from 'react-native';


import { reviceSmS, } from '../action/chat.action';
import { Logg, } from '../../../../../../utils';
import { AppNavigation } from '../../../../../../app-navigation';

let recentMessageId = ''
AsyncStorage.getItem('lastNotification').then((data) => {
  if (data) {

    // Logg.info('last notification - currentState ' + AppState.currentState, JSON.parse(data));
    // //if (Platform.OS === 'android') {
    // if (AppState.currentState != 'background' && AppState.currentState != 'active') {

    //   Logg.info('last notification - currentState  scheduleLocalNotification');
    //   FCM.scheduleLocalNotification({
    //     id: 'testnotif',
    //     fire_date: new Date().getTime(),
    //     vibrate: 500,
    //     title: 'Traphaco Thông Báo',
    //     body: 'Có tin nhắn mưới từ trung tâm',
    //     sub_text: 'vào xem chi tiết trong app',
    //     priority: 'high',
    //     large_icon: 'https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg',
    //     show_in_foreground: true,
    //     picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
    //     wake_screen: true,
    //     extra1: { a: 1, },
    //     extra2: 1,
    //   });
    // }
    // //}

    // AsyncStorage.removeItem('lastNotification');


  }
});

AsyncStorage.getItem('lastMessage').then((data) => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    Logg.info('last message', JSON.parse(data));
    AsyncStorage.removeItem('lastMessage');
  }
});

export function registerKilledListener() {
  // these callback will be triggered even when app is killed

  // FCM.on(FCMEvent.Notification, (notif) => {
  //   Logg.info(' registerKilledListener', JSON.stringify(notif));

  //   AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
  //   if (notif.opened_from_tray) {
  //     setTimeout(() => {
  //       if (notif._actionIdentifier === 'reply') {
  //         if (AppState.currentState !== 'background') {
  //           Logg.info('User replied ' + JSON.stringify(notif._userText));
  //           alert('User replied ' + JSON.stringify(notif._userText));
  //         } else {
  //           AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));

  //         }
  //       }
  //       if (notif._actionIdentifier === 'view') {
  //         alert('User clicked View in App');
  //       }
  //       if (notif._actionIdentifier === 'dismiss') {
  //         alert('User clicked Dismiss');
  //       }
  //     }, 1000);
  //   }


  // });
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation, dispatch) {
 






}

