import React from 'react';
import { TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import TextCmp from './TextCmp';
import { Colors } from '../theme';


export const DateInput = ({ label, placeholder, date, hightLight, onChangeDate,starCheck = false }) => {
	return (
		<View style={styles.view}>
			
			<DatePicker
				style={[styles.input,  { width:'100%',borderColor: hightLight ? Colors.textOPVRed : '#928D8D', borderWidth: hightLight ? 1.5 : 0.5}]}
				date={date}
				mode="date"
				placeholder={placeholder + (starCheck ? " * " : "")}
				format="YYYY-MM-DD"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				customStyles={{
					dateIcon: {
						position: 'absolute',
						right: 0,
						top: 10,
						marginLeft: 0,
					},
					dateInput: {
						borderWidth: 0,
						top: 5,
					},
				}}
				onDateChange={onChangeDate}
			/>
		</View>
	);
};
const styles = {
	view: { },
	row: { flexDirection: 'row' },
	input: {
		height: 50,
		borderWidth: 1,
		borderColor: '#9e9e9e',
		borderRadius: 5,
	
		alignItems: 'center',
		marginTop: 10,
	},
	dropdownView: {
		height: 50,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.1)',
		borderRadius: 5,
		flexDirection: 'row',
		paddingHorizontal: 10,
		alignItems: 'center',
	
	},
	text: { marginLeft: 10 },
	viewIcon: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
	imgPicture: {
		width: 150,
		height: 150,
	},
};

