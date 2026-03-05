import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity, TouchableHighlight,
  Platform, Image, SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
const { width, } = Dimensions.get('window');
import { Colors, } from '../../../../theme';
import RenderScrollViewContent from './ViewChild/RenderScrollViewContent';
import { TextCmp, } from '../../../../common-components';
import { CommonIcons, } from '../../../../assets';
import { BarIndicator, PulseIndicator } from 'react-native-indicators';
import { RFValue } from 'react-native-responsive-fontsize';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import formatter from '../../fm';
import { TextInput } from 'react-native';
const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 200;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const BannerWidth = width;
const BannerHeight = width / 2;
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
      ListHinhSp
    } = this.props;
    const imageOpacity = scrollY.interpolate({
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

    console.log('ListHinhSp', ListHinhSp);
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.fill}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
      >
      <View style={styles.fill}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      
          style={{}}
          scrollEventThrottle={16}
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
          ></RenderScrollViewContent>


        </ScrollView>
        <Animated.View style={styles.header}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.HeaderColor }}/>
          <View style={styles.bar}>
            <View style={styles.hea}>

              <TextCmp style={styles.titile}>CHI TIẾT SẢN PHẨM</TextCmp>
            </View >

          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.backgroundImage,
            { opacity: imageOpacity, transform: [{ translateY: imageTranslate, },], },
          ]}
        >
          <View style={{
            flex: 1, justifyContent: 'center', flexDirection: 'row', height: HEADER_MAX_HEIGHT, backgroundColor: 'white'
          }} >

            {/* <Image resizeMode='contain' style={styles.image} source={{ uri: data.HinhAnh, }}></Image> */}
            <View style={styles.banner}>

              <Carousel
                showsPageIndicator={false}
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth}
              >
                {ListHinhSp.map((image, index) => renderPage(image, index))}
              </Carousel>
              <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20,  zIndex:300}} onPress={onBack}>
                <Animated.View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <IconAntDesign name="left" size={15} color='#fff' />
                </Animated.View>
             </TouchableOpacity>


            </View>
          </View>
        </Animated.View>
        <View style={styles.absoluteContainer}>

          <View style={{ flexDirection: 'row', padding: 10, justifyContent:'space-between', flexWrap:'wrap' }}>
            <View style={{ width: '50%', alignItems: 'flex-start', justifyContent:'center' }}>
              <View style={{ width: '100%', flex: 1, alignItems: 'flex-start', justifyContent:'center' }}>
              <TextCmp style={{ paddingLeft: 10, fontSize: RFValue(10), }}>Đơn giá {formatter.format(data.dongia)} VNĐ </TextCmp>
              <TextCmp style={{ paddingLeft: 10, fontWeight:'bold', fontSize: RFValue(14), color: Colors.textOPVGreen }}>{formatter.format(data.dongia * soluong)}  VNĐ </TextCmp>

              </View>
             </View>
            <View style={{ width: '50%', justifyContent:'center', alignItems:'flex-end',  paddingLeft:10,   }}>
            {/* <TextCmp style={{ paddingLeft: 10, fontSize: RFValue(10), }}>Đơn giá {formatter.format(data.dongia)} VNĐ </TextCmp> */}
      
               <View View style={styles.rownhapsl}>

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


        <TouchableOpacity onPress={() => themspgiohang(data)}>
          <View style={{ height: 45, width: width - 20, backgroundColor: Colors.BackgroundLighOPVGreen3, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginVertical:10, }}>
            <TextCmp style={{ color: 'white', fontSize: RFValue(14), fontWeight: 'bold', }}> Thêm vào giỏ hàng</TextCmp>
          </View>
        </TouchableOpacity>
        </View>



         </View>
     </KeyboardAvoidingView>

    );
  }

}

const renderPage = (image, index) => {
  console.log('imagex', image);
  if (image && image.HinhAnh) {
    return (
      <View key={index}>
        <Image resizeMode='contain' style={styles.page} source={{ uri: image.HinhAnh, }} />
      </View>
    );
  }

};
let isPadding = Platform.OS === 'android' && Platform.Version > 19;
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    height: 'auto',

  },
  rownhapsl: { flexDirection: 'row', alignItems: 'center' ,  justifyContent:'space-between'},
  absoluteContainer: {
   borderTopWidth: 1, borderColor: '#eeee',
  flexDirection:'column',
  padding:10, 
  minHeight: 100, width, position: 'absolute', 
  bottom: 0, 
  backgroundColor: 'white',
  justifyContent: 'space-between', zIndex: 200, },
  input: {
    fontSize:RFValue(16),
    fontWeight:'bold',
    maxWidth: 100, justifyContent: 'center',
    alignItems: 'center', textAlign: 'center', color: 'black', borderRadius: 5,
    overflow:'hidden'


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
    width: null,
    height: HEADER_MAX_HEIGHT,
    backgroundColor: 'white',
  },
  image: {
    margin: 15,
    width: width - 70, height: '100%',

  },
  titile: { color: 'white', fontWeight: 'bold', flex: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5, },

  hea: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  back: { width: 30, height: 30, tintColor: Colors.statusBar, marginHorizontal: 5, },

  banner: {
    height: HEADER_MAX_HEIGHT,
    backgroundColor: 'white',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  page: { width: BannerWidth, height: BannerHeight, },
});