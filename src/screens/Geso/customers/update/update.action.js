import { post, modifyXML } from '../../../utils/networking';
import moment from 'moment';
import { showLoading } from '../../app/actions/app.action';
var parseString = require('react-native-xml2js').parseString;

export function getNewInfo(payload, callback) {
	return dispatch => {
		return post('KhachHang_GetNewInfo', payload)
			.then(({ data, error }) => {
				if (!error) {
						console.log('get getNewInfo', error, data);
						if (data) {
							callback(data);
						} else {
							callback(false);
						}
				} else {
					console.log('get KhachHang_GetNewInfo fail', data);
					return false;
				}
			})
			.catch(e => {
				console.log('get KhachHang_GetNewInfo catch', e);
				return false;
			});
	};
}
export function getListKH(payload, callback) {
	return dispatch => {
		dispatch(showLoading(true))
		return post('getKhachHangListAll', payload)
			.then(({ data, error }) => {
				dispatch(showLoading(false))
				// console.log('get getKhachHangListAll', data, error);
				if (!error) {
					const xml = modifyXML(data);
					parseString(xml, function(err, dt) {
						 //console.log('get getKhachHangListAll', err, dt);
						if (dt) {
							callback(dt.DocumentElement.Table);
						} else {
							callback(false);
						}
					});
				} else {
					console.log('get getKhachHangListAll fail', data);
					return false;
				}
			})
			.catch(e => {
				dispatch(showLoading(false))
				console.log('get getKhachHangListAll catch', e);
				return false;
			});
	};
}

export function updateCustomer(payload) {
	return dispatch => {
		return post('updateKhachHangNew', payload)
			.then(({ data, error }) => {
				console.log('get updateKhachHangNew', data, error);
				if (!error) {
					return data;
				} else {
					return false;
				}
			})
			.catch(e => {
				console.log('get updateKhachHang catch', e);
				return false;
			});
	};
}
export function getQuanHuyen(payload, callback) {
	return dispatch => {
		return post('getQuanhuyenList', payload)
			.then(({ data, error }) => {
				if (!error) {
					const xml = modifyXML(data);
					parseString(xml, function(err, dt) {
						console.log('get getQuanhuyenList', err, dt);
						if (dt) {
							callback(dt.DocumentElement.Table);
						} else {
							callback(false);
						}
					});
				} else {
					console.log('get getQuanhuyenList fail', data);
					return false;
				}
			})
			.catch(e => {
				console.log('get getQuanhuyenList catch', e);
				return false;
			});
	};
}

