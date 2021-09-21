import React, { useState } from 'react';
import {
	Button,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Picker,
	Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Datee = () => {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('Empty');

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);

		let tempDate = new Date(currentDate);

		let fDate =
			tempDate.getDate() +
			'/' +
			(tempDate.getMonth() + 1) +
			'/' +
			tempDate.getFullYear();
		let fTime =
			'Hours: ' + tempDate.getHours() + ' | Minutue ' + tempDate.getMinutes();
		setText(fDate + ' ' + fTime);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};
	return (
		<View>
			<Text>Date</Text>
			<Text>{text}</Text>
			<Button title="DatePicker" onPress={() => showMode('date')} />
			{/* <Button title="TimePicker" onPress={() => showMode('time')} /> */}
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			)}
		</View>
	);
};

export default Datee;
