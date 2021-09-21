import React from 'react';
import { View, Text, Picker, ScrollView, StyleSheet } from 'react-native';

const Dropdown = ({ error, onValueChange, selectedValue, ...props }) => {
	// const [selectedValue, setSelectedValue] = React.useState('');
	return (
		<View style={styles.container}>
			<Picker
				style={{ height: 50, width: 150 }}
				onValueChange={onValueChange}
				 selectedValue={selectedValue}
				// onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
			>
				<Picker.Item label="N/A" value="n/A" />
				<Picker.Item label="Flat" value="flat" />
				<Picker.Item label="House" value="house" />
				<Picker.Item label="Bungalow" value="bungalow" />
			</Picker>
			{error && <Text>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Dropdown;
