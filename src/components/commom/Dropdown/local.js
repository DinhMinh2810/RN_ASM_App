import React from 'react';
import { View, Text, Picker, ScrollView, StyleSheet } from 'react-native';

const Local = () => {
	const [selectedValue, setSelectedValue] = React.useState('');
	return (
		<View>
			<Picker
				selectedValue={selectedValue}
				style={{ height: 50, width: 150 }}
				onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
			>
				<Picker.Item label="Default" value="default" />
				<Picker.Item label="Flat" value="flat" />
				<Picker.Item label="House" value="house" />
				<Picker.Item label="Bungalow" value="bungalow" />
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		marginLeft: 20,
		marginRight: 20,
		flex: 1,
	},
	buttonView: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 10,
	},
});

export default Local;
