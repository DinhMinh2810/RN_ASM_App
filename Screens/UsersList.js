import React, { useState, useEffect } from 'react';
import {
	Button,
	StyleSheet,
	ScrollView,
	Alert,
	FlatList,
	View,
	Text,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import SearchComponent from '../src/components/SearchComponets';
import axios from 'axios';

const UsersList = (props) => {
	const [users, setUsers] = useState([]);

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
		});
	}, []);

	const deleteUser = async (value) => {
		const dbRef = firebase.db.collection('users').doc(value);
		await dbRef.delete();
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

	return (
		<ScrollView>
			<Button
				title="create user"
				onPress={() => props.navigation.navigate('CreateUserScreen')}
			/>

			{users.map((user) => {
				return (
					<View>
						<ListItem
							key={user.id}
							bottomDivider
							onPress={() => {
								props.navigation.navigate('UserDetailScreen', {
									userId: user.id,
								});
							}}
						>
							<ListItem.Chevron />
							<ListItem.Content>
								<ListItem.Title>Property type: {user.type}</ListItem.Title>
								<ListItem.Title>Bedrooms: {user.bedrooms}</ListItem.Title>
								{/* <ListItem.Title>
									Date Time: {user.date.toLocaleString()}
								</ListItem.Title> */}
								<ListItem.Title>Price: {user.price}</ListItem.Title>
								<ListItem.Title>
									Furniture types: {user.furniture}
								</ListItem.Title>
								<ListItem.Title>Notes: {user.notes}</ListItem.Title>
								<ListItem.Title>User name: {user.name}</ListItem.Title>
								<Button
									title="Delete"
									onPress={() => openConfirmationAlert(user.id)}
									color="#E37399"
								/>
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
		backgroundColor: '#16A085',
		flexDirection: 'row',
		justifyContent: 'space-between',
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
		color: 'white',
	},
});

export default UsersList;
