import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import colors from '../../../../assets/theme/colors';

const Input = ({
	onChangeText,
	icon,
	style,
	value,
	label,
	error,
	...props
}) => {
	const [focused, setFocused] = React.useState(false);
	const getBorderColor = () => {
		if (error) {
			return colors.danger;
		}
		if (focused) {
			return colors.primary;
		} else {
			return colors.grey;
		}
	};

	return (
		<View style={styles.inputContainer}>
			{label && <Text>{label}</Text>}
			<View style={[styles.wrapper, { borderColor: getBorderColor() }]}>
				<TextInput
					style={[styles.textInput, style]}
					onChangeText={onChangeText}
					value={value}
					onFocus={() => {
						setFocused(true);
					}}
					onBlur={() => {
						setFocused(false);
					}}
					{...props}
				/>
			</View>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default Input;
