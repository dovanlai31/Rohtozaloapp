import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Platform,
  NativeModules,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { connect, } from 'react-redux';
import { visitNNP, updateNNP, ExitNNP,ChuphinhNPP, } from './nhaphanphoitt.action';
import { ImagesIcons, } from '../../../assets';
import ViewNpp from './view/ViewNpp';
import { AppNavigation, } from '../../../app-navigation';
import ViewDialog from './../DialogView/DialogView';

class NhaphanPhoiQL extends React.Component {
  constructor () {
    super();
    this.state = {
      latitude: 10.801306,
      longitude: 106.662978,
      error: null,
      isanimation: true,
      listNpp: [],
      listCn: [
        { ten: 'Chi nhánh 1', id: '1', },
        { ten: 'Chi nhánh 2', id: '2', },
      ],
      review: {
        action: 'Chọn nhà phân phối',
        Id: null,
      },

      chinhanh: {
        action: 'Chọn chi nhánh',
        Id: 1,
      },
      location: null,
      visiblePanel: false,
      img: {
        img1: null,
        img2: null,
      },
      isloading:false,
    };
  }
  showListReview = () => {
    const { listNpp, } = this.state;

    AppNavigation.showCommonDialog({renderContent: ()=> 
      <ViewDialog  title={'Chọn Npp'} 
        content={listNpp} 
        onPressItem ={(item)=>this.onPressItem(item,'npp')} />
      ,  });

  }
  onPressItem(item,loai){
    const {  review,chinhanh, } = this.state;
    if(item.ten)
    {
      if(loai==='npp'){
        review.action = item.ten;
        review.Id = item.id;
        let chinhanh = {
          action: 'Chọn chi nhánh',
          Id: 1,
        };
        return this.setState({ review, chinhanh, });
      }
     
    }
    if(item.ten)
    {
      if(loai==='cn'){
        chinhanh.action = item.ten;
        chinhanh.Id = item.id;
       
        return this.setState({  chinhanh, });
      }
     
    }
  }
  showListchinhanh = () => {
    const { listCn, } = this.state;

    AppNavigation.showCommonDialog({renderContent: ()=> 
      <ViewDialog  title={'Chọn Chi Nhánh'} 
        content={listCn} 
        onPressItem ={(item)=>this.onPressItem(item,'cn')} />
      ,  });


  }
 
