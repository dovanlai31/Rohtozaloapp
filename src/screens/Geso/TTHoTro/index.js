
import React from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacityComponent
} from 'react-native';
import { connect, } from 'react-redux';
import { Colors, } from '../../../theme';
import ViewTT from './ViewTT';
import { thongbao_getlist, KhaoSat_GetList, getListCSTDVideo } from './Actions/Action';
import { Linking } from 'react-native';
import { TextCmp } from '../../../common-components';
import KhaoSatView from './KhaoSatView/KhaoSatView';
import LinkSocialView from './LinkSocialView/LinkSocialView';
import { IDs } from '../..';
import { AppNavigation } from '../../../app-navigation';
import VideoView from './VideoView/ViewVideo';
import { TouchableOpacity } from 'react-native';
import VideoList from './VideoView/VideoList';
import TichDiemVideo from './VideoView/TichDiemVideo';
import getYouTubeVideoId from './Actions/getYouTubeVideoId';
import { getYoutubeThumbnail } from './Actions/getYoutubeThumbnail';
import { tryCatch } from 'ramda';
const socialMediaLinks = [
  {
    name: 'Fanpage',
    icon: 'facebook-square',
    url: 'https://www.facebook.com/RVGroupVN'
  },
  {
    name: 'Zalo',
    icon: 'comment-alt',
    url: 'https://zalo.me/2674761099009385171'
  },
  {
    name: 'rvacademy',
    icon: 'book-medical',
    url: 'https://rvacademy.asia'
  },
  {
    name: 'Website',
    icon: 'globe',
    url: 'https://www.opv.vn/'
  },
  {
    name: 'Tài liệu',
    icon: 'map',
    url: 'https://www.opv.vn/en/contact-us/'
  },


];
// let youtubeVideoUrls = [
//   {
//      id: 101,
//      Link:'https://www.youtube.com/watch?v=FgYh6IUjSsg&ab_channel=POPSKids',
//      diem: '60',
//      thoigian: 30,
//      stt: 1,
//   },
//   {
//     id: 102,
//     Link: 'https://www.youtube.com/watch?v=uAX3Csg3980&ab_channel=POPSKids',
//     diem: '100',
//     thoigian: 40,
//     stt: 2,
//  },
//   {
//     id: 102,
//     Link: 'https://www.youtube.com/watch?v=U_6xHKGf3Ho',
//     diem: '100',
//     thoigian: 40,
//     stt: 2,
//  },
//   {
//     id: 102,
//     Link: 'https://www.youtube.com/watch?v=rY_KaL0wPGU',
//     diem: '100',
//     thoigian: 40,
//     stt: 2,
//  },
//   {
//     id: 102,
//     Link: 'https://www.youtube.com/watch?v=8g6VpTeyM1w',
//     diem: '100',
//     thoigian: 40,
//     stt: 2,
//  },
//   {
//     id: 103,
//     Link:'https://www.youtube.com/watch?v=7zC8-06198g',
//     diem: '80',
//     thoigian: 50,
//     stt: 3,
//   },
//   {
//     id: 104,
//     Link: 'https://www.youtube.com/watch?v=LbZC0DjnhGs',
//     diem: '30',
//     thoigian: 10,
//     stt: 4,
//   },
//   {
//     id: 105,
//     Link: 'https://youtu.be/vI3pc2GVjNg?si=rQGKl4cCjEvGNx-o',
//     diem: '100',
//     thoigian: 30,
//     stt: 5,
//   },

