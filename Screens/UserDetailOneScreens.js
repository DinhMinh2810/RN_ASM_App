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

const UsersDetailOneScreens = (props) => {
	const initialState = {
		type: '',
		bedrooms: '',
		date: '',
		price: '',
		furniture: '',
		notes: '',
		name: '',
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

	useEffect(() => {
		getUserById(props.route.params.userId);
	}, []);

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
					value={user.type}
					onChangeText={(value) => handleChangeText('type', value)}
				/>
			</View>
		</ScrollView>
	);
};

export default UsersDetailOneScreens;
