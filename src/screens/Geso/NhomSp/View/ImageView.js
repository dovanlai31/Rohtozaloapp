import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

const BannerWidth = Dimensions.get('window').width-50;
const BannerHeight =  Dimensions.get('window').width;

const images = [
    "http://thuthuatphanmem.vn/uploads/2018/04/10/hinh-nen-anh-nang-binh-minh_052333541.jpg",
    "http://thuthuatphanmem.vn/uploads/2018/04/10/hinh-nen-bong-hoa-dep-day-suc-song_052333603.jpg",
    "http://thuthuatphanmem.vn/uploads/2018/04/10/hinh-nen-bong-hong-dep_052333650.jpg"
];

export default class ImageView extends React.Component {
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image resizeMode={'contain'} style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    //autoplay
                    //autoplayTimeout={5000}
                    //loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {this.props.datahinh.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:Dimensions.get('window').height/2,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});