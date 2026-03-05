import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { TouchableOpacity } from 'react-native';
const { width, height, } = Dimensions.get('window');
const BannerWidth = width-10; 
const BannerHeight = width/3 + 20;
import ImageViewing from 'react-native-image-viewing'
import { Colors } from '../../../../theme';

export default class Banner extends React.Component{
  handlePress = (index) => {
    console.log('xxx');
    // Gọi hàm được nhận từ prop và truyền tham số
    this.props.handlePressBanner(index);
  }

  renderPage = (image, index) => {
    return (
      <TouchableOpacity key={index}  onPress={() => this.handlePress(index) }>
        <Image resizeMode='contain' style={styles.page} source={{ uri: image.HinhAnh, }} />
      </TouchableOpacity>
    );
  };

  shouldComponentUpdate(nextProps){
   // console.log('nextporps',nextProps,  );
    return nextProps.listBanner!= this.props.listBanner ||  nextProps.indexImage!= this.props.listBanner ;
  }
  render(){
    const   {listBanner, indexImage, visibleBanner, onCloseImageViewer} = this.props;
  
    return (
      <View style={styles.banner}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
          activePageIndicatorStyle={styles.activeDot}
          pageIndicatorStyle = {styles.DisableDot}
          pageIndicatorOffset={40}
        >
          
          {listBanner.map((image, index) => this.renderPage(image, index))}
        </Carousel>
        <ImageViewing
          images={listBanner.map((image) => ({ uri: image.HinhAnh }))}
          imageIndex={indexImage}
          visible={visibleBanner}
          onRequestClose={() => onCloseImageViewer()}
        
        />
      </View>
    );
  }
}




const styles = StyleSheet.create({
  banner: {
    height: width / 3+40,
    backgroundColor: 'white',
    alignItems: 'center',
    //backgroundColor:'red'
    
  },
  page:{ width: BannerWidth, height: BannerHeight,  //borderRadius: 10, 
  },
  activeDot: {
    backgroundColor: Colors.accent, 
    width: 30, 
    height: 2,
    borderRadius: 5, 

  },
  DisableDot: {
    backgroundColor: Colors.inActiveBtmTabColor, 
    width: 30, 
    height: 2,
    borderRadius: 5, 

  },

});