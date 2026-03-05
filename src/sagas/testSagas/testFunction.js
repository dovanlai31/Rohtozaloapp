/**
 * @author: Lai.do
 * @date: 2018-11-29 16:48:30 
 *  
 * 
 */
import {call} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Logg } from '../../utils';

const logg = Logg.create('logger test');

export default function * testFunction(){
  yield call(delay, 200);
  logg.info('call test function after delay 200ms');
}