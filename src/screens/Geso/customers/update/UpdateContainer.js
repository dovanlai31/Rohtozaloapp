import React from 'react';
import { connect } from 'react-redux';
import UpdateView from './UpdatePresenter';
import { pop } from '../../routes/routes.action';
import { getListKH, getNewInfo, updateCustomer, getQuanHuyen } from './update.action';
import moment from 'moment';
import { branchDefault } from '../../../constants';
import customerReducer from './../../customer/reducers/customer';
import { Notify, Toast } from '../../common';
import { customerActions } from '../../customer';
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
			value: temp.slice(0, indexOfHyphen),
			label: temp.slice(indexOfHyphen + 1, temp.length),
		});
		string = string.slice(index + 1, string.length);
		index = string.indexOf(';');
	}

	indexOfHyphen = string.indexOf('-');

	list.push({
		value: string.slice(0, indexOfHyphen),
		label: string.slice(indexOfHyphen + 1, string.length),
	});
	return list;
};
const initData = {
	khId: {
		value: '',
		label: 'Khách hàng',
		text: '',
		title: 'Chọn khách hàng',
	},
	ten: {
		value: '',
		label: 'Tên khách hàng',
	},
	dienthoai: {
		value: '',
		label: 'Điện thoại',
	},
	diachigiaohang: {
		value: '',
		label: 'Địa chỉ',
		title: 'Chọn khách hàng',
	},
	trangthai: {
		value: true,
		label: 'Hoạt động',
	},
	loaikh: {
		value: '',
		text: '',
		label: 'Loại khách hàng',
		title: 'Chọn loại khách hàng',
	},
	vtkh: {
		value: null,
		text: '',
		label: 'Vị trí khách hàng',
		title: 'Chọn vị trí khách hàng',
	},
	nvgn: {
		value: '',
		text: '',
		label: 'NV giao nhận',
		title: 'Chọn NV giao nhận',
	},
	tinh: {
		value: '',
		text: '',
		label: 'Tỉnh/Thành',
		title: 'Chọn Tỉnh/Thành',
	},
	quan: {
		value: '',
		text: '',
		label: 'Quận/Huyện',
		title: 'Chọn Quận/Huyện',
	},
	tennguoidd: {
		value: '',
		label: 'Tên người đại diện',
	},
	masothue: {
		value: '',
		label: 'Mã số thế',
	},
	tanso: {
		value: '',
		text: '',
		//isValidate: false,
		label: 'Tần số viếng thăm(*)',
		title: 'Chọn tần số viếng thăm',
		err: 'Vui lòng nhập tần số viếng thăm',
	},
	tuyen: {
		value: '',
		text: '',
		//isValidate: false,
		label: 'tuyến bán hàng',
		title: 'Chọn tuyến bán hàng',
		err: 'Vui lòng nhập tuyến bán hàng',
	},
	kenhbh: {
		value: '',
		text: '',
		//isValidate: false,
		label: 'Kênh bán hàng(*)',
		title: 'Chọn kênh bán hàng',
		err: 'Vui lòng chọn kênh bán hàng',
	},
};
class UpdateContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: { ...initData },
		};
	}

	componentDidMount() {
		const { dispatch, ddkdId, nppId, loaiNpp, navigation } = this.props;
		const { data } = this.state;
		const currentCustomer = navigation.state.params.currentCustomer;

		// dispatch(
		// 	getListKH(
		// 		{
		// 			ddkdId,
		// 			tbhId: navigation.state.params.tbhId,
		// 			khId: currentCustomer.KHID
		// 		},
		// 		(dt) => {
		// 			if (dt) {
		// 				data.khId.list = dt.map((item) => {
		// 					item.label = item.KHTEN[0];
		// 					item.value = item.KHID[0];
		// 					return item;
		// 				});
		// 				if (item.TRANGTHAI === '1') {
		// 					data.trangthai.value = true;
		// 				} else {
		// 					data.trangthai.value = false;
		// 				}

		// 				this.setState({ data });
		// 				this.loadInfoCus(dt)

		// 			} else {
		// 				Notify.show(
		// 					'Thông báo',
		// 					'Lấy thông tin khách hàng không thành công',
		// 				);
		// 			}
		// 		},
		// 	),
		// );

		dispatch(
			getNewInfo({ ddkdId, nppId, khId: currentCustomer.KHID }, (dt) => {
				if (dt) {
					//alert("xxxx"+currentCustomer.nvgn); 
					data.vtkh.list = createListDropdown(dt[0].HANGCUAHANG);
					data.nvgn.list = createListDropdown(dt[0].NVGN);
					data.loaikh.list = createListDropdown(dt[0].LOAICUAHANG);
					data.tanso.list = createListDropdown(dt[0].TANSO);
					data.tinh.list = createListDropdown(dt[0].TINHTHANH);
					data.kenhbh.list = createListDropdown(dt[0].KENHBANHANG);
					data.trangthai.value = true;

					this.setState({ data });

					data['khId'].text = currentCustomer.KHTEN;
					data['khId'].value = currentCustomer.KHID;


					data.diachigiaohang.value = currentCustomer.DIACHI;
					data.ten.value = currentCustomer.TEN;
					data.dienthoai.value = currentCustomer.SODIENTHOAI;
					data.masothue.value = currentCustomer.MASOTHUE;
					data.tennguoidd.value = currentCustomer.NGUOIDAIDIEN;
					data.tuyen.value = currentCustomer.tbh_fk
					data.nvgn.list.map((it) => {
						//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);					
						if (it.value == currentCustomer.nvgn) {
							//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);			
							data.nvgn.value = it.value;
							data.nvgn.text = it.label;
						}
					});
					data.kenhbh.list.map((it) => {
						//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);					
						if (it.value == currentCustomer.KBH_FK) {
							//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);			
							data.kenhbh.value = it.value;
							data.kenhbh.text = it.label;
						}
					});
					data.loaikh.list.map((it) => {
						if (it.value === currentCustomer.LCH_FK) {
							data.loaikh.value = it.value;
							data.loaikh.text = it.label;
						}
					});

					data.vtkh.list.map((it) => {
						if (it.label === currentCustomer.VTCH_FK) {
							data.vtkh.value = it.value;
							data.vtkh.text = it.label;
						}
					});
					//alert("xxxx"+currentCustomer.TANSO);	
					data.tanso.list.map((it) => {
						if (it.label == currentCustomer.TANSO) {
							//alert("xxxx" + it.value + " - " + it.label + " - " + currentCustomer.TANSO);
							data.tanso.value = it.value;
							data.tanso.text = it.label;
						}
					});

					data.tinh.list.map((it) => {

						if (it.value == currentCustomer.Tinhthanh_Fk) {
							//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);			
							data.tinh.value = it.value;
							data.tinh.text = it.label;
							this.getquanhuyen(it.value, currentCustomer.quanhuyen_fk);

						}
					});
					data.vtkh.list.map((it) => {

						if (it.value == currentCustomer.VTCH_FK) {
							//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);			
							data.vtkh.value = it.value;
							data.vtkh.text = it.label;
						}
					});
					data.loaikh.list.map((it) => {

						if (it.value == currentCustomer.LCH_FK) {
							//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);			
							data.loaikh.value = it.value;
							data.loaikh.text = it.label;
						}
					});

					this.setState({ data });

				}
			}),
		);


	}
	loadInfoCus(dt) {

	}
	onPressDropdown = (name) => {
		const { data } = this.state;

		if (name === 'khId') {
			// Notify.show(data[name].title, {
			// 	items: data[name].list,
			// 	onPressItem: (item, index) => {
			// 		data[name].text = item.label;
			// 		data[name].value = item.value;
			// 		console.log('log khid', item);
			// 		data.diachigiaohang.value = item.DIACHI[0];
			// 		data.ten.value = item.TEN[0];
			// 		data.dienthoai.value = item.SODIENTHOAI[0];

			// 		if (item.TRANGTHAI[0] === '1') {
			// 			data.trangthai.value = true;
			// 		} else {
			// 			data.trangthai.value = false;
			// 		}

			// 		data.nvgn.list.map((it) => {
			// 			if (it.value === item.nvgn[0]) {
			// 				data.nvgn.value = it.value;
			// 				data.nvgn.text = it.label;
			// 			}
			// 		});

			// 		data.loaikh.list.map((it) => {
			// 			if (it.value === item.LCH_FK[0]) {
			// 				data.loaikh.value = it.value;
			// 				data.loaikh.text = it.label;
			// 			}
			// 		});

			// 		data.vtkh.list.map((it) => {
			// 			if (it.value === item.VTCH_FK[0]) {
			// 				data.vtkh.value = it.value;
			// 				data.vtkh.text = it.label;
			// 			}
			// 		});

			// 		this.setState({ data });
			// 	},
			// });
		}
		else if (name === 'tinh') {

			Notify.show(data[name].title, {
				items: data[name].list,
				onPressItem: (item, index) => {

					data[name].text = item.label;
					data[name].value = item.value;
					//alert("ma tinh "+item.value)
					const tinhthanhId = item.value
					if (tinhthanhId.length > 0) {
						//data.quan.list.map((it) => {

						//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);			
						data.quan.value = "";
						data.quan.text = "";

						//});

						this.getquanhuyen(tinhthanhId);

					}



					this.setState({ data });
				},
			});
		}
		else if (name === 'quan' && !data.quan.list) {
			return Notify.show('Thông báo', 'Vui lòng chọn tỉnh thành trước');
		}
		else {
			Notify.show(data[name].title, {
				items: data[name].list,
				onPressItem: (item, index) => {
					data[name].text = item.label;
					data[name].value = item.value;

					this.setState({ data });
				},
			});
		}
	};

	getquanhuyen(tinhthanhId, quanhuyen_fk) {
		const { data } = this.state;

		this.props.dispatch(
			getQuanHuyen({ tinhthanhId }, (dt) => {
				data.quan.list = dt.map((item) => {
					//console.log("item.TEN[0] "+item.TEN[0]);
					item.label = item.TEN[0];
					item.value = item.PK_SEQ[0];
					return item;
				});

				if (quanhuyen_fk) {
					data.quan.list.map((it) => {

						if (it.value == quanhuyen_fk) {
							//alert("xxxx"+it.value+" - "+it.label +" - "+currentCustomer.nvgn);			
							data.quan.value = it.value;
							data.quan.text = it.label;
						}
					});
				}
				this.setState({ data });
			}),
		);
	}

	onPressCheckBox = () => {
		const { data } = this.state;
		data.trangthai.value = !data.trangthai.value;
		this.setState({ data });
	};

	onChangeText = (text, name) => {
		const { data } = this.state;

		data[name].value = text;

		this.setState({ data });
	};

	saveCustomer = () => {
		const { dispatch } = this.props;
		const { data } = this.state;

		if (
			data.ten.value !== '' &&
			data.ten.value !== '' &&
			data.ten.value !== ''
		) {
			dispatch(
				updateCustomer({
					khid: data.khId.value,
					ten: data.ten.value,
					diachi: data.diachigiaohang.value,
					dienthoai: data.dienthoai.value,
					trangthai: data.trangthai.value ? '1' : '0',
					loaikh: data.loaikh.value,
					vtkh: data.vtkh.value,
					nvgn: data.nvgn.value,
					nppId: this.props.nppId,
					ddkdId: this.props.ddkdId,
					tinhthanh: data.tinh.value,
					quanhuyen: data.quan.value,
					ngdd: data.tennguoidd.value,
					msthue: data.masothue.value,
					loaikh: data.loaikh.value,
					vtkh: data.vtkh.value,
					tanso: data.tanso.value,
					kenhbh: data.kenhbh.value,
					tbhId: data.tuyen.value,



				}),
			).then((res) => {
				if (res >= 1) {
					// this.setState({
					// 	data: {
					// 		khId: {
					// 			value: '',
					// 			label: 'Khách hàng',
					// 			text: '',
					// 			title: 'Chọn khách hàng',
					// 		},
					// 		ten: {
					// 			value: '',
					// 			label: 'Tên khách hàng',
					// 		},
					// 		dienthoai: {
					// 			value: '',
					// 			label: 'Điện thoại',
					// 		},
					// 		diachigiaohang: {
					// 			value: '',
					// 			label: 'Địa chỉ',
					// 			title: 'Chọn khách hàng',
					// 		},
					// 		trangthai: {
					// 			value: true,
					// 			label: 'Hoạt động',
					// 		},
					// 		loaikh: {
					// 			value: '',
					// 			text: '',
					// 			label: 'Loại khách hàng',
					// 			title: 'Chọn loại khách hàng',
					// 		},
					// 		vtkh: {
					// 			value: '',
					// 			text: '',
					// 			label: 'Vị trí khách hàng',
					// 			title: 'Chọn vị trí khách hàng',
					// 		},
					// 		nvgn: {
					// 			value: '',
					// 			text: '',
					// 			label: 'NV giao nhận',
					// 			title: 'Chọn NV giao nhận',
					// 		},
					// 		tinh: {
					// 			value: '',
					// 			text: '',
					// 			label: 'Tỉnh/Thành',
					// 			title: 'Chọn Tỉnh/Thành',
					// 		},
					// 		quan: {
					// 			value: '',
					// 			text: '',
					// 			label: 'Quận/Huyện',
					// 			title: 'Chọn Quận/Huyện',
					// 		},
					// 		tennguoidd:{
					// 			value: '',
					// 			label: 'Tên người đại diện',
					// 		},
					// 		masothue:{
					// 			value: '',
					// 			label: 'Mã số thế',
					// 		},
					// 		tanso: {
					// 			value: '',
					// 			text: '',
					// 			//isValidate: false,
					// 			label: 'Tần số viếng thăm(*)',
					// 			title: 'Chọn tần số viếng thăm',
					// 			err: 'Vui lòng nhập tần số viếng thăm',
					// 		},
					// 		kenhbh: {
					// 			value: '',
					// 			text: '',
					// 			//isValidate: false,
					// 			label: 'Kênh bán hàng(*)',
					// 			title: 'Chọn kênh bán hàng',
					// 			err: 'Vui lòng chọn kênh bán hàng',
					// 		},
					// 	},


					// });
					// setTimeout((_) => {
					// 	this.componentDidMount();
					// }, 100);
					//Notify.show('Thông báo', 'Cập nhật khách hàng thành công');
					//const newcus= []
					//newcus.KHID=data.khId.value,
					//newcus.TEN='data.khId.value',

					this.props.dispatch(customerActions.getListKhachHang(false, data.tuyen.value));
					setTimeout((_) => {
						this.props.dispatch(pop());
						Toast.show('Cập nhật khách hàng thành công', Toast.POSITION.BOTTOM, Toast.LENGTH.SHORT);
					}, 200);


				} else
					Notify.show('Thông báo', 'Cập nhật khách hàng Thất bại' + res);

			});
		} else {
			Notify.show('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
		}
	};

	render() {
		return (
			<UpdateView
				onBack={this.props.navigation.state.params.callback}
				onPressDropdown={this.onPressDropdown}
				onPressCheckBox={this.onPressCheckBox}
				onChangeText={this.onChangeText}
				saveCustomer={this.saveCustomer}
				data={this.state.data}

			/>
		);
	}
}

export default connect(
	(state) => ({
		ddkdId: state.app.currentNPP.ddkd_fk,
		nppId: state.app.currentNPP.npp_fk,
		loaiNpp: state.app.currentNPP.loaiNPP,
		listTuyen: state.home.listTuyen,
		customers: state.customer.customers,
	}),
	(dispatch) => ({ dispatch }),
)(UpdateContainer);
