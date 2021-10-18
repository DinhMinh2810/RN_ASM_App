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

const AddNotes = (props) => {
	const initialState = {
		id: '',
		notes: '',
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

	const addNoteMore = async () => {
		const userRef = firebase.db.collection('users').doc(user.id);
		if (user.notes.trim().length > 50) {
			alert('Notes just maximum 50 characters !!');
		} else {
			await userRef.update({
				notes: user.notes,
			});
			setUser(initialState);
			props.navigation.navigate('UsersList');
		}
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

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput
					multiline={true}
					placeholder="Please enter notes"
					value={user.notes}
					onChangeText={(value) => handleChangeText('notes', value)}
				/>
			</View>
			<View>
				<Button
					title="Add notes more"
					onPress={() => addNoteMore()}
					color="#19AC52"
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

export default AddNotes;
