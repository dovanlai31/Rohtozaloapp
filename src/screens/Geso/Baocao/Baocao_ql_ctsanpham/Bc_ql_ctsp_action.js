import { post, modifyXML } from '../../../utils/networking';
//import { appActions } from '../../../modules/app';
var parseString = require('react-native-xml2js').parseString;

export function report(payload) {
	return dispatch => {
	//	dispatch(appActions.showLoading(true));
		return post('BaocaodoanhsoSanPham', payload)
			.then(({ data, error }) => {
				dispatch(appActions.showLoading(false)); 
				console.log('BaocaodoanhsoSanPham', data, error);
				if (!error) {
					return data;
				} else {
					console.log('get BaocaodoanhsoSanPham fail', data);
					return false; 
				}
			})
			.catch(e => {
				console.log('get BaocaodoanhsoSanPham  catch', e);
				return false;
			});
	};
}
