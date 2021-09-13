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

function formScreen() {
	const [selectedValue, setSelectedValue] = useState('');
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
		<View style={styles.container}>
			<View style={styles.regform}>
				<Text style={styles.header}>Form Information</Text>
				<Text>Property type: </Text>
				<Picker
					selectedValue={selectedValue}
					style={{ height: 50, width: 150 }}
					onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
				>
					<Picker.Item label="Default" value="default" />
					<Picker.Item label="Flat" value="flat" />
					<Picker.Item label="House" value="house" />
					<Picker.Item label="Bungalow" value="bungalow" />
				</Picker>
				<Text>Bedrooms </Text>
				<Picker
					selectedValue={selectedValue}
					style={{ height: 50, width: 150 }}
					onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
				>
					<Picker.Item label="Default" value="default" />
					<Picker.Item label="Studio" value="studio" />
					<Picker.Item label="One" value="one" />
					<Picker.Item label="Two" value="two" />
				</Picker>
				<Text>{text}</Text>
				<Button title="DatePicker" onPress={() => showMode('date')} />
				<Button title="TimePicker" onPress={() => showMode('time')} />
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
				<Text>Monthly rent price</Text>
				<TextInput style={styles.textinput} placeholder="Monthly rent price" />
				<Text>Furniture types </Text>
				<Picker
					selectedValue={selectedValue}
					style={{ height: 50, width: 150 }}
					onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
				>
					<Picker.Item label="Default" value="default" />
					<Picker.Item label="Furnished" value="studio" />
					<Picker.Item label="Unfurnished" value="one" />
					<Picker.Item label="Part Furnished" value="two" />
				</Picker>
				<Text>Notes</Text>
				<TextInput style={styles.textinput} placeholder="Notes" />
				<Text>User Name</Text>
				<TextInput
					style={styles.textinput}
					placeholder="Please enter user name"
				/>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.btntext}>Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
		paddingLeft: 60,
		paddingRight: 60,
	},
	regform: {
		alignItems: 'stretch',
	},
	header: {
		fontSize: 24,
		color: '#3c4849',
		paddingBottom: 20,
		borderBottomColor: '#199187',
		borderBottomWidth: 1,
		marginBottom: 20,
	},
	textinput: {
		alignItems: 'stretch',
		height: 40,
		color: '#3c4849',
		borderBottomColor: '#3c4849',
		borderWidth: 1,
		paddingLeft: 14,
	},
	button: {
		alignItems: 'stretch',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#59cbbd',
	},
	btntext: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default formScreen;
