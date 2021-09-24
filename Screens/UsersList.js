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
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from '../database/firebase';
import SearchComponent from '../src/components/SearchComponets';
import Icon from 'react-native-vector-icons/Ionicons';

const UsersList = (props, { navigation }) => {
	const [users, setUsers] = useState([]);
	const [masterdMakeData, setmasterdMakeData] = useState([]);
	const [filterdMakeData, setfilterdMakeData] = useState([]);
	const [searchMakee, setsearchMakeee] = useState('');

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
				const itemData = item.type ? item.type.toUpperCase() : ''.toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setUsers(newData);
			setsearchMakeee(text);
		} else {
			setUsers(masterdMakeData);
			setsearchMakeee(text);
		}
	};

	return (
		<ScrollView>
			<Button
				color="#4d8ee8"
				title="create a new user"
				onPress={() => props.navigation.navigate('CreateUserScreen')}
			/>
			<View style={styles.searchWrapperStyle}>
				<Icon size={18} name="search" color="white" style={styles.iconStyle} />
				<TextInput
					placeholder="Please search by Property type"
					placeholderTextColor="white"
					style={styles.searchInputStyle}
					underlineColorAndroid="transparent"
					onChangeText={(text) => searchMake(text)}
				/>
				<Icon
					size={18}
					name="close"
					color="white"
					style={styles.iconStyle}
					onPress={() => setUsers(masterdMakeData)}
				/>
			</View>
			{users.map((user) => {
				return (
					<View key={user.id}>
						<ListItem
							key={user.id}
							bottomDivider
							// onPress={() => {
							// 	props.navigation.navigate('UserDetailScreen', {
							// 		userId: user.id,
							// 	});
							// }}
						>
							<ListItem.Chevron />
							<ListItem.Content>
								<ListItem.Title>Property type: {user.type}</ListItem.Title>
								<ListItem.Title>Bedrooms: {user.bedrooms}</ListItem.Title>
								<ListItem.Title>Date Time: {user.date}</ListItem.Title>
								<ListItem.Title>Price: {user.price}</ListItem.Title>
								<ListItem.Title>
									Furniture types: {user.furniture}
								</ListItem.Title>
								<ListItem.Title>Notes: {user.notes}</ListItem.Title>
								<ListItem.Title>User name: {user.name}</ListItem.Title>
								<Button
									title="Add notes"
									onPress={() => {
										props.navigation.navigate('UserDetailScreen', {
											userId: user.id,
										});
									}}
								/>
								<Button
									title="Delete"
									style={styles.button}
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
		backgroundColor: '#8a7fff',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
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
		marginLeft: 5,
		color: 'white',
	},
	button: {
		margin: 10,
		textTransform: 'lowercase',
	},
});

export default UsersList;
