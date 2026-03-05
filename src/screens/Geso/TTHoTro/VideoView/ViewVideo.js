import React, { Component, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CountDown from 'react-native-countdown-component';
import YoutubePlayer from 'react-native-youtube-iframe';
import { connect } from 'react-redux';
import { DialogGif, TextCmp, DialogOTP } from '../../../../common-components';
import { Colors } from '../../../../theme';
import { CommonIcons } from '../../../../assets';
import { Navigation } from 'react-native-navigation';
import { AppNavigation } from '../../../../app-navigation';
import Video from 'react-native-video';
import { tichdemxemvideo } from '../Actions/Action';

class ViewVideo extends Component {
  static options = {
    statusBar: {
      backgroundColor: Colors.statusBar,
      // drawBehind: true,
      visible: true,
    },
    topBar: {
      visible: false,
      background: {
        color: Colors.HeaderColor,
      },

    },
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      watchedSeconds: 0,
      timer: null,
      running: false,
      showTimer: true,
      thoigian:0

    };
  }

  componentDidMount() {

    // this.myRef.current?.getDuration().then(
    //   getDuration => console.log('ddddd', getDuration)
    // );

   // this.setState({thoigian:this.props.thoigian})
  }

  componentWillUnmount() {

  }



  onStateChange = (state) => {
    console.log("xxxxxxxxxxxxx ", state)
    if (state === 'playing') {
      this.setupVideoTimer();
    }
    else {
      this.clearVideoTimer();
    }
  };
  setupVideoTimer() {
    // pause roi resum video thi ko can tinh laij thoi gian
    if(this.state.thoigian>0) {
      this.setState({ running: true,  })
       return;
    }
    const { item } = this.props.item
    console.log("Thong tin vieo ",item)

    let a= this.props.ShopControl.ListVideo.filter(e=>e.id=item.id)
    console.log("Thong tin vieo2 ",a[0])
    if(a[0].daxem==1)
    return




    this.myRef.current?.getDuration().then(
      getDuration => {
        console.log('ddddd', getDuration)
        console.log('ddddd', item)
        if (item.HINHTHUC == 2) {
          //tinh ra giây 
          let t = item.TRONGSO * getDuration / 100.0
          //alert(t)
          this.setState({ thoigian: t,running: true,  })
        }else{
          this.setState({ running: true,thoigian: this.props.thoigian })
        }



      }
    );

  }
  clearVideoTimer() { this.setState({ running: false }) }
  onEnd = () => {

    const {item}= this.props
    // alert('tich diem test')
    // sendAPI_TichdiemVD()
    const params = {
      userId: this.props.userID,
      videoId: this.props.id

    };

    //return alert('test ok ')

    this.props.dispatch(tichdemxemvideo(params)).then((res) => {
      console.log('tichdemxemvideo', res)
      if (res) {
        if (res == 1) {
         console.log('okok', res);
          this.setState({showTimer:false})
          AppNavigation.showCommonDialog({
            renderContent: () => (
              <DialogGif
                type='success'
                message={'Tích điểm thành công'}
              />
            ),
          });
          //update store redux

          this.props.dispatch({ type: 'updateItemListVideo',item:item });
          return
        
        } else{
          console.log('okok', res);
          this.setState({showTimer:false})
          //Alert.alert("Thông báo", res)
        }
      }

    });

  };


  render() {

    const { videoUrl, videoTitle, viewCount, videoId,  } = this.props;
    const {thoigian}=this.state

    return (
      <View style={{ flex: 1 }}>
        <View>
          <YoutubePlayer
            height={300}
            ref={this.myRef}
            play={true}
            videoId={videoId}
            onChangeState={this.onStateChange}
           // onEnd={this.onEnd}

          />
         {this.state.showTimer&&thoigian>0&& <View style={styles.donghoContainer}>
            <CountDown
              until={thoigian}
              size={15}
              onFinish={this.onEnd}
              digitStyle={styles.dongho}
              digitTxtStyle={{ color: Colors.textOPVGreen }}
              timeToShow={['S']}
              timeLabels={{ s: 'Giây' }}
              running={this.state.running}
            />
          </View>
         }
        </View>


        <View style={{ padding: 10 }}>


          <TextCmp style={{ fontSize: 18, fontWeight: 'bold' }}>{videoTitle}</TextCmp>

          <TextCmp>{`${viewCount} views`}</TextCmp>



        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  donghoContainer: {
    position: 'absolute',
    right: 20,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  dongho: {
    flexDirection: 'row'
  }

});
export default connect((state) => ({
  userID: state.login.userID,
  dataLogin: state.login.dataLogin,
  isnewnotifywebtintuc: state.datachat.isnewnotifywebtintuc,
  ShopControl: state.ShopControl,
}), (dispatch) => ({ dispatch, }))(ViewVideo);
