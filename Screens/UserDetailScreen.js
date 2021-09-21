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
		name: '',
		email: '',
		phone: '',
	};
	const [user, setUser] = useState(initialState);
	const [loading, setLoading] = useState(true);

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

	const updateUser = async () => {
		const userRef = firebase.db.collection('users').doc(user.id);
		await userRef.set({
			name: user.name,
			email: user.email,
			phone: user.phone,
		});
		setUser(initialState);
		props.navigation.navigate('UsersList');
	};

	useEffect(() => {
		getUserById(props.route.params.userId);
	}, []);

	const handleChangeText = (name, value) => {
		setUser({ ...user, [name]: value });
	};

	const deleteUser = async () => {
		setLoading(true);
		const dbRef = firebase.db
			.collection('users')
			.doc(props.route.params.userId);
		await dbRef.delete();
		setLoading(false);
		props.navigation.navigate('UsersList');
	};

	const openConfirmationAlert = () => {
		Alert.alert(
			'Removing the User',
			'Are you sure?',
			[
				{ text: 'Yes', onPress: () => deleteUser() },
				{ text: 'No', onPress: () => console.log('canceled') },
			],
			{
				cancelable: true,
			}
		);
	};

	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" color="#9e9e9e" />
			</View>
		);
	}
	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput
					placeholder="Name User"
					value={user.name}
					onChangeText={(value) => handleChangeText('name', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
					placeholder="Email User"
					value={user.email}
					onChangeText={(value) => handleChangeText('email', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
					placeholder="Phone User"
					value={user.phone}
					onChangeText={(value) => handleChangeText('phone', value)}
				/>
			</View>
			<View>
				<Button title="Update" onPress={() => updateUser()} color="#19AC52" />
			</View>
			<View>
				<Button
					title="Delete"
					onPress={() => openConfirmationAlert()}
					color="#E37399"
				/>
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
