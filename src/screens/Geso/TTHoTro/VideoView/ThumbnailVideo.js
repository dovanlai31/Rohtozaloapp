import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import getYouTubeVideoId from '../Actions/getYouTubeVideoId';
import { IDs } from '../../..';
import getYouTubeVideoInfo from '../Actions/getYouTubeVideoInfo';
import { AppNavigation } from '../../../../app-navigation';
import { Colors } from '../../../../theme';
import { getYoutubeThumbnail } from '../Actions/getYoutubeThumbnail';
import { TextCmp } from '../../../../common-components';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PulseIndicator } from 'react-native-indicators';

class ThumbnailVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: null,
      videoId: null,
      thumbnail: null,
    };
  }

  componentDidMount() {

    const videoId = this.props.videoId; 
    const thumbnail = this.props.thumbnail
    this.setState({videoId, thumbnail})
    this.getVideoInfo(videoId);

  }

  getVideoInfo = async (videoId) => {
    try {
     // const videoId = this.props.videoUrl.split('v=')[1];
      
      const info =  await getYouTubeVideoInfo(videoId);
      this.setState({ videoInfo: info });
      console.log('infovideo',info );
    } catch (error) {
      console.error("Error fetching video info:", error);
    }
  };

 

  _ViewVideo = () => {
    const { videoUrl , thogian, diem,item} = this.props;
    const { videoInfo, videoId } = this.state;
    AppNavigation.showModal({
      name: IDs.ViewVideo,
      options: {
        topbar: {
          visible: true,
          background: {
            color: Colors.HeaderColor,
          },
        },
        bottomTabs: {
          visible: false,
          drawBehind: true,
        },
      },
      passProps: {
        thoigian: this.props.thoigian,
        videoId : videoId ,
        maCT: this.props.id,
        videoUrl,
        videoTitle: videoInfo ? videoInfo.snippet.title : '',
        viewCount: videoInfo ? videoInfo.statistics.viewCount : 0,
        item:item
      },
    });
  };

  render() {
 

    // thumbnailUrl thì free
    // API google (videoInfo) lấy thêm thông tin  
    const { videoUrl , thogian, diem} = this.props;
    const { videoInfo , thumbnail} = this.state;
 ///   return <View><TextCmp>abc</TextCmp></View>
    return (
      <TouchableOpacity onPress={this._ViewVideo} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
          {/* <View  style={styles.btnStars}>
              <View style={{justifyContent:'center', alignItems:'center' , flexDirection:'row', paddingVertical:5,}}>
              <FontAwesome5 name='splotch' color='gold' size={8} />
               <TextCmp numberOfLines={2} style={styles.titlePoitnt}> +{diem}</TextCmp>
              </View>

            </View> */}
        </View>
        {videoInfo && (
          <View style={styles.videoInfoContainer}>
            <TextCmp numberOfLines={2} style={styles.videoTitle}>{videoInfo.snippet.title}</TextCmp>
            <View style={{justifyContent:'space-between', alignItems:'center' , flexDirection:'row', paddingVertical:5, flexWrap:'wrap'}}>
               <TextCmp style={styles.videoViewCount}>{`${videoInfo.statistics.viewCount} Lượt xem`}</TextCmp>            
              <TextCmp numberOfLines={2} style={styles.titlePoitnt}>+{diem}</TextCmp>
            </View>
           
          </View>
        )}

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',

    backgroundColor:Colors.BackgroundLightWhite,
    margin:5,
    borderRadius:5,
    overflow:'hidden',
  
  
  },
  imageContainer: {
    width: 480/3,
    height: 360/3-30,
  
  },
  
  thumbnail: {
    width: 480/3 ,
    height: 360/3 - 32 , 
   // flex: 1,
    resizeMode: 'cover',
  },
  videoInfoContainer: {
    marginTop: 5,
    width: 150,
    marginBottom:5,
  },
  btnStars:{
    bottom:5,
    right:5,
    position:'absolute',
    backgroundColor: 'white', 
    padding:2,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:3,
    height:15,

    
  },
  titlePoitnt:{
    color: Colors.textOPVGreen,
    fontSize: RFValue(12),
    fontWeight:'bold',
  },
  videoTitle: {
    fontSize: RFValue(10),
    color: Colors.text0PV,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  videoViewCount: {
    fontSize: RFValue(10),
    color:Colors.textOPVGray,
    textAlign: 'center',
  },
});

export default ThumbnailVideo;
