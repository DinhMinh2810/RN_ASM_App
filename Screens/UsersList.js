import React, { useState, useEffect } from 'react';
import {
	Button,
	StyleSheet,
	ScrollView,
	Alert,
	TextInput,
	FlatList,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

const UsersList = (props) => {
	const [users, setUsers] = useState([]);
	const [masterdMakeData, setmasterdMakeData] = useState([]);
	const [filterdMakeData, setfilterdMakeData] = useState([]);
	const [searchMakee, setsearchMakeee] = useState('');
	const navigation = useNavigation();

	useEffect(() => {
		firebase.db.collection('users').onSnapshot((querySnapshot) => {
			const users = [];
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
			setUsers(users);
			setmasterdMakeData(users);
		});
	}, []);

	const deleteUser = async (value) => {
		const dbRef = firebase.db.collection('users').doc(value);
		await dbRef.delete();
		alert('Data user deleted successfully !!');
	};

	const openConfirmationAlert = (value) => {
		Alert.alert(
			'Removing the User',
			'Are you sure?',
			[
				{ text: 'Yes', onPress: () => deleteUser(value) },
				{ text: 'No', onPress: () => console.log('canceled') },
			],
			{
				cancelable: true,
			}
		);
	};

	const searchMake = (text) => {
		if (text) {
			const newData = users.filter((item) => {
				const itemType = item.type ? item.type.toUpperCase() : ''.toUpperCase();
				const itemBedrooms = item.bedrooms
					? item.bedrooms.toUpperCase()
					: ''.toUpperCase();
				const itemName = item.name ? item.name.toUpperCase() : ''.toUpperCase();
				const textData = text.toUpperCase();
				return (
					itemType.indexOf(textData) > -1 ||
					itemBedrooms.indexOf(textData) > -1 ||
					itemName.indexOf(textData) > -1
				);
			});
			setUsers(newData);
			setsearchMakeee(text);
		} else {
			setUsers(masterdMakeData);
			setsearchMakeee(text);
		}
	};

	const handleSignOut = () => {
		firebase.auth
			.signOut()
			.then(() => {
				navigation.replace('Login');
			})
			.catch((error) => alert(error.message));
	};

	return (
		<ScrollView>
			<Text style={styles.text}>
				User Account: {firebase.auth.currentUser?.email}
			</Text>
			<Button
				style={styles.signOut}
				color="#e91e63"
				title="Sign out"
				onPress={handleSignOut}
			/>
			<View style={styles.signOut}>
				<Button
					color="#4d8ee8"
					title="create a rental listing"
					onPress={() => props.navigation.navigate('CreateUserScreen')}
				/>
			</View>
			<View style={styles.searchWrapperStyle}>
				<Icon size={18} name="search" color="white" style={styles.iconStyle} />
				<TextInput
					placeholder="Search by Property type, Bedrooms or Name"
					placeholderTextColor="white"
					style={styles.searchInputStyle}
					underlineColorAndroid="transparent"
					onChangeText={(text) => searchMake(text)}
				/>
				<Icon size={18} name="close" color="white" style={styles.iconStyle} />
			</View>
			{users.map((user) => {
				return (
					<View key={user.id}>
						<ListItem key={user.id} bottomDivider>
							<ListItem.Chevron />
							<ListItem.Content>
								<ListItem.Title>Property type: {user.type}</ListItem.Title>
								<ListItem.Title>Bedrooms: {user.bedrooms}</ListItem.Title>
								<ListItem.Title>Date Time: {user.date}</ListItem.Title>
								<ListItem.Title>Price: {user.price}$</ListItem.Title>
								<ListItem.Title>
									Furniture types: {user.furniture}
								</ListItem.Title>
								<ListItem.Title>Notes: {user.notes}</ListItem.Title>
								<ListItem.Title>
									Name of the reporter: {user.name}
								</ListItem.Title>
								<ListItem.Title style={{ marginBottom: 5 }}>
									<Button
										title="Add notes more"
										onPress={() => {
											props.navigation.navigate('AddNotes', {
												userId: user.id,
											});
										}}
									/>
								</ListItem.Title>
								<ListItem.Title>
									<Button
										title="Delete"
										style={styles.button}
										onPress={() => openConfirmationAlert(user.id)}
										color="#E37399"
									/>
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
				);
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	searchWrapperStyle: {
		backgroundColor: '#8a7fff',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
		marginBottom: 5,
	},
	iconStyle: {
		marginTop: 12,
		marginHorizontal: 8,
	},
	searchInputStyle: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 0,
		margin: 0,
		marginLeft: 12,
		color: 'white',
	},
	button: {
		margin: 10,
		textTransform: 'lowercase',
	},
	text: {
		marginLeft: 16,
		marginTop: 10,
		fontSize: 18,
	},
	signOut: {
		marginTop: 4,
	},
});

export default UsersList;
