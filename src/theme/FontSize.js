/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2020-05-29 17:06:21
 * @modify date 2020-05-29 17:06:21
 * @desc [description]
 */
import {Dimensions, Platform, PixelRatio} from 'react-native';
import AppValue from '../values/AppValue';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = 1; //SCREEN_WIDTH / 360;

function normalize(size) {
  let newSize = 16 * scale; //defau
  if (size) {
    newSize = size * scale;
  }
  if (size == 'Large') {
    newSize = AppValue.Size_Font_Large * scale;
  }
  if (size == 'Small') {
    newSize = AppValue.Size_Font_Small * scale;
  }
  //return newSize;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export {normalize};
