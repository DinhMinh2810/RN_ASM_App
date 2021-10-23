import React, { useEffect, useState } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import firebase from '../database/firebase';
import { useNavigation } from '@react-navigation/core';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();

	const handleSignUp = () => {
		firebase.auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				alert('Account successfully created !!');
			})
			.catch((error) => alert(error.message));
	};

	const handleLogin = () => {
		firebase.auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				navigation.navigate('UsersList');
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					style={styles.input}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleLogin} style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleSignUp}
					style={[styles.button, styles.buttonOutline]}
				>
					<Text style={styles.buttonOutlineText}>Register</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: '80%',
	},
	input: {
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	button: {
		backgroundColor: '#0782F9',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonOutline: {
		backgroundColor: '#8a7fff',
		marginTop: 5,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
	buttonOutlineText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
});
