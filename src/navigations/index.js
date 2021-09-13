import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import formScreen from './formScreen';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.navigate('Form')} title="Go to form" />
		</View>
	);
}

const Drawer = createDrawerNavigator();

export default function Index() {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				screenOptions={{
					headerShown: false,
					initialRouteName: 'Home',
				}}
			>
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="Form" component={formScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