// ];
// youtubeVideoUrls = youtubeVideoUrls.map((item) => {
//   const videoId = getYouTubeVideoId(item.Link);
//   const thumbnail = getYoutubeThumbnail(item.Link);
//   return { ...item, videoId, thumbnail };
// });
class Chat extends React.Component {

  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      visible: true,
    },

  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      urlLink: null,
      modalVisible: false,
      datakhaosat: null,
      youtubeVideoUrls: []
    };
  }
  componentDidMount() {
    this.KhaoSat_GetList();
    this.getListVideo();

  }
  componentDidAppear() {
    this.getListVideo();
  }
  shouldComponentUpdate(index) {
    return index !== this.state.index;
  }
  KhaoSat_GetList() {
    this.props.dispatch(KhaoSat_GetList({ userId: this.props.userID, })).then((data) => {
      if (data) { this.setState({ datakhaosat: data, }); }
    });
  }
  getListVideo() {
    this.props.dispatch(getListCSTDVideo({ khId: this.props.userID, })).then((data) => {
      if (data) {
       

        if (data[0].RESULT == 1) {
          let arr = JSON.parse(data[0].MSG)
          arr= arr.map((item) => {
            //alert(getYouTubeVideoId(item.Link))
           // console.log(item.Link)
            const videoId = getYouTubeVideoId(item.Link.replace(' ',''));
            const thumbnail = getYoutubeThumbnail(item.Link);
            return { ...item, videoId, thumbnail };
          
          });

        
          this.setState({ youtubeVideoUrls: arr, });

          this.props.dispatch({ type: 'setListVideo',ListVideo:arr });

        }
        

      }

    });
  }
  thongbao_getlist() {
    this.props.dispatch(thongbao_getlist({ userId: this.props.userID, })).then((data) => {
      if (data) { this.setState({ datathongbao: data, }); }
    });
  }


  setIndex = (index) => () => {
    this.setState({ index: index, });
  }
  handlePress = (url) => {
    Linking.openURL(url)

  };


  closeModal = () => {
    this.setState({ urlLink: null, modalVisible: false });

  };
  _chatLive = () => {
    let dataLogin = this.props.dataLogin;
    console.log('thosxxx', this.props);
    const { navigator, } = this.props;
    return AppNavigation.showModal({
      name: IDs.ChatLive,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        data: dataLogin,
      },
    });

  }
  _KhaoSat = () => {
    let dataLogin = this.props.dataLogin;
    console.log('thosxxx', this.props);
    const { navigator, } = this.props;
    return AppNavigation.showModal({
      name: IDs.Khaosat,
      options: {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },
      passProps: {
        data: dataLogin,
        datakhaosat: this.state.datakhaosat
      },
    });

  }
  _ViewVideo = () => () => {
    const { navigator, } = this.props;
    navigator._push({
      name: IDs.VideoView,
      options: {
        topbar: {
          visible: false,
          background: {
            color: Colors.HeaderColor,
          },

        },
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true, }, }),
        },
      },



    });

  }



  render() {
    // alert('xxx');
    const { index, points, isPlaying, youtubeVideoUrls } = this.state;

   // const { index, points, isPlaying,  } = this.state;
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.BackgrondLightOPV1 }} />
        <SafeAreaView style={{ backgroundColor: Colors.BackgrondLightOPV1, flex: 1 }} >
          <ScrollView showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false} style={{ flex: 1, }}>
            {/* {Platform.OS=='ios'&&<View style={{height:22, width:'100%', backgroundColor:Colors.HeaderColor}}></View>} */}
            <ViewTT index={index} setIndex={this.setIndex}
              navigator={this.props.navigator}
              datathongbao={this.state.datathongbao}
              datakhaosat={this.state.datakhaosat}
              isnewnotifywebtintuc={this.props.isnewnotifywebtintuc}
              dataLogin={this.props.dataLogin}
              callPhone={() => {
                Linking.openURL(`tel:${'02877752275'}`)
              }
              }
              ChatLive={
                this._chatLive
              }

            ></ViewTT>
            <KhaoSatView onPressKs={this._KhaoSat} />
            <TichDiemVideo youtubeVideoUrls={youtubeVideoUrls} />
            <LinkSocialView urlLink={this.state.urlLink} modalVisible={this.state.modalVisible} socialMediaLinks={socialMediaLinks} handlePress={this.handlePress} closeModal={this.closeModal} />


          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
export default connect((state) => ({
  ShopControl: state.ShopControl,
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
  isnewnotifywebtintuc: state.datachat.isnewnotifywebtintuc,
}), (dispatch) => ({ dispatch, }))(Chat);