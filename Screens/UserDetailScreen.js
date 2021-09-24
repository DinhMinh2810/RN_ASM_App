import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Button,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from '../database/firebase';

const UserDetailScreen = (props) => {
	const initialState = {
		id: '',
		notes: '',
	};

	const [user, setUser] = useState(initialState);
	const [loading, setLoading] = useState(true);

	const userAll = { ...user };

	const getUserById = async (id) => {
		const dbRef = firebase.db.collection('users').doc(id);
		const doc = await dbRef.get();
		const user = doc.data();
		setUser({
			...user,
			id: doc.id,
		});
		setLoading(false);
	};

	useEffect(() => {
		getUserById(props.route.params.userId);
	}, []);

	const updateUser = async () => {
		// const userRef = firebase.db.collection('users').doc(user.id);
		// await userRef.set({
		// 	// name: user.name,
		// 	// notes: user.notes,
		// 	// price: user.price,
		// 	notes: user.notes,
		// });
		const userRef = firebase.db.collection('users').doc(user.id);
		await userRef.update({
			notes: user.notes,
		});
		setUser(initialState);
		// setUser(userAll);
		props.navigation.navigate('UsersList');
	};

	const handleChangeText = (name, value) => {
		setUser({ ...user, [name]: value });
	};

	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" color="#9e9e9e" />
			</View>
		);
	}

	const haha = () => {
		// console.log(userAll);
		console.log(user);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput
					placeholder="Please enter notes"
					value={user.notes}
					onChangeText={(value) => handleChangeText('notes', value)}
				/>
			</View>
			{/* <View style={styles.inputGroup}>
				<TextInput
					placeholder="Name User"
					value={user.name}
					onChangeText={(value) => handleChangeText('name', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
					placeholder="Notes"
					value={user.notes}
					onChangeText={(value) => handleChangeText('notes', value)}
				/>
			</View> */}
			<View>
				<Button title="Update" onPress={() => updateUser()} color="#19AC52" />
			</View>
			<View>
				<Button title="Update" onPress={() => haha()} color="#19AC52" />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 35,
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
	inputGroup: {
		flex: 1,
		padding: 0,
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc',
	},
	btn: {
		marginBottom: 7,
	},
});

export default UserDetailScreen;
