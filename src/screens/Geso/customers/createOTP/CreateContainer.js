import React from 'react';
import {connect} from 'react-redux';
import CreateView from './CreatePresenter';
import {Alert, Platform} from 'react-native';
import ImagePicker, { launchCamera } from 'react-native-image-picker';
//import Geolocation from 'react-native-geolocation-service';
import ViewDialog from './../../DialogView/DialogView';
import * as CreateAction from './create.action';
import {AppNavigation} from '../../../../app-navigation';
import {IDs} from '../../..';
import {Logg} from '../../../../utils';
import {CommonIcons} from '../../../../assets';
import {Navigation} from 'react-native-navigation';
const createListDropdown = (string) => {
	let list = [];

	let index = string.indexOf(';');
	let indexOfHyphen = null;
	// string = string.slice(index + 1, string.length);
	//
	// index = string.indexOf(';');
	while (index !== -1) {
		let temp = string.slice(0, index);
		indexOfHyphen = temp.indexOf('-');
		list.push({
			id: temp.slice(0, indexOfHyphen),
			label: temp.slice(indexOfHyphen + 1, temp.length),
		});
		string = string.slice(index + 1, string.length);
		index = string.indexOf(';');
	}

	indexOfHyphen = string.indexOf('-');

	list.push({
		id: string.slice(0, indexOfHyphen),
		label: string.slice(indexOfHyphen + 1, string.length),
	});
	return list;
};

