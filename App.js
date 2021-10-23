import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersList from './Screens/UsersList';
import CreateUserScreen from './Screens/CreateUserScreen';
import AddNotes from './Screens/AddNotes';
import Login from './Screens/Login';

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ title: 'Register or Login account RentalZ' }}
			/>
			<Stack.Screen
				name="UsersList"
				component={UsersList}
				options={{ title: 'Welcome to RentalZ' }}
			/>
			<Stack.Screen
				name="CreateUserScreen"
				component={CreateUserScreen}
				options={{ title: 'Create a rental listing' }}
			/>

			<Stack.Screen
				name="AddNotes"
				component={AddNotes}
				options={{ title: 'Add Notes' }}
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
