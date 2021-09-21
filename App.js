import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	SafeAreaView,
	TextInput,
	Button,
	ActivityIndicator,
	Text,
	View,
	Picker,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import UsersList from './Screens/UsersList';
import CreateUserScreen from './Screens/CreateUserScreen';
import UserDetailScreen from './Screens/UserDetailScreen';
import UserDetailOneScreen from './Screens/UserDetailOneScreens';

// import Index from './src/navigations/index';
// import Form from './src/screens/Form/index';

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="UsersList"
				component={UsersList}
				options={{ title: 'Users List' }}
			/>
			<Stack.Screen
				name="CreateUserScreen"
				component={CreateUserScreen}
				options={{ title: 'Create a New User' }}
			/>

			{/* <Stack.Screen
				name="UserDetailOneScreen"
				component={UserDetailOneScreen}
				options={{ title: 'User One Detail' }}
			/> */}

			<Stack.Screen
				name="UserDetailScreen"
				component={UserDetailScreen}
				options={{ title: 'User Detail' }}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
