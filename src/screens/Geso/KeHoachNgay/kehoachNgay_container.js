import React from 'react';
import { connect, } from 'react-redux';
import ReportView from './KehoacNgay_presenter';
import { report, } from './KeHoachNay_action';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import { Platform, NativeModules,Alert, } from 'react-native';
import ViewDialog from './../DialogView/DialogView';
import { AppNavigation, } from '../../../app-navigation';
import Geolocation from 'react-native-geolocation-service';

import {

  ViengthamNpp, KeHoach_RoikhoiNpp, KeHoach_ChuphinhNpp, KeHoach_ViengthamKhachhang,
  KeHoach_ChuphinhKhachhang, KeHoach_RoikhoiKhachhang, KeHoach_CheckToaDoThiTruong, report2,KeHoach_ChuphinhTT,
  KeHoach_GhichuTT,
} from './KeHoachNay_action';
import { Logg, } from '../../../utils';
import ViewLoadding from './../Loadding/index';

class Kehoachngay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        tungay: moment(new Date()).format('YYYY-MM-DD'),
        denngay: moment(new Date()).format('YYYY-MM-DD'),

      },
      report: '',
      tabindex: 0,
      img: {
        img1: null,
        img2: null,
      },

      data: [
      ],
      datanvbh: [
      ],
      datatt: [
      
      ],
      visiblePanel: false,
      currentIten: null,
      isloading:false,
      location:null,
    };
  }

  componentDidMount() {

    this.getReport();
    this.getReport2();
    this.tieptuclaytoado();
  }

	getReport = () => {
	  let params = {
	    nhanvienId: this.props.listBranch.USERID,

	  };
	  const { dispatch, } = this.props;
	  const datanvbh = [];
	  dispatch(report(params)).then((res) => {
	    if (res && res.length > 0) {
	      res = JSON.parse(res);
	      res.map((item) => {
	        let tam = {
	          id: item.KEHOACHNV_TBH_FK,
	          name: item.TEN,
	          diachi: item.DIACHI,
	          vt1: item.THOIDIEMDEN,
	          ch: item.IMAGEPATH,
	          rd1: item.THOIDIEMDI,
	          khId: item.PK_SEQ,
	        };


	        datanvbh.push(tam);

	      });

	      this.setState({ report: res, datanvbh, });
	    } else this.setState({ report: '', datanvbh: [], });
	  });

	};
	//////////////
	getReport2 = () => {
	  ///public string KeHoach_TrongThang(string nhanvienId, string nam, string thang, string loai, string vungId, string khuvucId, string Idnv)//
	  let params = {
	    nhanvienId: this.props.listBranch.USERID,

	  };

	  const { dispatch, } = this.props;
	  let { data, datatt, } = this.state;

	  dispatch(report2(params)).then((res) => {
	    if (res && res.length > 0) {
	      res = JSON.parse(res);
	      res.map((item) => {
	        //npp


	        if (item.LOAI == '1') {
	          let tam = {
	            id: item.PK_SEQ,
	            name: item.NPPTEN,
	            vt1: item.LAT.length > 3 ? '1' : '',
	            ch: item.PATHIMAGE.length > 3 ? '1' : '',
	            rd1: item.THOIDIEMDI.length > 3 ? '1' : '',
	            vt2: item.THOIDIEMDEN2.length > 3 ? '1' : '',
	            rd2: item.THOIDIEMDI2.length > 3 ? '1' : '',
	          };
	          data.push(tam);
	        } else {
	          let tam2 = {
	            id: item.PK_SEQ,
	            tinh: item.TINHTEN,
	            quan: item.QUANHUYENTEN,
	            diachi: item.DIACHI,
	            vt1: item.LAT.length > 3 ? '1' : '',
	            ch: item.PATHIMAGE.length > 3 ? '1' : '',
	            ghichu:item.GHICHU2.length > 3 ? '1' : '',
	          };
	          datatt.push(tam2);
	        }



	      });

	      this.setState({ data, datatt, });


	    }
	    //else 
	    //this.setState({ data: 'Không có dữ liệu.',Listngay:[],Listngaychitiet:[] });
	  });


	};

	setToTime = (date) => {
	  const { payload, } = this.state;
	  payload.denngay = date;
	  this.setState({ payload, });
	};

	setFromTime = (date) => {
	  const { payload, } = this.state;
	  payload.tungay = date;
	  this.setState({ payload, });
	};
	Clicktab(index) {
	  return this.setState({ tabindex: index, });

	}
	tieptuclaytoado(){
	    Geolocation.getCurrentPosition(
	      (position) => {
	        this.setState({location:position.coords,});
	      },
	      (error) => Logg.error(JSON.stringify(error)),
	      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000,}
	    );

      
	    /////

	    this.watchId =  Geolocation.watchPosition((position) => {
	      Logg.info('location'+ JSON.stringify(position) );
      
	      this.setState({location:position.coords,});
	    },
	    (error) => {
	      // See error code charts below.
	      Logg.info(error.code, error.message);
	    },
	    {enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 3,}
	    );
	  
	}
	// setLocationNPP(callback) {
	//   if (Platform.OS == 'ios') {
	//     Geolocation.watchPosition(
	//         (result) => {
	//           let location = result.coords;
	//           this.setState({ location, });
	//           callback(location);
	//         },
	//         (fail) => {
	         
	//           setTimeout((_) => {
	//             Alert.alert(
	//               'Thông báo',
	//               'Bạn chưa bật thiết bị GPS. Bạn có muốn bật GPS không?',
	//               true,
	//               () => {
	//                 if (Platform.OS == 'ios') {
	//                   Linking.openURL('app-settings:');
	//                 } else {
	//                   NativeModules.OpenSettings.openLocationSettings((complete) => {
	//                     //
	//                   });
	//                 }
	//               }
	//             );
	//           }, 10);
	//         }
	//       );
	//     return;
	//   }
	//   Geolocation.watchPosition(
	//         (result) => {
	//           let location = result.coords;
	//           callback(location);
	//           this.setState({ location, });
	//         },
	//         (fail) => {

	//           setTimeout((_) => {
	//             Alert.alert(
	//               'Thông báo',
	//               'Bạn chưa bật thiết bị GPS. Bạn có muốn bật GPS không?',
	//               true,
	//               () => {
	               
	//               }
	//             );
	//           }, 10);
	//     },
	// 				 {
	//       enableHighAccuracy: true,
	//       timeout: 30000,
	//       maximumAge: 1000,
	//       distanceFilter: 10,
	//     }
	//       );
	     
	// }

	Vtnpp(item, lan) {
	  if (item.vt1 == 1 && lan == 1) {
	    return   Alert.alert('Thông báo', 'Npp đã viếng thăm');
	  }
	  if (item.vt2 == 1 && lan == 2) {
	    return   Alert.alert('Thông báo', 'Npp đã viếng thăm');
	  }
	  else {
	    let diachi = null;
	    const listCn = [
	      { ten: 'Chi nhánh 1', id: '1', },
	      { ten: 'Chi nhánh 2', id: '2', },
	    ];
		
	    AppNavigation.showCommonDialog(
	      {renderContent: ()=> 
	        <ViewDialog 			
	          title={'Chọn nhân nvbh'} 
	          content={listCn} 
	          onPressItem ={(item)=>{
	            if (item.id != null) {
	              diachi = item.id;
	             
	                if (this.state.location) {
	                  // todo 
	                  if (this.props.listBranch.USERID != null) {
	                    //string nhanvienId, string lan, string dc, string id, string lat, string lon
	                    const payload = {
	                      nhanvienId: this.props.listBranch.USERID,
	                      id: item.id,
	                      lan: lan,
	                      dc: diachi,
	                      lat: this.state.location.latitude,
	                      lon: this.state.location.longitude,

	                    };
	                    this.props.dispatch(
	                      ViengthamNpp(payload)
	                    ).then((x) => {
	                      if (x[0].MSG == 'Viếng thăm thành công!') {
	                        const { data, } = this.state;
	                        data.map((it, index) => {
	                          if (it.id === item.id) {
	                            if (lan == 1) {
	                              data[index].vt1 = 1;
	                            }
	                            if (lan == 2) {
	                              data[index].vt2 = 1;
	                            }
	                            this.setState({ data, });
	                          }
	                        });
	                      } 

	                      Alert.alert('Thông Báo', typeof (x[0].MSG) === 'undefined' ? x : x[0].MSG);
	                    });
	                  } else {
	                    Alert.alert('Thông Báo', 'Vui lòng chọn nhà phân phối');
	                  }
	                }else{
	                Alert.alert('Thông Báo', 'Chưa lấy dc tọa độ');
	                }
	             
	            }
					
	          }}
	        />,
	      }
	    );
	  }

	}

	Rdnpp(item, lan) {
	  if (item.rd1 == 1 && lan == 1) {
	    return   Alert.alert('Thông báo', 'Npp đã rời đi');
	  }
	  if (item.rd2 == 1 && lan == 2) {
	    return   Alert.alert('Thông báo', 'Npp đã rời đi');
	  }
	  const listCn = [
	    { ten: 'Chi nhánh 1', id: '1', },
	    { ten: 'Chi nhánh 2', id: '2', },
	  ];
	  AppNavigation.showCommonDialog(
	    {renderContent: ()=> 
	      <ViewDialog  
			
	        title={'Chọn nhân nvbh'} 
	        content={listCn} 
	        onPressItem ={(item)=>{
	          if (item.id != null) {
	            diachi = item.id;
						 
	            if (this.state.location) {
	              // todo 
	              if (this.props.listBranch.USERID != null) {
									            //string nhanvienId, string lan, string dc, string id, string lat, string lon
	                const payload = {
	                  nhanvienId: this.props.listBranch.USERID,
									              id: item.id,
									              lan: lan,
									              dc: item.id,
									              lat: this.state.location.latitude,
									              lon: this.state.location.longitude,
							
									            };
									            this.props.dispatch(
									              KeHoach_RoikhoiNpp(payload)
									            ).then((x) => {
									              if (x[0].MSG == 'Rời khỏi thành công!') {
									                const { data, } = this.state;
									                data.map((it, index) => {
									                  if (it.id === item.id) {
									                    if (lan == 1) {
									                      data[index].rd1 = 1;
									                    }
									                    if (lan == 2) {
									                      data[index].rd2 = 1;
									                    }
									                    this.setState({ data, });
							
							
									                  }
									                });
									              }
	                  Alert.alert('Thông Báo', typeof (x[0].MSG) === 'undefined' ? x : x[0].MSG);
															
									            });
									          } else {
									            Alert.alert('Thông Báo', 'Vui lòng chọn nhà phân phối');
									          }
	            }else{
	              Alert.alert('Thông Báo', 'Chưa lấy dc tọa độ');
	            }
						 
	          }
				
	        }}
	      />,
	    }
	  );




	}

	takePicture(item, loai) {
	  // if (item.ch != 0) {
	  // 	alert(item.ch)
	  // 	return Notify.show("Thông báo", "Bạn đã Chụp hình")
	  // }
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
	      //item.ch = 1;
	      this.setState({ img, visiblePanel: true, currentIten: item, });
	    }
	  });
	}
	luuanh(index) {
	  //console.log("xxxxxxxxxxxxxx"+this.state.visiblePanel)	
	  let { currentIten, img, data, datanvbh, } = this.state;
	  let image = img['img1'];

	  if (img) {
	    //// public string KeHoach_ChuphinhNpp(string nvId, string id, string image)
	    this.setState({isloading:true,});
	    this.props.dispatch(KeHoach_ChuphinhNpp(this.props.listBranch.USERID, currentIten.id, image.data)).then((_) => {
	      //alert(_)
	      if (_.length > 3) {

	        if (index == 1) {
	          datanvbh.map((it, index) => {
	            if (it.id === currentIten.id) {
	              currentIten.ch = 1;
	              datanvbh[index].ch = 1;
	              this.setState({
	                img: {
	                  img1: null,
	                  img2: null,
	                },
	                visiblePanel: false
	                , datanvbh,isloading:false,
	              });
	            }
	          });
	        } else {
	          data.map((it, index) => {
	            if (it.id === currentIten.id) {
	              currentIten.ch = 1;
	              data[index] = currentIten;

	            }
	          });
	        }



	        alert(_);

	        this.setState({
	          img: {
	            img1: null,
	            img2: null,
	          },
	          visiblePanel: false
	          , data, datanvbh,
	        });
	      }
	      else
	        {this.setState({
	        img: {
	          img1: null,
	          img2: null,
	        },
	        visiblePanel: false,

	      });}
	    });
	  } else {
	    Alert.alert('Thông báo', 'Bạn chưa chụp ảnh');
	  }
	}
	//////////////kh nv
	VtKhNv(item) {
	  if (item.vt1 != 0) {
	    return   Alert.alert('Thông báo', 'khách hàng đã viếng thăm');
	  }
	  const location= this.state.location;

	    if (location) {
	      // todo 
	      if (this.props.listBranch.USERID != null) {
	        //string nhanvienId, string lan, string dc, string id, string lat, string lon
	        const payload = {
	          nhanvienId: this.props.listBranch.USERID,
	          ghichu: '',
	          khachhang_fk: item.khId,
	          kehoach_fk: item.id,
	          lat: location.latitude,
	          lon: location.longitude,

	        };
	      	AppNavigation.showCommonDialog( {
	        renderContent: ()=> 
	          <ViewLoadding/>,
	        });
	        this.props.dispatch(
	          KeHoach_ViengthamKhachhang(payload)
	        ).then((x) => {
	          AppNavigation.dismissOverlay('1');
	          if (x == '1') {
	            this.getReport();
	           
	            Alert.alert('Thông Báo', 'Viếng thăm thành công');
	          } else
	            {  Alert.alert('Thông Báo', x);}

	        });
	      } else {
	        Alert.alert('Thông Báo', 'không lấy dc thông tin user');
	      }

	    }else{
	    Alert.alert('Thông Báo', 'Chưa lấy dc tọa độ');
	  }

	}
	KeHoach_ChuphinhKhachhang() {
	  //console.log("xxxxxxxxxxxxxx"+this.state.visiblePanel)	
	  let { currentIten, img, datanvbh, } = this.state;
	  let image = img['img1'];

	  if (img) {
	    //// public string (string nhanvienId, string khachhang_fk, string kehoach_fk, String image)
	    const payload = {
	      nhanvienId: this.props.listBranch.USERID,

	      khachhang_fk: currentIten.khId,
	      kehoach_fk: currentIten.id,
	      image: image.data,

	    };
	    this.setState({isloading:true,});
	    this.props.dispatch(KeHoach_ChuphinhKhachhang(payload)).then((_) => {
	      //alert(_)
	      if (_) {
	        this.getReport();
	        this.setState({
	          img: {
	            img1: null,
	            img2: null,
	          },
	          visiblePanel: false,
	          isloading:false,
	        }), () => console.log(this.state.datanvbh);
	        Alert.alert('Thông Báo', 'Lưu thành công ');

	      } else {
	        this.setState({
	          img: {
	            img1: null,
	            img2: null,
	          },
	          visiblePanel: false,
	        });
	      }
	    });
	  } else {
	    Alert.alert('Thông báo', 'Bạn chưa chụp ảnh');
	  }
	}
	KeHoach_ChuphinhTT=()=> {
	  //console.log("xxxxxxxxxxxxxx"+this.state.visiblePanel)	
	  let { currentIten, img, datanvbh, } = this.state;
	  let image = img['img1'];
	  //alert(JSON.stringify(currentIten))
	  if (img) {
	    //// public string (string nhanvienId, string khachhang_fk, string kehoach_fk, String image)
	    const payload = {
	      nvId: this.props.listBranch.USERID,
	      id: currentIten.id,
	      image: image.data,

	    };
	    this.setState({isloading:true,});
	    this.props.dispatch(KeHoach_ChuphinhTT(payload)).then((_) => {
	      //alert(_)
	      if (_) {
	        const { datatt, } = this.state;
	        datatt.map((it, index) => {
	          if (it.id === currentIten.id) {
	            datatt[index].ch = 1;
	            this.setState({ datatt, });

	          }
	        });
	        this.setState({
	          img: {
	            img1: null,
	            img2: null,
	          },
	          visiblePanel: false,
	          isloading:true,
	        }), () => console.log(this.state.datanvbh);
	        Alert.alert('Thông Báo', 'Lưu thành công ');

	      } else {
	        this.setState({
	          img: {
	            img1: null,
	            img2: null,
	          },
	          visiblePanel: false,
	        });
	        Alert.alert('Thông Báo', 'Không thể lưu ảnh');
	      }
	    });
	  } else {
	    Alert.alert('Thông báo', 'Bạn chưa chụp ảnh');
	  }
	}

	KeHoach_RoikhoiKhachhang(item) {
	  if (item.rd1 != 0) {
	    return  Alert.alert('Thông báo', 'Bạn đã rời đi');
	  }
	  const location= this.state.location;
	    if (location) {
	      // todo 
	      if (this.props.listBranch.USERID != null) {
	        //KeHoach_RoikhoiKhachhang(string nhanvienId, string ghichu, string khachhang_fk, string kehoach_fk, string lat, string lon)
	        const payload = {
	          nhanvienId: this.props.listBranch.USERID,
	          ghichu: '',
	          khachhang_fk: item.khId,
	          kehoach_fk: item.id,
	          lat: location.latitude,
	          lon: location.longitude,
	        };
	        AppNavigation.showCommonDialog( {
	          renderContent: ()=> 
	            <ViewLoadding/>,
	        });
	        this.props.dispatch(
	          KeHoach_RoikhoiKhachhang(payload)
	        ).then((x) => {
	          AppNavigation.dismissOverlay('1');
	          if (x == '1') {
	            this.getReport();
	            Alert.alert('Thông Báo', 'Rời khỏi thành công');

	          }
	          else
	            {  Alert.alert('Thông Báo', x);}
	        });
	      } else {
	        Alert.alert('Thông Báo', 'Vui lòng chọn nhà phân phối');
	      }
	    }

	}
	/////////////tt
	Vttt(item) {
	  const location= this.state.location;
	  if (item.vt1 != 0) {
	    return   Alert.alert('Thông báo', 'Bạn đã viếng thăm');
	  }

	    if (location) {
	      // todo 
	      if (this.props.listBranch.USERID != null) {
	        //KeHoach_CheckToaDoThiTruong(string nhanvienId, string ghichu, string id, string lat, string lon, string diachipda)
	        const payload = {
	          nhanvienId: this.props.listBranch.USERID,
	          ghichu: '',
	          id: item.id,
	          diachipda: '',
	          lat: location.latitude,
	          lon: location.longitude,

	        };
	        AppNavigation.showCommonDialog( {
	          renderContent: ()=> 
	            <ViewLoadding/>,
	        });
	        this.props.dispatch(
	          KeHoach_CheckToaDoThiTruong(payload)
	        ).then((x) => {
	          AppNavigation.dismissOverlay('1');
	            Alert.alert('Thông Báo', typeof (x[0].MSG) === 'undefined' ? x : x[0].MSG);
	          const { datatt, } = this.state;
	          datatt.map((it, index) => {
	            if (it.id === item.id) {
	              datatt[index].vt1 = 1;
	              this.setState({ datatt, });

	            }
	          });

	        });
	      } else {
	        Alert.alert('Thông Báo', 'không lấy dc thông tin user');
	      }

	    }

	}

	ghichu (item){
	  // return alert(JSON.stringify(item))
	  if(item){  

	    AppNavigation.showCommonDialog(
	      {renderContent: ()=> 
	        <ViewDialog 			
	          title={'Nhập ghi chú'} 
	          input= {true}
	          onChangeText={ (content) => {
	            this.setState({GhichuText:content,});
	          }}
	          onPressItem ={()=>{
	            const payload = {
	              nvId: this.props.listBranch.USERID,
	              id: item.id,
	              ghichu: this.state.GhichuText,
				
	            };
	            // AppNavigation.showCommonDialog( {
	            //   renderContent: ()=> 
	            //     <ViewLoadding/>,
	            // });
	            this.props.dispatch(KeHoach_GhichuTT(payload)).then((_) => {
	              if (_) {
	                //AppNavigation.dismissOverlay('1');
	                const { datatt, } = this.state;
	                datatt.map((it, index) => {
	                  if (it.id === item.id) {
	                    datatt[index].ghichu = 1;
	                    this.setState({ datatt, });
				
	                  }
	                });
							
	                Alert.alert('Thông Báo', 'Lưu thành công ');
	              }
	            });
	          }
					 }
	        />,
	      })

	    ;}
	}
	render() {
	  return (
	    <ReportView
	      tabindex={this.state.tabindex}
	      setToTime={this.setToTime}
	      setFromTime={this.setFromTime}
	      getReport={this.getReport}
	      time={this.state.payload}
	      report={this.state.report}
	      Clicktab={(index) => this.Clicktab(index)}
	      data={this.state.data}
	      datanvbh={this.state.datanvbh}
	      Vtnpp={(item, lan) => this.Vtnpp(item, lan)}
	      Rdnpp={(item, lan) => this.Rdnpp(item, lan)}
	      visiblePanel={this.state.visiblePanel}
	      dataImgs={this.state.img}
	      takePicture={(item, loai) => this.takePicture(item, loai)}
	      hidepanner={() => { this.setState({ visiblePanel: false, }); }}
	      luuanh={(index) => this.luuanh(index)}
	      //khnv
	      VtKhNv={(item) => this.VtKhNv(item)}
	      KeHoach_ChuphinhKhachhang={() => this.KeHoach_ChuphinhKhachhang()}
	      KeHoach_RoikhoiKhachhang={(item) => this.KeHoach_RoikhoiKhachhang(item)}
	      //khtt
	      datatt={this.state.datatt}
	      Vttt={(item) => this.Vttt(item)}
	      state={this.state}
	      KeHoach_ChuphinhTT={this.KeHoach_ChuphinhTT}
	      ghichu={(item)=>this.ghichu(item)}
	      isloading={this.state.isloading}
	    />
	  );
	}
}

export default connect(
  (state) => ({
    listBranch: state.app.listBranch,
    SearchData: state.SearchData,


  }),
  (dispatch) => ({ dispatch, }),
)(Kehoachngay);
