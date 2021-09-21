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
			'Hours: ' + tempDate.getHours() + ' | Minutes ' + tempDate.getMinutes();
		setText(fDate + ' ' + fTime);
		state.date = selectedDate.toLocaleString();
		// console.log(state.date);
		setState({ ...state, [name]: selectedDate });
		// console.log(state);
	};

	const showMode = (name, currentMode) => {
		// console.log('yes ' + currentMode + name);
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
			alert('Please fill all required field');
		} else if (state.type === '') {
			alert('Please select opinions Property Type field');
		} else if (state.bedrooms === '') {
			alert('Please select opinions Bedrooms field');
		} else if (state.date === '') {
			alert('Field Date Time is required"');
		} else if (state.price === '') {
			alert('Field Monthly rent price is required');
		} else if (state.name === '') {
			alert('Field User Name field is required');
		} else {
			// try {
			// 	await firebase.db.collection('users').add({
			// 		type: state.type,
			// 		bedrooms: state.bedrooms,
			// 		date: state.date,
			// 		price: state.price,
			// 		furniture: state.furniture,
			// 		notes: state.notes,
			// 		name: state.name,
			// 	});
			// } catch (error) {
			// 	console.log(error);
			// }
			// alert('All your property has been added to the listing. Thanks!!');
			Alert.alert(
				'Are you confirm?',
				`Property type : ${state.type} 
				\nBedrooms: ${state.bedrooms}
				\nDate Time: ${state.date}
				\nMonthly rent price s: ${state.price}
				\nFurniture types : ${state.furniture}
                \nNotes: ${state.notes}
				\nName of the reporter : ${state.name}`,
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
	// let rootRef = firebase.db.ref();
	// rootRef
	// 	.child('users')
	// 	.orderByChild('name')
	// 	.equalTo(name)
	// 	.once('value')
	// 	.then((snapshot) => {
	// 		if (snapshot.exist()) {
	// 			let userData = snapshot.val();
	// 			console.log(userData);
	// 			Alert.alert('username is taken');
	// 			return userData;
	// 		} else {
	// 			console.log(123);
	// 		}
	// 	});

	// const ss = setState({ ...state });
	const [users, setUsers] = useState([]);
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

	const addUser = async () => {
		try {
			if (state.name === 'Sonn') {
				console.log(state);
				console.log(name);
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
				console.log(state);
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
			<Text>Date Time: {text}</Text>
			<Button title="DatePicker" onPress={(value) => showMode('date', value)} />
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
				<Text>Monthly rent price</Text>
				<TextInput
					placeholder="Please enter Price"
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
					placeholder="Please enter notes"
					onChangeText={(value) => handleChangeText('notes', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text>User name</Text>
				<TextInput
					placeholder="Please enter user name"
					onChangeText={(value) => handleChangeText('name', value)}
				/>
			</View>
			<View>
				<Button title="Submit" onPress={() => saveNewUser()} />
			</View>
			<View>
				<Button title="Submit" onPress={() => haha()} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 35,
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
});

export default CreateUserScreen;
