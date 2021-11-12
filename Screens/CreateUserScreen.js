import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Button,
	TextInput,
	ScrollView,
	StyleSheet,
	Picker,
	Platform,
	Alert,
} from 'react-native';
import firebase from '../database/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateUserScreen = (props) => {
	const [state, setState] = useState({
		type: '',
		bedrooms: '',
		date: '',
		price: '',
		furniture: '',
		notes: '',
		name: '',
	});
	const [users, setUsers] = useState([]);
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('');

	const onChange = (name, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		let tempDate = new Date(currentDate);
		let fDate =
			tempDate.getDate() +
			tempDate.getMonth() +
			1 +
			'-' +
			tempDate.getDate() +
			'-' +
			tempDate.getFullYear();
		let fTime =
			tempDate.getHours() +
			':' +
			tempDate.getMinutes() +
			':' +
			tempDate.getSeconds();
		setText(fTime + ' ' + fDate);
		state.date = selectedDate.toLocaleString();
		setState({ ...state, [name]: selectedDate });
	};

	const showMode = (name, currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const handleChangeText = (name, value) => {
		setState({ ...state, [name]: value });
	};

	const setSelectedValue = (name, value) => {
		setState({ ...state, [name]: value });
	};

	const saveNewUser = async () => {
		if (
			state.type === '' &&
			state.bedrooms === '' &&
			state.date === '' &&
			state.price === '' &&
			state.name === ''
		) {
			alert('Please fill all required field !!');
		} else if (state.type === '') {
			alert('Please select opinions Property Type field !!');
		} else if (state.bedrooms === '') {
			alert('Please select opinions Bedrooms field !!');
		} else if (state.date === '') {
			alert('Field Date Time is required !!');
		} else if (state.price === '') {
			alert('Field Monthly rent price is required !!');
		} else if (state.price <= 0) {
			alert('Value of price must be greater than 0 !!');
		} else if (state.price >= 10000) {
			alert('Value of price must be less than 10000 !!');
		} else if (state.notes.trim().length > 30) {
			alert('Notes just maximum 30 characters !!');
		} else if (state.name === '') {
			alert('Field User Name field is required !!');
		} else if (state.name.trim().length <= 3) {
			alert('Name must be more than 3 characters !!');
		} else if (state.name.trim().length > 20) {
			alert('Name just maximum 20 characters !!');
		} else {
			Alert.alert(
				'Are you confirm?',
				`Property type: ${state.type} 
				\nBedrooms: ${state.bedrooms}
				\nDate Time: ${state.date}
				\nMonthly rent price: ${state.price}$
				\nFurniture types: ${state.furniture}
                \nNotes: ${state.notes}
				\nName of the reporter: ${state.name}`,
				[
					{
						text: 'Yes',
						onPress: () => addUser(),
					},
					{ text: 'No', onPress: () => console.log('canceled') },
				],
				{
					cancelable: true,
				}
			);
		}
	};

	useEffect(() => {
		firebase.db.collection('users').onSnapshot((querySnapshot) => {
			const state = [];
			querySnapshot.docs.forEach((doc) => {
				const { type, bedrooms, date, price, furniture, notes, name } =
					doc.data();
				users.push({
					id: doc.id,
					type,
					bedrooms,
					date,
					price,
					furniture,
					notes,
					name,
				});
			});
		});
	}, []);

	const duplicate = users.find((obj) => {
		return (
			obj.type === state.type &&
			obj.bedrooms === state.bedrooms &&
			obj.date === state.date &&
			obj.price === state.price &&
			obj.furniture === state.furniture &&
			obj.notes === state.notes &&
			obj.name === state.name
		);
	});

	const addUser = async () => {
		try {
			if (duplicate) {
				alert(
					'Duplicate event is existed. Please select or enter again, thanks !!'
				);
			} else {
				await firebase.db.collection('users').add({
					type: state.type,
					bedrooms: state.bedrooms,
					date: state.date,
					price: state.price,
					furniture: state.furniture,
					notes: state.notes,
					name: state.name,
				});
				props.navigation.navigate('UsersList');
				alert('All your property has been added to the listing. Thanks!!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<Text>Property type</Text>
				<Picker
					mode="dropdown"
					selectedValue={state.type}
					style={{ height: 50, width: 200 }}
					onValueChange={(itemValue) => setSelectedValue('type', itemValue)}
				>
					<Picker.Item label="Select" value="" />
					<Picker.Item label="Flat" value="Flat" />
					<Picker.Item label="House" value="House" />
					<Picker.Item label="Bungalow" value="Bungalow" />
					<Picker.Item label="Villa" value="Villa" />
				</Picker>
			</View>
			<View style={styles.inputGroup}>
				<Text>Bedrooms</Text>
				<Picker
					mode="dropdown"
					selectedValue={state.bedrooms}
					style={{ height: 50, width: 200 }}
					onValueChange={(itemValue) => setSelectedValue('bedrooms', itemValue)}
				>
					<Picker.Item label="Select" value="" />
					<Picker.Item label="One" value="One" />
					<Picker.Item label="Two" value="Two" />
					<Picker.Item label="Studio" value="Studio" />
				</Picker>
			</View>
			<Text style={styles.text}>Date Time: {text}</Text>
			<Button
				title="Click to choose date time"
				onPress={(value) => showMode('date', value)}
			/>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={onChange}
					maximumDate={date}
				/>
			)}

			<View style={styles.inputGroup}>
				<Text style={styles.price}>Monthly rent price</Text>
				<TextInput
					placeholder="Please enter price"
					keyboardType="numeric"
					onChangeText={(value) => handleChangeText('price', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text>Furniture types</Text>
				<Picker
					mode="dropdown"
					selectedValue={state.furniture}
					style={{ height: 50, width: 200 }}
					onValueChange={(itemValue) =>
						setSelectedValue('furniture', itemValue)
					}
				>
					<Picker.Item label="Select" value="" />
					<Picker.Item label="Furnished" value="Furnished" />
					<Picker.Item label="Unfurnished" value="Unfurnished" />
					<Picker.Item label="Part Furnished" value="Part Furnished" />
				</Picker>
			</View>
			<View style={styles.inputGroup}>
				<Text>Notes</Text>
				<TextInput
					multiline={true}
					placeholder="Please enter notes"
					onChangeText={(value) => handleChangeText('notes', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text>Name of the reporter</Text>
				<TextInput
					placeholder="Please enter user name"
					onChangeText={(value) => handleChangeText('name', value)}
				/>
			</View>
			<View>
				<Button title="Submit" color="#8a7fff" onPress={() => saveNewUser()} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 35,
		paddingRight: 35,
		paddingTop: 13,
	},
	inputGroup: {
		flex: 1,
		padding: 0,
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc',
	},
	loader: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		marginBottom: 10,
	},
	price: {
		marginTop: 10,
	},
});

export default CreateUserScreen;
