import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ThumbnailVideo from './ThumbnailVideo';
import { TextCmp } from '../../../../common-components';
import { View } from 'react-native';
import { Colors } from '../../../../theme';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { height, width } = Dimensions.get('window');

class VideoList extends React.Component {
  renderThumbnailItem = (item, index) => {
    console.log('itemxx', item)

    return <ThumbnailVideo
      videoId={item.item.videoId}
      videoUrl={item.item.Link}
      thumbnail={item.item.thumbnail}
      thoigian={item.item.thoigian}
      diem={item.item.diem}
      item={item}
    />

  }
  renderFooter = () => {
    return (
      <View style={styles.footerContainer}>

      </View>
    );
  };
  render() {
    const { youtubeVideoUrls, onPressKs } = this.props;

    return (
      <View style={styles.container}>

        <FlatList
          data={youtubeVideoUrls}
          renderItem={this.renderThumbnailItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          contentContainerStyle={styles.thumbnailList}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.backgroundL3,
    // backgroundColor:'blue',
    //backgroundColor: 'rgba(47, 121, 204, 0.12)',
    backgroundColor: '#rgba(94, 157, 249, 0.19)',
    // borderRadius:15,
    justifyContent: 'center',
    // alignItems:'center',
    width: '100%',
    minHeight: '70%',

  },
  thumbnailList: {
    // paddingHorizontal: 10,
    // paddingTop: 10,
    marginLeft: '10%',
  },
  titleComponent: {
    //  paddingVertical: 20,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  footerContainer: {
    // width: 480/3,
    // height: 360/3-30,
    paddingRight: 50,
  }
});

export default VideoList;
