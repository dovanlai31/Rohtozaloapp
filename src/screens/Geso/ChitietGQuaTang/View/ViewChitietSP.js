import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity, TouchableHighlight,
  Platform, Image, AccessibilityInfo, ActivityIndicator, ImageBackground, KeyboardAvoidingView,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, } = Dimensions.get('window');
import { Colors, } from '../../../../theme';
import RenderScrollViewContent from './ViewChild/RenderScrollViewContent';
import { TextCmp, } from '../../../../common-components';
import { CommonIcons, } from '../../../../assets';
import ViewQuatanghtml from './ViewChild/ViewQuatanghtml';
import formatter from '../../fm';
import { RFValue } from 'react-native-responsive-fontsize';
import { BarIndicator } from 'react-native-indicators';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const HEIGHT_SCREEN =  Dimensions.get('window').height
const WIDTH_SCREEN = Dimensions.get('window').width

export default class ViewChitietSP extends React.Component {

  render() {
    const {
      scrollY,
      onBack,
      listkm,
      data,
      RatingCount,
      RatingAVG,
      Listsplq,
      themspgiohang,
      onChangeSoluong,
      soluong,
      refeshData,
      onSelectKM,
      dataChitiet,
      modalVisible,
      setModalVisible,
      loadding
    } = this.props;
    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE,],
      outputRange: [1, 1, 0,],
      extrapolate: 'clamp',
    });
    const ButtonOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE,],
      outputRange: [1, 1, 0,],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE,],
      outputRange: [0, -50,],
      extrapolate: 'clamp',
    });

    const handleKeyboardDidShow = () => {

      styles.absoluteContainer.bottom = 250;
    };
  
    const handleKeyboardDidHide = () => {
    
      styles.absoluteContainer.bottom = 0;
    };

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.fill}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 50 })}
      >
      <View style={styles.fill}>
        <ScrollView
          style={styles.fill2}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY, }, }, },]
          )}
        >
          <RenderScrollViewContent
            data={data}
            RatingCount={RatingCount}
            RatingAVG={RatingAVG}
            onChangeSoluong={onChangeSoluong}
            soluong={soluong}
            listkm={listkm}
            Listsplq={Listsplq}
            navigator={this.props.navigator}
            refeshData={refeshData}
            onSelectKM={onSelectKM}
            dataChitiet={dataChitiet}
          ></RenderScrollViewContent>


        </ScrollView>

        <Animated.View
          style={[
            styles.backgroundImage,
            { opacity: imageOpacity, transform: [{ translateY: imageTranslate, },], },
          ]}
        >
            <View style={{ height: 250, backgroundColor:Colors.Analogus}}>
              <ImageBackground
                resizeMode='cover'
                style={{ flex: 1, justifyContent: "center" }}
                source={{ uri: data.image }}
              >

              </ImageBackground>

            </View>
        </Animated.View>
        <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20,  zIndex:300}} onPress={onBack}>
                <Animated.View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  opacity:ButtonOpacity,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <IconAntDesign name="left" size={15} color='#fff' />
                </Animated.View>
        </TouchableOpacity>
        <View style={styles.absoluteContainer}>

          <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', justifyContent:'center' }}>
              <TextCmp style={{ paddingLeft: 10, fontSize: RFValue(10), }}>Đơn giá {formatter.format(data.price)} VNĐ </TextCmp>
              <TextCmp style={{ paddingLeft: 10, fontWeight:'bold', fontSize: RFValue(14), color: Colors.textOPVGreen }}>{formatter.format(data.price * soluong)}  VNĐ </TextCmp>
            </View>
            <View style={{ width: '50%', justifyContent:'center', alignItems:'flex-end' }}>

              <View style={styles.rownhapsl}>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, borderWidth: 1 , borderColor:'#eeee' }}>
                  <TouchableOpacity style={{ margin: 5, padding: 5 }} onPress={() => {
                    if (soluong > 0)
                      onChangeSoluong(soluong - 1)
                  }
                  }>
                    <IconAntDesign name='minus' size={20}></IconAntDesign>
                  </TouchableOpacity>
                  <TextInput
                    onFocus={handleKeyboardDidShow}
                    onBlur={handleKeyboardDidHide}
                    style={styles.input}
                    value={soluong + ''}
                    defaultValue={'1'}
                    keyboardType={'numeric'}
                    // underlineColorAndroid="transparent"
                    onChangeText={(text) => 
                      {
                        //nhập quá nhiều cho về 0
                        if (parseInt(text, 10) > 10000000) {
                          onChangeSoluong('1');
                        } else {
                          onChangeSoluong(text)
                        }
                      
                      }
                    }
                  ></TextInput>
                  <TouchableOpacity onPress={() => onChangeSoluong(soluong + 1)} style={{ margin: 5, padding: 5 }}>
                    <IconAntDesign name='plus' size={20}></IconAntDesign>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>


          {loadding ? <BarIndicator size={16} color={Colors.HeaderColor}></BarIndicator> : <TouchableOpacity onPress={() => themspgiohang(data)}>
            <View style={{ height: 45, width: width - 20, backgroundColor: Colors.BackgroundLighOPVGreen3, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginVertical:10, }}>
              <TextCmp style={{ color: 'white', fontSize: RFValue(16), fontWeight: 'bold', }}> Đổi quà  </TextCmp>
            </View>
          </TouchableOpacity>}
        </View>




      </View>
      </KeyboardAvoidingView>

    );
  }

}


let isPadding = Platform.OS === 'android' && Platform.Version > 19;
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    height: 'auto',
   

  },
  fill2: {
    flex: 1,
    height: 'auto',
    zIndex:50,

  },
  rownhapsl: { flexDirection: 'row', alignItems: 'center' ,  justifyContent:'space-between'},
  absoluteContainer: {
  borderTopWidth: 1, borderColor: '#eeee',
   flexDirection:'column',
   padding:10, 
   minHeight: 140, width, position: 'absolute', 
   bottom: 0, 
   backgroundColor: 'white',
   justifyContent: 'space-between', zIndex: 400, },
  input: {
    fontSize:RFValue(16),
    fontWeight:'bold',
    maxWidth: 100, justifyContent: 'center',
    alignItems: 'center', textAlign: 'center', color: 'black', borderRadius: 5,


  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.HeaderColor,
    overflow: 'hidden',
  },
  bar: {
    // marginTop: 28,
    height: ((Platform.OS === 'ios' || isPadding) && 60) || 50,
    alignItems: 'center',
    justifyContent: 'center',
  },


  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: WIDTH_SCREEN,
    height: HEADER_MAX_HEIGHT,
    backgroundColor: 'white',
    zIndex:0,
  },
  image: {
    //margin: 15,
    width:  '100%', 
    height: 260,



  },
  titile: { color: 'white', fontWeight: 'bold', flex: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5, },

  hea: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  back: { width: 30, height: 30, tintColor: Colors.statusBar, marginHorizontal: 5, },
});