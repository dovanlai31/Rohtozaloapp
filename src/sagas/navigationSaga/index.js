/**
 * @author: Lai.do
 * @date: 2018-12-11 16:42:15 
 *  
 * 
 */
import {  eventChannel, } from 'redux-saga';
import { take, call, } from 'redux-saga/effects';
import { AppState, } from 'react-native';

import handleChangeTab from './handleChangeTab';
import { NavigationEvent, } from '../../app-navigation';

function* startWatchingChangeTab() {
  // Create event channel for future events
  const channel = eventChannel((emit: Function) => {
    // Register emit as event handler
    NavigationEvent.registerBottomTabSelectedListener(emit);
    // Then return unsubscribe function
    return () => NavigationEvent.removeBottomTabSelectedListener(emit);
  });

  try {
    while (true) {
      // Wait for event to be emitted
      const event = yield take(channel);
      yield call(handleChangeTab, event);
    }
  } finally {
    channel.close();
  }
}

export default [startWatchingChangeTab(), ];