  componentDidMount () {  

    const { listNpp, } = this.state;
    const datasv = JSON.parse(this.props.listBranch.NPPLIST);
    if (this.props.data) {      
      this.setState({
      //  latitude: parseFloat(this.props.data.latitude) ,
        //longitude: parseFloat( this.props.data.longitude),
        location:this.props.data,
      });
      
    }
    else
    {this.laydoado ();}


    datasv.map((item) => {
      item2 = {
        ten: item.ten,
        id: item.pk_seq,
      };
      listNpp.push(item2);
    });

  }
  laydoado () {

    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location:position.coords,

        });

      },
      (error) => {
        this.setState({ error: error.message, });

      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
  }
  

  setLocationNPP (callback) {
    if (Platform.OS == 'ios') {
      Geolocation.watchPosition(
        (result) => {
          let location = result.coords;
          // console.log(location);
          // location = {
          // 	latitude: '10.7975447',
          // 	longitude: '106.6468263',
          // };
          this.setState({ location, });
          callback(location);
        },
        (fail) => {
          setTimeout((_) => {
            // Notify.show(
            //   'Thông báo',
            //   'Bạn chưa bật thiết bị GPS. Bạn có muốn bật GPS không?',
            //   true,
            //   () => {
            //     if (Platform.OS == 'ios') {
            //       Linking.openURL('app-settings:');
            //     } else {
            //       NativeModules.OpenSettings.openLocationSettings((complete) => {
            //         //
            //       });
            //     }
            //   }
            // );

            
          }, 10);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000,
          distanceFilter: 10,
        }
      );
      return;
    }
    NativeModules.OpenSettings.isMockLocationOn((isMock) => {
      if (isMock) {
        //Notify.show('Thông báo', 'Vui lòng tắt mô phỏng vị trí');
        Alert.alert('Thông báo', 'Vui lòng tắt mô phỏng vị trí');
        return;
      }
      Geolocation
        .watchPosition(
          (result) => {
            let location = result.coords;
            // console.log(location);
            // location = {
            // 	latitude: '10.7975447',
            // 	longitude: '106.6468263',
            // };
            callback(location);
            this.setState({ location, });
          },
          (fail) => {
           
            setTimeout((_) => {
              Notify.show(
                'Thông báo',
                'Bạn chưa bật thiết bị GPS. Bạn có muốn bật GPS không?',
                true,
                () => {
                  if (Platform.OS == 'ios') {
                    // Linking.openURL('app-settings:');
                  } else {
                    NativeModules.OpenSettings.openLocationSettings(
                      (complete) => {
                        //
                      }
                    );
                  }
                }
              );
            }, 10);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000,
            distanceFilter: 10,
          }
        )
        .catch((e) => {

        });
    });
  }

  //
  updateLocaitionNPP = ()=> {
  
    if (this.state.location) {
      if (this.state.review.Id != null) {
        const payload = {
          nppId: this.state.review.Id,
          lat: this.state.location.latitude,
          lon: this.state.location.longitude,
          chinhanh: this.state.chinhanh.Id,
          nvId:this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
          // ddkdId: '100'
        };
        this.props.dispatch(updateNNP(payload)).then((data) => {
          Alert.alert('Thông Báo', data[0].MSG);
        });
      } else {
        Alert.alert('Thông Báo', 'Vui lòng chọn nhà phân phối');
      }
    } else {
      Alert.alert(
        'Thông Báo',
        'chưa lấy được tọa độ, vui lòng kiểm tra lại gps, thử thay đổi vị trí....'
      );
    }
  }

  visitNPP (type) {
    if (this.state.location) {
      if (this.state.review.Id != null) {
        const payload = {
          nppId: this.state.review.Id,
          lat: this.state.location.latitude,
          lon: this.state.location.longitude,
          chinhanh: this.state.chinhanh.Id,
          ddkdId:
            this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
          loai: this.props.listBranch.LOAI,
        };
        this.props.dispatch(visitNNP(payload)).then((data) => {
          Alert.alert(
            'Thông Báo',
            typeof data[0].MSG === 'undefined' ? data : data[0].MSG
          );
        });
      } else {
       
        Alert.alert('Thông Báo', 'Vui lòng chọn nhà phân phối');
      }
    } else {
      // Notify.show(
      //   'Thông Báo',
      //   'chưa lấy được tọa đố, vui lòng kiểm tra lại gps, thử thay đổi vị trí....'
      // );

      Alert.alert(
        'Thông Báo',
        'chưa lấy được tọa đố, vui lòng kiểm tra lại gps, thử thay đổi vị trí....'
      );
    }

    // this.setLocationNPP(location => {
    // 	if (location) {
    // 		// todo

    // 	}
    // })
  }

  exitNPP (type) {
    if (this.state.location) {
      if (this.state.review.Id != null) {
        const payload = {
          nppId: this.state.review.Id,
          lat: this.state.location.latitude,
          lon: this.state.location.longitude,
          chinhanh: this.state.chinhanh.Id,
          ddkdId:
            this.props.listBranch.ID == null ? '' : this.props.listBranch.ID,
          loai: this.props.listBranch.LOAI,
        };
        this.props.dispatch(ExitNNP(payload)).then((data) => {
          Alert.alert(
            'Thông Báo',
            typeof data[0].MSG === 'undefined' ? data : data[0].MSG
          );
        });
      } else {
        Alert.alert('Thông Báo', 'Vui lòng chọn nhà phân phối');
      }
    } else {
      Alert.alert(
        'Thông Báo',
        'chưa lấy được tọa đố, vui lòng kiểm tra lại gps, thử thay đổi vị trí....'
      );
    }
  }
  ChuphinhNPP = () => {
    if (this.state.review.Id != null) {
      this.setState({isloading:true,});
      const payload = {
        nppId: this.state.review.Id,
        chinhanh: this.state.chinhanh.Id,
        nv_fk: this.props.listBranch.USERID == null ? '' : this.props.listBranch.USERID,
        loai: this.props.listBranch.LOAI,
        image: this.state.img['img1'].data,
      };
      this.props.dispatch(ChuphinhNPP(payload)).then((data) => {
        this.hidepanner();

        Alert.alert(
          'Thông Báo',
          typeof data[0].MSG === 'undefined' ? data : data[0].MSG
        );
      });
    } else {
      Alert.alert('Thông Báo', 'Vui lòng chọn nhà phân phối');
    }
  }
  takePicture =()=> {
    // if (item.ch != 0) {
    // 	return Alert.alert('Thông báo', 'Bạn đã Chụp hình');
    // }
	
    if (this.state.review.Id == null) 
    { 
      return Alert.alert('Thông Báo','Vui lòng chọn nhà phân phối để chụp hình');
    }
    const options = {

      quality: 1.0,
      maxWidth: 500,
	    maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri, data: response.data, };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        const { img, } = this.state;
        img['img1'] = source;
        // item.ch = 1;
        this.setState({ img, visiblePanel: true, });
      }
    });
  }
  hidepanner=()=>{
	  this.setState({visiblePanel : !this.state.visiblePanel,isloading:false,});
  }

  render () {
    // alert("" + this.props.listBranch.NPPLIST);
    const { latitude, longitude, review, chinhanh,visiblePanel,img,location, } = this.state;
    const actions = [
      {
        text: 'Xác định tọa độ',
        icon: ImagesIcons.xdtd_w,
        name: 'bt_xdtd',
        position: 1,
      },
      {
        text: 'Viếng thăm',
        icon: ImagesIcons.vt_w,
        name: 'bt_vt',
        position: 2,
      },
      {
        text: 'Chụp hình',
        icon: ImagesIcons.take,
        name: 'bt_ch',
        position: 3,
      },
      {
        text: 'Rời đi',
        icon: ImagesIcons.roidi_w,
        name: 'bt_rd',
        position: 4,
      },
    ];

   
    return(

      <ViewNpp 
        location={location}
        latitude ={latitude}
        longitude={longitude}
        chinhanh={chinhanh}
        review={review}
        actions={actions}
        visiblePanel={visiblePanel}
        hidepanner={this.hidepanner}
        img={img}
        ChuphinhNPP={this.ChuphinhNPP}
        updateLocaitionNPP={this.updateLocaitionNPP}
        visitNPP={()=>this.visitNPP()}
        takePicture={()=>this.takePicture()}
        exitNPP={()=>this.exitNPP()}
        showListReview={this.showListReview}
        showListchinhanh={this.showListchinhanh}
        isloading={this.state.isloading}
      ></ViewNpp>
    );
  }
}
export default connect(
  (state) => ({
    listBranch: state.app.listBranch,
    location: state.home.location,
  }),
  (dispatch) => ({ dispatch, })
)(NhaphanPhoiQL);

