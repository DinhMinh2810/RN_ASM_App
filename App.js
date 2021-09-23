import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersList from './Screens/UsersList';
import CreateUserScreen from './Screens/CreateUserScreen';
import UserDetailScreen from './Screens/UserDetailScreen';

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="UsersList"
				component={UsersList}
				options={{ title: 'Welcome to RentalZ' }}
			/>
			<Stack.Screen
				name="CreateUserScreen"
				component={CreateUserScreen}
				options={{ title: 'Create a New User' }}
			/>

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
