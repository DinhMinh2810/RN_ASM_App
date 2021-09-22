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
import { useRoute } from '@react-navigation/native';
import firebase from '../database/firebase';
import SearchComponent from '../src/components/SearchComponets';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const UsersList = (props, { navigation }) => {
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

	const [filterdData, setfilterdData] = useState([]);
	const [masterdData, setmasterdData] = useState([]);
	const [search, setsearch] = useState('');

	const [filterdMakeData, setfilterdMakeData] = useState([]);
	const [masterdMakeData, setmasterdMakeData] = useState([]);
	const [searchMakee, setsearchMakeee] = useState('');

	useEffect(() => {
		fetchPosts();
		return () => {};
	}, []);

	const fetchPosts = () => {
		const apiURL = 'https://jsonplaceholder.typicode.com/posts';
		fetch(apiURL)
			.then((response) => response.json())
			.then((responseJson) => {
				setfilterdData(responseJson);
				setmasterdData(responseJson);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const searchFilter = (text) => {
		if (text) {
			const newData = masterdData.filter((item) => {
				const itemData = item.title
					? item.title.toUpperCase()
					: ''.toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			// console.log(newData);
			// console.log(filterdData);
			setfilterdData(newData);
			setsearch(text);
		} else {
			console.log(filterdData); //92
			console.log(masterdData);
			// setfilterdData(masterdData);
			setsearch(text);
		}
	};

	const searchMake = (text) => {
		if (text) {
			const newData = users.filter((item) => {
				const itemDataa = item.name
					? item.name.toUpperCase()
					: ''.toUpperCase();
				const textDataa = text.toUpperCase();
				return itemDataa.indexOf(textDataa) > -1;
			});
			setUsers(newData);
			setsearchMakeee(text);
		} else {
			setsearchMakeee(text);
		}
	};

	const ItemView = ({ item }) => {
		return (
			<Text>
				{item.id}
				{/* {item.title.toUpperCase()} */}
				{item.title}
			</Text>
		);
	};

	const ItemSeparatorView = () => {
		return (
			<View
				style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}
			/>
		);
	};

	return (
		<ScrollView>
			<Button
				title="create user"
				onPress={() => props.navigation.navigate('CreateUserScreen')}
			/>

			{/* <TextInput
				value={search}
				placeholder="search here"
				underlineColorAndroid="transparent"
				onChangeText={(text) => searchFilter(text)}
			/> */}
			<TextInput
				style={styles.button}
				value={searchMakee}
				placeholder="Please search by User name"
				underlineColorAndroid="transparent"
				onChangeText={(text) => searchMake(text)}
			/>
			{/* <View>
				<FlatList
					data={filterdData}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={ItemSeparatorView}
					renderItem={ItemView}
				/>
			</View> */}
			{users.map((user, index) => {
				return (
					<View>
						<ListItem
							// key={user.id}
							key={index}
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
								<ListItem.Title>
									Date Time: {user.date.toLocaleString()}
								</ListItem.Title>
								<ListItem.Title>Price: {user.price}</ListItem.Title>
								<ListItem.Title>
									Furniture types: {user.furniture}
								</ListItem.Title>
								<ListItem.Title>Notes: {user.notes}</ListItem.Title>
								<ListItem.Title>User name: {user.name}</ListItem.Title>
								{/* <Button
									title="Add notes"
									onPress={() => openConfirmationAlert(user.id)}
								/> */}
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
	button: {
		margin: 10,
	},
});

export default UsersList;