class CreateContainer extends React.Component {
  static options = {
    topBar: {
      visible: false,
      title: {
        text: '',
      },
      backButton: {
        color: 'black',
      },
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      userregister: {
        tennhathuoc: {
          value: '',
          isValidate: false,
          label: 'Tên nhà thuốc',
          dungchung: true,
          err: 'Vui lòng nhập tên nhà thuốc',
        },
        ngaysinh: {
					value: '',
					isValidate: false,
					label: 'Ngày sinh',
					err: 'Vui lòng nhập ngày sinh ',
				},
        kenhbh: {
					value: '',
          text: '',
					isValidate: false,
					label: 'Kênh bán hàng',
					err: 'Vui lòng nhập kênh bán hàng',
          list:[],
				},
        diachi: {
          value: '',
          isValidate: false,
          label: 'Địa chỉ xuất HĐ',
          err: 'Vui lòng nhập địa chỉ',
        },
        mst: {
          value: '',
          isValidate: false,
          label: 'Mã số thuế',
          err: 'Vui lòng nhập Mã số thuế',
        },
        anhcuahieu: {
          // Chụp ảnh cửa hiệu
          value: '',
          isValidate: true,
          source1: null, // anhr anhdGpd
          label: 'Ảnh cửa hiệu',
          err: 'Vui lòng chụp ảnh cửa hiệu',
        },
        GxPs: {
          // Chụp ảnh GxPs
          value: '',
          isValidate: true,
          source2: null, // anhr anhdGpd
          label: 'Ảnh GDP hoặc GPP',
          err: 'Vui lòng chụp  ảnh GDP hoặc GPP',
        },
        dudieukienkd: {
          // Chụp ảnh giấy chứng nhận đăng ký kinh doanh DKKD
          value: '',
          isValidate: true,
          source3: null, // anhr anhdGpd
          label: 'Ảnh đăng ký kinh doanh DKKD',
          err: 'Vui lòng chụp ảnh đăng ký kinh doanh DKKD',
        },
        andGpdkd: {
          // anh andGpdkd
          value: '',
          isValidate: true,
          source4: null, // anhr anhdGpd
          label: 'Ảnh GPKD',
          err: 'Vui lòng chụp  ảnh giấy phép kinh doanh',
        },
        soGPKD: {
          // anh andGpdkd
          value: '',
          isValidate: false,
          label: 'Số giấy phép KD',
          err: 'Vui lòng chụp  ảnh giấy phép kinh doanh',
        },

        tinhthanh: {
          value: '',
          text: '',
          isValidate: false,
          label: 'Tỉnh/Thành',
          title: 'Chọn tỉnh thành',
          err: 'Vui lòng nhập tỉnh thành',
        },
        quanhuyen: {
          value: '',
          text: '',
          isValidate: false,
          label: 'Quận huyện',
          title: 'Chọn quận huyện',
          err: 'Vui lòng nhập quận huyện ',
        },
        phuongxa: {
          value: '',
          text: '',
          isValidate: false,
          label: 'Phường xã',
          title: 'Chọn phường xã',
          err: 'Vui lòng nhập phường xã',
        },
        sdt: {
          value: '',
          isValidate: false,
          label: 'Số di dộng',
          err: 'Vui lòng nhập Số điện thoại',
        },
        loaikh: {
					value: '',
					text: '',
					isValidate: false,
					list:[],
					label: 'Loại khách hàng',
					title: 'Chọn loại hàng khách',
					err: 'Vui lòng chọn loại hàng khách',
        
				},
        hangkh: {
					value: '100007',
					text: 'D',
					isValidate: true,
					list:[],
					label: 'Hạng khách hàng',
					title: 'Chọn hạng khách hàng',
					err: 'Vui lòng chọn hạng khách hàng',
				},
        khuvuc: {
					value: '',
					text: '',
					isValidate: false,
					list:[],
					label: 'Thành thị nông thôn',
					title: 'Thành thị nông thôn',
					err: 'Vui lòng nhập Thành thị nông thôn',
				},

        matkhau: {
          value: '',
          isValidate: false,
          label: 'Mật khẩu',   
          err: 'Vui lòng nhập Mật khẩu',
        },

      },
      tinhthanhList: [],
      quanhuyenList: [],
      ListXaPhuong: [],
      tinhthanhLabel: 'Chọn tỉnh thành',
      hightLightFields: {},
      location: null,
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
	this.getListTinhthanh();
    this.getNewInfo();
    //this.laytoado();
    const {dispatch} = this.props;

  }
  getNewInfo = () => {
    this.props.dispatch(CreateAction.getNewInfo()).then(data => {
      if (data) {
        const {userregister} = this.state;
        userregister.kenhbh.list = createListDropdown(data[0].KENHBH);
        userregister.loaikh.list = createListDropdown(data[0].LOAICUAHANG);
        userregister.hangkh.list = createListDropdown(data[0].HANGCUAHANG);
        userregister.khuvuc.list = createListDropdown(data[0].VITRIKH); //thành thị nông thôn

        if (userregister.hangkh.list && userregister.hangkh.list.length > 0) {
          userregister.hangkh.text = userregister.hangkh.list[3].label;
          userregister.hangkh.value = userregister.hangkh.list[3].id;
          //mặc định là D
        }
        this.setState({userregister});
      } else {
        console.log('errx');
      }
    });
  };

  getListTinhthanh = () => {
    this.props.dispatch(CreateAction.getTinhthanh()).then(res => {
      if (res && res.length > 0) {
        let listdata = [];


        JSON.parse(res[0].content).map(item => {
          let item2 = {
            label: item.Ten,
            id: item.Pk_seq,
          };
          listdata.push(item2);
        });

        this.setState({tinhthanhList: listdata});
      } else this.setState({tinhthanhList: []});
    });
    //} else {
  };
  getListQuanhuyen = tinhthanhid => {
    this.props
      .dispatch(CreateAction.getListQuanhuyen({tinhthanhid}))
      .then(res => {
        if (res && res.length > 0) {
          let listdata = [];

          JSON.parse(res[0].content).map(item => {
            let item2 = {
              label: item.Ten,
              id: item.Pk_seq,
            };
            listdata.push(item2);
          });

          this.setState({quanhuyenList: listdata});
        } else this.setState({quanhuyenList: []});
      });
    //} else {
  };
  getListXaPhuong(quanhuyenid) {
    // public string cart_getlist_urbox(string site_user_id, string startDate, string endDate)
    
    const payload = {userId: '', idquan: quanhuyenid};
    this.props.dispatch(CreateAction.getListXaPhuong(payload)).then(data => {
      
      if (data && data.length > 0) {
 
        let listdata = [];

        data.map(item => {
          let item2 = {
            label: item.label,
            id: item.id,
          };
          listdata.push(item2);
        });
     
        this.setState({ListXaPhuong: listdata});
      } else this.setState({ListXaPhuong: []});
    });
  }
  SelectPhuongXa = () => {
    const {userregister, ListXaPhuong, quanhuyenList} = this.state;
    // alert(JSON.stringify(ListXaPhuong))
    if (quanhuyenList.length > 0 && userregister.quanhuyen.value) {
      AppNavigation.showCommonDialog({
        renderContent: () => (
          <ViewDialog
            showSearch={true}
            title={'Chọn Phường xã'}
            content={ListXaPhuong}
            onPressItem={item => {
              if (item.id && item.id != userregister.phuongxa.value) {
                userregister.phuongxa.value = item.id;
                userregister.phuongxa.text = item.label;
                userregister.phuongxa.isValidate = true;
                this.setState({userregister});
              } else {
                userregister.phuongxa.isValidate = false;
                userregister.phuongxa.value = ''
                userregister.phuongxa.text = ''
                this.setState({userregister});
              }
            }}
          />
        ),
      });
    }
  //   return alert(JSON.stringify(ListXaPhuong))
  };

  onPressDropdown = name => {
    const {
      userregister,
      tinhthanhList,
      tinhthanhLabel,
      quanhuyenList,
    } = this.state;

    if (name === 'tinhthanh' && tinhthanhList.length > 0) {
      AppNavigation.showCommonDialog({
        renderContent: () => (
          <ViewDialog
            title={'Tỉnh thành'}
            content={tinhthanhList}
            onPressItem={item => {
              if (item.id != null && item.id != userregister.tinhthanh) {
                userregister.tinhthanh.value = item.id;
                userregister.tinhthanh.isValidate = true;
                userregister.quanhuyen.value = '';
                userregister.quanhuyen.text = '';
                userregister.phuongxa.value = '';
                userregister.phuongxa.text = '';
                this.getListQuanhuyen(item.id);
                this.setState({userregister, tinhthanhLabel: item.label});
              } else {
                userregister.tinhthanh.isValidate = false;
                this.setState({userregister,});
              }
              //console.log('xtinhthanhLabel', tinhthanhLabel);

              return this.setState({userregister, tinhthanhLabel: item.label});
            }}
            showSearch={true}
          />
        ),
      });
    } else if (name === 'quanhuyen' && quanhuyenList.length > 0) {
      if (quanhuyenList.length < 1) return;
      AppNavigation.showCommonDialog({
        renderContent: () => (
          <ViewDialog
            title={'Quận huyện'}
            content={quanhuyenList}
            onPressItem={item => {
              if (item.id != null && item.id != userregister.quanhuyen.value) {
                userregister.quanhuyen.value = item.id;
                userregister.quanhuyen.text = item.label;
                userregister.quanhuyen.isValidate = true;
                userregister.phuongxa.value = '';
                userregister.phuongxa.text = '';
                this.getListXaPhuong(item.id);
                this.setState({userregister});
              } else {
                userregister.quanhuyen.value = '';
                userregister.quanhuyen.text = '';
                userregister.quanhuyen.isValidate = false;
                this.setState({userregister});
              }
            }}
            showSearch={true}
          />
        ),
      });
      //alert('x')
      //  Notify.show('Thông báo','TR');
    } else {
      AppNavigation.showCommonDialog({
        renderContent: () => (
          <ViewDialog
            title={userregister[name].title}
            content={userregister[name].list}
            onPressItem={item => {
              if( item.id != null && item.id != userregister[name].value ) { 
              
              userregister[name].value = item.id;
              userregister[name].text = item.label
              userregister[name].isValidate = true;
              this.setState({userregister});
              } else { 
                userregister[name].value = ''
                userregister[name].text = ''
                userregister[name].isValidate = false;
                this.setState({userregister});
              }
            }}
            showSearch={true}
          />
        ),
      });
    } 
  };
  onChangeTextRegister = (text, name) => {
    const {userregister} = this.state;

    userregister[name].value = text;

    if (userregister[name].err && text === '') {
      userregister[name].isValidate = false;
    }

    if (userregister[name].err && text !== '') {
      userregister[name].isValidate = true;
    }

    this.setState({userregister});
  };
  createCustomer = () => {




    const {userregister} = this.state;
    const {navigation, dispatch} = this.props;

    // enable after 5 second
    setTimeout(() => {
      this.setState({
        disabled: false,
      });
    }, 5000);
    const updatedTruong = {};
    let payload = {};
    payload.bytehinh1 = userregister.anhcuahieu.source1
      ? userregister.anhcuahieu.source1.data
      : '';
    payload.bytehinh2 = userregister.GxPs.source2
      ? userregister.GxPs.source2.data
      : '';
    payload.bytehinh3 = userregister.dudieukienkd.source3
      ? userregister.dudieukienkd.source3.data
      : '';
    payload.bytehinh4 = userregister.andGpdkd.source4
      ? userregister.andGpdkd.source4.data
      : '';

    let hasInvalidField = false;

    for (var key in userregister) {
      if (!userregister[key].isValidate) {
        updatedTruong[key] = true;
        hasInvalidField = true;
      }
      payload[key] = userregister[key].value;
    }

    if (hasInvalidField) {
      this.setState({hightLightFields: updatedTruong});
      return Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
    }

    if (userregister.sdt.value) {
      let newText = userregister.sdt.value;

      let numbers = '0123456789';

      for (var i = 0; i < newText.length; i++) {
        if (numbers.indexOf(newText[i]) > -1) {
        } else {
          Alert.alert(
            'Thông báo',
            'Số điện thoại không được gồm kí tự đặc biệt',
          );

          return false;
        }
      }
    }
    if (userregister.mst.value) {
      let newText = userregister.mst.value;
      let numbers = '0123456789';
      for (var i = 0; i < newText.length; i++) {
        if (numbers.indexOf(newText[i]) > -1) {
        } else {
          Alert.alert('Thông báo', 'Mã số thuế không được gồm kí tự đặc biệt');

          return false;
        }
      }
    }
    this.setState({Loading: true});




    dispatch(CreateAction.createCustomer(payload)).then(res => {
      if (res) {
        this.setState({Loading: false});
        if (res[0].RESULT == 1) {
          this.props.navigator._pop(); 
          this.resetState();
          setTimeout(_ => {
            Alert.alert('Thông báo', 'Tạo mới khách hàng thành công');
          }, 200);
        } else {
          Alert.alert('Thông báo', res[0].MSG);
        }
      } else {
        return Alert.alert('Thông báo', res[0].MSG);
      }
    });
  };
  pressXDTD = () => {
    const {location} = this.state;
    if (location) {
      this.props.navigator._push({
        name: IDs.xdtdmap, //.Register,
        passProps: {
          location: location,
          setLocation: () => {
            this.setLocation(location.latitude, location.longitude);
          },
        },
        options: {
          topBar: {
            title: {
              text: 'Xác định tọa độ',
            },
            rightButtons: [
              {
                id: 'btntop',
                icon: CommonIcons.done,
              },
            ],
          },
          bottomTabs: {
            visible: false,
            ...Platform.select({android: {drawBehind: true}}),
          },
        },
      });
    } else {
      Alert.alert('Thông báo', ' Chưa lấy dc tạo độ , vui lòng đợi');
    }
  };

  setLocation = (lat, long) => {
    const {data} = this.state;
    data.toaDo.isValidate = true;
    data.toaDo.value = {lat, long};
    this.setState({data});
    Alert.alert('Thông báo', 'Xác định tọa độ thành công');
  };
  resetState = () => {

    this.setState({
      hightLightFields: {},
      userregister: {
        tennhathuoc: {
          value: '',
          isValidate: false,
          label: 'Tên nhà thuốc',
          dungchung: false,
          err: 'Vui lòng nhập tên nhà thuốc',
        },
        ngaysinh: {
					value: '',
					isValidate: false,
					label: 'Ngày sinh',
					err: 'Vui lòng nhập ngày sinh ',
				},
        diachi: {
          value: '',
          isValidate: false,
          label: 'Địa chỉ xuất HĐ',
          err: 'Vui lòng nhập địa chỉ',
        },
        mst: {
          value: '',
          isValidate: false,
          label: 'Mã số thuế',
          err: 'Vui lòng nhập Mã số thuế',
        },
        anhcuahieu: {
          // Chụp ảnh cửa hiệu
          value: '',
          isValidate: true,
          source1: null, // anhr anhdGpd
          label: 'Ảnh cửa hiệu',
          err: 'Vui lòng chụp ảnh cửa hiệu',
        },
        kenhbh: {
					value: '',
					isValidate: false,
          text: '',
					label: 'Kênh bán hàng',
					err: 'Vui lòng nhập kênh bán hàng',
				},
        GxPs: {
          // Chụp ảnh GxPs
          value: '',
          isValidate: true,
          source2: null, // anhr anhdGpd
          label: 'Ảnh GDP hoặc GPP',
          err: 'Vui lòng chụp  ảnh GDP hoặc GPP',
        },
        dudieukienkd: {
          // Chụp ảnh giấy chứng nhận đăng ký kinh doanh DKKD
          value: '',
          isValidate: true,
          source3: null, // anhr anhdGpd
          label: 'Ảnh đăng ký kinh doanh DKKD',
          err: 'Vui lòng chụp ảnh đăng ký kinh doanh DKKD',
        },
        andGpdkd: {
          // anh andGpdkd
          value: '',
          isValidate: true,
          source4: null, // anhr anhdGpd
          label: 'Ảnh GPKD',
          err: 'Vui lòng chụp  ảnh giấy phép kinh doanh',
        },
        soGPKD: {
          // anh andGpdkd
          value: '',
          isValidate: false,
          label: 'Số giấy phép KD',
          err: 'Vui lòng chụp  ảnh giấy phép kinh doanh',
        },

        tinhthanh: {
          value: '',
          text: '',
          
          isValidate: false,
          label: 'Tỉnh/Thành',
          title: 'Chọn tỉnh thành',
          err: 'Vui lòng nhập tỉnh thành',
        },
        quanhuyen: {
          value: '',
          text: '',
          list: [],
          isValidate: false,
          label: 'Quận huyện',
          title: 'Chọn quận huyện',
          err: 'Vui lòng nhập quận huyện',
        },
        phuongxa: {
          value: '',
          text: '',
          list: [],
          isValidate: false,
          label: 'Phường xã',
          title: 'Chọn phường xã',
          err: 'Vui lòng nhập phường xã',
        },
        sdt: {
          value: '',
          isValidate: false,
          label: 'Số di dộng',
          err: 'Vui lòng nhập Số điện thoại',
        },
        loaikh: {
					value: '',
					text: '',
					isValidate: false,
		
					label: 'Loại khách hàng',
					title: 'Chọn loại hàng khách',
					err: 'Vui lòng chọn loại hàng khách',
        
				},
        hangkh: {
					value: '100007',
					text: 'D',
					isValidate: true,
	
					label: 'Hạng khách hàng',
					title: 'Chọn hạng khách hàng',
					err: 'Vui lòng chọn hạng khách hàng',
				},
        khuvuc: {
					value: '',
					text: '',
					isValidate: false,
	
					label: 'Thành thị nông thôn',
					title: 'Thành thị nông thôn',
					err: 'Vui chọn nhập thành thị nông thôn',
				},

        matkhau: {
          value: '',
          isValidate: false,
          label: 'Mật khẩu',   
          err: 'Vui lòng nhập Mật khẩu',
        },

      },
    })
  };
  onPressNext = () => {
    this.createCustomer();
  };
  onPressPrev = () => {
    {
      this.props.navigator._pop(); 
      this.resetState();
    }
  };
  takePic = (name, index) => {
    //  alert(index)
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 700,
      maxWidth: 700,
    };
    const {userregister} = this.state;

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {};
        if (response.base64) {
          source = {
            uri: `data:image/jpeg;base64,${response.base64}`,
            data: response.base64 ? response.base64 : response.data,
          };
        }

        if (response.assets && response.assets.length > 0) {
          source = {
            uri: `data:image/jpeg;base64,${response.assets[0].base64}`,
            data: response.assets[0].base64,
          };
        }
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        userregister[name].value = 1;
        userregister[name]['source' + index] = source;
        this.setState({userregister});
      }
    });
  };
  render() {
    const {userregister, tinhthanhLabel, hightLightFields} = this.state;
    return (
      <CreateView
        onPressStatus={() => {
          //Toast.show('abc', Toast.POSITION.CENTER, Toast.LENGTH.SHORT);
        }}
        hightLightFields={hightLightFields}
        onChangeTextRegister={this.onChangeTextRegister}
        onPressDropdown={x => this.onPressDropdown(x)}
        SkipLogin={this.state.Skiplogin}
        Loading={this.state.Loading}
        disabled={this.state.disabled}
        dangky={() => this.dangky()}
        showdangky={this.state.showdangky}
 
        loainv={this.state.loainv}
        SelectPhuongXa={this.SelectPhuongXa}
        setloainv={t => this.setloainv(t)}
        userregister={userregister}
        onPressNext={this.onPressNext}
        onPressPrev={this.onPressPrev}
        takePic={(n, i) => this.takePic(n, i)}
        tinhthanhLabel={tinhthanhLabel}
      />
    );
  }
}

export default connect(
  state => ({

  }),
  dispatch => ({dispatch}),
)(CreateContainer);
