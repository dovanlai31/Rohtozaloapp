import React from 'react';
import {  Modal, TouchableOpacity, View, Text, ScrollView, StyleSheet ,TextInput } from 'react-native';
import { Colors, Fonts, } from '../theme';
import Icon from '../assets/Icons';
let  mainColor = Colors.mainColor
class Notify extends React.Component {
	static _instant = null;
	constructor(props) {
		super(props);
		Notify._instant = this;
		this.state = {
			title: '',
			content: '',
			textOK: '',
			visible: false,
			isCancel: false,
			search:false,
			searchInputTxt:''
		};
	}

	static show(title = '', content = '', isCancel, callback, textOK = '') {
		if (title) {
			Notify._instant.setState({
				title,
				content,
				textOK,
				isCancel: isCancel ? true : false,
				visible: true,
				callback,
				searchInputTxt:''
				
			});
		}
	}

	static hide() {
		alert('xxx')
		Notify._instant.setState({
			title: '',
			content: '',
			visible: false,
			isCancel: false,
			search:false
		});
	}
	onChangeTextSearch(text){
		// let { title, content, isCancel, textOK } = this.state;
		// let { onPressItem, items, label, mutidata, search } = content;
		// if(items&&items.length>0){
		// 	let arr = items.filter(
		// 		cus => (cus.label + '').toLowerCase().indexOf(text.toLowerCase()) > -1,
		// 	  );
		// 	  content.arr=arr
		// 	  this.setState({content})
		// }
		this.setState({searchInputTxt:text})

	}
	render() {
		let { title, content, isCancel, textOK,searchInputTxt } = this.state;
		let dataContent = '';
		let labelOK = 'OK';
		if (typeof content == 'object') {
			isCancel = false;
			let { onPressItem, items, label, mutidata, search } = content;
			
			 items = items.filter(
				cus => (cus.label + '').toLowerCase().indexOf(searchInputTxt.toLowerCase()) > -1,
			  );


			labelOK = 'Quay lại';
			if(mutidata )
			labelOK = 'OK ';
			dataContent = (
				<ScrollView
					style={{ marginBottom: 10, marginTop: 10, marginHorizontal: 10 }}
				>
					{search && (
						<View
							style={{
								height: 40,
								width: '95%',
								backgroundColor: '#eeeeee',
								borderRadius: 20,
								paddingHorizontal: 20,
							}}>
							<TextInput
								placeholder={'Tìm kiếm'}
								onChangeText={text => this.onChangeTextSearch(text)}
								style={{ height: '100%' }}
							/>
						</View>
					)}
					{mutidata && items.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}
							onPress={() => {

								let tam = [];
								items.map((x) => {

									let t = x;
									if (item.label == x.label) { t.isselect = !item.isselect; }
									tam.push(t);
								});
								let datatam = content;
								datatam.items = tam;
								this.setState({ content: datatam, });
								onPressItem(item, index);
								//Notify.hide();
							}}
						>
							{/* <View style={item.isselect?styles.viewrow2:styles.viewrow}></View> */}

							<Icons
								name={item.isselect ? 'checked' : 'nocheck'}
								size={16}
								color={item.isselect ? mainColor : null}
							/>
							<Text style={{
								fontSize: 16,
								fontWeight: '600',
								color: 'rgba(0,0,0,0.8)',
								flex: 1,
								margin: 3,
								marginHorizontal: 10
							}} >
								{item.name ? item.name : item.ten ? item.ten : item.label}
							</Text>
						</TouchableOpacity>
					))}

					{!mutidata && items.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}
							onPress={() => {
								onPressItem(item, index);
								Notify.hide();
							}}
						>
							<View
								style={{
									width: 18,
									height: 18,
									borderRadius: 9,
									borderWidth: 1,
									borderColor: 'rgba(0,0,0,0.3)',
									marginRight: 7,
									//backgroundColor:'#C1C2C4'
								}}
							/>
							<Text
								style={{
									fontSize: 16,
									fontWeight: '600',
									color: 'rgba(0,0,0,0.8)',
									flex: 1,
									margin: 3
								}}
							>
								{(label && item[label]) || item.label}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			);
		} else {
			dataContent = (
				<Text
					style={{
						textAlign: 'center',
						color: 'rgba(0,0,0,0.9)',
						marginBottom: 10,
						marginTop: 10,
					}}
				>
					{content}
				</Text>
			);
		}
		return (
			<Modal
				visible={this.state.visible}
				transparent={true}
				onRequestClose={() => { }}
				supportedOrientations={['portrait', 'landscape']}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={{
						backgroundColor: 'rgba(0,0,0,0.1)',  
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',

						borderRadius: 5,
						shadowOffset: { width: 0, height: 13, },
						shadowOpacity: 0.5,
						shadowRadius: 6,

					}}
					onPress={(_) => Notify.hide()}
				>
					<TouchableOpacity
						style={{
							width: '90%',
							padding: 10,
							backgroundColor: 'rgba(255,255,255,0.9)',
							borderRadius: 5,
							maxHeight: '90%',
						}}
						activeOpacity={1}
					>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 18,
								color: mainColor,
								width: '100%',
								textAlign: 'center'
							}}
						>
							{title ? title : 'Thông báo'}
						</Text>
						{dataContent}
						<View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderColor: 'gray', height: 35, alignItems: 'center', marginTop: 10 }}>
							{isCancel && (
								<TouchableOpacity
									style={{
										paddingHorizontal: 5,
										marginLeft: 5,
										marginRight: 5,
									}}
									onPress={(_) => Notify.hide()}
								>
									<Text
										style={{
											color: 'rgba(0,0,0,0.8)',
											fontSize: 14,
											fontWeight: '500',
										}}
									>
										Hủy
									</Text>
								</TouchableOpacity>
							)}
							<TouchableOpacity
								style={{
									paddingHorizontal: 5,
									marginLeft: 5,
									marginRight: 5,
								}}
								onPress={(_) => {
									Notify.hide();
									Notify._instant.state.callback &&
										Notify._instant.state.callback();
								}}
							>
								<Text
									style={{ color: mainColor, fontSize: 14, fontWeight: '500' }}
								>
									{textOK || labelOK}
								</Text>
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				</TouchableOpacity>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	viewrow: {
		width: 14,
		height: 14,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.1)',
		marginRight: 7,

	},
	viewrow2: {
		width: 14,
		height: 14,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.1)',
		marginRight: 7,
		padding: 2,
		backgroundColor: mainColor,

	},
})
export default Notify;