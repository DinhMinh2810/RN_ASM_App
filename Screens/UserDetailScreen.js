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
		des: '',
		// name: '',
		// notes: '',
		// price: '',
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
		// const userRef = firebase.db.collection('users').doc(user.id);
		const userRef = firebase.db.collection('users');
		await userRef.add({
			// name: user.name,
			// notes: user.notes,
			// price: user.price,
			des: user.des,
		});
		setUser(initialState);
		props.navigation.navigate('UsersList');
	};

	useEffect(() => {
		//id user
		getUserById(props.route.params.userId);
	}, []);

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
	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput
					placeholder="Price"
					value={user.des}
					onChangeText={(value) => handleChangeText('des', value)}
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
